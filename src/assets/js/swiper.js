const staffSwiper = new Swiper(".staff-swiper", {
  autoplay: {
    delay: 0, // 次の画像に切替する時間
  },
  loop: true,
  loopedSlides: 5,
  speed: 8000, // 次の画像を読み込む速さ
  allowTouchMove: false, // スワイプ無効
  centeredSlides: true,
  preventInteractionOnTransition: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  breakpoints: {
    1024: {
      spaceBetween: 20,
    },
  },
});
