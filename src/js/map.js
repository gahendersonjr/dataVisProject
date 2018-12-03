
class Map {
  constructor(countries) {
    this.patternZoom= 1;
    this.svg = d3.select("#map1")
    this.g = this.svg.append("g");
    this.projection = d3.geoMercator().scale(200).translate([590, 400]);

    this.path = d3.geoPath()
      .projection(this.projection);
    this.countries = countries;

    this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", function(d){
        this.g.attr("transform", d3.event.transform);
        this.patternZoom = 1/d3.event.transform.k;
        this.updateArrows(this.year);
      }.bind(this));

    this.svg.call(this.zoom);

    this.colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["black", "lightGray"]);

    this.rotateScale = d3.scaleLinear()
      .domain([-1, 1])
      .range([180, 0]);

  this.drawLegends();
    }

  drawMap(world) {
    world = topojson.feature(world,world.objects.countries);
    let enter = this.g.selectAll("path")
      .data(world.features)
      .enter();

    enter.append("path")
      .attr("class", "countries")
      .attr("id", d => d.id)
      .attr("d", this.path)
      .attr("fill", "lightGray")
      .attr("stroke", "white");

    enter.append("path")
        .classed("arrow", true)
        .classed("hasData", true)
        .attr("id", d => d.id + "Arrow")
        .attr("d", this.path)
        .attr("fill", "none")
        .classed("inactive", true)
   	    .on("click", d => time.toggleCountry(d.id) )
   	    .on("mouseover", d => time.hoverOnCountry(d.id) )
   	    .on("mouseout", d => time.hoverOffCountry(d.id) );

  let year = 2018;
  this.updateCountry(year);
  this.createPatterns();
  this.updateArrows(year, 1);

  }

  drawLegends(){
    let values = [20,30,40,50,60,70,80,90,100];
    let legendSvg = this.svg.selectAll("rect")
      .data(values)
      .enter();
    let barWidth = 1215/10;
    legendSvg
      .append("rect")
      .attr("x", (d,i) => i*(barWidth))
      .attr("y", 630)
      .attr("height", 20)
      .attr("width", barWidth)
      .attr("fill", d=>this.colorScale(d));
    legendSvg
      .append("text")
      .attr("x", (d,i) => i*(barWidth)+ 30)
      .attr("y", 625)
      .attr("font-size", 14)
      .text( d => d + " years");

    this.svg
      .append("rect")
      .attr("x", barWidth * 9)
      .attr("y", 630)
      .attr("height", 20)
      .attr("width", barWidth)
      .attr("fill", "#fff0f2");
    this.svg
      .append("text")
      .attr("x", barWidth*9 + 30)
      .attr("y", 625)
      .attr("font-size", 14)
      .text("No data");


    this.svg.append("path")
        .attr("d", "M10,560 L15,545 L20,560")
        .attr("fill", "green")
        .classed("inactive", true)
        .classed("arrowLegend", true);

    this.svg.append("path")
        .attr("d", "M10,590 L15,605 L20,590")
        .attr("fill", "red")
        .classed("inactive", true)
        .classed("arrowLegend", true);

    this.svg.append("path")
        .attr("d", "M10,570 L10,580 L25,575 L10,570")
        .attr("fill", "white")
        .attr("stroke", "black")
        .classed("inactive", true)
        .classed("arrowLegend", true);

    this.svg.append("text")
      .attr("x", "30")
      .attr("y", "560")
      .attr("font-size", 14)
      .classed("inactive", true)
      .classed("arrowLegend", true)
      .text("Trending upwards");

    this.svg.append("text")
      .attr("x", "30")
      .attr("y", "580")
      .attr("font-size", 14)
      .classed("inactive", true)
      .classed("arrowLegend", true)
      .text("No Change");

    this.svg.append("text")
      .attr("x", "30")
      .attr("y", "600")
      .attr("font-size", 14)
      .classed("inactive", true)
      .classed("arrowLegend", true)
      .text("Trending downwards");
  }

  createPatterns(){
    this.g.append("defs")
      .selectAll("pattern")
      .data(this.countries)
      .enter()
      .append("pattern")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("id", d => d.geo.toUpperCase() + "Pattern")
        .classed("pattern", true)
      .append("path")
        .attr("d", "M0,7.5 L2.5,0 L5,7.5")
        .attr("fill", "lightGray");
  }

  updateCountry(year) {
    for(let i in this.countries) {
      let country = this.countries[i];
      let color = "#fff0f2";
      let hasData = false;
      if(country[year]){
        color = this.colorScale(country[year]);
        hasData = true;
      }
      d3.select("#" + country.geo)
        .attr("fill", color);
      d3.select("#" + country.geo + "Arrow")
        .classed("hasData", hasData);
    }
    this.updateArrows(year);
  }

  showArrows(){
    d3.selectAll(".hasData")
      .classed("inactive", false);
    d3.selectAll(".arrowLegend")
      .classed("inactive", false);
  }

  removeArrows(){
    d3.selectAll(".arrow")
      .classed("inactive", true);
    d3.selectAll(".arrowLegend")
      .classed("inactive", true);
  }

  updateArrows(year){
    this.year = year;
    let checked = document.getElementById("arrowBox").checked;
    let interval = 10;
    let rotate;

    d3.selectAll(".arrowLegend")
      .classed("inactive", !checked);
    for(let i in this.countries) {
      let country = countries[i];
       if(country[year-interval] && country[year]){
         this.g.select("#" + country.geo + "Arrow")
          .classed("inactive", !checked);

         let percent_change = (country[year] - country[year-interval])/country[year];
         rotate = this.rotateScale(percent_change);

         let pattern = this.g.select("#"  + country.geo + "Pattern");

         pattern
          .attr("patternTransform", "rotate(" + rotate + ") scale(" + this.patternZoom + ")");

        this.g.select("#" + country.geo + "Arrow")
          .attr("fill", "url(#"  + country.geo + "Pattern)");

        pattern.selectAll("*")
          .attr("fill", function(d){
            if(percent_change > 0){
              return "lightGreen";
            } else if (percent_change < 0) {
              return "red";
            } else {
              return "white";
            }
          });
       } else {
         this.g.select("#" + country.geo + "Arrow")
          .classed("inactive", true);
       }
     }
  }
}
