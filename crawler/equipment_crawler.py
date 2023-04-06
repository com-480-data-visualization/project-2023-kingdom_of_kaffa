from lxml import etree
from collections import defaultdict
import json
import requests
import os


headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
}

def crawl_links(url, tags):
    '''Recursively crawl the links using depth-first search, when coming to the item page, crawl the items and return'''
    response = requests.get(url, headers=headers)
    html = response.content
    tree = etree.HTML(html)

    link_page = tree.xpath('//div[@class="category_tree"]/div[@class="category_sub_tabs acc_category_sub_tabs"]/div[@class="row"]')
    if not link_page:
        # no more pages, crawl the best-seller items!
        crawl_pictures(url, tags)
        return

    links = link_page[0].xpath('.//a/@href')
    for link in links:
        # Create folder with link name, truncate the folder name in case it went too long
        new_class = link.split("/")[-1]
        tags.append(new_class)
        # Recursively crawl links
        crawl_links(link, tags)
        tags.pop()

def crawl_pictures(url, tags):
    '''Crawl all the best-seller items'''
    response = requests.get(url, headers=headers)
    html = response.content
    tree = etree.HTML(html)

    items = tree.xpath('//div[@class="accessories_category"]/div[@class="category_bestsellers"]/table')
    if not items:
        print(items)
        return
    else:
        for item in items:
            img_url = item.xpath('.//img/@src')[0]
            img_name = item.xpath('.//td[@class="bestseller_title"]/a/text()')[0].split("/")[-1].strip() + ".jpg"
            img_collections[" ".join(tags)][img_name] = img_url

if __name__ == "__main__":
    img_collections = defaultdict(dict)
    root_url = "https://www.kofio.co/coffee-equipment/alternative-coffee-brewing"
    crawl_links(root_url, [])
    with open('equipments_img_collections.json', 'w') as f:
        json.dump(img_collections, f)
