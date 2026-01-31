import os

# Define the root of the build/client directory
base_dir = r"e:\ai_coding\industrial-furnace-solutions\build\client"

# Walk through the directory structure
for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            file_path = os.path.join(root, filename)
            
            # Determine depth relative to base_dir
            # depth 0 = build/client/index.html
            # depth 1 = build/client/hero-cases/index.html
            rel_path = os.path.relpath(root, base_dir)
            if rel_path == ".":
                depth = 0
            else:
                depth = len(rel_path.split(os.sep))
            
            # Prefix for assets (images, css, js)
            # If depth 0, prefix is "./"
            # If depth 1, prefix is "../"
            # If depth 2, prefix is "../../"
            if depth == 0:
                asset_prefix = "./"
                link_prefix = "./" 
            else:
                asset_prefix = "../" * depth
                link_prefix = "../" * depth
            
            print(f"Processing {file_path} (Depth: {depth}, Prefix: {asset_prefix})")

            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # --- Fix 1: Image Sources (src="/...") ---
            # We look for src="/ and replace with src="../" or src="./"
            # We must be careful not to break external links (http)
            # A simple replace of src="/ with src="{asset_prefix}" works for root-relative paths
            content = content.replace('src="/', f'src="{asset_prefix}')
            
            # --- Fix 2: Link Hrefs (href="/...") ---
            # Specific handling for known pages to ensure smooth navigation
            # Map absolute paths to relative paths based on depth
            
            # Helper to generate relative link
            def make_rel(target_path):
                # target_path e.g., "solutions"
                return f"{link_prefix}{target_path}/index.html"
            
            # Home is special
            home_path = f"{link_prefix}index.html"
            
            # Replace navigation links
            # Note: We do this sequential replacement to avoid overwriting already fixed links 
            # if we were to just generic replace href="/".
            
            # Explicit replacements for known routes
            content = content.replace('href="/"', f'href="{home_path}"')
            content = content.replace('href="/solutions"', f'href="{make_rel("solutions")}"')
            content = content.replace('href="/hero-cases"', f'href="{make_rel("hero-cases")}"')
            content = content.replace('href="/about"', f'href="{make_rel("about")}"')
            content = content.replace('href="/vi/index.html"', f'href="{link_prefix}vi/index.html"')

            # --- Fix 3: Asset Preloads & CSS/JS (href="/...") ---
            # Now we catch the remaining href="/..." which are likely CSS/Fonts/Preloads
            # but we must exclude "http" links if the regex was loose.
            # Using simple string replace is safer for href="/
            content = content.replace('href="/', f'href="{asset_prefix}')
            
            # --- Fix 4: Poster images in video tags ---
            content = content.replace('poster="/', f'poster="{asset_prefix}')

            # --- Fix 5: Clean up double dots or mishaps if any ---
            # e.g. if we replaced href="./" with href="../" in a previous run, it might be messy?
            # Actually, since we rewrite from the "absolute" looking paths (starting with /), 
            # we assume the build output always generates href="/assets/..." by default.
            # If the file was already patched, it might have href="./assets".
            # To be safe, we only replace starting with Slash. 
            
            # Write back
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

print("Batch path fix completed.")
