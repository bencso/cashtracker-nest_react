import json

keys = set()
with open("Open Food Facts Products.jsonl", "r") as f:
    for i, line in enumerate(f):
        if i >= 1000:
            break
        obj = json.loads(line)
        keys.update(obj.keys())

print(keys)
