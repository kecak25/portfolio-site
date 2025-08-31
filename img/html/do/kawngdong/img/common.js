/***************************************************
 * EKDP SCRIPT
 ***************************************************/
$(function () {
/* MENU */
var menu = {
	onbg : function () {
		$('.header-bottom').addClass('active');
		$('.gnb__wrap').css('display','');
	},
	offbg : function () {
		$('.header-bottom').removeClass('active');
	},
	menuOn : function (ele) {
		var current = ele.next('.gnb__wrap');		
		$('.gnb__wrap').not(current).css('display','');
		current.show();
	},
	menuOut : function (ele) {
		$('.gnb__wrap').css('display','');
	},
	goTop : function () {
		$('html,body').animate({
			'scrollTop' : 0
		},800,'easeInOutExpo');
	},
	footerMenu : function (ele) {
		var href = ele.attr('href'),
		number = ele.attr('data-footerpop');
		if (number == 1) {
			$('#p_policy iframe').attr('src','../cscenter/pop_policy3.html');	//개인정보보호정책
			$('#p_policy iframe').css('height','949px');
		} else if (number == 2) {
			$('#p_policy iframe').attr('src','../cscenter/pop_policy2.html');	//이용약관
			$('#p_policy iframe').css('height','949px');
		} else if (number == 3) {
			$('#p_policy iframe').attr('src','../cscenter/pop_policy1.html');	//이메일 무단수집 거부
			$('#p_policy iframe').css('height','353px');
		}
		$('#p_policy').show();
	},
	bind : function () {
		$('.gnb > li').bind('mouseenter',function () {menu.onbg();});
		$('.gnb > li').bind('mouseleave',function () {menu.offbg();});
		$('.gnb > li > a').bind('focus',function () {menu.menuOn($(this));});
		$('#brand').bind('focus',function () {menu.menuOut();});
		$('.brand-top__link').bind('click',function () {menu.goTop();return false;});
		$('[data-footerpop]').bind('click',function (e) {
			menu.footerMenu($(this));
			e.preventDefault();
		})
	}
}
menu.bind();
/*  BRAND */
var brand = {
	init : function () {
		if ($('#wrap').hasClass('showBrand')) {
			$('#wrap').removeClass('showBrand');
			setTimeout(function () {
				$('.brand-list__item').removeClass('active');
				$('.brand-list__sub a').removeClass('active');
			},600);
			$(window).scrollTop(0);
		} else {
			return false;
		}
	},
	pageAction : function () {
		$('#wrap').addClass('showBrand');
		$(window).scrollTop(0);
	},
	pageMenu : function (ele) {
		var li = ele.parents('.brand-list__item');
		li.addClass('active');
		li.siblings('li').removeClass('active');
		ele.addClass('active')		
		$('.brand-list__sub a').not(ele).removeClass('active');
	},
	selectTool : function (ele) {		
		ele.addClass('active');
		ele.siblings('li').removeClass('active');		
	},
	selectYear : function (ele) {
		var target = ele.attr('data-year'),
		wrap = $('[data-yearwrap='+target+']');
		wrap.toggleClass('active');
		wrap.find('.bd-event__cat-list').slideToggle();
		$('[data-yearwrap]').not(wrap).removeClass('active');
		$('[data-yearwrap]').not(wrap).find('.bd-event__cat-list').hide();
	},
	selectMenu : function (ele) {
		var target = ele.attr('href'),
		top = $(target).offset().top;
		$('html,body').stop().animate({
			'scrollTop' : top-50
		},800,'easeInOutExpo');
	},
	scrollMenu : function () {
		if ($('#wrap').hasClass('showBrand')) {
			var top = $(window).scrollTop();
			if (top > 2680) {$('[href='+'#bd-ad'+']').parent('li').addClass('active');$('[href='+'#bd-ad'+']').parent('li').siblings('li').removeClass('active');brand.scrollMenuFixed();}
			else if (top > 1915 ) {$('[href='+'#bd-event'+']').parent('li').addClass('active');$('[href='+'#bd-event'+']').parent('li').siblings('li').removeClass('active');brand.scrollMenuFixed();}
			else if (top > 1260 ) {$('[href='+'#bd-history'+']').parent('li').addClass('active');$('[href='+'#bd-history'+']').parent('li').siblings('li').removeClass('active');brand.scrollMenuFixed();}
			else if (top > 540 ) {$('[href='+'#bd-info'+']').parent('li').addClass('active');$('[href='+'#bd-info'+']').parent('li').siblings('li').removeClass('active');brand.scrollMenuFixed();}
			else  {$('[href='+'#bd-visual'+']').parent('li').addClass('active');$('[href='+'#bd-visual'+']').parent('li').siblings('li').removeClass('active');brand.scrollMenuReset();}
		} else {
			return false;
		}
	},
	scrollMenuFixed : function () {
		$('.bd-menu').addClass('fixed');
	},
	scrollMenuReset : function () {
		$('.bd-menu').removeClass('fixed');
	},
	menuOver : function (ele) {
		ele.addClass('active');
		$('.brand-list__item').not(ele).removeClass('active');
	},
	bind : function () {
		$('.brand__list-logo').bind('click',function () {
			brand.init();
		});
		$(document).on('click','.bd-event__toon-list li',function () {
			brand.selectTool($(this));
		});
		$(document).on('click','[data-year]',function () {
			brand.selectYear($(this));
		});
		$(document).on('click','.bd-menu__list a',function (e) {
			brand.selectMenu($(this));
			e.preventDefault();
		})
		$(window).bind('scroll',function (e) {
			brand.scrollMenu();
		});
		$('.brand-list__item').bind('mouseenter',function () {
			brand.menuOver($(this));
		});
		$('.brand-list__sub a[href^="/brand"').bind('click',function (e) {			
			if ($('#wrap').hasClass('showBrand')) {
				return true
			} else {
				brand.pageAction();
				brand.pageMenu($(this));
				ajx.brandMenu($(this));
				e.preventDefault();
			}
		});
	}
}
brand.bind();
brand.scrollMenu();
/* FOOTER */
 var footer = {
 	dropdown : function (ele) {
 		ele.stop().toggleClass('active');
 		ele.find('.footer__snb-link__toggle').stop().slideToggle('fade');
 	},
 	focused : function (ele) {
 		ele.find('.footer__snb-link__toggle').stop().show();
 	},
 	bind : function () {
 		$('.footer__snb-link__item').bind('click',function () {
 			footer.dropdown($(this));
 		});
 	}
 }
 footer.bind();
 /* COMMON */
 var common  = {
 	layerOpen : function (ele) {
 		$('#wrap').addClass('showLayer');
 		var target = ele.attr('data-open');
 		$(target).fadeIn();
 	},
 	layerClose : function (ele) {
 		$('#wrap').removeClass('showLayer'); 		
 		var target = ele.attr('data-close');
 		$(target).fadeOut();
 	},
 	bigImage : function (ele) {
 		var target = ele.attr('data-big'),
 		src = ele.attr('data-bigimg');
 		$(target).attr('src',src);
 	},
 	bigIframe : function (ele) {
 		var target = ele.attr('data-frame'),
 		src = ele.attr('data-iframe');
 		$(target).attr('src',src); 		
 	},
 	bigTit : function (ele) {
 		var target = ele.attr('data-tit'),
 		tit = ele.attr('alt') ? ele.attr('alt') : ele.attr('data-text');
 		$(target).html(tit);
 	},
 	dataLoad : function (ele) {
 		var target = ele.attr('href'),
 		area = ele.attr('data-load'),
 		type = ele.attr('data-loadtype'),
 		txt = ele.html();
 		$(area).load(target);
 		if (type=='gallery') {
	 		$('.bd-event__cat-list').slideUp();
	 		$('.bd-event__cat').removeClass('active');
 			ele.parents('.bd-event__cat-list').prev('.bd-event__cat-tit').html(txt);
 		}
 	},
 	bind : function () {
 		$(document).on('click','[data-open]',function (e) {
 			common.layerOpen($(this)); 
 			e.preventDefault();			
 		});
 		$(document).on('click','[data-close]',function (e) {
 			common.layerClose($(this)); 
 			e.preventDefault();			
 		});
 		$(document).on('click','[data-big]',function (e) {
 			common.bigImage($(this));
 			e.preventDefault();			
 		});
 		$(document).on('click','[data-tit]',function (e) {
 			common.bigTit($(this));
 			e.preventDefault();			
 		})
 		$(document).on('click','[data-iframe]',function (e) {
 			common.bigIframe($(this));
 			e.preventDefault();			
 		});
 		$(document).on('click','[data-load]',function (e) {
 			common.dataLoad($(this));
 			e.preventDefault();
 		});
 	}
 }
 common.bind();
 /* TOON */
 $(document).on('click','.layer-toon--btn',function (e) {
 	var index = $('.bd-event__toon-list li.active').index();
 	if ($(this).attr('id') == 'layer-toon--prev') {
 		if (index!=0) {
 			$('.bd-event__toon-list li').eq(index-1).find('.bd-event__toonbox').trigger('click');
 		}
 	} else {
 		$('.bd-event__toon-list li').eq(index+1).find('.bd-event__toonbox').trigger('click'); 		
 	}
 	e.preventDefault();
 });
 /* AJAX */
var ajx = {
	brandMenu : function (ele) {
		var brand = ele.attr('data-brand');
		$.ajax({
			url : '/brand/view.asp',
			data : {
				brandID : brand
			},
			success : function (res) {
				var content = $('<div>').html(res).find('#brand-detail').html();
				$('#brand-detail').html(content);
			}
		})
	}
}
});
//iframe 제거 팝업닫기
function cloaseMediaPopup(){
	$('.c_popup').hide();
	$('.c_popup iframe').attr('src','');
}