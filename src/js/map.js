
class Map {
  constructor(countries) {
    this.projection = d3.geoMercator().scale(200).translate([590, 400]);
    this.countries = countries;

    this.colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["black", "lightGray"]);

    this.rotateScale = d3.scaleLinear()
      .domain([-1, 1])
      .range([180, 0]);

    this.svg = d3.select("#map1");
    }

  drawMap(world) {
    world = topojson.feature(world,world.objects.countries);
    let path = d3.geoPath()
      .projection(this.projection);
    let enter = this.svg.selectAll("path")
      .data(world.features)
      .enter();

    enter.append("path")
      .attr("class", "countries")
      .attr("id", d => d.id)
      .attr("d", path)
      .attr("fill", "lightGray")
      .attr("stroke", "white");

    enter.append("path")
        .attr("class", "arrow")
        .attr("id", d => d.id + "Arrow")
        .attr("d", path)
        .attr("fill", "none")
        .classed("inactive", true);

  let year = 2018;
  this.updateCountry(year);
  this.createPatterns();
  this.updateArrows(year);
  }

  createPatterns(){
    this.svg.append("defs")
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
      let color = "lightGray";
      if(country[year]){
        color = this.colorScale(country[year]);
      }
      d3.select("#" + country.geo)
        .attr("fill", color);
    }
  }

  showArrows(){
    d3.selectAll(".arrow")
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
         this.svg.select("#" + country.geo + "Arrow")
          .classed("inactive", !checked);

         let percent_change = (country[year] - country[year-interval])/country[year];
         rotate = this.rotateScale(percent_change);

         let pattern = this.svg.select("#"  + country.geo + "Pattern");

         pattern
          .attr("patternTransform", "rotate(" + rotate +")")

        this.svg.select("#" + country.geo + "Arrow")
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
         this.svg.select("#" + country.geo + "Arrow")
          .classed("inactive", true);
       }
     }
  }
}
