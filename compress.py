#!/usr/bin/env python3
"""
图片批量压缩脚本 — 目标 50KB
用法：python3 compress.py <输入目录> <输出目录>
示例：python3 compress.py ./原始图片 ./压缩后
"""

import sys
import os
from PIL import Image

MAX_SIZE = 1024          # 长边最大像素
TARGET_KB = 50           # 目标文件大小
MIN_QUALITY = 40         # 最低质量（再低就糊了）


def compress_to_target(input_path, output_path):
    img = Image.open(input_path)

    if img.mode == 'RGBA':
        img = img.convert('RGB')

    # 等比缩放
    w, h = img.size
    if max(w, h) > MAX_SIZE:
        ratio = MAX_SIZE / max(w, h)
        img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)

    out = os.path.splitext(output_path)[0] + '.webp'
    target_bytes = TARGET_KB * 1024

    # 已经够小，直接存
    img.save(out, 'WEBP', quality=90)
    if os.path.getsize(out) <= target_bytes:
        return out, 90, os.path.getsize(out)

    # 二分法找最佳质量
    lo, hi = MIN_QUALITY, 90
    best_quality = lo

    while lo <= hi:
        mid = (lo + hi) // 2
        img.save(out, 'WEBP', quality=mid)
        size = os.path.getsize(out)

        if size <= target_bytes:
            best_quality = mid
            lo = mid + 1
        else:
            hi = mid - 1

    # 最低质量还超标，继续缩分辨率
    img.save(out, 'WEBP', quality=best_quality)
    while os.path.getsize(out) > target_bytes and MAX_SIZE > 480:
        w, h = img.size
        ratio = 0.8
        img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        img.save(out, 'WEBP', quality=best_quality)

    return out, best_quality, os.path.getsize(out)


def main():
    if len(sys.argv) < 3:
        print("用法：python3 compress.py <输入目录> <输出目录>")
        sys.exit(1)

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]

    if not os.path.isdir(input_dir):
        print(f"输入目录不存在：{input_dir}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    exts = {'.png', '.jpg', '.jpeg', '.webp', '.bmp'}
    files = [f for f in os.listdir(input_dir) if os.path.splitext(f)[1].lower() in exts]

    if not files:
        print("输入目录中没有找到图片")
        sys.exit(0)

    print(f"找到 {len(files)} 张图片，目标 {TARGET_KB}KB，开始压缩...\n")

    for i, f in enumerate(files, 1):
        inp = os.path.join(input_dir, f)
        try:
            result, quality, new_bytes = compress_to_target(inp, os.path.join(output_dir, f))
            orig_kb = os.path.getsize(inp) / 1024
            new_kb = new_bytes / 1024
            ratio = (1 - new_kb / orig_kb) * 100
            print(f"[{i}/{len(files)}] {os.path.basename(result)}  "
                  f"{orig_kb:.0f}KB -> {new_kb:.0f}KB (q={quality}, 省 {ratio:.0f}%)")
        except Exception as e:
            print(f"[{i}/{len(files)}] {f} 失败：{e}")

    print(f"\n完成，输出目录：{output_dir}")


if __name__ == '__main__':
    main()
