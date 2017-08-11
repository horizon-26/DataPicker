/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-05-01 15:19:00
 * @version $Id$
 */


 (function(){
 	var datepicker = window.datepicker;
 	var monthData;
 	var $wrapper;

 	//数据渲染
 	datepicker.buildUi = function(year,month){
 		monthData = datepicker.getMonthData(year,month);

 		var html = '<div class="ui-datepicker-header"> ' +
 		'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn" title="">&lt;</a> ' +
 		'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn" title="">&gt;</a> ' +
 		'<span class="ui-datepicker-curr-month"> ' + monthData.year + ' - ' + monthData.month +' </span> ' +
 		'</div> ' +
 		'<div class="ui-datepicker-body"> ' +
 		'<table> ' +
 		'<thead> ' +
 		'<tr> ' +
 		'<th>一</th> ' +
 		'<th>二</th> ' +
 		'<th>三</th> ' +
 		'<th>四</th> ' +
 		'<th>五</th> ' +
 		'<th>六</th> ' +
 		'<th>日</th> ' +
 		'</tr> ' +
 		'</thead> ' +
 		'<tbody> ';

 		for(var i = 0 ; i < monthData.days.length ; i++){
 			var date = monthData.days[i];
 			if( i % 7 === 0 ){
 				html += '<tr>';
 			}
 			html += '<td data-date = " '+ date.date +' ">' + date.showDate + '</td>';
 			if( i % 7 === 6){
 				html += '</tr>';
 			}
 		}

 		html += '</tbody> ' +
 		'</table> ' +
 		'</div>';
 		return html;
 	};

 	datepicker.render = function(direction){
 		var year,month;
 		if(monthData){
 			year = monthData.year;
 			month = monthData.month;
 		}

 		if(direction === 'prev') {
 			month--;
 			if(month === 0){
 				month = 12;
 				year--;
 			}
 		}
 		if(direction === 'next') month++;

 		var html = datepicker.buildUi(year,month);
 		if(!$wrapper){
 			$wrapper = document.createElement('div');
 			$wrapper.className = 'ui-datepicker-wrapper';
 		}

 		$wrapper.innerHTML = html;
 		document.body.appendChild($wrapper);
 	};

 	datepicker.init = function(input){
 		datepicker.render();
		var $input = document.querySelector(input); //获取input元素
		var isOpen = false; //定义面板显示状态：展开--隐藏(默认)

		//点击输入框--日期面板展开隐藏
		$input.addEventListener('click',function(){
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');

				var left = $input.offsetLeft; // 获取input输入框距左边的距离
				var top = $input.offsetTop;   //获取输入框顶部距离
				var height = $input.offsetHeight;//获取输入框的高度
				$wrapper.style.top = top + height + 2 + 'px'; //日期面板的顶部位置 =输入框顶部距离+输入框的高度
				$wrapper.style.left = left + 'px';

				isOpen = true;
			}
		},false);

		//月份切换
		$wrapper.addEventListener('click' , function(e){
			var $target = e.target;//直接点击的元素

			//:contains 选择器选取包含指定字符串的元素
			if(!$target.classList.contains('ui-datepicker-btn')){
				return;
			}

			//上一月
			if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');

			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		},false);
		//点击选择
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase() !== 'td') return;

			var date = new Date(monthData.year , monthData.month - 1 , $target.dataset.date);
			$input.value = format(date);

			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;

		},false);
	};


	function format(date){
		ret = '';

		var padding = function(num){
			if(num <= 9){
				return '0' + num;
			}
			return num;
		}
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());
		return ret;
	}
})();