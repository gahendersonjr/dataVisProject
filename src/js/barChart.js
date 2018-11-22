/** Class implementing the bar chart view. */
class BarChart {

  constructor(worldData, countries, currentYear) {
    this.worldData = worldData.slice();
    this.countries = countries.slice();
    this.year = currentYear;
	this.draw();
  }
  
  //construct axes and scale
  draw() {
	  
  }

  updateYear(newYear) {
	this.year = newYear;
	this.redraw();
  }
  
  updateCountries(newCountryList) {
	  this.countries = newCountryList.slice();
  }
  
  addCountry( newCountry ){
	  for( let c of this.countries )
		  if( c == newCountry )
			  return;
	  this.countries.push( newCountry );
	  this.redraw();
  }
  
  update(newYear, newCountryList) {
	  this.updateYear(newYear);
	  this.updateCountries(newCountryList);
  }
  
  //update graphics to reflect current data
  redraw()
  {
	  
  }

}
