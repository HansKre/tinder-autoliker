// copy paste into Safari / Chrome / Firefox Console while logged in in tinder

let likeButton = $x(
  '//*[@id="o-1556761323"]/div/div[1]/div/div/main/div/div[1]/div[1]/div/div[5]/div/div[4]/button'
)[0];

let like = () => {
  console.log('liking...');
  likeButton.click();
};

let intervalTimer;

clearInterval(intervalTimer);

intervalTimer = setInterval(like, 500);
