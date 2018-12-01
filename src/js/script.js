let countries = [];
let continents = [];

let min_year = 1850;
let max_year = 2018;
let selected_year = 1850;

d3.csv("data/lex.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let country = data[i];
      if(country.geo && country.geo.length == 3){
        country.geo = country.geo.toUpperCase();
        countries.push(country);
      }
    }
    let time = new TimeLine(countries, null, min_year, max_year, 2018);
});



d3.csv("data/lexContinents.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let continent = data[i];
      continents.push(continent);
    }
});


let map = new Map(countries);
d3.json("data/world.json")
    .then(function(data) {
      map.drawMap(data);
});

let slider = new Slider();
slider.makeSlider(min_year, max_year, selected_year);

function toggleArrows(checkbox){
  if(checkbox.checked){
    map.showArrows();
  } else {
    map.removeArrows();
  }
}

let animationStopped = true;

async function playAnimation(button){
  button.innerText = "Stop"
  animationStopped = !animationStopped;
  let sliderElement = d3.select("#slider");
  sliderElement.classed("freeze", true);
  selected_year = document.getElementById("current_selection").innerHTML;
  while(!animationStopped){
    if(selected_year==max_year){
      selected_year=min_year;
    }
    slider.setPosition(selected_year, min_year, max_year);
    map.updateCountry(selected_year);
    map.updateArrows(selected_year);
    await sleep(300);
    selected_year++;
  }
  sliderElement.classed("freeze", false);
  animationStopped = true;
  button.innerText = "Play";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleFutureProjections(checkbox){
  selected_year = document.getElementById("current_selection").innerHTML;
  if(checkbox.checked){
    max_year = 2100;
  } else {
    max_year = 2018;
  }
  if (selected_year > max_year){
    selected_year=1850;
  }
  slider.makeSlider(min_year, max_year, selected_year);
}
