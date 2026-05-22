import fitz

doc = fitz.open('org.pdf')
print("org.pdf page count:", len(doc))
for i in range(len(doc)):
    page = doc[i]
    il = page.get_images()
    dl = page.get_drawings()
    print(f"Page {i+1}: Images count: {len(il)}, Drawings count: {len(dl)}")

doc_cur = fitz.open('current.pdf')
print("current.pdf page count:", len(doc_cur))
for i in range(len(doc_cur)):
    page = doc_cur[i]
    il = page.get_images()
    dl = page.get_drawings()
    print(f"Page {i+1}: Images count: {len(il)}, Drawings count: {len(dl)}")
