// Core Scripts //

// XMLHTTPRequest //
function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}


function tableOfFactorsInit(){
	var req = new getXmlHttp();
	req.open("GET", "./json/factor.json", true);
	req.onreadystatechange = function parsURL(){
		if (req.readyState == 4){
			if(req.status == 200) {
				var table = JSON.parse(req.responseText);
			}
		}
	};
	req.send(null);
};

// Input data correction//
function convert(input){

	// Factor calculation
	var factor=(input.value/tableOfFactors.[input.name]);
	
	
};




// Hide rare positions //

// $(document).ready(function(){

//       $("#pseudolink").click(function () {
//       $("#hided_objects").slideToggle("slow");
//    });

// });



