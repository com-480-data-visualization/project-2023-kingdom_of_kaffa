from lxml import etree
import requests
import json


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

    with open('../dataset/kofio_dataset/kofio_brand_dataset.json', 'w') as jsonfile:
        # tsv_writer = csv.DictWriter(tsvfile, delimiter='\t', fieldnames=unique_attributes)
        # tsv_writer.writeheader()

        data = []
        for brand in brand_lst:
            brand_data = {}
        
            brand_name_element = get_nodes(brand, headers, '//*[@id="t_navigator"]/h1')
            if brand_name_element:
                brand_name_element = brand_name_element[0].text.strip()
            brand_data["Brand"] = brand_name_element

            coffee_count_element = get_nodes(brand, headers, '//*[@id="front_temp"]/div/div[2]/div/ul/li[1]/a/small')
            if coffee_count_element:
                coffee_count_element = coffee_count_element[0].text.strip()
            brand_data["Coffee count"] = coffee_count_element
            
            review_count_element = get_nodes(brand+"/coffee-reviews", headers, '//*[@id="front_temp"]/div/div[3]/div/div/div/div/div[1]/div/div[1]/div[2]/text()')
            if review_count_element:
                review_count_element = review_count_element[0].strip()
            brand_data["Review"] = review_count_element
            
            recommended_count_element = get_nodes(brand+"/coffee-reviews", headers, '//*[@id="front_temp"]/div/div[3]/div/div/div/div/div[1]/div/div[3]/div[2]')
            if recommended_count_element:
                recommended_count_element = recommended_count_element[0].text.strip()
            brand_data["Recommended"] = recommended_count_element

            data.append(brand_data)
        jsonfile.write(json.dumps(data))