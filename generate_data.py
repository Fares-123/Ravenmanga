import os
import json

manga_dir = "./manga"
output_file = os.path.join(manga_dir, "data.json")

works = []

for work_name in os.listdir(manga_dir):
    work_path = os.path.join(manga_dir, work_name)
    if os.path.isdir(work_path):
        info_path = os.path.join(work_path, "info.json")
        if os.path.isfile(info_path):
            with open(info_path, "r", encoding="utf-8") as f:
                info = json.load(f)
                works.append(info)

data = {"works": works}

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated {output_file} with {len(works)} works.")
