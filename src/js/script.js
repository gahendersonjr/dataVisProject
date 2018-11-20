let countries = [];
let continents = [];

d3.csv("data/lex.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let country = data[i];
      if(country.geo && country.geo.length == 3){
        country.geo = country.geo.toUpperCase();
        countries.push(country);
      }
    }
});

d3.csv("data/lexContinents.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let continent = data[i];
      continents.push(continent);
    }
});

// console.log(countries);
// console.log(continents);

let map = new Map(countries);
d3.json("data/world.json")
    .then(function(data) {
      map.drawMap(data);
});

let slider = new Slider();
updateSlider();

function updateSlider(){
  let min_year = document.getElementById("start_year").value;
  let max_year = document.getElementById("end_year").value;
  slider.makeSlider(min_year, max_year);
}
