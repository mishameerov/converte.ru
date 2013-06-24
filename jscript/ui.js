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
    columnWidth : 400,
    isAnimated: true,
    animationOptions: {
    duration: 200,
    queue: false,
  	}
  });
});
