/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-04-30 19:21:53
 * @version $Id$
 */

 /** datepicker 日期组件开发
  *	日期对象：new Date(year,month-1,date)
  *			getFullYear()/getMonth()/getDate()
  *			getDay()方法可返回表示星期的某一天的数字
  *	当月第一天 new Date(year,month-1,1)
  *	当月最后一天 new Date(year,month,0)
  *
  *
  */

 (function(){
 	var datepicker = {};
 	datepicker.getMonthData = function(year,month){

 		var ret = [];	//存放当前月份的日期
 		if (!year || !month) {
 			var today = new Date();
 			year = today.getFullYear(); //获取当前年份
 			month = today.getMonth() + 1; //获取当前月份

 		}
 		var firstDay = new Date(year,month-1,1);	//当前月份的第一天
 		var firstDayWeekDay = firstDay.getDay();	//当前月份中的第一天是周几
 		if(firstDayWeekDay == 0) firstDayWeekDay = 7;

 		year = firstDay.getFullYear();
 		month = firstDay.getMonth() + 1;

 		var lastDayOfLastMonth = new Date(year,month-1,0);	//获取上一个月的最后一天
 		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
 		var preMonthDayCount = firstDayWeekDay - 1;

 		var lastDay = new Date(year,month,0);
 		var lastDate = lastDay.getDate();
 		for (var i = 0; i < 7 * 6 ; i++) {
 			var date = i + 1 - preMonthDayCount; //当前的日期是第几天
 			var showDate = date;
 			var thisMonth = month;

 			if(date <= 0){
 				//上一月
 				thisMonth = month - 1;
 				showDate = lastDateOfLastMonth + date;
 			}else if(date > lastDate){
 				//下一月
 				thisMonth = month + 1;
 				showDate = showDate - lastDate;
 			}

 			if(thisMonth === 0) thisMonth = 12;
 			if(thisMonth === 13) thisMonth = 1;

 			ret.push({

 				month:thisMonth,
 				date:date,
 				showDate:showDate
 			});
 		}
 		return {
 			year: year,
 			month: month,
 			days: ret
 		};
 	};


 	window.datepicker = datepicker;

 })();

