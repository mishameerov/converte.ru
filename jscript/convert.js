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


var the_object;
var http_request = new XMLHttpRequest();
http_request.open( "GET", "./json/factor.json", true );
http_request.send(null);
http_request.onreadystatechange = function () {
    if ( http_request.readyState == 4 ) {
        if ( http_request.status == 200 ) {
            the_object = JSON.parse(http_request.responseText);
        } else {
            alert( "There was a problem with the URL." );
        }
        http_request = null;
    }
};

// Input data correction //
function convert(input){

	// Factor calculation
	var factor=(input.value / tableOfFactors["n"]);
	
	
};




// Hide rare positions //

// $(document).ready(function(){

//       $("#pseudolink").click(function () {
//       $("#hided_objects").slideToggle("slow");
//    });

// });


