import json

with open('../equipments_img_collections.json', 'r') as f:
    my_dict = json.load(f)

sum = 0;
for x, y in my_dict.items():
    sum += len(y)
print(sum)