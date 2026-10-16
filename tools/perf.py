"""Đo độ mượt animation: bấm Chạy trên từng hình, ghi khoảng cách giữa các khung hình.

  python3 tools/perf.py          # giả lập CPU chậm 4 lần (máy yếu / điện thoại)
  python3 tools/perf.py 1        # tốc độ máy thật

Tiêu chí (CPU chậm 4×): trung vị 16,7 ms; khung > 25 ms dưới ~10 %; không có long task khi chỉ một hình chạy.
"""
import os, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from _common import BASE, launch, route

CASES = [
    ('index.html', 'tc-scene[kind="limit-sequence"]', 6000),
    ('index.html', 'tc-scene[preset="dang04-kep-ham"]', 4500),
    ('index.html', 'tc-scene[preset="dang06-dinh-nghia"]', 5000),
    ('index.html', 'tc-scene[preset="dang10-bay-tong"]', 4500),
    ('index.html', 'tc-scene[preset="dang15-suy-rong"]', 4500),
    ('index.html', 'tc-scene[preset="dang20-fourier-x"]', 5000),
    ('mon-hoc.html', 'tc-scene[preset="dai-so/truot"]', 2600),
    ('mon-hoc.html', 'tc-scene[preset="vat-ly/dao-dong-tat-dan"]', 5000),
]
rate = float(sys.argv[1]) if len(sys.argv) > 1 else 4
with sync_playwright() as p:
    b = launch(p)
    pg = b.new_page(viewport={'width': 1280, 'height': 900}); pg.route('**/*', route)
    cdp = pg.context.new_cdp_session(pg)
    cur = None
    for page, sel, dur in CASES:
        if page != cur:
            pg.goto(BASE + page); pg.wait_for_timeout(800); cur = page
        el = pg.locator(sel).first; el.scroll_into_view_if_needed(); pg.wait_for_timeout(int(os.environ.get('SETTLE', '900')))
        cdp.send('Emulation.setCPUThrottlingRate', {'rate': rate})
        pg.evaluate("""() => { window.__f=[]; window.__lt=0; let last=performance.now(); window.__on=true;
          const loop=(t)=>{ if(!window.__on) return; window.__f.push(t-last); last=t; requestAnimationFrame(loop)}; requestAnimationFrame(loop);
          try{ new PerformanceObserver(l=>{for(const e of l.getEntries()) window.__lt+=e.duration}).observe({type:'longtask'})}catch(e){} }""")
        el.locator('.tc-play').first.click()
        pg.wait_for_timeout(dur)
        r = pg.evaluate("""() => { window.__on=false; const f=window.__f.slice(2).sort((a,b)=>a-b); const n=f.length;
          return {n, med:f[n>>1], p95:f[Math.floor(n*.95)], jank: f.filter(x=>x>25).length/n, lt: window.__lt} }""")
        cdp.send('Emulation.setCPUThrottlingRate', {'rate': 1})
        pg.evaluate("document.querySelectorAll('.tc-play[aria-pressed=true]').forEach(b => b.click())"); pg.wait_for_timeout(300)
        name = sel.split('=')[1].strip('"]')
        print(f"{name:28s} khung={r['n']:4d}  trung vị={r['med']:.1f}ms  p95={r['p95']:.1f}ms  >25ms={r['jank']*100:.0f}%  long task={r['lt']:.0f}ms")
    b.close()
