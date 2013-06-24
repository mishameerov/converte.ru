$(document).ready(function () { //основная функция, выполняется при загрузке
	var tempGet = $.getJSON("./array.json", function(){ 
		the_object = JSON.parse(tempGet.responseText);
		drawPages();
		defaultParametres();
		$(window).resize();
	});
});


function defaultParametres(){ //установка обработчиков, вычисление параметров по умолчанию и вызов тригеров  
	$('.nav_item').on('click', menuClick); //обработчик клика по элементам меню
	$('.values_container').on('input', mainFunction); //обработчик изменения текстовых полей (убрал событие propertychange, надо проверить на ie)
	$('.field').on('mouseup', function(){ //обработчик — выделяем весь текст в поле по поднятию кнопки мыши
		$(this).select()
	});
	$('#navigation').attr('class', 'nav scrollyeah'); //инициализация меню
	$('#slide-minor').on('click', slideMinor);
	if(localStorage.lastMenuItem != ""){ //вычисление и вызов элементов по умолчанию
		defaultPageId = localStorage.lastMenuItem;
	} else {
		defaultPageId = '#'+the_object.defaultPageId;
		defaultField = '#'+the_object.defaultFieldId;
		defaultValue = Math.ceil(Math.random()*12);
	};
	$(defaultPageId).click();
};

function menuClick(eventNav){ //клик по элементу меню
	//выключаем все элементы меню
	activeMenu = eventNav.currentTarget.id;
	$('.values_container').css('display', 'none'); 
	$('.current').attr('class', 'label');
	$('.label').css('cursor', 'pointer');
	
	//Включаем тот, на котором сработало событие
	$('#nav-label-'+activeMenu).attr('class', 'label current');
	$('#nav-label-'+activeMenu).css('cursor', 'ew-resize');
	$('#'+activeMenu+'-container').css('display', 'block');
	$('.values_container').masonry( 'reload' );
	$('#nav-href-'+activeMenu).attr('href', null);
	localStorage.lastMenuItem = '#'+activeMenu;
	var temp = $('#'+localStorage[activeMenu+'-lastField'])[0];
	temp.value = localStorage[activeMenu+'-lastValue'];
	$(temp).trigger('input').focus();
};



function drawPages(){ //отрисовка страниц 
	pagesArray = [];
	for (var key in the_object){
		if (typeof(the_object[key]) == "object"){
			createMenu(key, the_object[key]['name'], the_object[key]['default'])
			createPage(key);
			for (var key2 in the_object[key]){
				if (typeof(the_object[key][key2]) == "object"){
					createBlocks(key, key2, the_object[key][key2]['name']);
					for (var key3 in the_object[key][key2]){
						if (typeof(the_object[key][key2][key3]) == "object"){
							createFields(key, key2, key3, the_object[key][key2][key3]['hidden'], the_object[key][key2][key3]['name']['nominative_singular'], the_object[key][key2][key3]['name']['additional'], the_object[key][key2][key3]['factor'])
							for (var key4 in the_object[key][key2][key3]){
								if (typeof(the_object[key][key2][key3][key4]) == "object"){
									for (var key5 in the_object[key][key2][key3][key4]){

									}
								}
							}
						}	
					}		
				}		
			}
			$(pagesArray[pagesArray.length-1]).masonry({ //применение massonry к контейнерам
				itemSelector : '.values_block',
				columnWidth : 380,
				isAnimated: false,
				animationOptions: {
					duration: 400,
					queue: false,
				}
			});
		}
	}
};



function createMenu(pid, pname, isDefault){ //создание элемента меню (надо переписать на jquery)
	var navDiv = $('<div>', {
		id: pid,
		class: 'nav_item'
	});
	var navHref = $('<a>', {
		class: 'nav_href',
		id: 'nav-href-'+pid,
		value: pid
	});

	var iconDiv = $('<div>', {
		class: 'icon',
		id: 'nav-icon-'+pid
	});

	var iconImg = $('<img>', {
		src: './img/nav-'+pid+'.png',
		width: '32px',
		height: '32px'
	});
	
	var labelDiv = $('<div>', {
		class: 'label',
		id: 'nav-label-'+pid
	});
	var textDiv = $('<div>', {
		class: 'text',
		id: 'nav-text-'+pid,
		html: pname
	});

		$('.scrollyeah__shaft').append(navDiv);
		$(navDiv).append(navHref);
		$(navHref).append(iconDiv).append(labelDiv);
		$(iconDiv).append(iconImg);
		$(labelDiv).append(textDiv);
};

