#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vietnamese Translation Automation Script
=========================================
自动翻译 HTML 文件到越南语，并修正路径引用

使用方法：
    python translate_to_vietnamese.py

功能：
    1. 复制英文 HTML 到 /vi/ 目录
    2. 自动修复资源路径（./ -> ../）
    3. 批量替换文本为越南语
    4. 更新 meta 标签和语言属性
"""

import os
import re
import shutil
from pathlib import Path

# 翻译字典
TRANSLATIONS = {
    # ==================== 导航菜单 ====================
    "Home": "Trang chủ",
    "Solutions": "Giải pháp",
    "Case Studies": "Dự án tiêu biểu",
    "About": "Giới thiệu",
    "Contact": "Liên hệ",
    
    # ==================== CTA 按钮 ====================
    "Free Assessment": "Đánh giá miễn phí",
    "Get Free ROI Audit": "NHẬN ĐÁNH GIÁ ROI MIỄN PHÍ",
    "View Case Studies": "Xem Dự án Tiêu biểu",
    "Calculate My Full ROI": "Tính toán ROI đầy đủ",
    "Learn More": "Tìm hiểu thêm",
    "Download PDF": "Tải PDF",
    "Request Quote": "Yêu cầu báo giá",
    "Contact Us": "Liên hệ chúng tôi",
    
    # ==================== Hero Section ====================
    "Stop Reheating Furnace": "Chấm dứt Lãng phí nhiên liệu",
    "Fuel Waste. ": "Lò nung lại. ",
    "Zero CAPEX Upgrades.": "Nâng cấp Zero CAPEX.",
    "We invest, you save.": "Chúng tôi đầu tư, bạn tiết kiệm.",
    "typical 7-15% fuel consumption reduction": "giảm tiêu thụ nhiên liệu điển hình 7-15%",
    "in your reheating furnaces": "trong lò nung lại của bạn",
    "with our T80-validated extreme efficiency tech": "với công nghệ hiệu suất cực cao được kiểm chứng thực tế bởi T80",
    "paid for entirely by verified energy savings.": "chi trả hoàn toàn bằng khoản tiết kiệm năng lượng đã được xác minh.",
    
    "Optimized for Walking Beam &amp; Walking Hearth Furnaces": "Tối ưu hóa cho Lò dầm bước & Lò đáy bước",
    "in Long/Flat Steel Mills.": "trong các nhà máy cán thép dài/phẳng.",
    
    # ==================== 核心特性 ====================
    "Performance-based 'Energy Steward' model.": "Mô hình \"Quản gia năng lượng\" dựa trên hiệu suất.",
    "No CAPEX, paid for by verified savings.": "Không chi phí đầu tư (Zero CAPEX), trả bằng khoản tiết kiệm.",
    "Enhance yield and surface quality through T80-listed oxidation control technologies.": 
        "Nâng cao năng suất và chất lượng bề mặt thông qua kiểm soát vảy oxit T80.",
    "Designed and validated in integrated steel mills.": 
        "Thiết kế và xác thực tại các nhà máy thép tích hợp.",
    "Listed in CISA T80 extreme efficiency technologies.": 
        "Được liệt kê trong công nghệ hiệu suất cực cao CISA T80.",
    
    # ==================== ROI Calculator ====================
    "ROI Calculator": "Tính Toán ROI",
    "Annual Production": "Sản lượng hàng năm",
    "Adjust Capacity": "Điều chỉnh công suất",
    "Annual Value": "Giá trị",
    "Estimated Annual Savings": "Tiết kiệm ước tính/năm",
    "carbon offset": "Giảm thải carbon",
    "Carbon Credits Equiv.": "Tín chỉ Carbon tương đương",
    "No CAPEX Required | Performance Based": "Zero CAPEX | Dựa trên hiệu suất thực",
    
    # ==================== 统计数据 ====================
    "Typical Fuel Saving": "Tiết kiệm nhiên liệu điển hình",
    "CO2 Reduction (Est.)": "Giảm CO2 (Ước tính)",
    "Zone Temp. (Typical)": "NHIỆT ĐỘ VỎ LÒ (ĐIỂN HÌNH)",
    "Flue Oxygen (Example)": "Oxy khí thải (Ví dụ)",
    "Control Status": "Trạng thái điều khiển",
    "Optimized": "Tối ưu hóa",
    
    # ==================== Logo Wall ====================
    "Trusted by Global Steel Leaders:": "Đối tác thép toàn cầu tin dùng:",
    "CISA T80 Verified": "Chứng nhận CISA T80",
    
    # ==================== Why Choose Section ====================
    "Why Choose the ": "Tại sao chọn ",
    "Energy Steward Solution": "Giải pháp Quản gia năng lượng",
    
    " provides Zero CAPEX reheating furnace optimization using ": 
        " cung cấp tối ưu hóa lò nung lại Zero CAPEX sử dụng ",
    "CISA T80 verified technologies": "công nghệ được kiểm chứng thực tế bởi CISA T80",
    "like narrow window temperature control and full-fiber roofs, helping steel mills reduce fuel consumption by ": 
        "như kiểm soát nhiệt độ cửa sổ hẹp và mái lò toàn sợi gốm, giúp các nhà máy thép giảm tiêu thụ nhiên liệu ",
    
    "Developed by South Technology, this industry-defining solution": 
        "Được phát triển bởi South Technology, giải pháp tiên phong ngành này",
    "now a national benchmark": "hiện là tiêu chuẩn quốc gia",
    "optimizes the entire thermal journey from ": "tối ưu hóa toàn bộ hành trình nhiệt từ ",
    "continuous caster exit": "lối ra máy đúc liên tục",
    " to ": " đến ",
    "reheating furnace exit": "lối ra lò nung lại",
    
    "Rolling Mill Entry": "Máy Cán",
    "CO2 Reduction (Est.)": "VẢY ÔXY HÓA",
    
    "Maximize Heating Capacity": "Tăng tối đa Công suất Gia nhiệt",
    "Eliminate bottlenecks in the reheating process to ensure peak production throughput.": 
        "Loại bỏ nghẽn cổ chai trong quy trình gia nhiệt để đảm bảo công suất sản xuất đỉnh cao.",
    
    "Optimize Reheating Process": "Tối ưu hóa Quy trình Gia nhiệt",
    "Advanced AI and process simulation to achieve precise thermal curves and minimum fuel usage.": 
        "AI tiên tiến và mô phỏng quy trình để đạt được đường cong nhiệt chính xác và mức tiêu thụ nhiên liệu tối thiểu.",
    
    "Zero-Downtime Reliability": "Độ tin cậy Không ngừng hoạt động",
    "Long-term expert steward service ensuring equipment longevity and consistent performance.": 
        "Dịch vụ quản gia chuyên gia dài hạn đảm bảo tuổi thọ thiết bị và hiệu suất ổn định.",
    
    # ==================== Technologies Section ====================
    "Our Expertise": "Chuyên môn của chúng tôi",
    "Core Technologies for": "Công nghệ cốt lõi để",
    "Furnace Conservation": "Bảo tồn lò nung",
    
    # 技术1：全纤维炉顶
    "Full-fiber Furnace Roof": "Mái lò toàn sợi gốm",
    "1. Fuel Efficiency: &gt;10% energy saving under identical conditions. No pre-heating required, drastically reducing startup fuel costs.": 
        "1. Hiệu quả nhiên liệu: Tiết kiệm năng lượng >10% trong cùng điều kiện. Không cần sấy lò, giảm đáng kể chi phí nhiên liệu khởi động.",
    "2. Rapid Assembly: Factory pre-assembled modules; on-site installation completed in just 2 days.": 
        "2. Lắp ráp nhanh: Module lắp ráp sẵn tại nhà máy; lắp đặt tại chỗ chỉ trong 2 ngày.",
    "3. Long Lifespan: Durable design ensuring a service life of over 10 years.": 
        "3. Tuổi thọ dài: Thiết kế bền bỉ đảm bảo tuổi thọ trên 10 năm.",
    "4. Safety &amp; Stability: Enhanced performance in extreme heat, high vibration, and corrosive environments, lowering O&amp;M risks.": 
        "4. An toàn & Ổn định: Hiệu suất nâng cao trong môi trường nhiệt độ cực cao, rung động mạnh và ăn mòn, giảm rủi ro vận hành.",
    
    "Key Performance Indicators:": "Chỉ số Hiệu suất Chính:",
    "&gt;10% Fuel Saving": ">10% Tiết kiệm nhiên liệu",
    "2-Day Assembly": "Lắp đặt 2 ngày",
    "10+ Year Lifespan": "Tuổi thọ 10+ năm",
    "Operational Safety": "An toàn vận hành",
    
    # 技术2：智能燃烧系统
    "Intelligent Combustion System": "Hệ thống đốt thông minh",
    "1. Full-process Traceability: Comprehensive material tracking from charge to exit.": 
        "1. Truy xuất nguồn gốc toàn quy trình: Theo dõi vật liệu toàn diện từ khi nạp liệu đến khi ra lò.",
    "2. Precision Control: Save &gt;5% fuel and reduce oxidation loss by &gt;10% through exact temperature management.": 
        "2. Điều khiển chính xác: Tiết kiệm >5% nhiên liệu và giảm hao hụt oxy hóa tương đối >10% thông qua quản lý nhiệt độ chính xác.",
    "3. Core Technology: Built on mechanism models, self-learning AI, and advanced proprietary algorithms.": 
        "3. Công nghệ cốt lõi: Dựa trên mô hình cơ chế, AI tự học và các thuật toán độc quyền tiên tiến.",
    
    "Material Traceability": "Truy xuất vật liệu",
    "&gt;5% Fuel Saving": ">5% Tiết kiệm nhiên liệu",
    "Oxidation Loss Reduction": "Giảm hao hụt oxy hóa",
    "Self-learning AI": "AI Tự học",
    
    # 技术3：高温节能涂层
    "High-temperature Energy-saving Coating": "Lớp phủ tiết kiệm năng lượng nhiệt độ cao",
    "1. Advanced Formula: Unique 'High Emissivity' formula solves industry-common flaking issues.": 
        "1. Công thức tiên tiến: Công thức 'Phát xạ cao' độc đáo giải quyết vấn đề bong tróc phổ biến trong ngành.",
    "2. Durable Performance: Withstands 1700 °C without degradation, compatible with all refractory materials.": 
        "2. Hiệu quả bền bỉ: Chịu được 1700 °C mà không suy giảm hiệu suất, tương thích với mọi vật liệu chịu lửa.",
    "3. Efficiency Boost: Reduces furnace shell temperature, increases productivity, and extends refractory lifespan.": 
        "3. Tăng cường hiệu suất: Giảm nhiệt độ vỏ lò, tăng năng suất và kéo dài tuổi thọ vật liệu chịu lửa.",
    
    "Advanced Formula": "Công thức tiên tiến",
    "1700°C Resistance": "Chịu nhiệt 1700°C",
    "Refractory Compatible": "Tương thích vật liệu chịu lửa",
    "Productivity Boost": "Tăng năng suất",
    
    # 技术4：数字孪生技术
    "Digital Twin Technology": "Công nghệ Bản sao số",
    "1. Real-time Simulation: Mirror the physical furnace environment with live data for predictive insights.": 
        "1. Mô phỏng thời gian thực: Phản chiếu môi trường lò vật lý bằng dữ liệu trực tiếp để có những hiểu biết dự đoán.",
    "2. Predictive Maintenance: Anticipate and prevent equipment failures before they occur.": 
        "2. Bảo trì dự đoán: Dự đoán và ngăn ngừa sự cố thiết bị trước khi xảy ra.",
    "3. Optimization Engine: Continuously refine operating parameters for maximum efficiency.": 
        "3. Bộ máy tối ưu hóa: Liên tục tinh chỉnh các thông số vận hành để đạt hiệu quả tối đa.",
    
    "Real-time Mirroring": "Phản chiếu thời gian thực",
    "Predictive Analytics": "Phân tích dự đoán",
    "Auto-optimization": "Tự động tối ưu hóa",
    "Failure Prevention": "Ngăn ngừa sự cố",
    
    # ==================== Language Switcher ====================
    "[English]": "[English]",
    "Tiếng Việt": "Tiếng Việt",
    "English": "English",
    
    # ==================== Footer ====================
    "Industrial Solutions": "Giải pháp công nghiệp",
    "All rights reserved.": "Bảo lưu mọi quyền.",
    "Privacy Policy": "Chính sách bảo mật",
    "Terms of Service": "Điều khoản dịch vụ",
    
    # ==================== Meta 标签 ====================
    "Zero CAPEX Reheating Furnace Efficiency | ecoreheating.com": 
        "Hiệu suất Lò nung lại Zero CAPEX | ecoreheating.com",
    "Zero CAPEX reheating furnace optimization. Reduce fuel consumption by 7-15% with CISA T80 verified technology and our Energy Steward model for guaranteed savings.": 
        "Tối ưu hóa lò nung lại Zero CAPEX. Giảm tiêu thụ nhiên liệu 7-15% với công nghệ được xác thực chuẩn CISA T80 và mô hình Quản gia năng lượng để đảm bảo tiết kiệm.",
}

# 路径配置
BASE_DIR = Path(r"E:\ai_coding\industrial-furnace-solutions\build\client")
VI_DIR = BASE_DIR / "vi"


def fix_paths_in_html(content, depth=1):
    """
    修复 HTML 中的资源路径
    depth=1: vi/ 目录（需要 ../ 前缀）
    """
    prefix = "../" * depth
    
    # 修复图片路径
    content = re.sub(r'src="\./', f'src="{prefix}', content)
    
    # 修复 CSS/JS 路径
    content = re.sub(r'href="\./', f'href="{prefix}', content)
    
    # 修复 video poster
    content = re.sub(r'poster="\./', f'poster="{prefix}', content)
    
    return content


def translate_content(content):
    """
    批量替换文本为越南语
    """
    for en, vi in TRANSLATIONS.items():
        content = content.replace(en, vi)
    
    return content


def update_meta_tags(content):
    """
    更新 meta 标签和语言属性
    """
    # 更新语言标签
    content = re.sub(r'<html lang="en">', '<html lang="vi">', content)
    
    # 更新 canonical URL
    content = re.sub(
        r'<link rel="canonical" href="https://www\.ecoreheating\.com/"',
        '<link rel="canonical" href="https://www.ecoreheating.com/vi/"',
        content
    )
    
    # 添加 hreflang 标签（如果不存在）
    if 'hreflang' not in content:
        hreflang_tags = '''
  <link rel="alternate" hreflang="en" href="https://www.ecoreheating.com/" />
  <link rel="alternate" hreflang="vi" href="https://www.ecoreheating.com/vi/" />
  <link rel="alternate" hreflang="x-default" href="https://www.ecoreheating.com/" />'''
        content = content.replace('</head>', f'{hreflang_tags}\n</head>')
    
    return content


def process_file(source_path, dest_path):
    """
    处理单个 HTML 文件
    """
    print(f"Processing: {source_path} -> {dest_path}")
    
    # 读取源文件
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 修复路径
    content = fix_paths_in_html(content, depth=1)
    
    # 2. 翻译内容
    content = translate_content(content)
    
    # 3. 更新 meta 标签
    content = update_meta_tags(content)
    
    # 确保目标目录存在
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 写入目标文件
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Completed: {dest_path}")


def main():
    """
    主函数
    """
    print("=" * 60)
    print("Vietnamese Translation Automation")
    print("=" * 60)
    
    if not BASE_DIR.exists():
        print(f"Error: Base directory not found: {BASE_DIR}")
        return
    
    # 要处理的页面列表
    pages = [
        "index.html",
        "about/index.html",
        "solutions/index.html",
        "hero-cases/index.html",
    ]
    
    for page in pages:
        source = BASE_DIR / page
        dest = VI_DIR / page
        
        if source.exists():
            process_file(source, dest)
        else:
            print(f"Warning: Source file not found: {source}")
    
    print("\n" + "=" * 60)
    print("Translation completed successfully!")
    print("=" * 60)
    print(f"\nOutput directory: {VI_DIR}")
    print("\nNext steps:")
    print("1. Review the translated files")
    print("2. Test navigation links")
    print("3. Verify resource paths")
    print("4. Deploy to production")


if __name__ == "__main__":
    main()
