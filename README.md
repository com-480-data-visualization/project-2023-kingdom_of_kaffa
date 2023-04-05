# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Fan Nie | 366936 |
| Yikai Zhang | 366940 |
| Kamila Babayeva| 342448 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.

### Dataset

For our project we use two datasets: (1) scraped data from the website [Kofio](https://www.kofio.co/), (2) Kaggle [Coffee Dataset](https://www.kaggle.com/datasets/michals22/coffee-dataset).

**Kofio Dataset.** We scraped the necessary data from [Kofio](https://www.kofio.co/) because we couldn't find a suitable dataset that met our requirements regarding coffee flavors, brewing methods, and brands. Kofio offers a wide range of coffee products from various European brands. All of the coffee products on Kofio have the same set of information, as an example:

<!-- TODO: add price and rating? -->

| Key | Value |
| --- | --- |
| Item Name: | EASTER FILTER blend - Easter limited edition |
| Roast Date: | 27.03.2023 (8 days) |
| Roastery: | Square Mile |
| Coffee Origin: | Kenya specialty coffee Kenya, Peru specialty coffee Peru |
| Region: | Kirinyaga |
| Variety: | Caturra |
| Roast Type: | Filter |
| Process: | Washed |
| Flavour Profile: | Apple blossom, Cherry pie |
| Roast Level: | Light to Medium Light |
| Brewing Method: | French Press, Hario V60, Vacuum Pot |
| Rating: | 4.4 |
| Recommended: | 93% |
| Price: | 19,99 |

Since each coffee product has exactly the same keys, no other preprocessing nor cleaning is required.

**Coffee dataset.** We use the [Coffee Dataset](https://www.kaggle.com/datasets/michals22/coffee-dataset) to display the global import and export of coffee. This dataset provides information on the amount of coffee exported and imported by countries from 1990 to 2019.During the analysis, we discovered that some of the values representing the number of kilograms were less than 0. This issue occurred due to an overflow error that occurred during some calculations. To resolve this issue, we used the original [Python notebooks](https://github.com/MSI17819/Coffee_data_analysis/blob/main/Coffee_codeimpro.ipynb) to fetch the data, perform the necessary calculations while taking into account the possibility of overflow, and saved the updated dataset.

### Problematic
Originating from the mysterious land of the Kingdom of Kaffa in Eutopia, coffee has evolved into much more than a tasty and healthy beverage. It has transcended into a cultural symbol, a social ritual, a source of comfort, and a muse for inspiration. Across the globe, coffee shops have transformed into meeting places for friends, colleagues, and neighbors, fostering a sense of community. Additionally, coffee production is a significant economic driver in numerous societies, offering income and employment opportunities to small-scale farmers and large-scale plantations. 

Recognizing coffee's prestige, our project Kingdom of Kaffa provides a comprehensive overview of coffee's impact, including its various origins, flavors, and brewing techniques. Our website also serves as a platform for users to find their ideal and real European coffee brand, facilitating their immersion into the coffee community. Our website caters to coffee enthusiasts and beginners, allowing everyone to find their perfect cup of coffee.

To meet the goals describe above, our website will roughly (might change sligthly overtime) contain the following visualizations:

**Figure 1:** This map displays the import and export levels of coffee on a country level over the years. Through this visualization, users can see how the demand for coffee has changed, the global distribution of coffee plantations, and the countries with the highest consumption rates.

**Figure 2:** This graph illustrates the prices and ratings of various European coffee brands. Users can easily compare the data and select the best brand according to their preferences.

**Figure 3:** This bubble-cluster visualization provides filtering options based on flavor, brewing method, and roast level. Users can input their preferences, and the visualization will output the coffee that best aligns with their taste.


<!-- > Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience. -->


### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

Since the Kofio Dataset is scraped by us, nobody has done with this dataset. However, several works have conducted data analysis and visualization on the coffee dataset.
* [Coffee Economic EDA](https://www.kaggle.com/code/ayaabdalsalam/coffee-economic-eda) tabulates the total coffee consumption for 55 countries and subsequently displays the resulting data in a histogram format. The histogram portrays the consumption of each country in a descending order. Besides, it analyzes the mean, median and total consumption from 1990 to 2020 and the coffee type of each country.
* [Simple EDA](https://www.kaggle.com/code/sabinorsp/simple-eda-for-this-dataset/notebook) presents the visualizations of the top 10 coffee exporting and importing countries, along with the leading coffee producers and domestic consumers. Furthermore, it assesses the yearly coffee production of the key countries and employs a line chart to depict the trend.
* [Data Visualization of the Coffee Dataset](https://www.kaggle.com/code/aaronjones32/data-visualisation-of-the-coffee-dataset) delved into the top countries concerning coffee export, import, domestic consumption, and production, along with the coffee consumption trends of the importing nations. The resultant data was subsequently represented using line charts, spanning the timeline from 1990 to 2020.

Our approach is original due to the following aspects:
* We analyze the existing coffee brands and consider the rich coffee flavours.
* Our visualisation can help visitors to buy an existing coffee they love.

Also, several great visualizations from other topics have inspired us to come up with our ideas.
* [Covid-19 in Switzerland](https://com-480-data-visualization.github.io/com-480-project-lcelo/website/) The SWITZERLAND MAP visualization inspired us to come up with our Figure 1. We want to visualize the change of coffee consumption, import volume and export volumn according to years and countries in a way which shows the growing popularity of coffee.
* [Wine101](https://com-480-data-visualization.github.io/com-480-project-onvagagner/website/index.html) The cluster visualization inspired us to show clusters based on flavor, brewing method, and roast level.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

