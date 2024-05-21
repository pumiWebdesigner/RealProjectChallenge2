const modalOpenButtons = document.querySelectorAll(".js-modal__btn--open");
// showModal()は背景を含むモーダル表示、show()は背景を含まない
modalOpenButtons.forEach(function (modalOpenButton) {
  modalOpenButton.addEventListener("click", function () {
    // nextElementSibling:同じ階層の次の兄弟要素（HTMLで.js-modal-buttonの次要素にmodalを構成しておく）
    const dialog = this.nextElementSibling;
    dialog.showModal(); // javascriptで使用可能　jQueryで使うには一工夫必要
    swiper.params;
  });
});

// buttonクリック以外でshowmodalを閉じれないので、画面更新でshowmodalを擬似的に閉じる
jQuery(".js-modal__button--link").on("click", function (e) {
  e.preventDefault(); // aタグの通常の処理を止める
  var id = jQuery(this).attr("href"); // 遷移先のhrefを取得
  window.open(id, "_blank"); // idに設定されたURLを別タブで開く
  location.reload(); // 画面を更新する（＝modalを消す）
});

// 以下、close()を使う場合だが、非推奨のためコメントアウト
// const modalDialog = document.querySelectorAll(".modalDialog");
// const modalCloseButtons = document.querySelectorAll(".js-modal__btn--close");

// モーダルダイアログを表示する際に背景部分がスクロールしないようにする
// dialog.showModal();
// document.documentElement.style.overflow = "hidden";

// modalCloseButtons.forEach(function (modalCloseButton) {
//   modalCloseButton.addEventListener("click", function () {
//     // nextElementSibling:同じ階層の次の兄弟要素（HTMLで.js-modal-buttonの次要素にmodalを構成しておく）
//     const dialog = this.nextElementSibling;
//     modalDialog.close();
//     // モーダルを解除すると、スクロール可能になる
//     document.documentElement.removeAttribute("style");
//   });
// });
