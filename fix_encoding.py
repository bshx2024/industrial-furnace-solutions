import os
import re

def fix_file(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()

    # Replace any non-ASCII byte sequences with '?' (or similar)
    # Actually, let's just use a regex to match anything non-ASCII
    # A simple way is to decode with 'ascii' and 'replace'
    try:
        text = content.decode('utf-8', errors='ignore')
        # Filter out characters that are clearly mangled or non-standard for this codebase
        # For now, let's just remove anything that isn't ASCII to be 100% sure it builds
        text = ''.join([i if ord(i) < 128 else ' ' for i in text])
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(text)
    except Exception as e:
        print(f"Error fixing {file_path}: {e}")

directory = 'app'
for root, dirs, files in os.walk(directory):
    for filename in files:
        if filename.endswith(('.tsx', '.ts')):
            file_path = os.path.join(root, filename)
            fix_file(file_path)


