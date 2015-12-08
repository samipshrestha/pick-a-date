;
(function($){
	'use strict';

	var newDate = new Date(),
	currentYear = newDate.getFullYear(),
	currentMonth = newDate.getMonth(),
	currentDate = newDate.getDate(),

	// Days name label in order
	daysLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],

	// Month name labels in order
	monthsLabels = ['January', 'February', 'March', 'April',
                     	'May', 'June', 'July', 'August', 'September',
                     	'October', 'November', 'December'],	
 	// Min Month name labels in order
	monthsLabelsMin = ['Jan', 'Feb', 'Mar', 'Apr',
                     	'May', 'Jun', 'Jul', 'Aug', 'Sep',
                     	'Oct', 'Nov', 'Dec'],	

	/**
	 * [daysInMonth calculates total days in a month]
	 * @param  {[int]} month [month value]
	 * @param  {[int]} year  [year valur]
	 * @return {[int]}       [returns total days]
	 */
	daysInMonth = function(month,year) {
	    return new Date(year, month, 0).getDate();
	}

	var AppendDate = {
		/**
		 * [setTable sets table to be appended]
		 * @param {[DOM element]} $datePicker [datepicker element]
		 * @param {[DOM element]} _this       [calling element]
		 * @param {[object]} options     [all options]
		 */
		setTable : function( $datePicker, _this, options ){
			var $table = $("<table/>", {class: "datePicker-calendar",});
			$datePicker.append($table);
			$table = AppendDate.setDays( $table );
			$table = AppendDate.setDates( $table, _this, options );
			return $datePicker;
		},
		/**
		 * [getDateFormat description]
		 * @param  {[DOM element]} that    [clicked date element]
		 * @param  {[object]} options [all options]
		 * @return {[string]}         [date in format]
		 */
		getDateFormat : function( that, options){
			var dateFormat,
			fullDate = $(that).attr('date-value').split('/');

			if( options.format == 'dd/mm/yy' ){

				if(fullDate[0]>=1 && fullDate[0]<=9){
					fullDate[0] = '0'+ fullDate[0];
				}

				if(fullDate[1]>=1 && fullDate[1]<=9){
					fullDate[1] = '0'+ fullDate[1];
				}
				dateFormat = fullDate[0] + '/' + fullDate[1] + '/' + fullDate[2];
				return dateFormat;
			}

			else if( options.format == 'mm/dd/yy' ){
				if(fullDate[0]>=1 && fullDate[0]<=9){
					fullDate[0] = '0'+ fullDate[0];
				}

				if(fullDate[1]>=1 && fullDate[1]<=9){
					fullDate[1] = '0'+ fullDate[1];
				}

				dateFormat = fullDate[1] + '/' + fullDate[0] + '/' + fullDate[2]  ;
				return dateFormat;
			}

			else if( options.format == 'yy-mm-dd' ){

				if(fullDate[0]>=1 && fullDate[0]<=9){
					fullDate[0] = '0'+ fullDate[0];
				}

				if(fullDate[1]>=1 && fullDate[1]<=9){
					fullDate[1] = '0'+ fullDate[1];
				}

				dateFormat = fullDate[2] + '-' + fullDate[1] + '-' + fullDate[0]  ;
				return dateFormat;
			}

			else if( options.format == 'd M, yy' ){
				dateFormat = fullDate[0] + ' ' + monthsLabelsMin[ parseInt( fullDate[1] ) - 1]  + ', ' + fullDate[2]  ;
				return dateFormat;
			}

			else if( options.format == 'd MM, yy' ){
				dateFormat = fullDate[0] + ' ' + monthsLabels[ parseInt( fullDate[1] ) - 1]  + ', ' + fullDate[2]  ;
				return dateFormat;
			}

			else{
				console.log('The defined date format is not supported.');
				dateFormat = '';
				return dateFormat;
			}

		},
		/**
		 * [setValue returns value to calling element]
		 * @param {[DOM element]} _this   [calling element]
		 * @param {[DOM element]} that    [clicked date element]
		 * @param {[object]} options [all options]
		 */
		setValue : function( _this, that, options ){
			var dateInFormat = AppendDate.getDateFormat( that, options);
			if( options.multipleDate ){
				if( $(_this).val() !== '' )
				{
					$(_this).val( $(_this).val() + ', ' + dateInFormat );
				}

				else{
					$(_this).val( dateInFormat );
				}
			}

			else{
				$(_this).val( dateInFormat );
				DatePicker.removeDatePicker(_this);
			}
		},
		/**
		 * [setHeading sets month and year heading of date picker]
		 * @param {[DOM element]} $datePicker [datepicker element]
		 * @param {[DOM elemnt]} _this       [calling element]
		 * @param {[object]} options     [all options setting]
		 */
		setHeading: function( $datePicker, _this, options ){
			var $headingWrapper = $("<div/>", {class: "calendar-heading"}),
			$monthDiv = $("<div/>", {class: "month-title"}),
			$nextDiv = $("<div/>", {class: "next", title: "Next Month"}),
			$prevDiv = $("<div/>", {class: "prev", title: "Previous Month"});		    

			$monthDiv.text( monthsLabels[currentMonth] + ' ' + currentYear );

			$headingWrapper.append($prevDiv);
			$headingWrapper.append($monthDiv);
			$headingWrapper.append($nextDiv);

			$nextDiv.click(function(e){
				$datePicker.empty();

				if(currentMonth >= 11){
					currentMonth = 0;
					currentYear += 1;
				}
				else{
					currentMonth += 1;
				}

				$datePicker = AppendDate.setHeading($datePicker, _this, options);
				$datePicker = AppendDate.setTable($datePicker, _this, options);
			});

			$prevDiv.click(function(){

				$datePicker.empty();

				if(currentMonth <=0){
					currentMonth = 11;
					currentYear -= 1;
				}
				else{
					currentMonth -= 1;
				}

				$datePicker = AppendDate.setHeading($datePicker, _this, options);
				$datePicker = AppendDate.setTable($datePicker, _this, options);

			});

			return( $datePicker.append( $headingWrapper ) );
		},

		/**
		 * [setDates sets dates in datePicker]
		 * @param {[DOM elmemt]} $table  [table in which dates are to be set]
		 * @param {[DOM element]} _this   [calling elemnt]
		 * @param {[object]} options [all options available]
		 */
		setDates: function( $table , _this, options ){
			var fullStartDate,
			fullEndDate;

			if ( options.minDate ) {
				fullStartDate = options.minDate.split('/');
			};

			if ( options.maxDate ){
				fullEndDate = options.maxDate.split('/');
			};

			for (var i = 1; i <= (daysInMonth(currentMonth+1, currentYear)); i) {
				var $tr = $("<tr/>", {class: "row-" + i,}),
				firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

				for (var j = 1; j <=7; j++,i++) {
					var	$td = $("<td/>",{class: 'curr-month-date'});	

					//Adding blank dates for blank days of month
					if( i === 1 ){
						var previousMonthTotalDate = daysInMonth(currentMonth, currentYear),
						prevMonth = currentMonth,
						prevYear = currentYear;

						if(currentMonth <= 0){
							prevMonth = 12,
							prevYear = currentYear - 1 ;
						}

						for (var k = firstDayOfMonth-1; k >=0; k--) {

							var	$prevMonthDate = $("<td/>",{class: 'prev-month-date'});

							// For Start Date
							if( options.minDate )
							{
								if( prevYear < fullStartDate[2] ){
									$prevMonthDate.addClass('disabled');
								}

								else if( prevYear == fullStartDate[2] ){
									if( prevMonth < fullStartDate[1] ){
										$prevMonthDate.addClass('disabled');
									}

									else if( prevMonth == fullStartDate[1] ){
										if( (parseInt(previousMonthTotalDate)-k) < fullStartDate[0] ){
											$prevMonthDate.addClass('disabled');
										}
									}
								}
							}

							// For End date
							if( options.maxDate )
							{
								if( prevYear > fullEndDate[2] ){
									$prevMonthDate.addClass('disabled');
								}

								else if( prevYear == fullEndDate[2] ){
									if( prevMonth > fullEndDate[1] ){
										$prevMonthDate.addClass('disabled');
									}

									else if( prevMonth == fullEndDate[1] ){
										if( (parseInt(previousMonthTotalDate)-k) > fullEndDate[0] ){
											$prevMonthDate.addClass('disabled');
										}
									}
								}
							}

							$prevMonthDate.attr('date-value', (parseInt(previousMonthTotalDate)-k) + '/' + (prevMonth) + '/' + prevYear);

							$prevMonthDate.text( previousMonthTotalDate-k );
							$tr.append($prevMonthDate);
							j++;

							$prevMonthDate.on('click',function(e){
								if ( !$(e.target).hasClass('disabled') ){
									AppendDate.setValue( _this, this, options );	
								}
							});
						};
					}

					else if( i> daysInMonth(currentMonth+1, currentYear) ){
						var count = 1,
						nextMonth = currentMonth + 2,
						nextYear = currentYear;

						if(currentMonth >= 11){
							nextMonth = 1,
							nextYear = currentYear + 1 ;
						}

						for (var k = $tr.children().length; k < 7; k++,count++) {
							var	$nextMonthDate = $("<td/>",{class: 'next-month-date'});

							// For Start Date
							if( options.minDate )
							{
								if( nextYear < fullStartDate[2] ){
									$nextMonthDate.addClass('disabled');
								}

								else if( nextYear == fullStartDate[2] ){
									if( nextMonth < fullStartDate[1] ){
										$nextMonthDate.addClass('disabled');
									}

									else if( nextMonth == fullStartDate[1] ){
										if( count < fullStartDate[0] ){
											$nextMonthDate.addClass('disabled');
										}
									}
								}
							}

							// For End date
							if( options.maxDate )
							{
								if( nextYear > fullEndDate[2] ){
									$nextMonthDate.addClass('disabled');
								}

								else if( nextYear == fullEndDate[2] ){
									if( nextMonth > fullEndDate[1] ){
										$nextMonthDate.addClass('disabled');
									}

									else if( nextMonth == fullEndDate[1] ){
										if( count > fullEndDate[0] ){
											$nextMonthDate.addClass('disabled');
										}
									}
								}
							}

							$nextMonthDate.attr('date-value', (count + '/' + (nextMonth) + '/' + nextYear));

							$nextMonthDate.text( count );
							$tr.append($nextMonthDate);
							j++;

							$nextMonthDate.on('click',function(e){
								if ( !$(e.target).hasClass('disabled') ){
									AppendDate.setValue( _this, this, options );	
								}							
								
							});
						};
						break;
					}

					// Today class for today date
					if (i === currentDate) {
						var dateCheck = new Date();

						if(currentMonth === dateCheck.getMonth() && currentYear === dateCheck.getFullYear())
							$td.addClass('today');
					}

					// Red class for saturday
					if( j === 7 ){
						$td.addClass('red');
					}

					// For Start Date
					if( options.minDate )
					{
						if( currentYear < fullStartDate[2] ){
							$td.addClass('disabled');
						}

						else if( currentYear == fullStartDate[2] ){
							if( (parseInt(currentMonth)+1) < fullStartDate[1] ){
								$td.addClass('disabled');
							}

							else if( (parseInt(currentMonth)+1) == fullStartDate[1] ){
								if( i < fullStartDate[0] ){
									$td.addClass('disabled');
								}
							}
						}
					}

					// For End date
					if( options.maxDate )
					{
						if( currentYear > fullEndDate[2] ){
							$td.addClass('disabled');
						}

						else if( currentYear == fullEndDate[2] ){
							if( (parseInt(currentMonth)+1) > fullEndDate[1] ){
								$td.addClass('disabled');
							}

							else if( (parseInt(currentMonth)+1) == fullEndDate[1] ){
								if( i > fullEndDate[0] ){
									$td.addClass('disabled');
								}
							}
						}
					}

					$td.attr('date-value', i + '/' + (parseInt(currentMonth)+1) + '/' + currentYear);
					$td.text(i);
					$td.click(function(e){
						if ( !$(e.target).hasClass('disabled') ){
							AppendDate.setValue( _this, this, options );	
						}								
					});
					$tr.append($td);
				}

				$table.append($tr);
			};
			return($table);
		},
		/**
		 * [setDays sets day in datePicker]
		 * @param {[DOM element]} $table [table in which day is to be set]
		 */
		setDays: function( $table ){
			var $tr = $("<tr/>", {class: "col",});

			for (var i = 0; i < daysLabels.length; i++) {
				if(i == 6){
					var $th = $("<th/>",{class:'red'});
					$th.text(daysLabels[i]);
					$tr.append($th);
				}
				else{
					var $th = $("<th/>");
					$th.text(daysLabels[i]);
					$tr.append($th);
				}
				
			};

			$table.append($tr);
			return($table);
		}
	}

	var DatePicker = {
		/**
		 * [setDatePicker sets datepicker layout to be appended]
		 * @param {[DOM element]} _this   [calling element]
		 * @param {[object]} options [alloptions]
		 */
		setDatePicker : function(_this, options ){
			var $datePicker = $("<div/>", {class: "datePicker"});

			$datePicker = AppendDate.setHeading($datePicker, _this, options);
			$datePicker = AppendDate.setTable($datePicker, _this, options);

			$datePicker.insertAfter($(_this));

		  	$datePicker.animate({
				opacity:1
			},300);
		},

		/**
		 * [removeDatePicker removes datepicker]
		 * @param  {[DOM element]} _this [calling element]
		 */
		removeDatePicker : function(_this){
			$(_this).next('.datePicker').animate({
				opacity:0
			},150,function(){
				$(_this).next('.datePicker').remove();
			});
		}
	}

	/**
	 * [datePick is main function]
	 * @param  {[object]} options [options send by user]
	 * @return {[DOM element]}         [returns datePicker]
	 */
	$.fn.datePick = function( options ){
		var _this = this,
		defaultOption = {
          multipleDate : false,
		  format: 'dd/mm/yy'	
        },
        allOptions = $.extend(defaultOption, options);

		$(_this).focus(function(){
			if( $(_this).next('.datePicker').length <= 0 ){
				DatePicker.setDatePicker( _this, allOptions );
			}
		});

		$(document).click(function(e){

			var container = $(".datePicker");
		    if (!$(_this).is(e.target) && !container.is(e.target) // if the target of the click isn't the container...
		        && container.find('.' + e.target.classList[0]).length === 0 
		        && $(container).has(e.target).length === 0) // ... nor a descendant of the container
		    {
		        DatePicker.removeDatePicker(_this);
		    }
		});
	}

}( jQuery ));