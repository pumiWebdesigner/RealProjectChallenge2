{
  //details、summary
  const animTiming = {
    duration: 400,
    easing: "ease-out",
  };
  // close処理
  const closingAnimKeyframes = (content) => [
    // height: "auto"だとうまく計算されない
    { height: content.offsetHeight + "px", opacity: 1 },
    { height: 0, opacity: 0 },
  ];
  // open処理
  const openingAnimKeyframes = (content) => [
    { height: 0, opacity: 0 },
    { height: content.offsetHeight + "px", opacity: 1 },
  ];
  const openingAnimKeyframes2 = () => [{ content: "＋" }, { content: "＊" }];
}
