#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MDX Blog Multi-Language Translation Script
==========================================
Automatically translates an English .mdx blog file to Vietnamese (vi), 
Indonesian (id), or Brazilian Portuguese (pt-br), preserving frontmatter 
structure, MDX components, and Markdown links.

Usage:
    python scripts/translate_mdx.py content/blog/en/your-post.mdx [vi|id|pt-br]
"""

import os
import sys
import re
import json
import urllib.request
import urllib.parse
from pathlib import Path

# User-Agent to avoid being blocked by Google Translate free endpoint
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def translate_individual(text, target_lang):
    """
    Translates a single text block.
    """
    if not text.strip():
        return text
    url = "https://translate.googleapis.com/translate_a/single"
    params = {
        "client": "gtx",
        "sl": "en",
        "tl": target_lang,
        "dt": "t",
        "q": text
    }
    query_string = urllib.parse.urlencode(params)
    full_url = f"{url}?{query_string}"
    try:
        req = urllib.request.Request(full_url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read().decode("utf-8"))
            return "".join(segment[0] for segment in data[0] if segment[0]).strip()
    except Exception as e:
        print(f"Individual translation failed: {e}", file=sys.stderr)
        return text

def translate_batch_raw(batch, target_lang):
    """
    Translates a single batch of texts joined by a separator.
    """
    if not batch:
        return []
        
    separator = "\n[999]\n"
    joined_text = separator.join(batch)
    
    url = "https://translate.googleapis.com/translate_a/single"
    params = {
        "client": "gtx",
        "sl": "en",
        "tl": target_lang,
        "dt": "t",
        "q": joined_text
    }
    
    query_string = urllib.parse.urlencode(params)
    full_url = f"{url}?{query_string}"
    
    try:
        req = urllib.request.Request(full_url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
            translated_joined = "".join(segment[0] for segment in data[0] if segment[0])
            
            # Split by the separator allowing variable whitespaces
            parts = re.split(r'\s*\[999\]\s*', translated_joined)
            cleaned_parts = [p.strip() for p in parts]
            
            # If split got empty elements at end/start, filter them slightly but preserve length
            if len(cleaned_parts) != len(batch):
                # If there's an extra empty string at end/start, clean it
                if cleaned_parts and not cleaned_parts[-1]:
                    cleaned_parts.pop()
                if cleaned_parts and not cleaned_parts[0]:
                    cleaned_parts.pop(0)
                    
            if len(cleaned_parts) != len(batch):
                print(f"Warning: Batch translation count mismatch (got {len(cleaned_parts)}, expected {len(batch)}). Falling back to individual translation.", file=sys.stderr)
                return [translate_individual(item, target_lang) for item in batch]
                
            return cleaned_parts
    except Exception as e:
        print(f"Batch translation failed, falling back to individual translation. Error: {e}", file=sys.stderr)
        return [translate_individual(item, target_lang) for item in batch]

def translate_batch(texts, target_lang):
    """
    Translates a list of texts in batches to reduce network requests.
    """
    if not texts:
        return []
        
    translated_texts = []
    current_batch = []
    current_length = 0
    separator = "\n[999]\n"
    
    for text in texts:
        # Limit batch size to ~4000 characters to stay within safety limits
        if current_length + len(text) + len(separator) > 3500:
            translated_texts.extend(translate_batch_raw(current_batch, target_lang))
            current_batch = []
            current_length = 0
            
        current_batch.append(text)
        current_length += len(text) + len(separator)
        
    if current_batch:
        translated_texts.extend(translate_batch_raw(current_batch, target_lang))
        
    return translated_texts

def process_rich_text_segment(text, segments):
    """
    Extracts translateable text parts from a paragraph, protecting HTML/MDX tags.
    """
    # 1. Extract HTML/MDX components
    html_components = []
    def html_replacer(match):
        placeholder = f"__HTML_{len(html_components)}__"
        html_components.append(match.group(0))
        return placeholder
    text_with_html = re.sub(r'<[^>]+>', html_replacer, text)
    
    # 2. Extract Markdown links, extracting the link text as translateable segment
    md_links = []
    def link_replacer(match):
        link_text = match.group(1).strip()
        link_url = match.group(2).strip()
        
        seg_idx = len(segments)
        segments.append(link_text)
        
        placeholder = f"__LINK_{len(md_links)}__"
        md_links.append((seg_idx, link_url))
        return placeholder
    text_with_links = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link_replacer, text_with_html)
    
    # 3. Protect bold and code snippets inside paragraph if they shouldn't be parsed
    # Actually, Google Translate handles `code` and **bold** fine.
    if text_with_links.strip():
        seg_idx = len(segments)
        segments.append(text_with_links.strip())
        final_template = f"__SEG_{seg_idx}__"
    else:
        final_template = text_with_links
        
    # Rebuild template with placeholders
    for idx, (seg_idx, url) in enumerate(md_links):
        placeholder = f"__LINK_{idx}__"
        final_template = final_template.replace(placeholder, f"[__SEG_{seg_idx}__]({url})")
        
    for idx, html_tag in enumerate(html_components):
        placeholder = f"__HTML_{idx}__"
        final_template = final_template.replace(placeholder, html_tag)
        
    return final_template

def process_mdx(content, target_lang):
    """
    Parses MDX into translateable segments and template structures.
    """
    parts = content.split("---")
    if len(parts) < 3:
        raise ValueError("Invalid MDX format: Frontmatter delimiters '---' not found.")
        
    frontmatter = parts[1]
    body = "---".join(parts[2:])
    
    segments = []
    
    # ------------------ Process Frontmatter ------------------
    fm_lines = frontmatter.splitlines()
    fm_output_templates = []
    
    in_faq = False
    
    for line in fm_lines:
        stripped = line.strip()
        if not stripped:
            fm_output_templates.append((line, False))
            continue
            
        if stripped.startswith("lang:"):
            indent = line[:line.index("lang:")]
            fm_output_templates.append((f'{indent}lang: "{target_lang}"', False))
            continue
            
        if stripped.startswith("title:"):
            indent = line[:line.index("title:")]
            val = stripped[6:].strip()
            quotes = ""
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                quotes = val[0]
                val = val[1:-1]
                
            prefix_match = re.match(r'^(\[[^\]]+\])\s*(.*)', val)
            if prefix_match:
                prefix = prefix_match.group(1)
                rest = prefix_match.group(2)
                
                seg_idx_pref = len(segments)
                segments.append(prefix)
                seg_idx_rest = len(segments)
                segments.append(rest)
                
                fm_output_templates.append((f'{indent}title: {quotes}__SEG_{seg_idx_pref}__ __SEG_{seg_idx_rest}__{quotes}', False))
            else:
                seg_idx = len(segments)
                segments.append(val)
                fm_output_templates.append((f'{indent}title: {quotes}__SEG_{seg_idx}__{quotes}', False))
            continue
            
        if stripped.startswith("description:") or stripped.startswith("authorTitle:") or stripped.startswith("authorBio:"):
            key = stripped.split(":")[0]
            indent = line[:line.index(key)]
            val = stripped[len(key)+1:].strip()
            quotes = ""
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                quotes = val[0]
                val = val[1:-1]
            seg_idx = len(segments)
            segments.append(val)
            fm_output_templates.append((f'{indent}{key}: {quotes}__SEG_{seg_idx}__{quotes}', False))
            continue
            
        if stripped.startswith("faq:"):
            in_faq = True
            fm_output_templates.append((line, False))
            continue
            
        if in_faq:
            if stripped and not stripped.startswith("-") and not stripped.startswith("question:") and not stripped.startswith("answer:") and not line.startswith(" ") and not line.startswith("\t"):
                in_faq = False
            else:
                if "question:" in stripped:
                    prefix = "- " if stripped.startswith("-") else ""
                    val = stripped[stripped.index("question:") + 9:].strip()
                    quotes = ""
                    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                        quotes = val[0]
                        val = val[1:-1]
                    
                    indent_idx = line.index("question:")
                    if stripped.startswith("-"):
                        indent_idx = line.index("-")
                    indent = line[:indent_idx]
                    
                    seg_idx = len(segments)
                    segments.append(val)
                    fm_output_templates.append((f'{indent}{prefix}question: {quotes}__SEG_{seg_idx}__{quotes}', False))
                    continue
                elif "answer:" in stripped:
                    val = stripped[stripped.index("answer:") + 7:].strip()
                    quotes = ""
                    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                        quotes = val[0]
                        val = val[1:-1]
                    indent = line[:line.index("answer:")]
                    
                    seg_idx = len(segments)
                    segments.append(val)
                    fm_output_templates.append((f'{indent}answer: {quotes}__SEG_{seg_idx}__{quotes}', False))
                    continue
                    
        if stripped.startswith("tags:"):
            indent = line[:line.index("tags:")]
            match = re.search(r'\[(.*)\]', stripped)
            if match:
                tags_str = match.group(1)
                tags_segs = []
                for t in tags_str.split(","):
                    t_clean = t.strip().strip('"').strip("'")
                    if t_clean:
                        seg_idx = len(segments)
                        segments.append(t_clean)
                        tags_segs.append(f'"__SEG_{seg_idx}__"')
                fm_output_templates.append((f'{indent}tags: [{", ".join(tags_segs)}]', True))
            else:
                fm_output_templates.append((line, False))
            continue
            
        fm_output_templates.append((line, False))
        
    # ------------------ Process Body ------------------
    body_lines = body.splitlines()
    body_output_templates = []
    
    in_code_block = False
    
    i = 0
    while i < len(body_lines):
        line = body_lines[i]
        
        if line.strip().startswith("```") or line.strip().startswith("````"):
            in_code_block = not in_code_block
            body_output_templates.append((line, False))
            i += 1
            continue
            
        if in_code_block:
            body_output_templates.append((line, False))
            i += 1
            continue
            
        if not line.strip():
            body_output_templates.append((line, False))
            i += 1
            continue
            
        # Table rows
        if line.strip().startswith("|"):
            cells = line.split("|")
            output_cells = []
            for cell in cells:
                cell_strip = cell.strip()
                if not cell_strip or re.match(r'^[-:]+$', cell_strip):
                    output_cells.append(cell)
                else:
                    seg_idx = len(segments)
                    segments.append(cell_strip)
                    output_cells.append(f" __SEG_{seg_idx}__ ")
            body_output_templates.append(("|".join(output_cells), False))
            i += 1
            continue
            
        # Headings
        heading_match = re.match(r'^(#+)\s*(.*)', line)
        if heading_match:
            prefix = heading_match.group(1)
            content = heading_match.group(2)
            
            line_template = process_rich_text_segment(content, segments)
            body_output_templates.append((f"{prefix} {line_template}", False))
            i += 1
            continue
            
        # List items
        list_match = re.match(r'^(\s*[-*]|\s*\d+\.)\s*(.*)', line)
        if list_match:
            prefix = list_match.group(1)
            content = list_match.group(2)
            
            line_template = process_rich_text_segment(content, segments)
            body_output_templates.append((f"{prefix} {line_template}", False))
            i += 1
            continue
            
        # Paragraphs - gather lines
        paragraph_lines = [line]
        while i + 1 < len(body_lines) and body_lines[i+1].strip() and not body_lines[i+1].strip().startswith("```") and not body_lines[i+1].strip().startswith("|") and not re.match(r'^(#+)\s*', body_lines[i+1]) and not re.match(r'^(\s*[-*]|\s*\d+\.)\s*', body_lines[i+1]):
            i += 1
            paragraph_lines.append(body_lines[i])
            
        paragraph_text = " ".join(paragraph_lines)
        para_template = process_rich_text_segment(paragraph_text, segments)
        body_output_templates.append((para_template, False))
        i += 1
        
    return segments, fm_output_templates, body_output_templates

def substitute_and_adjust(templates_with_meta, translated_segments, target_lang):
    """
    Substitutes segments and cleans up URLs and tags.
    """
    output_lines = []
    
    for template, is_tags in templates_with_meta:
        # Match placeholder __SEG_{idx}__
        def seg_replacer(match):
            idx = int(match.group(1))
            val = translated_segments[idx]
            if is_tags:
                # Clean tags: lowercase, strip periods
                return val.strip().lower().replace(".", "")
            return val
            
        line_result = re.sub(r'__SEG_(\d+)__', seg_replacer, template)
        
        # Adjust internal links for target languages
        if target_lang != "en":
            # 1. Adjust markdown links: e.g. [text](/solutions) -> [text](/vi/solutions)
            def link_adjuster(match):
                text = match.group(1)
                url = match.group(2)
                if url.startswith("/") and not url.startswith(f"/{target_lang}/") and url != f"/{target_lang}":
                    return f"[{text}](/{target_lang}{url})"
                return match.group(0)
            line_result = re.sub(r'\[([^\]]+)\]\((/[^)]+)\)', link_adjuster, line_result)
            
            # 2. Adjust HTML/MDX hrefs: href="/solutions" -> href="/vi/solutions"
            def href_adjuster(match):
                url = match.group(1)
                if url.startswith("/") and not url.startswith(f"/{target_lang}/") and url != f"/{target_lang}":
                    return f'href="/{target_lang}{url}"'
                return match.group(0)
            line_result = re.sub(r'href="(/[^"]+)"', href_adjuster, line_result)
            
        output_lines.append(line_result)
        
    return "\n".join(output_lines)

def translate_mdx_file(file_path, target_lang):
    """
    Main function to parse, translate, and dump MDX files.
    """
    path = Path(file_path)
    if not path.exists():
        print(f"Error: File not found: {file_path}", file=sys.stderr)
        return False
        
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"Parsing {path.name}...")
    try:
        segments, fm_templates, body_templates = process_mdx(content, target_lang)
    except Exception as e:
        print(f"Failed to parse MDX: {e}", file=sys.stderr)
        return False
        
    print(f"Extracted {len(segments)} segments to translate.")
    print("Translating segments in batches...")
    
    translated_segments = translate_batch(segments, target_lang)
    
    print("Rebuilding translated MDX content...")
    translated_frontmatter = substitute_and_adjust(fm_templates, translated_segments, target_lang)
    
    # We pass false for tag list flag in body templates
    body_templates_with_meta = [(line, False) for line, _ in body_templates]
    translated_body = substitute_and_adjust(body_templates_with_meta, translated_segments, target_lang)
    
    translated_content = f"---\n{translated_frontmatter}\n---\n{translated_body}"
    
    # Escape raw '<' character that are not part of an HTML/JSX tag to prevent MDX build failures
    translated_content = re.sub(r'<(?![a-zA-Z/!?_])', '&lt;', translated_content)
    
    # Save translated file
    blog_dir = path.parent.parent
    dest_dir = blog_dir / target_lang
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_path = dest_dir / path.name
    
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(translated_content)
        
    print(f"\nSuccess: Translation completed successfully!")
    print(f"Saved to: {dest_path}")
    return True

def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/translate_mdx.py [source_mdx_file] [target_lang]")
        print("Example: python scripts/translate_mdx.py content/blog/en/vietnam-steel-2026-six-pressures-competitive-advantage.mdx id")
        sys.exit(1)
        
    source_file = sys.argv[1]
    target_lang = sys.argv[2].lower()
    
    if target_lang not in ["vi", "id", "pt-br", "en"]:
        print(f"Error: Unsupported target language '{target_lang}'. Choose vi, id, pt-br, or en.", file=sys.stderr)
        sys.exit(1)
        
    success = translate_mdx_file(source_file, target_lang)
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()
