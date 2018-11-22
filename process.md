# CS 5890 Data Visualization, Fall 2018
## Final Project Proposal
##### Basic Info
_Project Title:_
 
 Visualizing Life Expectancy by Country since 1800
  
_Group Members:_
  
  Gregory Alan Henderson, gahendersonjr@gmail.com
  
  Todd Vawdrey, todd.vawdrey@gmail.com

##### Background and Motivation
In this project, we aim to visualize life expectancy data using maps in order to get a better understanding of regional trends in life expectancy over the years. It is expected that the visualization will provide a general outline of how life expectancy has increased over the years in different parts of the world.

##### Project Objectives
The objective of this project is to provide viewers with a quick, interactive visualization that will show how life expectancy has changed over the years. We also aim to have drill-down functionality so we can get a clearer story by clicking on a country of a map for a given year.

##### Data
The data for this project comes from gapminder, an online service that generates simple visualizations for basic demographic data. Gapminder provides all of the data from their visualization for external use. The life expectancy data we will be using is the data used in the example here.

The data is a combination of available datasets with trends/guesstimations present where no data was available. The data also contains any info about evens for countries on a given year that may help give a historical context for the data. The main window of our visualization in 1800-present, but more information may be provided as outlined in the optional features.

We will be using similarly sourced data from gapminder to gather economic indicators to juxtapose against the life expectancy data as outlined below.

##### Data Processing
The data is provided by gapminder on their website in excel spreadsheet form. We will be parsing this into data objects for a given country and year. Each of these will be stored in a year object for each given year. Depending on what year is selected on the slider, the relevant year object will be loaded.


##### Visualization Design
The main focal point of our design with be two maps with a slider. The slider with have all applicable years for the data and the data on the map with respond to the value selected on the year slider.  The first map will show the life expectancy per country on the selected year using saturation of a common color. The second map will show whether the value in the previous map is trending upwards or downwards using hue and the severity of the change by saturation. Clicking on a country will provide extra context for the country in that year by showing a line chart juxtaposing the life expectancy with economic data as well as listing the year, the actual values for life expectancy and trend and any events that were happening in that country for that  year.

For this project we have chosen to use the standard projections for the maps as the geographical size does not matter for the data since we are showing average trends. The geographical regions may provide input, so it has been determined the best projection is what people are used to.

We thought about doing this with some sort of superimposed map but couldn’t think of a way for that to work without being too messy so we are going with the two map layout to tell the whole story is a good way.

##### Must-Have Features
- Year slider (1800-)
- Two world map visualizations. 
  - One map showing absolute life expectancy by country for selected year by saturation.
  - One map showing percent change per country. Increase will be blue and decrease will be red. Saturation for the red and blue will be used to portray steepness of increase/decline. No change due to guessistamate data remaining gray.
- Clicking country on either map shows side panel with the following information:
  - Year
  - Country
  - Life expectancy
  - Data Quality (trend, guesstimate, data)
  - Any events relevant to the year and wiki links (if applicable)
  - Line chart juxtaposing life expectancy data for that year with economic indicator such as income (exact data undecided).
Hovering and clicking animations with countries on maps.

##### Optional Features
- Checkbox to toggle year range
  - Default to 1800-2018
  - Show future projections where available
  - Show earlier than 1900 where data available
- Have dropdown on sidebar visualization to select a number of different indicators for the bar chart to compare with
- Have some visual indication on map of trend/guesstimate values vs. data.
- Have some visual indication on map on countries where there is an event for the given year.
- “Play” functionality that will show the data progress automatically from start t0 finish.
##### Project Schedule
_November 12_

 Basic infrastructure in place. Data is parsed maps are showing, year slider is implemented and clicking calls relevant function with relevant data to populate sidebar.
 
_November 19_

Prototype done. All required functionality present but not refined and beautified.


_November 20_

As many optional features as feasible done, main feature made beautiful and any bugs fixed.

##### Proposal images 
*High Level View*
![High Level View](https://github.com/gahendersonjr/dataVisProject/blob/master/images/overview.jpg)

*Absolute Life Expectancy*
![Absolute Life Expectancy](https://github.com/gahendersonjr/dataVisProject/blob/master/images/lifeExpectancyMap.jpg)

*Percent Change Life Expectancy*
![Percent Change Life Expectancy](https://github.com/gahendersonjr/dataVisProject/blob/master/images/changeMap.jpg)

*Country/Year Drilldown*
![High Level View](https://github.com/gahendersonjr/dataVisProject/blob/master/images/drilldown.jpg)

*Default Slider*
![High Level View](https://github.com/gahendersonjr/dataVisProject/blob/master/images/barplain.jpg)

*Optional Slider*
![High Level View](https://github.com/gahendersonjr/dataVisProject/blob/master/images/optionalBar.jpg)

## Prototype (due 11/21/2018)
##### Data
We are primarily using two data structures in our project. The main one is the life expectancy data. This data is provided in excel spreadsheet form but it was converted to csv. We have seperated our data into objects that include all the years and their respective life expectancy by country and by continent. Each of theses are loaded into arrays to be access by the javascript. The country data is the main display but the continent average data will be used as a baseline in some of our images. Some of this data is incomplete so we have to handle that case in the visualizations.

The other data is the world object data that is used to project the map. As we render the path objects, we give them their three digit country code as an id so they are easy to look up and color in response to the other dataset.

##### Protoype
What we currently have working is the year slider and the map. For the slider, a user can input the range and then slide it around to update the color of the map. Currently we have 4 views: one for the total life expectancy value and three trend views of different intervals. The total life expectancy view gets lighter the higher the life expectancy for the color in a given year. On the trend views, we use white as a baseline and each country appears more red if it is trending downward and blue if it is trending upwards. If no data is present for the country on the given year, the country appears gray in all the maps.

The coloring on all the maps needs to be revisited to determine how they can best communicated what we are trying to show, but the framework is in place for those changes to be really simple.

The data on the line graph and bar chart simply shows 6 static countries: United States, Canada, Russia, Italy, Brazil, and Japan.  The data will adjust as the user selects different countries to include or exclude from the views.

##### To Do
- Add boundary checking for year range input to warn users if their range includes years with no data.
- Add zoom to map
- Possibly replace the alternate trend views with togglable arrows or other indicators if we can think of something that will work.
- Possibly add customization to trend views (ability to select interval for trending view)
- Add legends to the map
- Add secondary charts to the accompany the map
