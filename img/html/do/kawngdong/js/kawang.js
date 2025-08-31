
$(function(){
	$('.pop_main').mouseenter(function(){
		$('.pop_main').stop().animate({
			right:0
		
		});
	
	});
	$('.pop_main').mouseleave(function(){
		$('.pop_main').stop().animate({
			right:-120
		
		});
		
	$('.a').stop().animate({
			width:0
			
		},150);	
	$('.b').stop().animate({
			width:0
		},150);
	
	});
	
	
	
	$('.popmenu1').mouseenter(function(){
	
		$('.pop_sub1').show()
		$('.pop_sub2').hide()
		
		$('.a').stop().animate({
			width:'43%'
			
		},150);	
		$('.b').stop().animate({
			width:0
		},150);
		
		
		$('.c').css('display','none').stop().animate({
			width:0
		},200)
		$('.d').css('display','block').animate({
			width:'57%'
		
		},200);
	
	});
	
	
	$('.popmenu1').mouseleave(function(){
	
		$('.pop_sub1').show()
		$('.pop_sub2').hide()
		
		
		$('.a').stop().animate({
			width:'43%'
			
		},150);	
	  
		
		$('.d').css('display','none').stop().animate({
			width:0
		},200);
		$('.c').css('display','block').stop().animate({
			width:'57%'
		
		},200);

	});
	
	$('.popmenu2').mouseenter(function(){
	
		$('.pop_sub2').show()
		$('.pop_sub1').hide()
		
		$('.a').stop().animate({
			width:0
			
		},150);	
		$('.b').stop().animate({
			width:'43%'
		},150);
		
		
		$('.c').css('display','none').stop().animate({
			width:0
		},200)
		$('.d').css('display','block').animate({
			width:'57%'
		
		},200);
		
			

			


	});
	$('.popmenu2').mouseleave(function(){
	
		$('.pop_sub1').show()
		$('.pop_sub2').hide()
		
		
		$('.a').stop().animate({
			left:0
			
		},150);	
	  
		
		$('.d').css('display','none').stop().animate({
			width:0
		},200);
		$('.c').css('display','block').stop().animate({
			width:'57%'
		
		},200);

		
	


	});

	$('.ka').mouseenter(function(){
		$('.nav_bar').addClass('active')
		$('.sub_kit-wrap').slideDown(100)
		$('.sub_pit-wrap').hide()
		$('.sub_hit-wrap').hide()
	});
		$('.sub_kit-wrap').mouseleave(function(){
			$('.nav_bar').removeClass('active')
			$('.sub_kit-wrap').slideUp(10)
		});
	
	$('.pd').mouseenter(function(){
		$('.nav_bar').addClass('active')
		$('.sub_pit-wrap').slideDown(100)
		$('.sub_kit-wrap').hide()
		$('.sub_hit-wrap').hide()

	});
		$('.sub_pit-wrap').mouseleave(function(){
			$('.nav_bar').removeClass('active')
			$('.sub_pit-wrap').slideUp(10)
		});

	
	$('.hong').mouseenter(function(){
		$('.nav_bar').addClass('active')
		$('.sub_hit-wrap').slideDown(100)
		$('.sub_pit-wrap').hide()
		$('.sub_kit-wrap').hide()

	});	
		$('.sub_hit-wrap').mouseleave(function(){
			$('.nav_bar').removeClass('active')
			$('.sub_hit-wrap').slideUp(10)
		});

	


});/*문*/














