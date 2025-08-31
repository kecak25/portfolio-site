// 전역 변수
let portfolio_num,
    wh = $(window).height(),
    scTop = 0,
    logo_fade,
    elePos = [],
    num = 1,
    nowPositionY = 0,
    _kiri = false,
    _this;

// 디바이스 체크 (UA + viewport 폭 병합)
const _ua = (() => {
  const ua = window.navigator.userAgent.toLowerCase();
  return {
    Mobile: (ua.includes("iphone") || ua.includes("ipod") || ua.includes("android") && ua.includes("mobile") ||
             ua.includes("firefox") && ua.includes("mobile") || ua.includes("blackberry")) ||
             window.innerWidth <= 768
  };
})();

// 스크롤 위치 계산
function SCROLL_POSITION() {
  elePos = []; // 중복 초기화 방지
  $("#TOP .LIST .SC").each(function () {
    elePos.push($(this).position().top);
  });
}

// 맨 위로
function TO_TOP() {
  $("#ME .TOTOP, #DETAIL .TOTOP").click(() => {
    $("#AJAX_AREA, .SCROLL").animate({ scrollTop: 0 }, 500);
  });

  $("#TOP .TOTOP").click(() => {
    $("html,body,#WRAPPER").animate({ scrollTop: 0 }, 500);
  });
}

// 로고 위치 기준 계산
function CHANGE_BAR() {
  logo_fade = $(window).height() / 2 - $("#LOGO_AREA .CENTER").position().top;
}

// 로고 영역 세팅
function LOGO_AREA() {
  $("#TOP").css("margin-top", wh / 2 - 40);
}

// 리스트 hover / touch 효과
function LIST_HOVER() {
  if (_ua.Mobile) {
    //  모바일: hover 대신 touch 이벤트 사용
    $(".JS-LIST_HOVER li img").on("touchstart", function () {
      const o = $(this);
      const s = o.parents("li").attr("list");
      $("#WRAPPER").removeClass().addClass(`${s} ON`);
      o.parents("li").addClass("ON");
    });

    $(".JS-LIST_HOVER li img").on("touchend touchcancel", function () {
      $("#WRAPPER").removeClass("ON");
      $(this).parents("li").removeClass("ON");
    });
  } else {
    //  PC: 기존 hover 이벤트 그대로
    $(".JS-LIST_HOVER li img").hover(
      function () {
        const o = $(this);
        const s = o.parents("li").attr("list");
        $("#WRAPPER").removeClass().addClass(`${s} ON`);
        o.parents("li").addClass("ON");
      },
      function () {
        $("#WRAPPER").removeClass("ON");
        $(this).parents("li").removeClass("ON");
      }
    );
  }
}


// 공통 스크롤 핸들러
const handleScroll = (o) => {
  if (o > logo_fade) {
    $("#LOGO_AREA, #LOGO_AREA2, #HEADER, #FOTTER").addClass("ON");
    $("body").addClass("TOP_CHANGE");
  } else {
    $("#LOGO_AREA, #LOGO_AREA2, #HEADER, #FOTTER").removeClass("ON");
    $("body").removeClass("TOP_CHANGE");
  }
};

