/** Class implementing the bar chart view. */
class TimeLine {

  constructor(beginYear, endYear, currentYear) {

	this.year = currentYear;
	this.beginYear = beginYear;
	this.endYear = endYear;
	this.maxCountries = 6;
  }

  //add data for continents
  addContinentData(continentData)
  {
	  console.log("Received Continent Data");
	  console.log(continentData);
	  this.continentData = continentData;
	  this.finishConstruction();
  }
  
  //add worldData
  addCountryData(countryData, countries)
  {
    this.worldData = countryData.slice();
	if( countries == null || countries.length <= 0 )
		countries = ["USA","RUS","CAN","JPN","ITA","BRA"];
	this.countries = [];
	this.currentData = [];
	for( let c of countries )
		this.addCountry(c);
	this.finishConstruction();
  }
  
  //build barChart and infoPanel then draw
  finishConstruction()
  {
	  if( this.worldData == null || this.continentData == null ) 
		  return;
	  this.draw();
	  this.barChart = new BarChart(this.currentData, this.countries, this.year);
	  this.info = new InfoPanel(this.currentData, this.countries[0]);
  }
  
  //construct axes and scale
  draw() {

	  let width = 1824;
	  let height = 200;
	  let vPadding = 20;
	  let hPadding = 25;
	  let max = 0;

	  let xScale = d3.scaleLinear()
		.domain([this.beginYear,this.endYear])
		.range([hPadding, width-hPadding]);
	  let xAxis = d3.axisBottom().scale(xScale).ticks(36);

	  let yScale = d3.scaleLinear()
		.domain([0,100])
		.range([height - vPadding, vPadding]);
	  let yAxis = d3.axisLeft().scale(yScale);


	  d3.select("#timechart").remove();

	  let svg = d3.select("#timeline").selectAll("svg")
		.data([0])
		.enter()
		.append("svg")
		.attr("width",width)
		.attr("height",height)
		.attr("id","timechart")
	  ;

	  let start = this.beginYear;
	  let end = this.endYear;

	  let lineMaker = function(d) {
		  let p = "M ";
		  for( let year = start; year <= end; year++ )
		  {
			  if (year > start)
				  p += " L ";
			  p += xScale(year) + "," + yScale(d[year]);
		  }
		  return p;
	  }

	  //draw gridlines
	  svg.selectAll("path")
		.data([20,40,60,80,100])
		.enter()
		.append("path")
		.attr("class","gridline")
		.attr("d", d => "M " + xScale(this.beginYear) + "," + yScale(d) + " L " + xScale(this.endYear) + "," + yScale(d))
	  ;
	  
	  //draw country trendlines
	  svg.selectAll("path:not(.gridline)")
		.data(this.currentData)
		.enter()
		.append("path")
		.attr("class",(d,i)=>"country"+i)
		.attr("d", lineMaker )
		.attr("fill","none")
		.attr("id", d => d.geo + "Trend")
		.on( "mouseover", d => time.hoverOnCountry(d.geo) )
		.on( "mouseout", d => time.hoverOffCountry(d.geo) )
		.on( "click", d => time.removeCountry(d.geo) )
	  ;
	  
	  let now = new Date().getYear()+1900;
 

	  //draw x-axis
	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(0,${height-vPadding})`)
		.call(xAxis);

	  //draw y-axis
	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(${hPadding},0)`)
		.call(yAxis);

	  //draw current year dashed line
	  svg.append("path")
		.style("stroke","black")
		.style("stroke-width","2")
		.attr("id","currentyearline")
		.style("stroke-dasharray","2 2")
		.attr("d", "M " + xScale(this.year) + ",0 L " + xScale(this.year) + "," + (height-vPadding) )
	  ;
	  
	  svg.append("text")
		.attr("x", xScale(this.year + 1) )
		.attr("y", yScale(100) )
		.attr("class", "timelineyear")
		.attr("transform",`rotate(90,${xScale(this.year + 1)},${yScale(100)})`)
		.html( this.year )
	  ;
 
	  //draw now solid line
	  svg.append("path")
		.style("stroke","black")
		.style("stroke-width","2")
		.attr("id","nowyearline")
		.attr("d", "M " + xScale(now) + ",0 L " + xScale(now) + "," + (height-vPadding) )
	  ;
	  
	  svg.append("text")
		.attr("x", xScale(now + 1) )
		.attr("y", yScale(100) )
		.attr("class", "nowlineyear")
		.attr("transform",`rotate(90,${xScale(now + 1)},${yScale(100)})`)
		.html( "Present Year" )
	  ;
 
 }

  updateYear(currentYear) {
	this.year = currentYear;
    this.barChart.updateYear(currentYear);
	this.redraw();
  }

  updateYearRange(newBeginYear, newEndYear) {
	this.beginYear = newBeginYear;
	this.endYear = newEndYear;
	this.redraw();
  }

  addCountry( newCountry ){
	  for( let c of this.countries )
		  if( c == newCountry )
			  return false;
	  for( let data of this.worldData )
		  if( data.geo == newCountry )
		  {
			  this.currentData.push(data);
			  this.countries.push( newCountry );
			  while( this.currentData.length > this.maxCountries )
				  this.removeCountry(this.countries[0]);
			  d3.select("#" + newCountry + "Arrow").classed("included",true);
			  d3.select("#useclick" + newCountry).selectAll("use").data([newCountry]).enter()
			      .append("use")
		          .attr("id",d => "useclick" + d)
				  .attr("xlink:href", d => "#" + d )
			  break;
		  }
	  this.finishConstruction();
	  return true;
  }

  removeCountry( country ){
	  this.countries = this.countries.filter( c => c != country );
	  this.currentData = this.currentData.filter( c => c.geo != country );
	  d3.select("#" + country + "Arrow").classed("included",false);
	  d3.select("#useclick" + country).remove();
	  this.finishConstruction();
  }
  
  hoverOnCountry( country ) {
	d3.select("#" + country + "Arrow").classed("selected",true);
	d3.select("#usehover").selectAll("use").data([country]).enter()
		.append("use")
		.attr("id","usehover")
		.attr("xlink:href", d => "#" + d )
	d3.select("#" + country + "Bar").classed("selected",true);
	d3.select("#" + country + "Trend").classed("selected",true);
	;
  }
  
  hoverOffCountry( country ) {
	d3.select("#" + country + "Arrow").classed("selected",false);
	d3.select("#usehover").remove();
	d3.select("#" + country + "Bar").classed("selected",false);
	d3.select("#" + country + "Trend").classed("selected",false);	
  }
  
  toggleCountry( country ) {
	console.log("Toggle " + country );
	if( this.addCountry(country) )
	{
		d3.select("#" + country).classed("included",true);
	}
	else
	{
		this.removeCountry(country);
		d3.select("#" + country).classed("included",false);
	}
	
  }
  
  highlightCountries() {
	console.log("Highlighting");
  console.log(this.countries);
	  for( let data of this.countries )
	  {
			  d3.select("#" + data + "Arrow").classed("included",true);
			  d3.select("#useclick" + data).selectAll("use").data([data]).enter()
			      .append("use")
		          .attr("id",d => "useclick" + d)
				  .attr("xlink:href", d => "#" + d );
	  }
  }  
  
  
  redraw(){
	  this.draw();
  }

}
