#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vietnamese Translation Validator
=================================
验证越南语翻译文件的质量和正确性

使用方法：
    python validate_translation.py

检查项目：
    1. HTML 语言属性
    2. 资源路径正确性
    3. 导航链接
    4. Meta 标签
    5. 术语一致性
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# 配置
VI_DIR = Path(r"E:\ai_coding\industrial-furnace-solutions\build\client\vi")

# 必须存在的越南语术语（质量检查）
REQUIRED_VIETNAMESE_TERMS = [
    "Trang chủ",          # Home
    "Giải pháp",          # Solutions
    "Dự án tiêu biểu",    # Case Studies
    "Giới thiệu",         # About
    "Lò nung lại",        # Reheating Furnace
    "Tiết kiệm nhiên liệu",  # Fuel Saving
]

# 不应该出现的英文术语（已翻译术语检查）
SHOULD_NOT_EXIST = [
    "Home</a>",           # 应该是 Trang chủ
    "Solutions</a>",      # 应该是 Giải pháp
    "Case Studies</a>",   # 应该是 Dự án tiêu biểu
    "About</a>",          # 应该是 Giới thiệu
]


class ValidationResult:
    """验证结果类"""
    def __init__(self, file_path):
        self.file_path = file_path
        self.errors = []
        self.warnings = []
        self.info = []
    
    def add_error(self, message):
        self.errors.append(f"❌ ERROR: {message}")
    
    def add_warning(self, message):
        self.warnings.append(f"⚠️  WARNING: {message}")
    
    def add_info(self, message):
        self.info.append(f"ℹ️  INFO: {message}")
    
    def is_valid(self):
        return len(self.errors) == 0
    
    def print_report(self):
        """打印验证报告"""
        print(f"\n{'='*70}")
        print(f"File: {self.file_path.name}")
        print(f"{'='*70}")
        
        if self.errors:
            print("\n🚨 ERRORS:")
            for error in self.errors:
                print(f"  {error}")
        
        if self.warnings:
            print("\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  {warning}")
        
        if self.info:
            print("\nℹ️  INFO:")
            for info in self.info:
                print(f"  {info}")
        
        if not self.errors and not self.warnings:
            print("\n✅ All checks passed!")


def validate_html_lang(content, result):
    """验证 HTML 语言属性"""
    if '<html lang="vi">' not in content and '<html lang="vi" ' not in content:
        result.add_error("HTML lang attribute should be 'vi', not 'en'")
    else:
        result.add_info("HTML lang attribute: ✓ vi")


def validate_resource_paths(content, result):
    """验证资源路径"""
    # 检查是否有未修复的相对路径
    wrong_paths = []
    
    # 图片路径
    if re.search(r'src="\.\/', content):
        wrong_paths.append("Found src=\"./\" (should be src=\"../\")")
    
    # CSS/JS 路径
    if re.search(r'href="\.\/', content):
        wrong_paths.append("Found href=\"./\" (should be href=\"../\")")
    
    # Video poster
    if re.search(r'poster="\.\/', content):
        wrong_paths.append("Found poster=\"./\" (should be poster=\"../\")")
    
    if wrong_paths:
        result.add_error("Resource paths not fixed:")
        for path in wrong_paths:
            result.add_error(f"  - {path}")
    else:
        result.add_info("Resource paths: ✓ All using '../' prefix")


def validate_navigation_links(content, result):
    """验证导航链接"""
    issues = []
    
    # 越南语页面不应该链接到自己的越南语版本
    if 'href="./vi/index.html"' in content or 'href="../vi/index.html"' in content:
        issues.append("Vietnamese page should not link to /vi/ (should link to English version)")
    
    # 应该有英文版本的链接
    if 'href="../index.html"' not in content and 'English' in content:
        result.add_warning("Missing link to English version")
    
    # 检查导航链接格式
    nav_links = re.findall(r'href="([^"]*)"[^>]*>([^<]*)</a>', content)
    for href, text in nav_links:
        if text in ["Home", "Solutions", "Case Studies", "About"]:
            issues.append(f"Found untranslated navigation text: '{text}' ({href})")
    
    if issues:
        for issue in issues:
            result.add_error(issue)
    else:
        result.add_info("Navigation links: ✓ Properly configured")


