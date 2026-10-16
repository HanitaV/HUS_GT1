"""Kiểm tra nhanh mọi trang: lỗi console, hộp lỗi .tc-error, số hình đã dựng; chụp ảnh toàn trang.

  python3 tools/check.py                 # index.html và mon-hoc.html, 1280px sáng + 390px tối
  OUT=/tmp/shots python3 tools/check.py
"""
import os, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from _common import BASE, launch, route, scroll_all

PAGES = sys.argv[1:] or ['index.html', 'mon-hoc.html']
OUT = os.environ.get('OUT', '/tmp')
bad = 0
with sync_playwright() as p:
    b = launch(p)
    for page in PAGES:
        for width, scheme in [(1280, 'light'), (390, 'dark')]:
            pg = b.new_page(viewport={'width': width, 'height': 900}, color_scheme=scheme)
            logs = []
            pg.on('console', lambda m: m.type in ('error', 'warning') and logs.append(f'{m.type}: {m.text}'))
            pg.on('pageerror', lambda e: logs.append(f'PAGEERROR: {e}'))
            pg.route('**/*', route)
            pg.goto(BASE + page); pg.wait_for_timeout(600)
            scroll_all(pg); pg.wait_for_timeout(1500)
            figs = pg.evaluate("document.querySelectorAll('tc-scene .tc-figure').length")
            scenes = pg.evaluate("document.querySelectorAll('tc-scene').length")
            errs = pg.evaluate("[...document.querySelectorAll('.tc-error')].map(e => e.textContent)")
            shot = os.path.join(OUT, f'{page.replace(".html", "")}_{width}_{scheme}.png')
            pg.screenshot(path=shot, full_page=True)
            ok = not logs and not errs and figs == scenes
            bad += not ok
            print(f"{'OK ' if ok else 'LỖI'} {page} {width}px {scheme}: {figs}/{scenes} hình; {len(logs)} cảnh báo; ảnh: {shot}")
            for l in logs + errs: print('    ', l[:300])
            pg.close()
    b.close()
sys.exit(1 if bad else 0)
