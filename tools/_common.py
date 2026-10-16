"""Tiện ích chung cho các script kiểm thử (Playwright, Chromium).

Chạy máy chủ tĩnh ở gốc repo trước:   python3 -m http.server 8765
Nếu máy không ra được mạng (CDN KaTeX/Google Fonts bị chặn), đặt biến môi trường
KATEX_DIR trỏ tới thư mục dist của gói npm katex@0.16.9 để phục vụ KaTeX cục bộ.
"""
import os, re

BASE = os.environ.get('BASE_URL', 'http://localhost:8765/')
KATEX_DIR = os.environ.get('KATEX_DIR')          # ví dụ: node_modules/katex/dist
CHROME = os.environ.get('CHROME')                 # đường dẫn chromium nếu không dùng bản của Playwright

def launch(p):
    return p.chromium.launch(executable_path=CHROME) if CHROME else p.chromium.launch()

def route(r):
    u = r.request.url
    m = re.search(r'KaTeX/0\.16\.9/(.*)$', u)
    if KATEX_DIR and m:
        path = os.path.join(KATEX_DIR, m.group(1))
        if os.path.exists(path):
            ct = 'text/css' if path.endswith('.css') else 'application/javascript' if path.endswith('.js') else 'font/woff2'
            return r.fulfill(path=path, content_type=ct)
    if KATEX_DIR and 'fonts.g' in u:
        return r.fulfill(body='', content_type='text/css')
    return r.continue_()

def scroll_all(pg, step=500, pause=150):
    """Cuộn hết trang để mọi <tc-scene> được dựng (chúng chỉ dựng khi tới gần khung nhìn)."""
    y = 0
    while y < pg.evaluate('document.body.scrollHeight'):
        pg.evaluate(f'scrollTo(0,{y})'); pg.wait_for_timeout(pause); y += step
