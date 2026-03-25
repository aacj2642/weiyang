import os
import tempfile
import shutil
from PIL import Image

def optimize_jpgs(folder_path):
    count = 0
    saved_bytes = 0
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                temp_path = None
                try:
                    original_size = os.path.getsize(file_path)
                    
                    # Create a temporary file
                    fd, temp_path = tempfile.mkstemp(suffix='.jpg')
                    os.close(fd)
                    
                    with Image.open(file_path) as img:
                        exif = img.info.get('exif')
                        kwargs = {'optimize': True}
                        if exif:
                            kwargs['exif'] = exif
                        
                        # Set dpi if present
                        if 'dpi' in img.info:
                            kwargs['dpi'] = img.info['dpi']
                            
                        resized = False
                        if img.width > 1500 or img.height > 1500:
                            resample_filter = Image.Resampling.LANCZOS if hasattr(Image, 'Resampling') else Image.LANCZOS
                            img.thumbnail((1500, 1500), resample_filter)
                            resized = True
                            
                        # Try to use quality='keep' to preserve identical quantization tables
                        try:
                            img.save(temp_path, 'JPEG', quality='keep', **kwargs)
                        except Exception:
                            # Pillow version < 9.4.0 or missing qtables
                            img.save(temp_path, 'JPEG', subsampling='keep', quality=100, **kwargs)
                    
                    new_size = os.path.getsize(temp_path)
                    
                    # Only replace if we actually saved space or it was resized
                    if new_size < original_size or resized:
                        saved = original_size - new_size
                        if saved >= 0:
                            saved_bytes += saved
                            print(f"Optimized: [{file}] Saved {saved/1024:.2f} KB ({(saved/original_size)*100:.1f}%)" + (" (Resized to max 1500px)" if resized else ""))
                        else:
                            print(f"Optimized: [{file}] Resized to max 1500px, size increased by {-saved/1024:.2f} KB")
                            saved_bytes += saved
                        shutil.move(temp_path, file_path)
                        count += 1
                    else:
                        os.remove(temp_path)
                        
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    if temp_path and os.path.exists(temp_path):
                        try:
                            os.remove(temp_path)
                        except:
                            pass
                    
    print(f"Successfully optimized {count} files.")
    print(f"Total space saved: {saved_bytes/1024/1024:.2f} MB")

if __name__ == "__main__":
    public_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
    if os.path.exists(public_dir):
        print(f"Scanning and optimizing JPGs in {public_dir}...")
        optimize_jpgs(public_dir)
    else:
        print(f"Directory not found: {public_dir}")
