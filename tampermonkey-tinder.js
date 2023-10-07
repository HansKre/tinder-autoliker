// ==UserScript==
// @name         Tinder
// @namespace    http://tampermonLOCALSTORAGE_KEY.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tinder.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tinder.com
// @grant        window.onurlchange
// ==/UserScript==

/*
On MESSAGES:
* adds Pic Btn
* add event listener to unmatch button to auto-click confirmation
*/

// constants
const URL_MESSAGES = 'https://tinder.com/app/messages/';
const URLS_AUTOLIKE = [
    'https://tinder.com/app/recs',
    'https://tinder.com/app/explore',
    'https://tinder.com/app/matches'
];
const LOCALSTORAGE_KEY = 'likeCounter';

(function() {
    'use strict';

    console.log('Starting Tinder-Tampermonkey');
    let picBtnCreated = false;
    let autolikeTimeout = null;

    function handleMessagesUrl(){
        console.log('Adding Large Pic Btn and Unmatch Confirmer...');
        function createPicBtn(){
            /*function createPicBtnStyles() {
                const style = document.createElement('style');
                const css = `
                    .picBtn:hover{ background-color: rgba(255,68,88,0.8); }
                    .picBtn {
                      width: 130px;
                      margin: 5px;
                      border: 1px solid rgb(204, 204, 204);
                      height: 34px;
                      align-self: center;
                      background-color: var(--color--brand-primary,inherit);
                      color: white;
                      font-weight: 500;
                      font-size: larger;
                      border-radius: 7px;
                      cursor: pointer;
                    }`
                ;
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                document.getElementsByTagName('head')[0].appendChild(style);
            }
            createPicBtnStyles();*/
            const button = document.createElement('button');
            button.innerHTML = 'Large Pic';
            // add tinder-native style for buttons
            button.className = "button Lts($ls-s) Z(0) CenterAlign Mx(a) Cur(p) Tt(u) Ell Bdrs(100px) Px(24px) Px(20px)--s Py(0) Mih(40px) Pos(r) Ov(h) C(#fff) Bg($c-pink):h::b Bg($c-pink):f::b Bg($c-pink):a::b Trsdu($fast) Trsp($background) Bg($g-ds-background-brand-gradient) button--primary-shadow StyledButton Bxsh($bxsh-btn) Fw($semibold) focus-button-style Mb(16px) As(fe)";
            button.id = 'picbtn';
            button.onclick = function(){
                const multiPicsProfile = document.querySelector("body > div > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml.Mah\\(fc\\)--ml > div > div > div.react-aspect-ratio-placeholder > span > div > div.CenterAlign.D\\(f\\).Fxd\\(r\\).W\\(100\\%\\).Px\\(8px\\).Pos\\(a\\).TranslateZ\\(0\\)");
                const singlePicProfile = document.querySelector("body > div > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml.Mah\\(fc\\)--ml > div > div > div.react-aspect-ratio-placeholder > span > div > div > span > div > div");
                if (multiPicsProfile) {
                    [...multiPicsProfile.children].forEach((child, i) => {
                        const found = [...child.classList].find(a => a === 'bullet--active');
                        if (found) {
                            const urlStr = document.querySelector(`body > div > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml.Mah\\(fc\\)--ml > div > div > div.react-aspect-ratio-placeholder > span > div > div.profileCard__slider.Pos\\(a\\).W\\(100\\%\\).H\\(100\\%\\).D\\(f\\).Ov\\(h\\).Us\\(n\\).keen-slider > span:nth-child(${i + 1}) > div > div`).style.backgroundImage
                            const url = urlStr.slice(5, urlStr.length - 2);
                            window.open(url, '_blank').focus();
                        }
                    });
                } else if (singlePicProfile) {
                    const urlStr = document.querySelector(`body > div > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml.Mah\\(fc\\)--ml > div > div > div.react-aspect-ratio-placeholder > span > div > div.profileCard__slider.Pos\\(a\\).W\\(100\\%\\).H\\(100\\%\\).D\\(f\\).Ov\\(h\\).Us\\(n\\).keen-slider > span:nth-child(1) > div > div`).style.backgroundImage
                    const url = urlStr.slice(5, urlStr.length - 2);
                    window.open(url, '_blank').focus();
                } else {
                    console.log('Could not find any pics');
                }
            };
            document.querySelector("body > div > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml.Mah\\(fc\\)--ml > div > div > div.Bgc\\(\\#fff\\).Fxg\\(1\\).Z\\(1\\).Pb\\(16px\\)--ml.Pb\\(60px\\) > div.D\\(f\\).Jc\\(sb\\).Us\\(n\\).Px\\(16px\\).Py\\(10px\\) > div > div.My\\(2px\\).C\\(\\$c-base\\).Us\\(t\\).D\\(f\\).Ai\\(b\\).Maw\\(90\\%\\)").appendChild(button);
        };
        // Select the node that will be observed for mutations
        var targetNode = document.querySelector('body');

        // Options for the observer (which mutations to observe)
        var config = { childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        var callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    // check what was added to the DOM...
                    // add PicBtn
                    const nameDiv = document.querySelector("div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div > div.BdStart.Bdc\\(\\$c-divider\\).Fxg\\(0\\).Fxs\\(0\\).Fxb\\(1\\/3\\).Miw\\(325px\\).Maw\\(640px\\).D\\(n\\)--m > div > div.Pos\\(r\\).D\\(f\\).Ai\\(c\\).Fxd\\(c\\).Flx\\(\\$flx1\\)--ml.Maw\\(100\\%\\)\\!--ml.Ov\\(h\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml > div > div > div.Bgc\\(\\#fff\\).Fxg\\(1\\).Z\\(1\\).Pb\\(16px\\)--ml.Pb\\(60px\\) > div.D\\(f\\).Jc\\(sb\\).Us\\(n\\).Px\\(16px\\).Py\\(10px\\) > div > div.My\\(2px\\).C\\(\\$c-base\\).Us\\(t\\).D\\(f\\).Ai\\(b\\).Maw\\(90\\%\\)")
                    if (nameDiv && !picBtnCreated) {
                        createPicBtn();
                        picBtnCreated = true;
                    }
                    // add confirm unmatch listener
                    const unmatchBtn = document.querySelector("body > div > div > div > div.W\\(100\\%\\) > button.button.Lts\\(\\$ls-s\\).Z\\(0\\).CenterAlign.Mx\\(a\\).Cur\\(p\\).Tt\\(u\\).Ell.Bdrs\\(100px\\).Px\\(24px\\).Px\\(20px\\)--s.Py\\(0\\).Mih\\(42px\\)--s.Mih\\(50px\\)--ml.Pos\\(r\\).Ov\\(h\\).C\\(\\#fff\\).Bg\\(\\$c-pink\\)\\:h\\:\\:b.Bg\\(\\$c-pink\\)\\:f\\:\\:b.Bg\\(\\$c-pink\\)\\:a\\:\\:b.Trsdu\\(\\$fast\\).Trsp\\(\\$background\\).Bg\\(\\$g-ds-background-brand-gradient\\).button--primary-shadow.StyledButton.Bxsh\\(\\$bxsh-btn\\).Fw\\(\\$semibold\\).focus-button-style.My\\(12px\\).W\\(100\\%\\).D\\(b\\).Tt\\(c\\).Typs\\(button-1\\)");
                    if (unmatchBtn) {
                        unmatchBtn.click();
                    }
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }

    function doAutolike() {
        console.log('Autoliking...');
        let likeBtnFound = true;
        const doLike = () => {
            const likeBtn = document.querySelector("div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div.Mt\\(a\\).Px\\(4px\\)--s.Pos\\(r\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml > div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-ds-border-gamepad-like-default\\) > button");
            if (!likeBtn && likeBtnFound) {
                likeBtnFound = false;
                alert('Like Button not found');
            }
            if (likeBtn && !likeBtn.disabled) {
                likeBtn.click();
                let likeCounter = localStorage.getItem(LOCALSTORAGE_KEY) || 0;
                likeCounter++;
                localStorage.setItem(LOCALSTORAGE_KEY, likeCounter);
                console.log(`Liked: ${likeCounter}`);
            }
        };
        let intervalTimer;
        if (likeBtnFound) {
            autolikeTimeout = setTimeout(() => {
                intervalTimer = setInterval(doLike, 1500);
            }, 5000);
        }
        if (!likeBtnFound) {
            clearInterval(intervalTimer);
        }
    }

    function isAutolikeUrl(url) {
        return !!URLS_AUTOLIKE.find(URL_AUTOLIKE => url.startsWith(URL_AUTOLIKE));
    }

    // detect first loaded page
    if (window.location.href.startsWith(URL_MESSAGES)) {
        handleMessagesUrl();
    } else if (isAutolikeUrl(window.location.href)) {
        doAutolike();
    }

    // handle URL change during navigation
    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            // autolike
            clearTimeout(autolikeTimeout);
            // clean up URL_MESSAGES
            document.getElementById('picbtn')?.parentNode?.removeChild(document.getElementById('picbtn'));
            picBtnCreated = false;
            if (info.url.startsWith(URL_MESSAGES)) {
                console.log('navigated to messages');
            } else if (isAutolikeUrl(info.url)) {
                doAutolike();
            }
        });
    }
})();
