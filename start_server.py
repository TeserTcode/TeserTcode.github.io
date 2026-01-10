import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
#HTML_FILE = "funclibmissing.html"
HTML_FILE = "DC.html"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}/. Press Ctrl+C to stop.")
        webbrowser.open(f"http://localhost:{PORT}/{HTML_FILE}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
