// User Interface Scripts //


// Input data correction//

		
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
