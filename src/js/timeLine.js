/** Class implementing the bar chart view. */
class TimeLine {

  constructor(worldData, countries, beginYear, endYear, currentYear) {
    this.worldData = worldData.slice();
console.log(this.worldData);	
	if( countries != null ) 
		this.countries = countries.slice();
	else
		this.countries = ["USA","RUS","CAN","JPN","ITA","BRA"];
	this.currentData = [];
	for( let c of this.countries )
		for( let data of this.worldData )
			if( data.geo == c )
				this.currentData.push(data);
console.log(this.currentData);			
    this.year = currentYear;
	this.beginYear = beginYear;
	this.endYear = endYear;
	this.draw();
  }
  
  //construct axes and scale
  draw() {
	  
  }

  updateYear(currentYear) {
	this.year = currentYear;
	this.redraw();
  }
  
  updateYearRange(newBeginYear, newEndYear) {
	this.beginYear = newBeginYear;
	this.endYear = newEndYear;
	this.redraw();
  }
  
  updateCountries(newCountryList) {
	  this.countries = newCountryList.slice();
	  this.redraw();
  }
  
  addCountry( newCountry ){
	  for( let c of this.countries )
		  if( c == newCountry )
			  return;
	  this.countries.push( newCountry );
	  this.redraw();
  }
   
  //update graphics to reflect current data
  redraw()
  {
	  
  }

}
