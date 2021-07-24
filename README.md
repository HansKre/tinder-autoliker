# Description

Silly weekend playaround to reduce some time spent with tinder :-)

![demo](./demo.gif)

## How-To

1. Login on tinder with Safari / Chrome / Firefox (`$x` must be available in console)
2. Open Console from developer tools
3. copy & paste below code and hit enter

    ```js
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
    ```

4. make sure to stop it when you're out of your free likes running `clearInterval(intervalTimer);`
