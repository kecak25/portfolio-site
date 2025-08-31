/*$(function(){
	$('nav>ul>li').mouseenter(function(){
		$(this).children('.sub').stop.slideDown()
		
		});
		
	$('nav>ul>li').mouseleave(function(){
		$(this).children('.sub').stop.slideUp()
		});	
});*/
	

$(function(){
	$('nav>ul>li').mouseenter(function(){
	$(this).children('.sub').stop().slideDown()
	
	});
	
	$('nav>ul>li').mouseleave(function(){
	$(this).children('.sub').stop().slideUp()
	
	});
	/*모바일*/
	$('.tab').click(function(){
		$('nav').slideDown()
		$('.tab').hide()
		$('.close').show()
			});
	$('.close').click(function(){
		$('nav').slideUp()
		$('.close').hide()
		$('.tab').show()
			});		
		
		
	
	
	
	
});
	
