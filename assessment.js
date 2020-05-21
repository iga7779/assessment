'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
userNameInput.onkeydown = event => {
if (event.key === 'Enter') {
    //todo botannoonclick()syoriyobidasu
  }
};
/**
 * 指定した要素の子どもをすべて排除
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //子供いる限り排除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前がカラなら終わる
        return;
    }

    //診断結果表示エリアの表示
   removeAllChildren(resultDivided); 
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    //ついとえいるあ作成
   
removeAllChildren(tweetDivided);
const anchor = document.createElement('a');
const hrefValue =
  'http://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('あなたのいいところ')　+
  '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #あなたのいいところ';
tweetDivided.appendChild(anchor);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);  
 };
const answers = [
'{userName}のいいとこは声。{userName}のええ声は人をひきつける',
'{userName}のいいとこはまなざし。{userName}にみつめられると・・・',
'{userName}のいいとこは情熱。{userName}にみんな感化される。',
'{userName}のいいとこは厳しさ。{userName}の厳しさにやられる。',
'{userName}のいいとこは知識。{userName}はなんでもしっとう。',
'{userName}のいいとこはゆにーくさ。{userName}だけが最高さ。',
'{userName}のいいとこは用心深さ。{userName}には近寄れない。',
'{userName}のいいとこはわからない。{userName}にきいてみて。',
'{userName}のいいとこは感受性。{userName}いわくそうじゃないらしい。',
'{userName}のいいとこは節度。{userName}はどこにもいない。',
'{userName}のいいとこはタイピング。{userName}はがんばらない。あ',
'{userName}のいいとこみてみたい。{userName}はジャンピング。',
'{userName}のいいとこはタイピング。{userName}はがんばらない。あ',
'{userName}のいいとこみてみたい。{userName}はジャンピング。',
'{userName}のいいとこはタイピング。{userName}はがんばらない。あ',
'{userName}のいいとこみてみたい。{userName}はジャンピング。',
'{userName}のいいとこない。{userName}はどこでもやれる。やさしい。',    
];

/** 
 * 名前の文字列うぃわたすと診断結果を返し監視委
 * @param {string} userName ユーザー名前
 *@return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求めつ
　　const index = sumOfCharCode % answers.length;
　　let result = answers[index];

   result = result.replace(/\{userName\}/g, userName);
   return result;
}

//テストコード
console.assert(
    assessment('猟犬') ===
    '猟犬のいいとこみてみたい。猟犬はジャンピング。',
    'しんだんけっかんもんごんただしくないよ'
);
console.assert(
    assessment('猟犬')　=== assessment('猟犬'),
    '同じ入力なら出力おかしいよ'
);
