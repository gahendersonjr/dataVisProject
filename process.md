# Final Project Proposal
### CS 5890 Data Visualization, Fall 2018
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

###### Proposal images

##### High Level View 

![GitHub Logo](//overview.png)
