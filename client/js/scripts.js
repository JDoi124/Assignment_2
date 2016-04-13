(function($){
	$(function(){	
      // scroll is still position
			var scroll = $(document).scrollTop();
			var headerHeight = $('.page-header').outerHeight();
			//console.log(headerHeight);
			
			$(window).scroll(function() {
				// scrolled is new position just obtained
				var scrolled = $(document).scrollTop();
								console.log("scrolling");
				// optionally emulate non-fixed positioning behaviour
			
				if (scrolled > headerHeight){
					$('.page-header').addClass('off-canvas');
				} else {
					$('.page-header').removeClass('off-canvas');
				}

			    if (scrolled > scroll){
			         // scrolling down
					 $('.page-header').removeClass('fixed');
			      } else {
					  //scrolling up
					  $('.page-header').addClass('fixed');
			    }				
				 
				scroll = $(document).scrollTop();	
			 });
    
    
 	});
})(jQuery);

// Referenced from http://codepen.io/andykleeman/pen/rgbdp


$(document).ready(function() {
	
	$.getJSON("data.json", function (dataObjects) {
        main(dataObjects);
    });
});


function main(dataObjects){

	function addAll() {

		$("#gallery").empty();

		dataObjects.forEach(function(data) {

			
			var $div = $("<div>");
			$div.addClass("node");

			var $imgdiv = $("<div>");
			$imgdiv.addClass("imgbox");

			
			var $img = $("<img>");
			$img.attr("src", data.image);

			
			var $title = $("<h1>");
			$title.addClass("title");
			$title.html(data.title);

			
			var $quote = $("<p>");
			$quote.addClass("userquote");
			$quote.html(data.quote);

			$imgdiv.append($img);
			$div.append($imgdiv);
			$div.append($title);
			$div.append($quote);

		
			$("#gallery").append($div);

		});
$("#gallery").append("<div class='clearfix'></div>");
	}
	
	
	addAll();

	$("#form").submit(function(e) {
		e.preventDefault();
		
		var formObj = $(this);
	    var formURL = formObj.attr("action");
	    var formData = new FormData(this);

	    $.ajax({
	        url: formURL,
	    	type: 'POST',
	        data:  formData,
	    	mimeType:"multipart/form-data",
	    	contentType: false,
	    	dataType: "json",
	        cache: false,
	        processData:false,
	    	success: function(result){
	 		
		 		console.log(result);

	            
	            dataObjects.push(result);

	            
	            addAll();
			
				
				$("#overlay").click();
	    	}          
	    });
	   
	});

	// $("#submit").on("click", function() {
	// 	$("#form").submit()
	// });

	//submit form if user hits enter
	$("input[name=quote]").on("keydown", function(event) {
		// check for keycode 13 (the enter key)
		if (event.which == 13){
			$("#submit").click();
		}
	});

	//download here
	$("#download").on("click", function(e) {
		e.preventDefault();
		var dataDownload = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObjects));
		$("#download").attr("href", "data:" + dataDownload);
		window.location = document.getElementById('download').href
	});

	
}

$("#add").on("click", function(e) {
	e.preventDefault();
	$("#modal").fadeIn();
	$("#overlay").fadeIn();
});

$("#overlay").on("click", function() {
	$("#modal").fadeOut();
	$(this).fadeOut();
});