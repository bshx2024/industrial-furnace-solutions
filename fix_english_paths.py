
import os

file_path = r'e:\ai_coding\industrial-furnace-solutions\build\client\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Specific Navigation Links first to ensure they point to index.html
# Note: The original file has href="/solutions", href="/hero-cases", etc.
content = content.replace('href="/solutions"', 'href="./solutions/index.html"')
content = content.replace('href="/hero-cases"', 'href="./hero-cases/index.html"')
content = content.replace('href="/about"', 'href="./about/index.html"')
content = content.replace('href="/vi/index.html"', 'href="./vi/index.html"')
content = content.replace('href="/"', 'href="./index.html"')

# 2. Fix Assets (Images, Scripts, CSS)
# Identify patterns starting with /
# We use replace for standard absolute paths
content = content.replace('src="/', 'src="./')
content = content.replace('poster="/', 'poster="./')
content = content.replace('href="/', 'href="./') 

# 3. Clean up any weirdness (e.g. href="./#" -> href="#")
content = content.replace('href="./#', 'href="#')

# 4. Special Case: Tailwind CDN and Fonts (External links)
# The replace href="/ might capture href="//fonts.googleapis..."?
# No, "href=\"/" only matches if it starts with single slash.
# "href=\"https://..." is safe.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched build/client/index.html")
