import os
import re

def fix_content(content):
    # Fix detached closing tags like "<</span>" or "<</div>"
    content = re.sub(r'<<?/', '</', content)
    # Fix " ?/tag>"
    content = re.sub(r' \?/([a-z0-9]+)>', r'</\1>', content)
    # Fix " ?/tag>" without space
    content = re.sub(r'\?/([a-z0-9]+)>', r'</\1>', content)
    
    # Fix specific mangled patterns found in HeroCases.tsx
    content = content.replace('<</span>', '</span>')
    content = content.replace('<</div>', '</div>')
    content = content.replace('<</p>', '</p>')
    content = content.replace('<</h1>', '</h1>')
    content = content.replace('<</h2>', '</h2>')
    content = content.replace('<</h3>', '</h3>')
    content = content.replace('<</section>', '</section>')
    content = content.replace('<</li>', '</li>')
    content = content.replace('<</span>', '</span>') # double check
    
    # Fix common mangled start tags if any
    # (None observed yet but let's be careful)
    
    return content

directory = 'app'
for root, dirs, files in os.walk(directory):
    for filename in files:
        if filename.endswith(('.tsx', '.ts')):
            file_path = os.path.join(root, filename)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            new_content = fix_content(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {file_path}")
