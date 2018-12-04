let countries = [];
let continents = [];

let min_year = 1850;
let max_year = 2018;
let selected_year = 1850;
var time = new TimeLine(min_year, max_year, selected_year);

let loading = d3.select("#map1").append("text")
                .text("Loading...")
                .attr("x", "20")
                .attr("y", "20");
d3.csv("data/lex.csv", d => d)
  .then(function(data) {
    for (let i in data){
      let country = data[i];
      if(country.geo && country.geo.length == 3){
        country.geo = country.geo.toUpperCase();
        countries.push(country);
      }
    }
    time.addCountryData(countries);
});



d3.csv("data/lexContinents.csv", d => d)
  .then(function(data) {
    for (let continent of data){
	  if( continent["geo"] == "world" )
		continents.splice(0,0,continent);
	  else
		continents.push(continent);
    }
	time.addContinentData(continents);
});


let map = new Map(countries);
d3.json("data/world.json")
    .then(function(data) {
      loading.remove();
      map.drawMap(data);
	  time.highlightCountries();
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
    time.updateYear(selected_year);
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
  time.updateYearRange(min_year, max_year);
}

function about(){
  alert("Bacon ipsum dolor amet pig tri-tip landjaeger, tongue shoulder ball tip buffalo filet mignon ribeye sirloin capicola flank. Biltong ribeye pastrami sausage, meatball kielbasa bresaola pig frankfurter brisket kevin alcatra flank landjaeger burgdoggen. Boudin turkey pork spare ribs. Chicken doner tongue, venison shoulder pork turducken frankfurter kielbasa turkey. Pork belly tri-tip corned beef, capicola venison picanha kevin porchetta ribeye pancetta. Alcatra fatback short loin bacon jerky cow t-bone leberkas turducken beef drumstick. Meatball pastrami biltong salami flank turkey hamburger kielbasa ribeye fatback landjaeger. Venison doner ground round, beef t-bone ball tip leberkas tri-tip pancetta short ribs chuck prosciutto kielbasa beef ribs fatback. Jowl alcatra buffalo corned beef, ball tip capicola frankfurter filet mignon cupim sirloin ground round brisket. Cupim jowl bresaola pancetta ground round tail, beef ribeye turkey ham. Sausage shank tail ham hock cow, strip steak rump picanha beef flank. Filet mignon shoulder tongue ribeye, turducken kevin alcatra tail andouille. Corned beef filet mignon andouille burgdoggen alcatra ham hock. Tenderloin ham hock flank sausage cow beef ribs meatloaf beef shoulder leberkas filet mignon.");
}
