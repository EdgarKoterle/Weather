$(document).ready(function()
{
	$("#get").click(function()
	{
		var city=$("#city").val();
		var code=$("#countryCode").val();
		if (city.length>1)
		{
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
					//chyba
				},
				dataType: 'json',
				success: function(data)
				{
					console.log("temp: "+data.main.temp);
					console.log("desc: "+data.weather[0].description);

					$('#detailsTable').empty();
                	var table=$('<table/>');
                	var tr=getLine('City:', city);
                	table.append(tr);
                	$('#detailsTable').append(table);
                
                	tr=getLine('Country: ', data.sys.country);
                	table.append(tr);
                
                	tr=getLine('Temperature:', parseFloat(data.main.temp-273.15).toFixed(1)+" ℃");
                	table.append(tr);
                
                	tr=getLine('Humidity:', data.main.humidity+" %");
                	table.append(tr);
                
                	tr=getLine('Description:', data.weather[0].description);
                	table.append(tr);
                
                	tr=getLine('Pressure:', data.main.pressure+' hPa');
                	table.append(tr);
                
                	if ($("#details").is(":checked") == true)
                	{
                    	tr=getLine('Sunrise:', new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
                    	table.append(tr);
                    
                    	tr=getLine('Sunset:', new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
                    	table.append(tr);
                    
                    	tr=getLine('Wind:', data.wind.speed+' m/s');
                    	table.append(tr); 
                    
                    	tr=getLine('Min. temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" ℃");
                    	table.append(tr);
                    
                    	tr=getLine('Max. temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" ℃");
                    	table.append(tr);
                    
                    	tr=getLine('Min. temperature:', new Date(data.visibility*1000).getHours()+':'+new Date(data.visibility*1000).getMinutes());
                    	table.append(tr);
					};
				},
				type: 'GET'
			});
		}
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