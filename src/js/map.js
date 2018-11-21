
class Map {
  constructor(countries) {
    this.projection = d3.geoMercator().scale(200).translate([590, 400]);
    this.countries = countries;

    this.totalScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["maroon", "white"]);

    this.trendScale = d3.scaleLinear()
      .domain([-.3, 0, .3])
      .range(["red", "white", "blue"]);
  }

  drawMap(world) {
    world = topojson.feature(world,world.objects.countries);
    let path = d3.geoPath()
      .projection(this.projection);
    let enter = d3.select("#map1").selectAll("path")
      .data(world.features)
      .enter();

    enter.append("path")
      .attr("class", "countries")
      .attr("id", d => d.id)
      .attr("d", path)
      .attr("fill", "gray")
      .attr("stroke", "gray");

      this.yearColor(document.getElementById("end_year").value);
  }

  yearColor(year) {
    let value = document.getElementById("mapMode").value;
    if (value == "totals"){
      this.totalColor(year);
    } else if(value=="10year"){
      this.trendColor(year, 10);
    } else if(value=="20year"){
      this.trendColor(year, 20);
    } else if(value=="50year"){
      this.trendColor(year, 50);
    }
  }

  totalColor(year) {
    for(let i in this.countries) {
      let country = this.countries[i];
      let color = "gray";
      if(country[year]){
        color = this.totalScale(country[year]);
      }
      d3.select("#" + country.geo)
        .attr("fill", color);
    }
  }

  trendColor(year, interval) {
    let high = 0;
    let low = 0;
    for(let i in this.countries) {
      let country = this.countries[i];
      let color = "gray";
      if(country[year-interval] && country[year]){
        // color = this.totalScale(country[year]);
        let percent_change = (country[year] - country[year-interval])/country[year];
        // console.log(percent_change);
        if (percent_change>high){
          high = percent_change;
        }
        if (percent_change<low){
          low = percent_change;
        }
        color = this.trendScale(percent_change);
      }
      d3.select("#" + country.geo)
        .attr("fill", color);
    }
    console.log(low + " " + high);
  }
}
