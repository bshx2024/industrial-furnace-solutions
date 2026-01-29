import os
import re

def fix_content(content):
    # Fix broken tags
    content = re.sub(r' ?/h3>', '</h3>', content)
    content = re.sub(r' ?/div>', '</div>', content)
    content = re.sub(r' ?/p>', '</p>', content)
    content = re.sub(r' ?/section>', '</section>', content)
    content = re.sub(r' ?/li>', '</li>', content)
    content = re.sub(r' ?/span>', '</span>', content)
    content = re.sub(r' ?/h2>', '</h2>', content)
    content = re.sub(r' ?/h1>', '</h1>', content)
    
    # Fix broken words at start of sentences
    content = content.replace('  he ', 'The ')
    content = content.replace('  nergy ', 'energy ')
    content = content.replace('   aseline ', 'baseline ')
    
    # Fix specific mangled ranges
    content = re.sub(r'7 \?5%', '7-15%', content)
    content = re.sub(r'5 \?5%', '5-15%', content)
    content = re.sub(r'0\.1 \?\.3%', '0.1-0.3%', content)
    content = re.sub(r'1 \? Years', '1-2 Years', content)
    content = re.sub(r'0\.1 \?\.5%', '0.1-0.5%', content)
    
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
