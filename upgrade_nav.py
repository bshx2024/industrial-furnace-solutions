
import os

base_dir = r"e:\ai_coding\industrial-furnace-solutions\build\client"

# The smart navigation script to inject
# It handles two things:
# 1. Hide/Show on scroll direction
# 2. Add background color/blur when not at the very top
smart_nav_script = """
<script>
    (function() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('header');
        
        // Ensure header has transform transition class if not already
        if (header && !header.classList.contains('transition-transform')) {
            header.classList.add('transition-transform');
        }

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (!header) return;

            // Logic 1: Hide on down scroll, Show on up scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN and past 100px -> HIDE
                header.classList.add('-translate-y-full');
            } else {
                // Scrolling UP -> SHOW
                header.classList.remove('-translate-y-full');
            }

            // Logic 2: Glassmorphism background when scrolled
            if (currentScrollY > 20) {
                // Not at top: Dark background, smaller padding
                header.classList.remove('bg-transparent', 'py-5');
                header.classList.add('bg-industrial-950/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
            } else {
                // At top: Transparent, larger padding
                header.classList.add('bg-transparent', 'py-5');
                header.classList.remove('bg-industrial-950/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
            }

            lastScrollY = currentScrollY;
        });
    })();
</script>
"""

print("Starting Smart Nav Injection...")

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            file_path = os.path.join(root, filename)
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Check if we already injected it to avoid duplicates
            if "let lastScrollY = window.scrollY;" in content:
                print(f"Skipping {filename} (already injected)")
                continue
                
            # Inject before </body>
            if "</body>" in content:
                new_content = content.replace("</body>", smart_nav_script + "\n</body>")
                
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Upgraded {filename}")

print("All pages upgraded with Smart Navigation.")
