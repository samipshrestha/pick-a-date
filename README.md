# pick-a-date
Its a date picker with custom options

USAGE

	1. Just include date-picker.css, fonts.css, animation.css and date-pick.js to your HTML file
	2. Copy fonts folder to your project for custom fonts
	3. Copy images folder to your project
	4. Call datePick with your desired element selector
		eg: $('#yourSelector').datePick();
	5. And its ready to use

FEATURES

	You can use different features of date picker by sending an object to date picker as argument. eg:

	 	var options = {
			multipleDate : true,
			minDate: '8/10/2015',
			maxDate: '8/3/2016',
			format : 'mm-dd-yy',
			animation: 'bounceIn'
		}

		$('#yourSelector').datePick(options);

	The different types of feature are:

		Multiple Date:
			If set to true you can select multiple date from date picker.

		Minimum Date:
			If defined the date older than the minimum dates are disabled.

		Maximum Date:
			If defined the date later than the maximum dates are disabled.

		Date formats 
			You can get different types of date format by passing the argument format. 
			The different types of available date format are:

			1. dd/mm/yy (08/12/2014) 
			2. mm/dd/yy (08/24/2019) 
			3. dd-mm-yy (08-12-2014) 
			4. mm-dd-yy (08-24-2019) 
			5. yy-mm-dd (2014-12-15)
			6. d M, yy  (8 Feb, 2016)
			7. d MM, yy (8 February, 2016)

		Animation 
			There are two animations available for selection
				1.bounceIn
				2.flipInY


