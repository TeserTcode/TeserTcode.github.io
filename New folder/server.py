import http.server
import socketserver
import webbrowser
import os

# Configuration
PORT = 8000  # You can change the port number if necessary
FILENAME = "DC.html"  # The HTML file to open in the browser

# Start the web server
class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = FILENAME
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Open the HTML file in the default web browser
def open_browser():
    webbrowser.open(f'http://localhost:{PORT}/{FILENAME}')

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Serve files from the current directory
os.chdir(current_dir)

# Start the server and open the browser
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    open_browser()
    httpd.serve_forever()
