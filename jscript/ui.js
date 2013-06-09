// User Interface Scripts //


// Input data correction//
function digCorr(input){
	
	// Change comma to dot //
	if (event.keyCode == 190) { 
		event.keyCode = 188; 
	};
	// Only digits and comma  //
	input.value = input.value.replace(/[^\d,]/g, '');
	// test //
	n = input.name;
		
};	




/* Hide rare positions 

	$(document).ready(function(){

	$("#pseudolink").click(function () {
	$("#hided_objects").slideToggle("slow");
	});

	});
*/



$(function(){
  $('#values-container').masonry({
    // options
    itemSelector : '.values_block',
    columnWidth : 320,
    isAnimated: true,
    animationOptions: {
    duration: 400,
    queue: false,
  	}
  });
});