function createPage(pid){ //создание контейнера (надо переписать на jquery)
		var valContainer = document.createElement('div');
		valContainer.className = 'values_container';
		valContainer.id = pid+'-container';
		var mainContainer = document.getElementById('main-container');
		pagesArray.push(valContainer.id);
		mainContainer.appendChild(valContainer);
		pagesArray.push('#'+pid+'-container');
};

function createBlocks(pid, bid, bname){ //создание блока (надо переписать на jquery)
	var block = document.createElement('div');
		block.className = 'values_block';
		block.id = pid+'-'+bid;
	var header = document.createElement('h2');
		header.innerHTML = bname;
	var valContainer = document.getElementById (pid+'-container');
		valContainer.appendChild(block);
		block.appendChild(header);
};

function createFields(pid, bid, fid, main, name, add, factor){ //создание поля ввода (надо переписать на jquery)
	var field = document.createElement('input');
		field.id = pid+'-'+bid+'-'+fid;
		field.type = 'text';
		field.value = factor;
		field.className = 'field';
		field.name = pid+'-'+bid+'-'+fid;
		if (main == true){field.className = 'field hideble'}
	var demen = document.createElement('span');
		demen.className = "demension";
		if (main == true){demen.className = 'demension hideble'}
		demen.id = pid+'-'+bid+'-'+fid+'-dem';
		demen.innerHTML = '&nbsp;'+name;
	var block = document.getElementById(pid+'-'+bid);
		block.appendChild(field);
		block.appendChild(demen);
};



function mainFunction(keyboardEvent){
	digitsCorreection(keyboardEvent.target);
	calculate(keyboardEvent.target);
};

function digitsCorreection(field){
	var isComma=false
	field.value = field.value.replace(/[^0-9-,\\.\\+]/g, '');
	field.value = field.value.replace(/[\\.]/g, ',');
	field.value = field.value.replace(/,|\\./g, function(){
		if (isComma == false) {
			isComma = true
			return ','
		}else{
			return ''
		}
	});
	localStorage[activeMenu+'-lastField'] = field.id;
	localStorage[activeMenu+'-lastValue'] = field.value;
};

function calculate(valField){
	var	currentValue = parseFloat(valField.value.split(',').join('.'))*1000000;
	var	condArray = valField.id.split('-', 3);
	var condFactor = parseFloat(the_object[condArray[0]][condArray[1]][condArray[2]]['factor']);
	$('#'+condArray[0]+'-container input.field').each(function(indx, domEl){
			var resArray = domEl.id.split('-', 3);
			var resFactor = parseFloat(the_object[resArray[0]][resArray[1]][resArray[2]]['factor'])*1000000;
			var result = (currentValue*resFactor/condFactor)/1000000000000;
			resultText = (+result.toPrecision(7)).toString();
			resultText = resultText.split('.').join(',');
			if (this.id != valField.id) this.value = resultText;
		 	morphNumsRus(this.value, this.id)
	});
};

function morphNumsRus(val, id){
	var status = '';
	var val = Math.abs(val);
	if ((val-Math.floor(val) != 0) || (val.toString().charAt(val.toString().length-4)) == 'e'){
		status = 'genitive_signular';
	} else {
		var val1 = parseInt(val.toString().charAt(val.toString().length-1));
		var val10 = parseInt(val.toString().charAt(val.toString().length-2));
		switch (val10){
			case 1:
				status = 'genetive_plural'
			break
			default:{
				switch(val1){
					case 1:
						status = 'nominative_singular'
					break
					case 2:
					case 3:
					case 4:
						status = 'genitive_signular'
					break
					default:
						status = 'genetive_plural'					
				}
			}
		}
	}
	var lnk = id.split('-', 3);
	var decl = the_object[lnk[0]][lnk[1]][lnk[2]]['name'][status];
	$('#'+id+'-dem').html('&nbsp;'+decl);
};

function slideMinor(){
	$('.hideble').toggle();
	$('.values_container').masonry( 'reload' );
};

function roundTo(value, precision){
	var precision_number = Math.pow(10, precision);
	return Math.round(value * precision_number) / precision_number;
};

(function($) { //прелоадер картинок
  var temp = [];
  $.imgPreload = function() {
    for (var i = arguments.length; i--;) {
      var currentImage = document.createElement('img');
      currentImage.src = arguments[i];
      temp.push(currentImage);
    }
  }
})(jQuery)

function restuctureLayout (total, colW){
	var min = 10;
	var n = Math.floor(total/(colW*min));
	var x = (total-colW*n) / (2*n+1);

}
