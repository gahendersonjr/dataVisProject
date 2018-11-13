let countries = {};
let years = {};

d3.csv("data/lifeExpectancy.csv", function (d) {
  d.DATA_QUALITY = d.DATA_QUALITY.slice(3, d.DATA_QUALITY.length);
  return d;
}).then(function(data) {
  for (let i in data){
    let country = data[i].AREA;
    let year = data[i].YEAR;

    if (country in countries) {
      countries[country].push(data[i]);
    } else {
      countries[country]=[data[i]];
    }

    if (year in years) {
      years[year].push(data[i]);
    } else {
      years[year]=[data[i]];
    }
  }
});

console.log(years);
console.log(countries);

let map = new Map();
d3.json("data/world.json")
    .then(function(world) {
      map.drawMap(world);
});

let slider = new Slider();
slider.makeSlider();
