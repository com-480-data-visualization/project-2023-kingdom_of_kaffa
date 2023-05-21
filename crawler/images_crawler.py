import requests
from bs4 import BeautifulSoup
import urllib.request

# Send a GET request to the webpage
url = "https://www.kofio.co/coffee-roasters"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Find all <img> tags on the webpage
image_tags = soup.find_all('img')

# Specify the folder where you want to save the images
save_folder = "images/"

# Loop through the image tags and download each image
for img in image_tags:
    img_url = img['src']
    img_name = img_url.split("/")[-1]
    save_path = save_folder + img_name
    urllib.request.urlretrieve(img_url, save_path)
    print(f"Downloaded: {img_name}")