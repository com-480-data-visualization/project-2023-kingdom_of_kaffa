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
