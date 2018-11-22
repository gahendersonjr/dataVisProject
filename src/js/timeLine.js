/** Class implementing the bar chart view. */
class TimeLine {

  constructor(worldData, countries, beginYear, endYear, currentYear) {
    this.worldData = worldData.slice();

	if( countries != null && countries.length > 0 ) 
		this.countries = countries.slice();
	else
		this.countries = ["USA","RUS","CAN","JPN","ITA","BRA"];
	this.currentData = [];
	for( let c of this.countries )
		for( let data of this.worldData )
			if( data.geo == c )
				this.currentData.push(data);

	this.year = currentYear;
	this.beginYear = beginYear;
	this.endYear = endYear;
	this.draw();
	
	this.barChart = new BarChart(this.currentData, this.countries, this.year);
	this.info = new InfoPanel(this.currentData, this.countries[0]);
  }
  
  //construct axes and scale
  draw() {
	  
	  let width = 500;
	  let height = 250;
	  let vPadding = 20;
	  let hPadding = 25;
	  let max = 0;
	  
	  let xScale = d3.scaleLinear()
		.domain([this.beginYear,this.endYear])
		.range([hPadding, width-hPadding]);
	  let xAxis = d3.axisBottom().scale(xScale);
	
	  let yScale = d3.scaleLinear()
		.domain([0,100])
		.range([height - vPadding, vPadding]);
	  let yAxis = d3.axisLeft().scale(yScale);
	
	  
	  d3.select("#timechart").remove();
	  
	  let svg = d3.select("#timeline").selectAll("svg")
		.data([0])
		.enter()
		.append("svg")
		.attr("width",500)
		.attr("height",250)
		.attr("id","timechart")
	  ;

	  let start = this.beginYear;
	  let end = this.endYear;
		
	  let lineMaker = function(d) {
		  let p = "M ";
		  for( let year = start; year <= end; year++ ) //year=parseInt(year)+5)
		  {
			  if (year > start) 
				  p += " L ";
			  p += xScale(year) + "," + yScale(d[year]);
		  }
		  return p;
	  }
		
	  svg.selectAll("path")
		.data(this.currentData)
		.enter()
		.append("path")
		.attr("class",(d,i)=>"country"+i)
		.attr("d", lineMaker )
		.attr("fill","none")
		.attr("stroke","blue")
	  ;
	  

	  
	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(0,${height-vPadding})`)
		.call(xAxis);
	  
	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(${hPadding},0)`)
		.call(yAxis);

	  svg.append("path")
		.style("stroke","black")
		.style("stroke-width","2")
		.attr("id","currentyearline")
		.style("stroke-dasharray","2 2")
		.attr("d", "M " + xScale(this.year) + ",0 L " + xScale(this.year) + "," + (height-vPadding) )
	  ;
	  
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
  
  removeCountry( country ){
	  for( let c of this.countries )
		  this.countries = this.countries.filter( c => c == country );
	  this.redraw();
  }	  
   
  //update graphics to reflect current data
  redraw()
  {
	  
  }

}
