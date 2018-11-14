let countries = [];
let continents = [];
let world;

d3.csv("data/lex.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let country = data[i];
      if(country.geo.length == 3){
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

d3.csv("data/lexWorld.csv", d => d)
  .then(function(data) {
    console.log(data);
  });


console.log(countries);
console.log(continents);
console.log(world);

let map = new Map();
d3.json("data/world.json")
    .then(function(world) {
      map.drawMap(world);
});

let slider = new Slider();
updateSlider();

function updateSlider(){
  let min_year = document.getElementById("start_year").value;
  let max_year = document.getElementById("end_year").value;
  slider.makeSlider(min_year, max_year);
}
