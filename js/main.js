;
(function(){
	'use strict';

	var options = {
		multipleDate : true,
		minDate: '8/10/2015',
		maxDate: '8/3/2016',
		format : 'mm-dd-yy',
		animation: 'bounceIn'
		// format: 'd MM, yy'	
	}

	$('#date').datePick(options);
	$('#date1').datePick();
})();