function createMenu(pid, pname, isDefault){
	var navDiv = document.createElement('div');
		navDiv.className = 'nav_item';
		navDiv.id = 'nav-' + pid;
	var navHref = document.createElement('a');
		navHref.id = 'nav-href-'+pid;
	var iconDiv = document.createElement('div');
		iconDiv.className = 'icon';
		iconDiv.id = 'nav-icon-'+pid;
	var iconImg = document.createElement('img');
		iconImg.src = "./img/nav-"+pid+".png";
	var labelDiv = document.createElement('div');
		labelDiv.className = 'label';
		labelDiv.id = 'nav-label-'+pid;
	var textDiv = document.createElement('div');
		textDiv.className = 'text';
		textDiv.id = 'nav-text-'+pid;
		textDiv.innerHTML = pname;
	var navMenu = document.getElementsByClassName('scrollyeah__shaft')[0];
		navMenu.appendChild(navDiv);
		if (isDefault == false){
			navDiv.appendChild(navHref);
			navHref.appendChild(iconDiv);
			navHref.appendChild(labelDiv);
		}else{
			navHref.href = "#"+pid;
			labelDiv.className = 'label current';
			navDiv.appendChild(iconDiv);
			navDiv.appendChild(labelDiv);
		}
		iconDiv.appendChild(iconImg);
		labelDiv.appendChild(textDiv);
}

function createPage(pid, isDefault){
	var valContainer = document.createElement('div');
		valContainer.className = 'values_container';
		valContainer.id = pid+'-container';
		if (isDefault == false){
			valContainer.style.display = 'none';
		} 
	var mainContainer = document.getElementById('main-container');
	mainContainer.appendChild(valContainer)
}

function createBlocks(pid, bid, bname){
	var block = document.createElement('div');
		block.className = "values_block";
		block.id = pid+'-'+bid;
	var header = document.createElement('h2');
		header.innerHTML = bname;
	var valContainer = document.getElementById (pid+'-container');
		valContainer.appendChild(block);
		block.appendChild(header);
}

function createFielsd(pid, bid, fid, main, name, add){
	var field = document.createElement('input');
		field.id = key+'-'+key2+'-'key3;
		field.type = 'text';
		field.value = 0;
		field.className = 'field';
		field.onkeyup = 'return digCorr(this);';
		field.onchange = 'return digCorr(this);';
		field.name = key+'-'+key2+'-'+key3;
		if (main == true){field.className = 'field toggle'}
	var demen = document.createElement('span');
		demen.className = "demension";
		demension.innerHTML = name;
	var block = getElementById(pid+'-'+bid);
		block.appendChild(field);
		block.appendChild(span);
}



for (var key in the_object){
	if (typeof(the_object[key]) == "object"){
		createMenu(key, the_object[key]['default'])
		createPage(key, the_object[key]['name'], the_object[key]['default']);
		for (var key2 in the_object[key]){
			if (typeof(the_object[key][key2]) == "object"){
				createBlocks(key, key2, the_object[key][key2]['name'])
				for (var key3 in the_object[key][key2]){
					if (typeof(the_object[key][key2][key3]) == "object"){
						createFielsd(key, key2, key3, the_object[key][key2][key3]['main'], the_object[key][key2][key3]['name']['ominative-singular'], the_object[key][key2][key3]['name']['additional'])
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
	}
}



