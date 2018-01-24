$(document).ready(function()
{
	$("#get").click(function()
	{
		var city=$("#city").val();
		var code=$("#countryCode").val();
		if (city.length>1)
		{
			var urlLink='http://api.openweathermap.org/data/2.5/weather?q=';
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
				},
				type: 'GET'
			});
		}
	});
});