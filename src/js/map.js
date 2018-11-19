
class Map {
  constructor(countries) {
    this.projection = d3.geoMercator().scale(200).translate([590, 400]);
    this.countries = countries;

    this.colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["maroon", "white"]);
  }

  drawMap(world) {
    world = topojson.feature(world,world.objects.countries);
    let path = d3.geoPath()
      .projection(this.projection);
    d3.select("#map1").selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("id", d => d.id)
      .attr("d", path)
      .attr("fill", "gray");

      this.yearColor(document.getElementById("end_year").value);
  }

  yearColor(year) {
    for(let i in this.countries) {
      let country = this.countries[i];
      let color = "gray";
      if(country[year]){
        color = this.colorScale(country[year]);
      }
      d3.select("#" + country.geo)
        .attr("fill", color);
    }
  }
}
