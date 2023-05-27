import json
f1 = open("kofio_dataset/kofio_brand_dataset.json")
f2 = open("kofio_dataset/price_rating_rec_clean.json")
brand_data = json.load(f1)
data = json.load(f2)

t = True
for d in data:
    t = True

    for b in brand_data:
        if d["Roastery"] == b["Brand"]:
            d.update(b)
            t = False

            break

data = json.dumps(data)
    
with open("brand_coffee_combined.json", "w") as outfile:
    outfile.write(data)