;
(function(){
	'use strict';

	var options = {
		multipleDate : true,
		minDate: '8/10/2015',
		maxDate: '8/3/2016',
		// format : 'mm.dd-yy',
		animation: 'flipInY',
		headingBackground: '#223922',
		bodyBackground: '#796423',
		format: 'd MM, yy'	
	}

	$('#date').datePick(options);
	$('#date1').datePick();
})();
