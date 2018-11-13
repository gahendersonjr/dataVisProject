
class Maps {
  constructor() {
    this.projection = d3.geoMercator().scale(200).translate([620, 500]);
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
      .attr("d", path);
  }


}
