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

	  svg.selectAll("rect")
		.data(this.worldData)
		.enter()
		.append("rect")
		.attr("x",d => xScale(d["geo.name"]) )
		.attr("y",d => yScale(d[this.year]))
		.attr("width", xScale.bandwidth() )
		.attr("height", d => yScale(0) - yScale(d[this.year]) )
		.style("stroke", "black" )
		.attr("class", (d,i) => "country" + i)
		.on( "mouseover", function() { 
							  d3.selectAll("." + d3.select(this).attr("class")).classed("selected",true);
						  } 
		    )
		.on( "mouseout", function() { 
							  d3.selectAll(".selected").classed("selected",false);
						  } 
		    )
	  ;

	  svg.selectAll("text")
		.data(this.worldData)
		.enter()
		.append("text")
		.attr("x",d => xScale(d["geo.name"]) + xScale.bandwidth()/ 2 )
		.attr("y",d => yScale(d[this.year]) - 3 )
		.attr("class", (d,i) => "country" + i)
		.classed("bartext",true)
		.html( d => Math.round(d[this.year],0) )
      ;

  	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(0,${height-vPadding})`)
		.call(xAxis);

	  svg.append("g")
		.attr("class","axis")
		.attr("transform",`translate(${hPadding},0)`)
		.call(yAxis);

  }


  updateYear(newYear) {
	this.year = newYear;
	this.draw();
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
