$(document).ready(function() {
	$('.btn1').mouseover(function(){
		$('.j1').fadeIn()
		$('.j2').fadeOut()
		$('.j3').fadeOut()
		});
	$('.btn2').mouseover(function(){
		$('.j1').fadeOut()
		$('.j2').fadeIn()
		$('.j3').fadeOut()
		});
	$('.btn3').mouseover(function(){
		$('.j1').fadeOut()
		$('.j2').fadeOut()
		$('.j3').fadeIn()
		
		
		});
	
	
    


$('nav>ul>li').mouseenter(function(){
	$(this).children('.sub').stop().slideDown()
	
	});
	
	$('nav>ul>li').mouseleave(function(){
	$(this).children('.sub').stop().slideUp()
	
	});
	
	
});




//$(document).ready(function() {
//	$('.li_shop').mouseover(function(){
//		$( '.sub_shop').toggle()
//		
//		});
//	
//	$('.li_community').mouseover(function(){
//		$( '.sub_community').toggle()
//		
//		});
//	$('.li_shop').mouseover(function(){
//		$( '.sub_shop').toggle()
//		
//		});	
//	$('.li_custom').mouseover(function(){
//		$( '.sub_custom').toggle()
//		
//		});	
//	$('.li_intro').mouseover(function(){
//		$( '.sub_intro').toggle()
//		
//		});		
//	
//	
//	});