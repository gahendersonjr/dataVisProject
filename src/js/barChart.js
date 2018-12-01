/** Class implementing the bar chart view. */
class BarChart {

  constructor(worldData, countries, currentYear) {
    this.worldData = worldData.slice();
	console.log(this.worldData);
    this.countries = countries.slice();
    this.year = currentYear;
	this.draw();
  }

  //construct axes and scale
  draw() {

	  let width = 500;
	  let height = 250;
	  let vPadding = 20;
	  let hPadding = 25;
	  let barPadding = 2;
	  let max = 0;
//	  let barWidth = (width-2*hPadding-barPadding*this.countries.length )/ this.countries.length;

	  let names = [];
	  for( let c of this.worldData )
		  names.push(c["geo.name"]);
		console.log(names);

	  let xScale = d3.scaleBand()
		.domain(names)
		.rangeRound([hPadding, width-hPadding])
		.paddingInner(0.05);
	  let xAxis = d3.axisBottom().scale(xScale);

	  let yScale = d3.scaleLinear()
		.domain([0,100])
		.range([height - vPadding, vPadding]);
	  let yAxis = d3.axisLeft().scale(yScale);


	  d3.select("#barchartsvg").remove();

	  let svg = d3.select("#barchart").selectAll("svg")
		.data([0])
		.enter()
		.append("svg")
		.attr("width",500)
		.attr("height",250)
		.attr("id","barchartsvg")
	  ;

	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(0,${height-vPadding})`)
		.call(xAxis);

	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(${hPadding},0)`)
		.call(yAxis);

	  svg.selectAll("rect")
		.data(this.worldData)
		.enter()
		.append("rect")
		.attr("x",d => xScale(d["geo.name"]) )
		.attr("y",d => yScale(d[this.year]))
		.attr("width", xScale.bandwidth() )
		.attr("height", d => yScale(0) - yScale(d[this.year]) )
		.attr("class", (d,i) => "country" + i)
	  ;
/*
	  svg.append("path")
		.style("stroke","black")
		.style("stroke-width","2")
		.attr("id","currentyearline")
		.style("stroke-dasharray","2 2")
		.attr("d", "M " + xScale(this.year) + ",0 L " + xScale(this.year) + "," + (height-vPadding) )
	  ;
*/

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
	  console.log("redraw barChart " + this.year);
  }

}
