import urllib.request
import re

def fetch_element_data():
    # Using a reliable raw data source (Periodic Table JSON/CSV repository)
    url = "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
    print("Fetching data from source...")
    
    with urllib.request.urlopen(url) as response:
        data = response.read().decode('utf-8')
        # We process this as a string to avoid 'import json' as requested
        # But we format it specifically for your element.js
        with open('element.js', 'w', encoding='utf-8') as f:
            f.write("const elementData = " + data + ";")
    
    print("element.js has been generated successfully.")

if __name__ == "__main__":
    fetch_element_data()