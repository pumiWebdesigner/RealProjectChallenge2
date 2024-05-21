const jsMvSwiper = new Swiper(".js-mv-swiper", {
  speed: 500, // 次の画像を読み込む速さ
  loop: true,
  loopedSlides: 6,
  spaceBetween: 0,

  autoplay: {
    delay: 5000, // 次の画像に切替する時間
    disableOnInteraction: false, // スライドのドラッグ等の操作時でも自動再生を無効にしない：false
  },
  effect: "fade", // フワッと切替
  fadeEffect: {
    crossFade: true, // 画像が重ならないように制御
  },
  // ボタンタイプのページネーション
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  // 左右の矢印アイコン
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
