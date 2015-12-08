;
(function(){
	'use strict';

	var options = {
		multipleDate : true,
		minDate: '8/12/2015',
		maxDate: '8/2/2016',
		// format: 'd MM, yy'	
	}

	$('#date').datePick(options);
	$('#date1').datePick();
})();