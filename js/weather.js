var user_location = prompt("In which city do you live?", "Vancouver");

loadWeather(user_location, '');

function loadWeather(location, woeid) {
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather) {
			title = weather.title;
			currently = weather.currently;
			city = weather.city;
			temp = weather.temp;

			updated = weather.updated;
			todayHigh = weather.high;
			todayLow = weather.low;

			tmrHigh = weather.forecast[1].high;
			tmrLow = weather.forecast[1].low;
			
			aftertwoHigh = weather.forecast[2].high;
			aftertwoLow = weather.forecast[2].low;
			
			afterthreeHigh = weather.forecast[3].high;
			afterthreeLow = weather.forecast[3].low;
			
			after4High = weather.forecast[4].high;
			after4Low = weather.forecast[4].low;

			after5High = weather.forecast[5].high;
			after5Low = weather.forecast[5].low;
	        
	       	
			$(".city").html('Current temperature in '+ city + ' is ' + temp +'&deg;C');
			$(".chart-desc h2").text('Hover the bars to see the weather forecast');
			$(".updated").text(currently + ' in ' + city + '. Data was updated on '+updated);
			var highData = [todayHigh, tmrHigh, aftertwoHigh, afterthreeHigh, after4High, after5High];
			var lowData = [todayLow, tmrLow, aftertwoLow, afterthreeLow, after4Low, after5Low];
			var height = 200,
				width = 400,
				barWidth = 50,
				barOffset = 5;

		// yScale 
			var yScale = d3.scale.linear()
				.domain([0, d3.max(highData)]) // The bars will not work in cold places
				.range([0, height]) 

		// xScale 
			var xScale = d3.scale.ordinal()
				.domain(d3.range(0, highData.length))
				.rangeBands([0, width])
		// Tooltip
			var tooltip = d3.select('.chart-desc h2')
				.style('padding', '0 10px')
			
		// High Data Viz Bar
			d3.selectAll('#bar-chart-high').append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('background', 'black')
				.selectAll('rect').data(highData)
				.enter().append('rect')
					.style('fill', '#f03b20')
					.attr('width', xScale.rangeBand())
					
					.attr('height', function(d){
						return yScale(d);
					})
					
					.attr('x', function(d, i){
						return i * (xScale.rangeBand() + barOffset);
					})
					
					.attr('y', function(d){
						return height - yScale(d);
					})
				
				.on('mouseover', function(d, i){
					tooltip.transition()
						.style('opacity', .9)

					tooltip.html('On ' + weather.forecast[i].day + ':   Max ' + highData[i]+'&deg;'  + ' and Min ' + lowData[i]+'&deg;')

					d3.select(this)
						.style('opacity', .5)
					})

				.on('mouseout', function(d){
					d3.select(this)
						.style('opacity', 1)
					})
		// Low Data Viz Bar
			d3.selectAll('#bar-chart-low').append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('background', 'black')
				.selectAll('rect').data(lowData)
				.enter().append('rect')
					.style('fill', '#2b8cbe')
					.attr('width', xScale.rangeBand())
					.attr('height', function(d){
						return yScale(d);
						})
					.attr('x', function(d, i){
						return i * (xScale.rangeBand() + barOffset);
						})
					.attr('y', function(d){
						return height - yScale(d);
						})

				.on('mouseover', function(d, i){
					tooltip.transition()
						.style('opacity', .9)
					tooltip.html('On ' + weather.forecast[i].day + ':   Max ' + highData[i]+'&deg;'  + ' and Min ' + lowData[i]+'&deg;')

					d3.select(this)
						.style('opacity', .5)
					})
				.on('mouseout', function(d){
					d3.select(this)
						.style('opacity', 1)
					})
			},

		error: function(error) {
			$(".error").html('<p>' + error + '</p>');
		}
	});
};