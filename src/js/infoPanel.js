/** Class implementing the infoPanel view. */
class InfoPanel {

	constructor(worldData, year) {
		this.worldData = worldData;
		let data = [["Country","Life Expectancy","Rank","Percentile","5-year Trend","10-year Trend","20-year Trend"]];
		for( let country of worldData )
		{
			let row = [];
			row.push(country["geo.name"]);
			row.push(country[year]);
			
			let over = 0;
			let under = 0;
			for( let c of time.worldData )
				if( c[year] > country[year] )
					over++;
				else
					under++;
			row.push(over+1);
			row.push( Math.round(99.5-(over+1)/(over+under)*100) );
				
			let trend5 = (year < 1805 ? "" : ""+(Math.round(100*(country[year] - country[year-5]))/100));
			if(parseFloat(trend5) > 0) trend5 = "+" + trend5;
			row.push(trend5);
			let trend10 = (year < 1810 ? "" : ""+(Math.round(100*(country[year] - country[year-10]))/100));
			if(parseFloat(trend10) > 0) trend10 = "+" + trend10;
			row.push(trend10);
			let trend20 = (year < 1820 ? "" : ""+(Math.round(100*(country[year] - country[year-20]))/100));
			if(parseFloat(trend20) > 0) trend20 = "+" + trend20;
			row.push(trend20);
			
			data.push(row);
			
		}
//console.log(data);	  
		d3.select("#infotable").selectAll("tr").remove();

		if( worldData != null && worldData.length > 0 )
		{
			d3.select("#infotable").selectAll("tr").remove();
		  
			//setup table
			d3.select("#infotable").selectAll("tr")
				.data(data)
				.enter()
				.append("tr")
			;
			  
			d3.select("#infotable").selectAll("tr").selectAll("td")
				.data( d => d )//function(d) { console.log(d); let a = []; a.push(d); return a; } )
				.enter()
				.append("td")
				.html( d => d )
			;
		}  
	  
	}

}
