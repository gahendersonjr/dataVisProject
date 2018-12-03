
class Map {
  constructor(countries) {
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
      }.bind(this));

    this.svg.call(this.zoom);

    this.colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["black", "lightGray"]);

    this.rotateScale = d3.scaleLinear()
      .domain([-1, 1])
      .range([180, 0]);
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
  this.updateArrows(year);

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
      .append("path")
        .attr("d", "M0,7.5 L2.5,0 L5,7.5")
        .attr("fill", "lightGray");
  }

  updateCountry(year) {
    for(let i in this.countries) {
      let country = this.countries[i];
      let color = "white";
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
  }

  showArrows(){
    d3.selectAll(".hasData")
      .classed("inactive", false);
  }

  removeArrows(){
    d3.selectAll(".arrow")
      .classed("inactive", true);
  }

  updateArrows(year){
    let checked = document.getElementById("arrowBox").checked;
    let interval = 10;
    let rotate;

    for(let i in this.countries) {
      let country = countries[i];
       if(country[year-interval] && country[year]){
         this.g.select("#" + country.geo + "Arrow")
          .classed("inactive", !checked);

         let percent_change = (country[year] - country[year-interval])/country[year];
         rotate = this.rotateScale(percent_change);

         let pattern = this.g.select("#"  + country.geo + "Pattern");

         pattern
          .attr("patternTransform", "rotate(" + rotate +")")

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
