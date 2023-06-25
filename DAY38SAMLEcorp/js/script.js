const mySwiper = new Swiper(".results-slider .swiper", {
  loop: true,
  loopAdditionalSlides: 1,
  slidesPerView: "auto",
  spaceBetween: 20,
  grabCursor: true,
  pagination: {
    el: ".results-slider .swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    767: {
      spaceBetween: 40,
    },
  },
});

// ドロワーメニュー
$(function () {
  // drawer.js
  $(".drawer").drawer();

  // ハンバーガーメニューのクリックイベントハンドラを追加する部分
  $(".drawer-hamburger-icon").click(function () {
    var isActive = $(
      ".header-logo, .drawer-hamburger-icon, .drawer-background"
    ).hasClass("is-active");
    $(".header-logo, .drawer-hamburger-icon, .drawer-background").toggleClass(
      "is-active",
      !isActive
    );
  });

  // drawer.jsの閉じた時のイベントハンドラを追加する部分
  $(".drawer").on("drawer.closed", function () {
    $(".header-logo, .drawer-hamburger-icon, .drawer-background").removeClass(
      "is-active"
    );
  });
});

// Q & A
jQuery(".faqs-box-q").on("click", function () {});

// Q & A折りたたみ
jQuery(".faqs-box-q").on("click", function () {
  // ↑をクリックしたら、その次の要素をスライドさせる
  jQuery(this).next().slideToggle();
  // ↑のクラスの子要素である↓にクラスを付け足す
  jQuery(this).children(".faqs-box-icon").toggleClass("is-open");
});

// スクロール検知
jQuery(window).on("scroll", function () {
  // トップから100px以上スクロールしたら
  if (100 < jQuery(this).scrollTop()) {
    // is-showクラスをつける
    jQuery(".to-top").addClass("is-show");
  } else {
    // 100pxを下回ったらis-showクラスを削除
    jQuery(".to-top").removeClass("is-show");
  }
});

// スムーススクロール
// #から始まるURLがクリックされた時
jQuery('a[href^="#"]').click(function () {
  // .headerクラスがついた要素の高さを取得
  let header = jQuery(".header").innerHeight();
  // 移動速度を指定（ミリ秒）
  let speed = 300;
  // hrefで指定されたidを取得
  let id = jQuery(this).attr("href");
  // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
  let target = jQuery("#" == id ? "html" : id);
  // ページのトップを基準にターゲットの位置を取得
  let position = jQuery(target).offset().top - header;
  // その分だけ移動すればヘッダーと被りません
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed
  );

  return false;
});

// wowアニメーション
new WOW().init();

// header色変更
$(function () {
  $(window).on("scroll", function () {
    var firstViewHeight = $(window).width() * 0.50625; // ファーストビューの高さを求める式

    if (firstViewHeight < $(this).scrollTop()) {
      $(".js-header").addClass("is-change");
    } else {
      $(".js-header").removeClass("is-change");
    }
  });
});

// Googleフォーム
let $form = $("#js-form");
$form.submit(function (e) {
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        // 送信に成功した時の処理
        $form.slideUp();
        $("#js-success").slideDown();
      },
      200: function () {
        // 送信に失敗した時の処理
        $form.slideUp();
        $("#js-error").slideDown();
      },
    },
  });

  return false;
});

// フォームの入力確認
let $submit = $("#js-submit");
$("#js-form input, #js-form textarea").on("change", function () {
  if (
    $('#js-form input[type="text"]').val() !== "" &&
    $('#js-form input[type="email"]').val() !== "" &&
    $('#js-form input[name="entry.2138513332"]').prop("checked") === true
  ) {
    // 全て入力された時
    $submit.prop("disabled", false);
    $submit.addClass("-active");
  } else {
    // 入力されていない時
    $submit.prop("disabled", true);
    $submit.removeClass("-active");
  }
});

// モーダル
jQuery('.js-close-button').on('click', function(e) {
  e.preventDefault();
  var target = jQuery(this).data('target');
  jQuery(target).hide();
});

jQuery('.js-open-button').on('click', function(e) {
  e.preventDefault();
  var target = jQuery(this).data('target');
  jQuery(target).show();
});
