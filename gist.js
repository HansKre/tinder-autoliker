// copy paste into Safari / Chrome / Firefox Console while logged in in tinder

let b1 = $x('//*[@id="c2094796203"]/div/div[1]/div/div/main/div/div[1]/div[1]/div/div[4]/div/div[4]/button')[0];
let b2 = $x('//*[@id="c2094796203"]/div/div[1]/div/div/main/div/div[1]/div[1]/div/div[5]/div/div[4]/button')[0];

let like = () => {
    console.log('liking...');
    b1.click();
    b2.click();
}

let intervalTimer;

clearInterval(intervalTimer);

intervalTimer = setInterval(like, 500);