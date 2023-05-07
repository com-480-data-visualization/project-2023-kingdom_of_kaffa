# Project of Data Visualization (COM-480)

| Student's name  | SCIPER |
| --------------- | ------ |
| Fan Nie         | 366936 |
| Yikai Zhang     | 366940 |
| Kamila Babayeva | 342448 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

View Our website at [Kingdom_of_kaffa](https://com-480-data-visualization.github.io/project-2023-kingdom_of_kaffa)

## Milestone 1

### Dataset

For our project we use 3 datasets: (1) scraped data from the website [Kofio](https://www.kofio.co/), (2) Kaggle [Coffee Dataset](https://www.kaggle.com/datasets/michals22/coffee-dataset), (3) collected data about [Coffee-Food-Pairing](https://www.homegrounds.co/coffee-food-pairing/).

**Kofio Dataset.** We scraped the necessary data from [Kofio](https://www.kofio.co/) because we couldn't find a suitable dataset that met our requirements regarding coffee flavors, brewing methods, and brands. Kofio offers a wide range of coffee products from various European brands. All of the coffee products on Kofio have the same set of information, as an example:

| Key              | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| Item Name:       | EASTER FILTER blend - Easter limited edition             |
| Roast Date:      | 27.03.2023 (8 days)                                      |
| Roastery:        | Square Mile                                              |
| Coffee Origin:   | Kenya specialty coffee Kenya, Peru specialty coffee Peru |
| Region:          | Kirinyaga                                                |
| Variety:         | Caturra                                                  |
| Roast Type:      | Filter                                                   |
| Process:         | Washed                                                   |
| Flavour Profile: | Apple blossom, Cherry pie                                |
| Roast Level:     | Light to Medium Light                                    |
| Brewing Method:  | French Press, Hario V60, Vacuum Pot                      |
| Rating:          | 4.4                                                      |
| Recommended:     | 93%                                                      |
| Price:           | 19,99                                                    |

Besides the above information listed in the form, each product also has a price, a rating, and a recommendation rate. We also crawled image for each product for later possible use. Although each coffee product has exactly the same set of keys, some of the values are missed, thus requiring missing value treatment. Besides, the Price variable should be of float type instead of string with comma, so we convert them to float. All of these(crawlers & data analysis) are done in Python.

**Coffee dataset.** We use the [Coffee Dataset](https://www.kaggle.com/datasets/michals22/coffee-dataset) to display the global production and consumption of coffee. This dataset provides information on the amount of coffee export, import and consumption by countries from 1990 to 2019.

<!-- During the analysis, we discovered that some of the values representing the number of kilograms were less than 0. This issue occurred due to an overflow error that occurred during some calculations. To resolve this issue, we used the original [Python notebooks](https://github.com/MSI17819/Coffee_data_analysis/blob/main/Coffee_codeimpro.ipynb) to fetch the data, perform the necessary calculations while taking into account the possibility of overflow, and saved the updated dataset. -->

**Pairing dataset.** We collected the data about how to pair coffee with data from [Homegrounds](https://www.homegrounds.co/coffee-food-pairing/) website. The dataset we collected has three columns: Coffee origin, Food and Flavor type. For example:

| Coffee origin | Food            | Flavor type |
| ------------- | --------------- | ----------- |
| Yemen         | Blueberries     | Fruity      |
| Columbia      | white chocolate | Chocolate   |

The dataset is clean and needn't to be preprocessed.

### Problematic

Originating from the mysterious land of the Kingdom of Kaffa in Eutopia, coffee has evolved into much more than a tasty and healthy beverage. It has transcended into a cultural symbol, a social ritual, a source of comfort, and a muse for inspiration. Across the globe, coffee shops have transformed into meeting places for friends, colleagues, and neighbors, fostering a sense of community. Additionally, coffee production is a significant economic driver in numerous societies, offering income and employment opportunities to small-scale farmers and large-scale plantations.

Recognizing coffee's prestige, our project Kingdom of Kaffa provides a comprehensive overview of coffee's impact, including its various origins, flavors, and brewing techniques. Our website also serves as a platform for users to find their ideal and real European coffee brand, facilitating their immersion into the coffee community. Our website caters to coffee enthusiasts and beginners, allowing everyone to find their perfect cup of coffee.

To meet the goals describe above, our website will roughly (might change sligthly overtime) contain the following visualizations:

**Figure 1:** This map-based visualization showcases the production and consumption levels of coffee at the country level over an extended period of time. This visualization allows users to examine the fluctuations in demand for coffee, the global distribution of coffee plantations, and the countries with the highest consumption rates.

**Figure 2:** This graph depicts the correlation between price, rating, and recommendation rates among a selection of European coffee brands. Each brand is visually distinguishable by unique colors, and users are afforded the option to adjust the x and y axis, allowing them to compare data points and make informed decisions based on their preferences.

**Figure 3:** This bubble-cluster visualization offers filtering functionalities based on four distinct indicators, namely flavor, brewing method, roast type, and roast level (subject to revision). Users are able to input their preferences for each indicator separately, and the figure will subsequently generate a filtered product that best conforms to their individual taste.

**Figure 4:** This pairing visulaization shows which types of food are recommended to be consumed with specific types of coffee, based on the origin/flavour of the coffee. The figure is structured in three columns, each of which corresponds to 'coffee origin', 'food', and 'flavor type'. The graph is interactive, allowing users to click on any bubble to establish connections with other relevant bubbles, represented by lines of the same color. Non-activating lines will be displayed in gray. Additionally, detailed and well-designed contents related to each bubble will be available upon clicking, offering users relevant information.

### Exploratory Data Analysis

In the section [Conda enviroment for EDA](#installation) you can find instructions to install conda environment to run our python notebooks with EDA.

#### Kofio dataset analysis

We will be using the Kofio dataset we scraped to create visualizations (Figure 2,3,4) about the typical coffee products. Detailed analysis can be found in the jupyter_notebook [kofio analysis](https://github.com/com-480-data-visualization/project-2023-kingdom_of_kaffa/blob/master/dataset_analysis/kofio_da.ipynb).

Kofio dataset contains 322 coffee products from 35+ brands. Each coffee product can be classified by Roast Level, Roast type, Brewing method and Flavour. In total, we gathered the following stats about each category:

```
There're 194 unique flavours: ['Flower honey', 'Black tea with lemon', 'Coke']...
There're 8 unique brewing methods: ['Vacuum Pot', 'Hario V60', 'Clever dripper', 'Espresso', 'Chemex', 'Moka pot', 'Aeropress', 'French Press']
There're 3 unique Roast Levels: ['Light to Medium Light', 'Medium to medium dark', 'Omni']
There're 3 unique Roast Types: ['Filter', 'Espresso', 'Omni']
```

In the figure below we display coffee product (each color and size depicts different brand) with respect to price/rate/recommendation. You can see that the price of a coffee brand is not always an indicator of its quality or popularity, other factors should be considered such as ratings and recommendations. Example, "yellow" brand is cheap but with a high rating while "light violet" are more expensive and average.

<img src="/dataset_analysis/images/brand_price_rating.jpg" alt="alt text"/>

#### Pairing dataset analysis

We analyze the pairing dataset using jupyter notebook [pairing_analysis](https://github.com/com-480-data-visualization/project-2023-kingdom_of_kaffa/blob/master/dataset_analysis/pairing_da.ipynb).

The dataset contains 83 entries and includes information on 25 different coffee origins, 23 different foods, and 8 different flavor types. We group the data by coffee origins and flavor types to see the origin-flavor, origin-food, food-flavor pairings.

The figure below presents a clear look at the origin-flavor pairings.

<img src="/dataset_analysis/images/pairing.png" alt="alt text" width="50%" height="50%" />

#### Coffee dataset analysis

We analyze the Coffee dataset using jupyter notebook [coffee_analysis](https://github.com/com-480-data-visualization/project-2023-kingdom_of_kaffa/blob/master/dataset_analysis/coffee_da.ipynb).

We use Coffee dataset to visualize a world map of coffee consumption and produstion (Figure 1). The dataset includes seven files about coffee import and export, but we focused on the following two files:

-   Coffee_total_consumption.csv - combination of Coffee_domestic_consumption.csv and Coffee_import_consumption.csv
-   Coffee_production.csv

We used the [geopandas](https://geopandas.org/en/stable/) library to create the map, but had to rename some country names in our dataset to match the library's names.

**Global production.**
This figure displays global coffee production rates for Arabica and Robusta coffee. Arabica and Robusta coffee types are produced in countries across Central and South America, Africa, and Asia, with some countries producing both. Brazil is the largest producer of both types, while Colombia and Côte d'Ivoire are the largest producers of Robusta and Arabica, respectively.
![Global production](dataset_analysis/images/global_production.jpg "Global production")

**Global consumption.**
The figure below suggests that coffee consumption is becoming increasingly popular around the world, but that the Americas may be the region with the highest demand for coffee.
![Global consumption](dataset_analysis/images/global_consumption.jpg "Global consumption")

<!-- To be continued -->

### Related work

Since the Kofio Dataset is scraped by us, nobody has done with this dataset. However, several works have conducted data analysis and visualization on the Coffee dataset.

-   [Coffee Economic EDA](https://www.kaggle.com/code/ayaabdalsalam/coffee-economic-eda) tabulates the total coffee consumption for 55 countries and subsequently displays the resulting data in a histogram format. The histogram portrays the consumption of each country in descending order. Besides, it analyzes the mean, median, and total consumption from 1990 to 2020 and the coffee type of each country.
-   [Coffee - Extensive EDA](https://www.kaggle.com/code/akhiljethwa/coffee-extensive-eda) examines different aspects of the Coffee dataset, such as global coffee production and consumption, the top coffee-producing countries, the different types of coffee produced, and the top coffee importers and exporters. The analysis also includes a comparison of coffee production and consumption trends over the years. The resultant data was subsequently represented using line and bar charts.
-   [Simple EDA](https://www.kaggle.com/code/sabinorsp/simple-eda-for-this-dataset/notebook), [Data Visualization of the Coffee Dataset](https://www.kaggle.com/code/aaronjones32/data-visualisation-of-the-coffee-dataset) produces a similar analysis as the work above.

<!-- * [Simple EDA](https://www.kaggle.com/code/sabinorsp/simple-eda-for-this-dataset/notebook) presents the visualizations of the top 10 coffee exporting and importing countries, along with the leading coffee producers and domestic consumers. Furthermore, it assesses the yearly coffee production of the key countries and employs a line chart to depict the trend.

* [Data Visualization of the Coffee Dataset](https://www.kaggle.com/code/aaronjones32/data-visualisation-of-the-coffee-dataset) delved into the top countries concerning coffee export, import, domestic consumption, and production, along with the coffee consumption trends of the importing nations. The resultant data was subsequently represented using line charts, spanning the timeline from 1990 to 2020. -->

Our approach is original due to the following aspects:

-   We present coffee consumption and import/export volume trends across regions and their temporal evolution. This enables the display of increasing coffee popularity by year and helps identify the regions with the highest affinity for coffee.
-   We analyze the existing coffee brands and consider the rich coffee flavors.
-   Our visualization can help visitors to buy an existing coffee they love using the filtering function.
-   We show clearly how to pair coffee to food and to flavor.

Also, several great visualizations from other topics have inspired us to come up with our ideas.

-   [Covid-19 in Switzerland](https://com-480-data-visualization.github.io/com-480-project-lcelo/website/). The SWITZERLAND MAP visualization inspired us to come up with our Figure 1. We want to visualize the change of coffee consumption, import volume and export volumn according to years and countries in a way which shows the growing popularity of coffee.
-   [Wine101](https://com-480-data-visualization.github.io/com-480-project-onvagagner/website/index.html). The cluster visualization inspired us to show clusters based on flavor, brewing method, and roast level.
-   [Coffee Flavor Wheel](https://www.webstaurantstore.com/blog/3824/coffee-pairings.html). This coffee flavor wheel inspired us to show the coffee-flavor, coffee-food or flavor-food pairings.

### Conda enviroment for EDA <a id="installation"></a>

1. Update conda packages:

```
conda update --all
```

2. Create a conda environment from the provided yml file. It might take a couple of minutes.

```
conda env create --file=com480-kaffa.yml
```

3. Activate the conda environment in your Code Editor. In VS code, choose **com480-kaffa** kernel in the python notebook. If it does not appear in the list of kernels after step 2, restart VS.

## Milestone 2

### Project Overview

In this section, we'll go into detail about the **design and purpose** of our 4 visualizations. Sketches of each visualization will be displayed to give a general idea of our final result.

#### Viz 1

#### Viz 2

#### Viz 3

Our bubble figure offers a magical filtering experience based on four distinct indicators: **Price**, **Flavor**, **Brewing Method**, and **Roast Method**. These mystical indicators were chosen not only because they are highly separable, but also because they are key factors that matter when selecting the perfect coffee product.

Behold! The screenshot of our draft version is shown below, and let us guide you through the enchanted functions our website offers 😆😆!!! Each circle represents a unique coffee product, and for each indicator, there's a **clickable button**. With each click, the colors of the circles transform according to the indicator's whimsical power!

But wait, there's more magic to be had! **Each circle itself is also enchanted and clickable**. This figure serves as a fancy filter for our users, and with each click of a specific color, only the circles that match the indicator's properties are left behind. In this way, users can continuously choose indicators and discover their perfect, fantastical coffee product!

You may be wondering where to know the details about you liked products, the right half is reserved for it! On the right hand side, the details about each coffee product will be introduced in detail.

<img src="imgs/fig3.png" alt="alt text" width="75%" height="50%" />

#### Viz 4

### Tools Requirement

**Page Structure**: For structuring our project pages, we use _[**fullpage.js**](https://alvarotrigo.com/fullPage/),_ which provides smooth and pretty switches among pages.

**Theme Colors:** We mainly resort to **_Lecture 6_** for choosing a group of theme colors for our website.

**Data Preparation**: To prepare the data to visualize in a proper format, we use **_Pandas_** library to do the data cleaning part, which includes dealing with missing fields, deserting unwanted fields, and storing in CSV files. After that, **_d3.js_** is used to load the data from CSV files to the Javascript dictionary. **_Lecture 4_** is needed for the data loading part.

**Data Visualization**: We mainly use **_d3.js_** for data visualization, detailed operations include data point demonstration and interaction design. **_Lecture 4_** and **_Lecture 5_** are mainly required for **_d3.js_**-related knowledge.

**Story Telling**: To improve our storytelling for this project, we plan to polish our text information according to **_Lecture 12_**.

### Project Break Down

In this section, we describe the core visualization we'd love to demonstrate and extra ideas which we believe can enhance the visualization first, and then the whole project is broken down into independent pieces to make it more manageable.

#### Core Visualization

Since our ultimate purpose is to guide our users through a smooth journey on coffee product selection, our visualization will be revolved around **Viz 2** and **Viz 3**, which demonstrates clearly how each brand compares with each other in price, recommendation rate, and ratings. Sophisticated design and storytelling will be needed to make sure the best user experience.

#### Extra Ideas

**Viz 1** is a mesmerizing map that will transport you to a world of wonder and coffee bliss. With a wave of your hand, you can explore the global rise in coffee consumption and marvel at the countless coffee aficionados scattered across the globe. But beware, for once you start playing with this enchanting **Viz**, you might never want to leave its captivating embrace.

Prepare to be dazzled by **Viz 4**, the ultimate reward for your coffee quest. With your selection of the finest coffee products complete, it's time to indulge in some well-deserved magic. This dazzling figure features an interactive pairing map that will take you on a journey of flavors and foods, carefully crafted to match the coffee of your dreams. So before you even lay your hands on your precious coffee, take a moment to let your imagination soar and envision the wondrous culinary creations that await you!

Again, we would try our best to implement the fanciest interactive effects and write the most charming stories! These would be both extra ideas.

#### Project Break Down

-   **Website Design**

    -   Website Structuring

        -   Navigation Bar
        -   Switching among Pages

    -   Theme Color Selection
        -   Choose the most appropriate color groups for the whole project

-   **Core Visualization Implementation**

    -   Data Preparation

        -   Data cleaning for each visualization (deserting unwanted fields and storing in CSV files)

    -   Basic Visualization
        -   Load the data from processed CSV files and write functions to read them to Javascript correctly
        -   Implement static visualization using d3.js
    -   Text Demonstration
        -   Design text descriptions about each visualization
        -   Organize them properly on the page

-   **Interaction Design & Polish Storytelling**
    -   Learn necessary libraries and d3.js syntax to enable the design of nice interactive visualizations
    -   Learn lecture 12 and try to improve storytelling for our website

## Milestone 3

**80% of the final grade**

## Late policy

-   < 24h: 80% of the grade for the milestone
-   < 48h: 70% of the grade for the milestone
