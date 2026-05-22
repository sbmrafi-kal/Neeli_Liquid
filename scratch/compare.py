import os
import math
from PIL import Image

ref_path = '/Users/rafi/Documents/Neeli_Shopify_Liquid/ref'

def get_downsampled_pixels(img_path, size=(16, 16)):
    try:
        img = Image.open(img_path).convert('RGB')
        img_resized = img.resize(size)
        return list(img_resized.getdata())
    except Exception as e:
        print(f"Error reading {img_path}: {e}")
        return None

def compute_mse(pixels1, pixels2):
    if not pixels1 or not pixels2 or len(pixels1) != len(pixels2):
        return float('inf')
    
    total_sq_diff = 0.0
    for p1, p2 in zip(pixels1, pixels2):
        diff_r = p1[0] - p2[0]
        diff_g = p1[1] - p2[1]
        diff_b = p1[2] - p2[2]
        total_sq_diff += (diff_r**2 + diff_g**2 + diff_b**2)
        
    return total_sq_diff / (len(pixels1) * 3)

current_images = sorted([f for f in os.listdir(ref_path) if f.startswith('current_') and f.endswith('.png')])
org_images = sorted([f for f in os.listdir(ref_path) if f.startswith('org_') and f.endswith('.png')])

# Pre-load downsampled pixels
current_pixels = {f: get_downsampled_pixels(os.path.join(ref_path, f)) for f in current_images}
org_pixels = {f: get_downsampled_pixels(os.path.join(ref_path, f)) for f in org_images}

print("Mapping Current Images to Org Images based on downsampled MSE:")
for cur in current_images:
    pix_cur = current_pixels[cur]
    if pix_cur is None:
        continue
    
    scores = []
    for org in org_images:
        pix_org = org_pixels[org]
        if pix_org is None:
            continue
        mse = compute_mse(pix_cur, pix_org)
        scores.append((org, mse))
        
    scores.sort(key=lambda x: x[1])
    
    print(f"\n{cur}:")
    for org, mse in scores[:3]:
        print(f"  -> {org}: MSE={mse:.1f}")
