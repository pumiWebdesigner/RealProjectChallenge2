{
  // form全体
  const form = jQuery("#js-form");
  // form送信ボタン
  const submit = jQuery("#js-submit");
  // 送信ボタンは初期値disabled
  submit.prop("disabled", true);

  // const email = jQuery(".input-email");
  // email.prop("invalid", false);
  form.submit(function () {
    jQuery.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          if (form.hasClass("js-contact")) {
            window.location.href = "./thanks/contact.html";
            alert("送信しました。");
          } else if (form.hasClass("js-reservation")) {
            window.location.href = "./thanks/reservation.html";
            alert("予約しました。");
          }
        },
        200: function () {
          //送信に失敗したときの処理
          window.location.href = "./index.html";
        },
      },
    });
    return false;
  });

  form.on("change", function () {
    // jQueryは直接chedkValidity()をformに対して使用できない
    // 対象のDOM要素を取得（.get(0)や[0]を使用してから）checkValidityを行う
    // checkboxはrequired設定されているcheckboxのみをチェック対象としてしまうので、
    // 全てのcheckboxをチェックさせるよう個別にチェックを行う
    if (form.get(0).checkValidity()) {
      if (jQuery('input[type="checkbox"]').length > 0) {
        if (jQuery('input[type="checkbox"]:checked').length > 0) {
          submit.prop("disabled", false);
        } else {
          submit.prop("disabled", true);
        }
      } else {
        submit.prop("disabled", false);
      }
    } else {
      submit.prop("disabled", true);
    }
  });

  // チェックボックスのみバリデーションチェックエラーの解除ができなかったので、専用のチェックを別途記載
  // safariがreadyイベントに対応していないため、loadを使う 修正前jQuery(document).ready(function () {
  jQuery(window).on("load", function () {
    var $require = jQuery("#js-form [required]");
    // safariがblurイベントに対応していないため、changeを使う
    $require.on("change", function () {
      // this=requreied属性を持つ要素のうち、フォーカスが外れた要素
      var $this = jQuery(this); // 毎回jQuery(this)を実行するのは無駄なので変数に格納

      // input要素が単体：input要素のnextにエラーメッセージ
      var $errorContainerInputNext = $this.next(".error-message"); //thisに対するエラーメッセージの要素
      // input要素が複数：input要素の親要素のjs-form-wrapperのnextにエラーメッセージ
      // ※checkboxは別途処理
      var $errorMessageWrapperNext = $this.closest(".js-form--wrapper").next(".error-message");

      // お名前、お問い合わせ内容のバリデーション
      if ($this.hasClass("js-text")) {
        // お名前、お問い合わせ内容が入力必須の場合は、空文字か否かのチェックのみ行う
        // trimで空白を削除し、空白削除後が空文字かチェック
        if ($this.val().trim() === "") {
          $errorContainerInputNext.text("このフィールドは必須です。").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // カナ入力のバリデーション
      if ($this.hasClass("js-kana")) {
        // カナ入力のパターン
        var kanaPattern = /^([ァ-ンー\s]+)$/;
        // カタカナ、長音符、空白以外が入っていた際の処理
        console.log($this.val());
        // console.log($this.val().match(kanaPattern));

        if (!$this.val().match(kanaPattern)) {
          $errorContainerInputNext.text("全角カタカナ（スペース含む）で入力してください。").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // 電話番号のバリデーション
      if ($this.hasClass("js-tel-number")) {
        // 電話番号のパターン
        var telPattern = /^\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
        if (!$this.val().match(telPattern)) {
          $errorContainerInputNext.text("有効な電話番号を入力してください。（例: 0123-456-789）").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // メールアドレスのバリデーション
      if ($this.hasClass("js-mail")) {
        // メールアドレスのパターン
        var mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$this.val().match(mailPattern)) {
          $errorContainerInputNext.text("有効なメールアドレスを入力してください。（例: user@example.com）").show();
        } else {
          $errorContainerInputNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // ラジオボタンのバリデーション
      if ($this.hasClass("js-radio")) {
        console.log(jQuery(".js-radio:checked").length);
        console.log(jQuery(".js-radio:checked"));
        if (jQuery(".js-radio:checked").length === 0) {
          $errorMessageWrapperNext.text("初診・再診どちらか選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // セレクトボックスのバリデーション
      if ($this.hasClass("js-select")) {
        if ($this.val() === "") {
          $errorMessageWrapperNext.text("プルダウンよりご連絡方法を選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });

  jQuery(document).ready(function () {
    var jQuerycheckbox = jQuery(".js-checkbox");

    // blur: フォーカスが外れた時
    jQuerycheckbox.on("change", function () {
      // this=requreied属性を持つ要素のうち、フォーカスが外れた要素
      var $this = jQuery(this); // 毎回jQuery(this)を実行するのは無駄なので変数に格納
      var $errorMessageWrapperNext = $this.closest(".js-form--wrapper").next(".error-message");

      // input要素が複数：input要素の親要素のjs-form-wrapperのnextにエラーメッセージ
      // チェックボックスのバリデーション
      if ($this.hasClass("js-checkbox")) {
        if (jQuery(".js-checkbox:checked").length === 0) {
          $errorMessageWrapperNext.text("一つ以上の診療内容を選んでください。").show();
        } else {
          $errorMessageWrapperNext.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });

  // 入力後もplaceholderが表示され続ける＆入力値が表示されない問題への対処
  jQuery(document).ready(function () {
    var jQuerydate = jQuery("input[type='date']");
    jQuerydate.on("input", function () {
      if (jQuery(this).val().trim() !== "") {
        jQuery(this).addClass("is-input");
      } else {
        jQuery(this).removeClass("is-input");
      }
    });
  });

  // firefoxのみ標準のラジオボタンを消せないので、標準のラジオボタンを使うためのクラスを追加する
  jQuery(document).ready(function () {
    var ua = navigator.userAgent.toLowerCase(); // userAgentの取得と小文字に統一
    if (ua.indexOf("firefox") !== -1) {
      jQuery("body").addClass("firefox");
    }
  });
}
