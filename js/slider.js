class Slider {
  constructor() {
    this.svg = d3.select("#slider");
    this.barStart = 50;
    this.barEnd = this.svg.attr("width")-50;
  }

  makeSlider(min_year, max_year, selected_year) {
    this.svg.selectAll("*").remove();
    let scale = d3.scaleLinear()
                  .domain([this.barStart, this.barEnd])
                  .range([min_year, max_year]);

    let reverseScale = d3.scaleLinear()
                  .domain([min_year, max_year])
                  .range([this.barStart, this.barEnd]);

    this.svg.append("line")
      .classed("sliderTrack", true)
      .attr("x1", this.barStart)
      .attr("x2", this.barEnd)
      .attr("y1", 20)
      .attr("y2", 20);

    let barStart = this.barStart;
    let barEnd = this.barEnd;

    this.svg.append("text")
      .text(min_year)
      .attr("x", barStart)
      .attr("y", 45)
      .classed("sliderLabel", true)
      .attr("id", "current_selection");

    this.svg.append("text")
      .text(min_year)
      .attr("x", barStart)
      .attr("y", 9)
      .classed("staticLabel", true);


    this.svg.append("text")
      .text(max_year)
      .attr("x", barEnd)
      .attr("y", 9)
      .classed("staticLabel", true);

    if(max_year>2018){
      this.svg.append("text")
        .text("2018")
        .attr("x", reverseScale(2018))
        .attr("y", 9)
        .classed("staticLabel", true);
    }

    this.svg.append("line")
      .classed("sliderTrack", true)
      .attr("x1", this.barStart)
      .attr("x2", this.barEnd)
      .attr("y1", 20)
      .attr("y2", 20);

    this.svg.append("circle")
      .attr("cx", barStart)
      .attr("cy", 20)
      .attr("r", 8)
      .attr("id", "yearSelector")
      .attr("fill", "black")
      .call(d3.drag()
        .on("drag", function(){
          let new_x = d3.event.x;
          if(new_x < barStart || new_x > barEnd){
            return;
          }
          d3.select(this).attr("cx", new_x);
          let year = Math.round(scale(new_x));
          map.updateCountry(year);
          time.updateYear(year);
          d3.select("#current_selection")
            .text(year)
            .attr("x", new_x);
        }));

    this.setPosition(selected_year, min_year, max_year)
  }

  setPosition(year, min_year, max_year){
    let scale = d3.scaleLinear()
                  .domain([min_year, max_year])
                  .range([this.barStart, this.barEnd]);
    let new_x = Math.round(scale(year));
    d3.select("#yearSelector").attr("cx", new_x);
    d3.select("#current_selection")
            .text(year)
            .attr("x", new_x);
  }
}
