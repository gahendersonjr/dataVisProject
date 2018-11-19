class Slider {
  constructor() {
    this.svg = d3.select("#slider");
    this.barStart = 50;
    this.barEnd = this.svg.attr("width")-50;
  }

  makeSlider(min_year, max_year) {
    // this.svg.selectAll("*").remove();
    let scale = d3.scaleLinear()
                  .domain([this.barStart, this.barEnd])
                  .range([min_year, max_year]);

    this.svg.append("line")
      .classed("sliderTrack", true)
      .attr("x1", this.barStart)
      .attr("x2", this.barEnd)
      .attr("y1", 20)
      .attr("y2", 20);

    this.svg.append("text")
      .text(max_year)
      .attr("x", this.barEnd)
      .attr("y", 60)
      .classed("sliderLabel", true)
      .attr("id", "current_selection");

    let barStart = this.barStart;
    let barEnd = this.barEnd;
    this.svg.append("circle")
      .attr("cx", this.barEnd)
      .attr("cy", 20)
      .attr("r", 20)
      .attr("fill", "black")
      .call(d3.drag()
        .on("drag", function(){
          let new_x = d3.event.x;
          if(new_x < barStart || new_x > barEnd){
            return;
          }
          d3.select(this).attr("cx", new_x);
          let year = Math.round(scale(new_x));
          map.yearColor(year);
          d3.select("#current_selection")
            .text(year)
            .attr("x", new_x);

          // map.yearColor(document.getElementById("end_year").value);
        }));

  }
}
