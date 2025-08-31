$(function () {
  // 리스트 아이템 클릭 → 팝업 열기
  $(".LIST > li").on("click", function () {
    $(this).children(".subi").fadeIn();
    $(".bg, .close").show();
    $("#list_category, .SHARE, .ME").hide();
    $("body").css("overflow", "hidden");
  });

  // 닫기 버튼 → 팝업 닫기
  $(".close").on("click", function () {
    $(".subi").fadeOut();
    $(".bg, .close").hide();
    $("#list_category, .SHARE, .ME").show();
    $("body").css("overflow", "auto");
  });

  // #lib 클릭 → hash 변경
  $("#lib").on("click", function (e) {
    e.preventDefault();
    window.location.hash = $(this).attr("rel");
  });

  // 카테고리 필터링
  $("#list_category a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("title");

    const $items = $("#list-C > li");
    $items.fadeOut("slow");

    if (target === "all") {
      $items.fadeIn("slow");
    } else {
      $items.filter(`[class*=${target}]`).fadeIn("slow");
    }
  });
});