$(function () {
  LOGO_AREA();
  LIST_HOVER();
  TO_TOP();

  // wrapper 높이는 min-height로만 보장 (강제 height 제거)
  //$("#WRAPPER").css("min-height", wh);
    
    if (!_ua.Mobile && window.innerWidth > 768) {
  $("#WRAPPER").height(wh); // PC 전용으로만 적용 0831
}

    

  // 페이지 로드 완료
  $(window).on("load", function () {
    portfolio_num = $(".JS-LIST_HOVER li").length;
    SCROLL_POSITION();
    CHANGE_BAR();

    if (location.href.match("project")) {
      $("#FIX_AREA_F").removeClass("LOAD");
      $("#TOP").addClass("LOAD");
      $("#DETAIL").css("top", wh / 2);
      $("#LOAD").fadeOut(600, () => {
        setTimeout(() => $("#DETAIL, #HEADER, .BTN_CLOSE_SP").addClass("ON"), 700);
      });
    } else {
      $("#LOAD").fadeOut(1000, () => {
        $("#FIX_AREA_F").removeClass("LOAD");
        setTimeout(() => $("#TOP").addClass("LOAD"), 150);
      });
    }

    // 이미지 프리로드
    $.preloadImages = function () {
      for (let i = 1; i <= portfolio_num; i++) {
        $("<img>").attr("src", `/img/pic_p${i}_kv.jpg`);
        $("<img>").attr("src", `/img/pic_p${i}_kv_sp.jpg`);
      }
    };
    $.preloadImages();
  });

  // PJAX 클릭
  $(document).on("click", "a.PJAX", function (e) {
    e.preventDefault();
    const s = $(this).attr("href");
    _this = $(this);
    CHANGE_BAR();

    if (s === "/") {
      $("body").removeClass("CHILD");
      if (scTop === 0) $("#HEADER").removeClass("ON");
      $("#FIX_AREA_F").removeClass("TRA10");

      setTimeout(() => $("#FIX_AREA_H, #FIX_AREA_F, .BTN_CLOSE_SP").removeClass("ON"), 50);
      setTimeout(() => {
        $("#DETAIL").fadeOut(200, () => {
          $("#FIX_AREA_F").addClass("TRA10");
          $.pjax({ url: s, container: "#AJAX_AREA", fragment: "#AJAX_AREA" });
        });
      }, 100);
    } else if (s.match("project")) {
      scTop = $(window).scrollTop();
      $("body").addClass("NOSCROLL").css("top", -scTop);
      $("body").addClass("CHILD");
      $("#HEADER").addClass("ON");
      _this.parent().addClass("OFF");
      $("#FIX_AREA_F").addClass("TRA10");

      setTimeout(() => $("#FIX_AREA_H, #FIX_AREA_F").addClass("ON"), 50);
      setTimeout(() => $.pjax({ url: s, container: "#AJAX_AREA", fragment: "#AJAX_AREA" }), 300);
    }
  });

  $.pjax.defaults.timeout = 10000;

  // PJAX 완료
  $(document).on("pjax:complete", function () {
    const href = location.href;
    TO_TOP();

    if (href.match("project")) {
      $(".JS-LIST_HOVER li").removeClass("OFF ON");
      setTimeout(() => {
        $("#DETAIL").css("top", wh / 2);
        setTimeout(() => $("#DETAIL, .BTN_CLOSE_SP").addClass("ON"), 50);
      }, 200);
    } else {
      $("body").removeClass("NOSCROLL");
      $(window).scrollTop(scTop);
    }
  });

  // ESC 키 이벤트
  $(window).keyup(function (e) {
    if (e.keyCode === 27) {
      const s = "/";
      $("body").removeClass("CHILD");
      if (scTop === 0) $("#HEADER").removeClass("ON");
      $("#FIX_AREA_F").removeClass("TRA10");

      setTimeout(() => $("#FIX_AREA_H, #FIX_AREA_F, .BTN_CLOSE_SP").removeClass("ON"), 50);
      setTimeout(() => {
        $("#DETAIL").fadeOut(200, () => {
          $("#FIX_AREA_F").addClass("TRA10");
          $.pjax({ url: s, container: "#AJAX_AREA", fragment: "#AJAX_AREA" });
        });
      }, 100);
    }
  });

  // ME 메뉴 열기/닫기
  $(".JS-ME_OPEN").click(function () {
    $("#ME").addClass("ON").animate({ scrollTop: 0 }, 50);
    $("#WRAPPER").addClass("ME");
    scTop = $(window).scrollTop();
    $("body").addClass("NOSCROLL").css("top", -scTop);
    setTimeout(() => $("#FIX_AREA_F2").addClass("ON"), 800);
  });

  $(".JS-ME_CLOSE").click(function () {
    $("body").removeClass("NOSCROLL");
    $(window).scrollTop(scTop);
    $("#ME").fadeOut(300, function () {
      $("#ME, #FIX_AREA_F2").removeClass("ON");
      $("#WRAPPER").removeClass("ME");
      $(this).css("display", "block");
    });
  });

  // 스크롤 이벤트 (폭 기준 모바일 대응)
  if (_ua.Mobile) {
    $("#WRAPPER").on("scroll", function () {
      const o = $(this).scrollTop();
      const s = nowPositionY - o;
      nowPositionY = o;

      handleScroll(o);

      if (s > 0 && o < elePos[num - 1] + 122) {
        if (_kiri) {
          $("#WRAPPER").removeClass().addClass(`ON ${$(".JS-LIST_HOVER li:nth-child(" + num + ")").attr("list")}`);
        } else _kiri = true;
        if (num > 1) num--;
      } else if (o > elePos[num - 1]) {
        if (!_kiri) {
          $("#WRAPPER").removeClass().addClass(`ON ${$(".JS-LIST_HOVER li:nth-child(" + num + ")").attr("list")}`);
        } else _kiri = false;
        if (portfolio_num > num) num++;
      }
    });
  } else {
    $(window).on("scroll", function () {
      handleScroll($(this).scrollTop());
    });
  }

  // 리사이즈
 // $(window).resize(function () {
  //  wh = $(window).height();
   // LOGO_AREA();
   // CHANGE_BAR();
   // $("#WRAPPER").css("min-height", wh);
 // });
    
    //0831수정
    $(window).resize(function () {
  wh = $(window).height();
  LOGO_AREA();
  CHANGE_BAR();

  if (!_ua.Mobile && window.innerWidth > 768) {
    // PC 전용일 때만 강제
    $("#WRAPPER").css("min-height", wh);
  } else {
    // 모바일은 CSS 미디어쿼리에 맡기기
    $("#WRAPPER").css("min-height", ""); 
  }
});

  // 모바일 touch 대응
  if (_ua.Mobile) {
    $(window).on("touchmove", function () {
      wh = window.innerHeight;
      $("#FIX_AREA_H").height(wh);
      $("#FIX_AREA_F").height(wh / 2);
    });
  }
});
