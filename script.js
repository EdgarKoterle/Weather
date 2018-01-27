$(document).ready(function()
{
	var tr;
	var table;
	$("#more").hide();
	$("#less").hide();
	$("#get").click(function()
	{
		$("#less").hide();
		$("#moreDetails").hide();
		var city=$("#city").val();
		var code=$("#countryCode").val();
			var urlLink='https://api.openweathermap.org/data/2.5/weather?q=';
			urlLink=urlLink+city;

			if (code.length==2)
				urlLink=urlLink+','+code;

			urlLink=urlLink+'&appid=dd3d003b072c254def863bf7b0ba0b74';


			$.ajax(
			{
				url: urlLink,
				data: {format: 'json'},
				error: function()
				{
					$('#detailsTable').empty();
					$("#less").hide();
					$("#more").hide();
					var error=$('.error').text("Error! Make sure the correct form of city and country or try again later.");

				},
				dataType: 'json',
				success: function(data)
				{
					$('.error').empty();
					console.log("temp: "+data.main.temp);
					console.log("desc: "+data.weather[0].description);

					$('#detailsTable').empty();
                	table=$('<table class="table"/>');
                	tr=getLine('City:', data.name);
                	table.append(tr);
                	$('#detailsTable').append(table);
                
                	tr=getLine('Country: ', data.sys.country);
                	table.append(tr);
                
                	tr=getLine('Temperature:', parseFloat(data.main.temp-273.15).toFixed(1)+" °C");
                	table.append(tr);
                
                	tr=getLine('Humidity:', data.main.humidity+" %");
                	table.append(tr);
                
                	tr=getLine('Description:', data.weather[0].description);
                	table.append(tr);
                
                	tr=getLine('Pressure:', data.main.pressure+' hPa');
                	table.append(tr);

                	$("#more").show();
                
                	$("#more").click(function()
					{
						$('#moreDetails').empty();
						$('#moreDetails').show();
                		var table2=$('<table class="table"/>');
                		var tr2=getLine('Sunrise:', new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
                		table2.append(tr2);
                		$('#moreDetails').append(table2);
                    
                    	tr2=getLine('Sunset:', new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
                    	table2.append(tr2);
                    
                    	tr2=getLine('Wind:', data.wind.speed+' m/s');
                    	table2.append(tr2); 
                    
                    	tr2=getLine('Min. temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" °C");
                    	table2.append(tr2);
                    
                    	tr2=getLine('Max. temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" °C");
                    	table2.append(tr2);
                    
                    	tr2=getLine('Visibility:', data.visibility+' m');
                    	table2.append(tr2);

                    	tr2=getLine('Google map: ', "<a href=\"http://google.com/maps/search/?api=1&query="+data.coord.lat+","+data.coord.lon+"\"target=\"_blank\">View "+data.name+" on map</a>");
                    	table2.append(tr2)

                    	$("#more").hide();
                    	$("#less").show();
					});

					$("#less").click(function()
					{
						$("#moreDetails").hide();
						$("#less").hide();
						$("#more").show();
					});
				},
				type: 'GET'
			});
	});
					

	$('#city').keypress(function(e)
	{
      if(e.keyCode==13)
      	$('#get').click();
    });

	function getLine (data1, data2)
	{
		var tr=$("<tr/>");
		var td1=$("<td/>");
		$(td1).append(data1);
		var td2=$("<td/>");
		$(td2).append(data2);
		tr.append(td1);
		tr.append(td2);
		return tr;
	}
});