import os
import re

file_path = 'app/pages/Solutions.tsx'
with open(file_path, 'rb') as f:
    content = f.read()

# The mangled part looks like it might be space+something+/div>
# In the view_file it showed " ?/div>"
# Let's try to find "text-slate-300\">" followed by anything until "</div>" or "/div>"
# Actually, let's just match the whole line pattern
# pattern = rb'<div className="hidden md:block text-slate-300">.*?/div>'
# replacement = rb'<div className="hidden md:block text-slate-300">-&gt;</div>'

new_content = re.sub(rb'text-slate-300">.*?/div>', rb'text-slate-300"> -&gt; </div>', content)

with open(file_path, 'wb') as f:
    f.write(new_content)
