{
  // ページ外からの遷移
  // ページがロードされた後にhash有無をチェックして処理
  // DOM準備完了時点なら↓でもOK
  jQuery(document).ready(function () {
    ////// 画像含めてリソースがロードされてからなら↓
    ////// jQuery(window).on('load', function () {
    // URLのhashが遷移する先（例：#access）
    var hash = window.location.hash; // #～を取得
    // URLにhashがあるかチェック
    if (hash) {
      var scrollDistance = 0; // スクロール先までの距離（#は初期値0）
      // hashが存在し、かつ#でない場合のみスクロールする距離を計算する
      if (jQuery(hash).length > 0) {
        // 遷移する先とheaderの高さからスクロールする距離を計算
        scrollDistance = calcDistance(hash);
      }
      console.log(scrollDistance);
      // スムーズスクロール
      smoothScroll(scrollDistance, 300);
    }
  });

  // a[href*="#"]：href属性に#が含まれるもの
  // ページ内のindex.html#〜も対象にしようとしたが、pathの正規か判定が難しいので断念
  // var hashIndex = href.indexOf("#"); // # の位置を取得 (# が存在しない場合は -1 を返す)
  // hrefのpath（＃前の文字列）を取得する
  // var thisPath = href.substring(0, hashIndex);
  // 現在のページのpathを取得する
  // var locationPath = window.location.pathname;
  // var locationPath = window.location.origin + window.location.pathname;
  // ページ内リンクの場合のみを対象とする
  // if (thisPath === locationPath || thisPath === "") {
  // }
  // ページ外への遷移は別途記載

  // ページ内の遷移
  // a[href^="#"]：href属性が#から始まるもの
  jQuery('a[href^="#"]').on("click", function (e) {
    // #を含む場合はスムーズスクロールしたいので通常の処理を止める⇔含まないなら通常の処理を行う
    e.preventDefault();
    var hash = jQuery(this).attr("href"); // hrefから #～を取得
    var scrollDistance = 0; // スクロール先までの距離（#は初期値0）
    // hashが存在し、かつ#でない場合のみスクロールする距離を計算する
    if (hash != "#") {
      // 遷移する先とheaderの高さからスクロールする距離を計算
      scrollDistance = calcDistance(hash);
      console.log(scrollDistance);
    }
    // スムーズスクロール
    smoothScroll(scrollDistance, 300);
  });
  // 遷移する先とheaderの高さからスクロールする距離を計算
  function calcDistance(hash) {
    var elementDistance = jQuery(hash).offset().top; //要素の位置（画面最上部から要素上端の距離）
    var headerHeight = jQuery(".header").outerHeight(true); // ヘッダーの高さ（マージン含む）
    return elementDistance - headerHeight - 20; // 20px余裕を持たせる
  }
  // 距離とスピードを渡してスムーズスクロール
  function smoothScroll(scrollDistance, speed) {
    jQuery("html,body").animate(
      {
        scrollTop: scrollDistance,
      },
      speed
    );
  }

  //ドロワーボタン（ハンバーガーボタン）
  jQuery("#js-drawer__btn").on("click", function (e) {
    e.preventDefault();
    jQuery("body").toggleClass("drawer-open");
  });
  // ドロワーを閉じる
  if (jQuery(this).hasClass("js-drawer__nav--link")) {
    jQuery("body").removeClass("drawer-open");
  }

  //スクロール後処理__画面最上部からtargetの場所を超えたら起動
  jQuery(window).on("scroll", function () {
    // target：スマホのheader色、to-topボタン
    var target = 300;
    if (jQuery(this).scrollTop() > target) {
      jQuery("body").addClass("is-scroll");
    } else {
      jQuery("body").removeClass("is-scroll");
    }
  });
}
