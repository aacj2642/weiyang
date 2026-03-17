import os
import re

def find_unused_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    template_match = re.search(r'<template>(.*?)</template>', content, re.DOTALL)
    style_match = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    
    if not style_match or not template_match:
        return []
    
    template = template_match.group(1)
    style = style_match.group(1)
    
    # Simple regex to find class selectors in CSS
    classes_in_style = set(re.findall(r'\.([a-zA-Z0-9_\-]+)', style))
    
    # Find all class bindings and regular classes
    class_attrs = re.findall(r'\bclass(?:Name)?="([^"]+)"', template)
    dynamic_class_attrs = re.findall(r':class(?:Name)?="([^"]+)"', template)
    
    all_used_classes = set()
    for c in class_attrs:
        all_used_classes.update(c.split())
        
    for c in dynamic_class_attrs:
        all_used_classes.update(re.findall(r"'([a-zA-Z0-9_\-]+)'", c))
        all_used_classes.update(re.findall(r'"([a-zA-Z0-9_\-]+)"', c))
        all_used_classes.update(re.findall(r'([a-zA-Z0-9_\-]+)\s*:', c))

    unused = []
    # Avoid pseudo classes or standard css things that look like classes if not relevant, but let's just match them.
    for c in classes_in_style:
        if c not in all_used_classes:
            unused.append(c)
            
    return unused

def main():
    src_dir = r"e:\Projects\web\weiyang\src"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.vue'):
                path = os.path.join(root, file)
                unused = find_unused_css(path)
                if unused:
                    print(f"{file}: {unused}")

if __name__ == "__main__":
    main()
