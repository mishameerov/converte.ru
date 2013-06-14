/* это будет проверка кеша		
if (typeof(localStorage.lastUpdateDate) != 'string') || (Date.parse(localStorage.lastUpdateDate)-Date() > 86400000){ //проверка существования кеша и последней даты изменения
	//если кешу больше суток (86400000 милисекунды)
	localStorage.lastUpdateDate = Date();
	loadJSONtoObject();
	localStorage.the_object = the_object;
}else{ //если кеш свежий
	the_object = localStorage.the_object;
}
*/

$(document).ready(function(){ //основная функция, выполняется при загрузке
	loadJSONtoObject();
});



function loadJSONtoObject(){ //загрузка объекта
	tempGet = $.getJSON("./array.json", function(){ 
		the_object = JSON.parse(tempGet.responseText);
		drawPages();
		defaultParametres();
	});
};

function morphNums(val, id){
	status = '';
	val = Math.abs(val);
	if ((val-Math.floor(val) != 0) || (val.toString().charAt(val.toString().length-4)) == 'e'){
		status = 'genitive_signular';
	} else {
		val1 = parseInt(val.toString().charAt(val.length-1));
		val10 = parseInt(val.toString().charAt(val.length-2));
		switch (val10){
			case 1:
				status = 'genetive-plural'
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

function defaultParametres(){ //установка обработчиков, вычисление параметров по умолчанию и вызов тригеров  
	$('.nav_item').on('click', menuClick); //обработчик клика по элементам меню
	$('.values_container').on('input propertychange', mainFunction); //обработчик изменения текстовых полей
	$('#navigation').attr('class', 'nav scrollyeah'); //инициализация меню
	defaultPageId = '#'+the_object.defaultPageId; //вычисление и вызов элемента меню по умолчанию
	$(defaultPageId).click();
	if (document.location.hash != "") $(document.location.hash).click();
};

function menuClick(event){ //клик по элементу меню
	$('.values_container').css('display', 'none'); //выключаем все элементы
	$('.nav_href').attr('href', '#'+$('#nav-href-len').parent().attr('id'));
	$('.current').attr('class', 'label');

	m = event.currentTarget.id; //Включаем тот, на котором сработало событие
	$('#nav-label-'+m).attr('class', 'label current');
	$('#'+m+'-container').css('display', 'block');
	$('.values_container').masonry( 'reload' );
	$('#nav-href-'+m).attr('href', null);
	document.location.hash = '#'+m;
};

function mainFunction(keyboardEvent){
	digitsCorreection(keyboardEvent.target);
	calculate(keyboardEvent.target);
};

function calculate(valField){
	var	currentValue = parseFloat(valField.value.split(',').join('.'));
	var	condArray = valField.id.split('-', 3);
	var condFactor = parseFloat(the_object[condArray[0]][condArray[1]][condArray[2]]['factor']);
	$('#'+condArray[0]+'-container input.field').each(function(indx, domEl){
		if (domEl.id != valField.id){
			var resArray = domEl.id.split('-', 3);
			var resFactor = parseFloat(the_object[resArray[0]][resArray[1]][resArray[2]]['factor']);
			var result = "";
			result = (currentValue/condFactor*resFactor);
			this.value = result;
		 	morphNums(domEl.value, domEl.id)

		} 
	});
};

function digitsCorreection(field){
	var isComma=false
	field.value = field.value.replace(/[^0-9,\\.]/g, '');
	field.value = field.value.replace(/[\\.]/g, ',');
	field.value = field.value.replace(/,|\\./g, function(){
		if (isComma == false) {
			isComma = true
			return ','
		}else{
			return ''
		}
	});
};

function drawPages(){ //отрисовка страниц 
	pagesArray = [];
	for (var key in the_object){
		if (typeof(the_object[key]) == "object"){
			createMenu(key, the_object[key]['name'], the_object[key]['default'])
			createPage(key, the_object[key]['default']);
			for (var key2 in the_object[key]){
				if (typeof(the_object[key][key2]) == "object"){
					createBlocks(key, key2, the_object[key][key2]['name']);
					for (var key3 in the_object[key][key2]){
						if (typeof(the_object[key][key2][key3]) == "object"){
							createFields(key, key2, key3, the_object[key][key2][key3]['main'], the_object[key][key2][key3]['name']['nominative_singular'], the_object[key][key2][key3]['name']['additional'], the_object[key][key2][key3]['factor'])
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
				columnWidth : 320,
				isAnimated: true,
				animationOptions: {
					duration: 400,
					queue: false,
				}
			});
		}
	}
};

function createMenu(pid, pname, isDefault){ //создание элемента меню (надо переписать на jquery)
	var navDiv = document.createElement('div');
		navDiv.className = 'nav_item';
		navDiv.id = pid;
	var navHref = document.createElement('a');
		navHref.className = 'nav_href'
		navHref.id = 'nav-href-'+pid;
		navHref.value = pid;
	var iconDiv = document.createElement('div');
		iconDiv.className = 'icon';
		iconDiv.id = 'nav-icon-'+pid;
	var iconImg = document.createElement('img');
		iconImg.src = './img/nav-'+pid+'.png';
	var labelDiv = document.createElement('div');
		labelDiv.className = 'label';
		labelDiv.id = 'nav-label-'+pid;
	var textDiv = document.createElement('div');
		textDiv.className = 'text';
		textDiv.id = 'nav-text-'+pid;
		textDiv.innerHTML = pname;
	var navMenu = document.getElementById('navigation');
		navMenu.appendChild(navDiv);
		navDiv.appendChild(navHref);
		navHref.appendChild(iconDiv);
		navHref.appendChild(labelDiv);
		iconDiv.appendChild(iconImg);
		labelDiv.appendChild(textDiv);
};

function createPage(pid, isDefault){ //создание контейнера (надо переписать на jquery)
	var valContainer = document.createElement('div');
		valContainer.className = 'values_container';
		valContainer.id = pid+'-container';
		if (isDefault == false){
			valContainer.style.display = 'none';
		};
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
		if (main == true){field.className = 'field toggle'}
	var demen = document.createElement('span');
		demen.className = "demension";
		demen.id = pid+'-'+bid+'-'+fid+'-dem';
		demen.innerHTML = '&nbsp;'+name;
	var block = document.getElementById(pid+'-'+bid);
		block.appendChild(field);
		block.appendChild(demen);
};