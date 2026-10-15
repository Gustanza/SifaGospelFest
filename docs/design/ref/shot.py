"""Full-page screenshots via Chrome DevTools Protocol.
usage: python shot.py URL OUT_PREFIX WIDTH HEIGHT"""
import sys, json, time, base64, subprocess, urllib.request, tempfile, os
import websocket

url, out, W, H = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
PORT = int(os.environ.get('CDP_PORT', '9333'))
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
prof = tempfile.mkdtemp()
p = subprocess.Popen([chrome, '--headless=new', f'--remote-debugging-port={PORT}', f'--user-data-dir={prof}',
                      '--hide-scrollbars', '--remote-allow-origins=*', '--no-first-run', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for _ in range(50):
    try:
        tabs = json.load(urllib.request.urlopen(f'http://127.0.0.1:{PORT}/json'))
        ws_url = [t for t in tabs if t['type'] == 'page'][0]['webSocketDebuggerUrl']
        break
    except Exception:
        time.sleep(0.2)
ws = websocket.create_connection(ws_url, suppress_origin=True)
mid = 0
def cmd(method, **params):
    global mid
    mid += 1
    ws.send(json.dumps({'id': mid, 'method': method, 'params': params}))
    while True:
        r = json.loads(ws.recv())
        if r.get('id') == mid:
            return r.get('result', {})

cmd('Emulation.setDeviceMetricsOverride', width=W, height=H, deviceScaleFactor=1, mobile=W < 700)
cmd('Page.enable')
cmd('Page.navigate', url=url)
time.sleep(4)
INJ = os.environ.get('INJECT_CSS')
if INJ:
    js = "var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800&family=Open+Sans:wght@400;600&family=Anonymous+Pro&display=swap';document.head.appendChild(l);var s=document.createElement('style');s.textContent=" + json.dumps(INJ) + ";document.head.appendChild(s);"
    cmd('Runtime.evaluate', expression=js)
    time.sleep(3)
# scroll through to trigger reveal animations / lazy images
total = cmd('Runtime.evaluate', expression='document.documentElement.scrollHeight', returnByValue=True)['result']['value']
y = 0
while y < total:
    cmd('Runtime.evaluate', expression=f'window.scrollTo(0,{y})')
    time.sleep(0.25)
    y += H // 2
cmd('Runtime.evaluate', expression='window.scrollTo(0,0)')
time.sleep(2.5)
total = cmd('Runtime.evaluate', expression='document.documentElement.scrollHeight', returnByValue=True)['result']['value']
img = cmd('Page.captureScreenshot', format='jpeg', quality=70, captureBeyondViewport=True,
          clip={'x': 0, 'y': 0, 'width': W, 'height': total, 'scale': 1})
data = base64.b64decode(img['data'])
open(out + '-full.jpg', 'wb').write(data)
errs = cmd('Runtime.evaluate', expression='JSON.stringify([document.documentElement.scrollWidth, window.innerWidth])', returnByValue=True)
print('height', total, 'scrollWidth/innerWidth', errs['result']['value'])
ws.close(); p.terminate()
try:
    p.wait(10)
except Exception:
    pass
import shutil
shutil.rmtree(prof, ignore_errors=True)

# split into viewable chunks
from PIL import Image
im = Image.open(out + '-full.jpg')
chunk = int(W * 1.1)
n = 0
for top in range(0, im.height, chunk):
    n += 1
    im.crop((0, top, W, min(im.height, top + chunk))).save(f'{out}-{n:02d}.jpg', quality=75)
print('chunks', n)
