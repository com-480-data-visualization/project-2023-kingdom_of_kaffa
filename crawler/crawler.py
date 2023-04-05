from lxml import etree
import requests
import csv
from collections import OrderedDict


def get_nodes(url, headers, xpath):
    page = requests.get(url=url, headers=headers)
    tree = etree.HTML(page.text)
    return tree.xpath(xpath)


if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
    }
    brand_lst = ['https://www.kofio.co/naughty-dog', 'https://www.kofio.co/candycane-coffee', 'https://www.kofio.co/dak-coffee-roasters', 'https://www.kofio.co/hayb', 'https://www.kofio.co/fathers-coffee', 'https://www.kofio.co/industra-coffee', 'https://www.kofio.co/barn', 'https://www.kofio.co/square-mile', 'https://www.kofio.co/gardelli', 'https://www.kofio.co/diamonds-roastery', 'https://www.kofio.co/beansmiths', 'https://www.kofio.co/dark-woods-coffee', 'https://www.kofio.co/main-lane-coffee-roasters', 'https://www.kofio.co/kmen-coffee-roasters', 'https://www.kofio.co/mima-coffee-roastery', 'https://www.kofio.co/nordbeans', 'https://www.kofio.co/good-beans',
                 'https://www.kofio.co/concept-coffee-roasters', 'https://www.kofio.co/morgon-coffee-roasters', 'https://www.kofio.co/19-grams', 'https://www.kofio.co/3fe', 'https://www.kofio.co/beberry-coffee', 'https://www.kofio.co/birdsong-coffee', 'https://www.kofio.co/caravan-coffee-roasters', 'https://www.kofio.co/coffea-circulor', 'https://www.kofio.co/colonna-coffee', 'https://www.kofio.co/dos-mundos', 'https://www.kofio.co/doubleshot', 'https://www.kofio.co/fiftybeans', 'https://www.kofio.co/friedhats', 'https://www.kofio.co/goat-story', 'https://www.kofio.co/mlsnacava', 'https://www.kofio.co/pikola', 'https://www.kofio.co/rebelbean', 'https://www.kofio.co/coffee-collective', 'https://www.kofio.co/timwendelboe']
    # Fetched all unique keys
    unique_attributes = ['Item Name', 'Roastery', 'Roast Level', 'Region', 'Flavour Profile',
                         'Roast Type', 'Process', 'Variety', 'Brewing Method', 'Coffee Origin', 'Rating', 'Recommended', 'Price']

    with open('./data/kofio_dataset.csv', 'w') as tsvfile:
        tsv_writer = csv.DictWriter(tsvfile, delimiter='\t', fieldnames=unique_attributes)
        tsv_writer.writeheader()

        for brand in brand_lst:
            coffee_lst = get_nodes(
                brand, headers, '//*[@id="front_temp"]/div/div[3]/div/div/div/div/div/div/div/div')

            for coffee in coffee_lst:
                path = coffee.xpath('./div/div[2]/h3/a/@href')
                if path:
                    print(f'Coffe link: {path[0]}')
                    t_body = get_nodes(
                        path[0], headers, "//*[@id=\"p_tab_0\"]/div/div/div[1]/div/table")[0]
                    
                    # Fill dict with key-values. None if the value foes not exist.
                    coffee_data = OrderedDict.fromkeys(unique_attributes, None)
                    for tr in t_body:
                        name = tr.xpath('.//td[@class="weight-700 hidden-xs"]/text()')[0]
                        values = tr.xpath('.//td/a/text()')
                        if values:
                            coffee_data[name] = ",".join(val for val in values if val).strip()

                    full_body = get_nodes(path[0], headers, "/html")[0]
                    div_body = get_nodes(path[0], headers, "//*[@id=\"p_tab_1\"]/div/div/div[1]/div/div")
                    coffee_data['Item Name'] = full_body.xpath("//*[@id=\"front_temp\"]/div[1]/div[2]/div/div[1]/h1/text()")[0]
                    price = full_body.xpath("///*[@id=\"addToCart\"]/div[2]/strong/text()")
                    coffee_data['Price'] = price[0].strip()[:-2] if price else None
                    coffee_data['Rating'] = div_body[0].xpath('./div[2]/text()')[0].strip() if len(div_body)==2 else None
                    coffee_data['Recommended'] = div_body[1].xpath('./div[2]/text()')[0].strip() if len(div_body)==2 else None
                    print(f'Coffe data: {coffee_data}')
                    tsv_writer.writerow(coffee_data)