def validate_meta_tags(content, result):
    """验证 Meta 标签"""
    # Canonical URL 检查
    if 'rel="canonical"' in content:
        if 'href="https://www.ecoreheating.com/"' in content:
            result.add_warning("Canonical URL should include /vi/ for Vietnamese pages")
        elif 'href="https://www.ecoreheating.com/vi/' in content:
            result.add_info("Canonical URL: ✓ Includes /vi/")
    
    # Hreflang 检查
    if 'hreflang="vi"' in content and 'hreflang="en"' in content:
        result.add_info("Hreflang tags: ✓ Both en and vi present")
    else:
        result.add_warning("Missing hreflang tags for language alternates")
    
    # OG 标签检查
    og_title = re.search(r'<meta property="og:title" content="([^"]*)"', content)
    if og_title:
        if 'Furnace' in og_title.group(1) and 'Lò' not in og_title.group(1):
            result.add_warning("OG title not translated to Vietnamese")
        else:
            result.add_info("OG title: ✓ Translated")


def validate_term_consistency(content, result):
    """验证术语一致性"""
    # 检查必须存在的越南语术语
    missing_terms = []
    for term in REQUIRED_VIETNAMESE_TERMS:
        if term not in content:
            missing_terms.append(term)
    
    if missing_terms:
        result.add_warning(f"Missing Vietnamese terms: {', '.join(missing_terms)}")
    else:
        result.add_info("Vietnamese terms: ✓ All key terms present")
    
    # 检查不应该存在的英文术语
    untranslated = []
    for term in SHOULD_NOT_EXIST:
        if term in content:
            untranslated.append(term.replace('</a>', ''))
    
    if untranslated:
        result.add_error(f"Found untranslated navigation terms: {', '.join(untranslated)}")


def validate_special_characters(content, result):
    """验证特殊字符处理"""
    # 检查 HTML 实体是否正确
    if '&amp;' in content:
        result.add_info("HTML entities: ✓ Properly encoded")
    
    # 检查越南语特殊字符
    vietnamese_chars = ['ă', 'â', 'ê', 'ô', 'ơ', 'ư', 'đ', 'á', 'à', 'ả', 'ã', 'ạ']
    found_chars = [char for char in vietnamese_chars if char in content]
    
    if found_chars:
        result.add_info(f"Vietnamese characters detected: {len(set(found_chars))} unique diacritics")


def validate_file(file_path):
    """验证单个文件"""
    result = ValidationResult(file_path)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result.add_error(f"Failed to read file: {str(e)}")
        return result
    
    # 执行所有验证
    validate_html_lang(content, result)
    validate_resource_paths(content, result)
    validate_navigation_links(content, result)
    validate_meta_tags(content, result)
    validate_term_consistency(content, result)
    validate_special_characters(content, result)
    
    return result


def main():
    """主函数"""
    print("╔" + "="*68 + "╗")
    print("║" + " " * 15 + "Vietnamese Translation Validator" + " " * 21 + "║")
    print("╚" + "="*68 + "╝")
    
    if not VI_DIR.exists():
        print(f"\n❌ ERROR: Vietnamese directory not found: {VI_DIR}")
        print("\nPlease run translate_to_vietnamese.py first.")
        return
    
    # 查找所有 HTML 文件
    html_files = list(VI_DIR.glob("**/*.html"))
    
    if not html_files:
        print(f"\n⚠️  WARNING: No HTML files found in {VI_DIR}")
        return
    
    print(f"\nFound {len(html_files)} HTML files to validate...\n")
    
    # 验证所有文件
    results = []
    for file_path in html_files:
        result = validate_file(file_path)
        results.append(result)
        result.print_report()
    
    # 汇总报告
    print("\n" + "="*70)
    print("SUMMARY REPORT")
    print("="*70)
    
    total_files = len(results)
    valid_files = sum(1 for r in results if r.is_valid())
    total_errors = sum(len(r.errors) for r in results)
    total_warnings = sum(len(r.warnings) for r in results)
    
    print(f"\nTotal Files:    {total_files}")
    print(f"Valid Files:    {valid_files} ✓")
    print(f"Files w/ Errors: {total_files - valid_files}")
    print(f"Total Errors:   {total_errors}")
    print(f"Total Warnings: {total_warnings}")
    
    if valid_files == total_files:
        print("\n" + "🎉 " * 10)
        print("All files passed validation!")
        print("🎉 " * 10)
    else:
        print("\n⚠️  Some files need attention. Please review the errors above.")
    
    print("\n" + "="*70)


if __name__ == "__main__":
    main()
