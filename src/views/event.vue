<template>
  <div class="event">
    <div class="Eventdiv">
      <div class="Eventbox">
        <div class="intro">
          <h1>EVENT</h1>
        </div>

        <section id="intro1section">
          <div class="intro1">
            <div class="introtext1">
              <h2>
                <span style="background-color:#fff">東京で一番ポップなジャムセッション。</span>
              </h2>
              <p>ジャムセッションって何？というあなたから、数々のセッション現場を渡り歩いてきたプロのバックミュージシャンまで。世代も国籍も超えて、“J-POP”をあなたのスタイルで歌い、演奏する場所。見ているだけでも一緒に歌い、踊り、盛り上がれるはず。</p>
            </div>
            <div class="introimg1">
              <img src="/img/Event_Intro.png" alt>
            </div>
          </div>
          <div class="intro2">
            <div class="introimg2">
              <img src="/img/Event_Intro2.png" alt>
            </div>
            <div class="introtext2">
              <h2>
                <span style="background-color:#fff">心が歌いたがってるんだ。</span>
              </h2>
              <p>知ってる曲を一緒に口ずさんで楽しむのもよし、ドキドキしながらエントリーしてステージに立つもよし。見てるだけのつもりが心が揺さぶられて、このステージに立つことを目標に練習を続ける人も。あなたの"音楽したがってる魂"をいつでも歓迎しています。</p>
            </div>
          </div>

          <div class="intro3">
            <div class="introtext3">
              <h2>
                <span style="background-color:#fff">日本の音楽シーンの入り口へようこそ。</span>
              </h2>
              <p>J-POP JAMのホストメンバーは、メジャーな音楽のサポートや、東京の至るところでハイレベルなセッションを繰り広げているプロたち。ここでの繋がりがより大きな音楽コミュニティに繋がっていく。</p>
            </div>
            <div class="introimg3">
              <img src="/img/Event_Intro3.png" alt>
            </div>
          </div>
        </section>

        <section id="overviewsection">
          <div class="overview">
            <img src="/img/Event_Logo.png" alt>
            <p>
              『J-POP JAM』とは、あなたの音楽活動がもっとひろがる場所。
              誰もが知ってるJPOPの名曲45曲から好きな曲を選んで、その場で一緒に演奏するイベント。
              <br>
              <br>シンガーが歌いたい曲をホストバンドと楽器奏者がサポートして演奏してもいいし、
              楽器奏者がプレイしたい曲を歌えるシンガーを募って演奏してもOK。
              その場限りで生まれる[出会い]と[音楽の科学反応]をみんなで楽しもう！
              <br>
              <br>不安があってもプロのバンドが支えます。
              今までありそうでなかった《JPOP限定のジャムセッション》[楽譜]も用意されているので、
              腕に自信のあるミュージシャンはプロ、アマ問わず大歓迎！
            </p>
          </div>
        </section>

        <hr>

        <div class="nextevent">
          <h2>次回のJ-POP JAM</h2>
          <div class="nexteventcontent">
            <div class="nexteventimg">
              <img src="/img/Event_Nextevent.png" alt>
            </div>
            <div class="nexteventtext">
              <p>
                2ヶ月に一度のお楽しみ！ (2019年より、偶数月の第2水曜に定期開催！)
                <br>『東京で一番POPなジャムセッション』
                <br>
                <br>誰もが知ってるJPOPの名曲達を演奏して楽しむも良し、飲んで見て楽しむも良し
                <br>
                <br>学生、OL、サラリーマン、美容師、保育士、SE、カメラマン、ミュージシャン、役者、デザイナー、看護師、お医者さんetc…
                プロアマ問わず、垣根を越えて音楽を奏で分かち合う参加者全員で作る[エンターテインメントLIVEイベント]です！
                <br>
                <br>☆新たなレパートリーも追加予定！
                <br>☆前回同様、英詞で歌えるJPOPもご用意してあります👍
                <br>
                <br>オシャレでラグジュアリーなライヴレストラン『渋谷Under Deer Lounge』の会場で2019年も思い切り、熱い夜を作りましょう😆🌈
              </p>
            </div>
          </div>
        </div>

        <div class="reservation p-5">
          <div v-html="result"></div>

          <div class="reservebutton">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdIdMcyp7xij0JVh36AFmY_Jl81TuZpsXd8ZUYO0OjMgsE3UQ/viewform"
              target="_blank"
            >
              <p>予約</p>
            </a>
          </div>
        </div>

        <hr>

        <div class="character">
          <h2>J-POP JAMの特徴</h2>
          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>楽曲は、１曲３分</h3>
              <h4>より多くの方と演奏して頂くために 基本の目安を『1曲 / 約3分』の長さにしています。</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>選べる2ステージ制</h3>
              <h4>バンドステージとアコースティックステージ(Agt & Per) を選んでセッションすることが出来ます！</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>８人の凄腕ホストバンド</h3>
              <h4>様々な現場で活躍する現役プロミュージシャンがあなたの演奏をサポートします！ 観客を唸らせるすごいテクニックをすぐそばで体験出来ます。</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>スマホ使って楽曲エントリー&コミュニケーション</h3>
              <h4>
                自分の名前、パート(Vo. Gt. など)をエントリー。 気になるエントリーには、「JOIN」で参加することも可能です。 素敵な演奏者を「いいねボタン」で応援することも出来ます。
                <br>※わからない、持っていない方は、スタッフがサポートします。
              </h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>全曲楽譜&歌詞カードあり、キーチェンジもOK！</h3>
              <h4>全ての楽曲に譜面と歌詞カードがありますので、ご安心ください。 自分の演奏しやすいキーに変更することも出来ます。 (プリンターで、その場で印刷対応します)</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>美味しいお酒&料理、確かな音響システム</h3>
              <h4>様々なライヴイベントからウェディングパーティーまで手がける 「渋谷Under Deer Lounge」のラグジュアリーな空間をお楽しみ下さい。</h4>
            </div>
          </div>

          <div class="categorytitle">
            <p>＜コンテンツ＞</p>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>セッションタイム</h3>
              <h4>その日出会った人同士が奏でる緊張感満載の演奏をお楽しみ下さい。</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>ベスト「いいねスト」賞、表彰タイム</h3>
              <h4>その日最も『いいね』を集めた人を表彰します。 J-POP JAMから「ささやかなプレゼント」を贈呈！</h4>
            </div>
          </div>

          <div class="bullet">
            <div class="bulletimg">
              <img src="/img/Event_Bullet.png" alt>
            </div>
            <div class="bullettext">
              <h3>プチGUSHAAAN TIME</h3>
              <h4>参加者全員で5曲選び、リレー形式で続けて演奏します。 まさに生バンドDJタイム！</h4>
            </div>
          </div>

          <div class="categorytitle">
            <p>＜最後に＞</p>
          </div>

          <div class="bullet">
            <div class="bullettext">
              <h4>
                『J-POP JAM』にかける熱い想いを綴りました：
                <a
                  href="http://liveartist.info/forjpj/"
                  target="_blank"
                >http://liveartist.info/forjpj/</a>
                <br>皆様と一緒にJ-POPを奏でられることを心より楽しみにしております！
              </h4>
            </div>
          </div>
        </div>

        <hr>

        <div class="songlist">
          <div class="songtext">
            <h2>楽曲リスト</h2>
          </div>
          <div class="songlistimg">
            <ul class="pl-0 m-4">
              <li
                v-for="item in trackList"
                :key="item.trackId"
                style="list-style: none; padding: initial; background-color:#FFFFFF; text-align:left; border-radius: 3px;"
              >
                <p>
                  {{ item.trackTitle }} / {{ item.trackArtist }}
                  <a
                    class="btn"
                    size="sm"
                    :href="item.lyricUrl"
                    @click="alt()"
                    role="button"
                  >
                    <i class="fa fa-link"></i> 歌詞
                  </a>
                </p>
              </li>
            </ul>
          </div>

          <div class="container container-lg mt-3">
            <h1>ACCESS</h1>
            <p>
              渋谷 Under Deer Lounge
              <br>〒150-0041 東京都渋谷区神南1-3-4 神南ビル B1
            </p>

            <div class="ggmap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5008679523366!2d139.6990827152218!3d35.664667280198145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188caf55adcd53%3A0x128646a2bc544d4a!2sUNDER+DEER+LOUNGE!5e0!3m2!1sja!2sjp!4v1543755981637"
                width="100%"
                height="400"
                frameborder="0"
                style="border:0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/app";

export default {
  name: "event",
  data() {
    return {
      nowJoinSession: {},
      trackList: {},
      result: ""
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    firebase
      .database()
      .ref("eventList/")
      .on("value", snapshot => {
        var eventList = snapshot.val();
        this.nowJoinSession = eventList[this.nowJoinSessionInfo];
        const MarkdownIt = require("markdown-it");
        const meta = require("markdown-it-meta");
        const md = new MarkdownIt();
        md.use(meta);
        const result = md.render(this.nowJoinSession.eventDetail);
        this.result = result;
      });

    firebase
      .database()
      .ref("trackList/")
      .on("value", snapshot => {
        this.trackList = snapshot.val();
      });
  },
  methods: {
    thumbUrl(id) {
      return "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
    },

    alt() {
      window.alert("外部サイトへ飛びます");
    }
  }
};
</script>

<style>
/* event.html -------------ーーーーーーー----------------------------------*/
.Eventdiv {
  background: url(/img/gray_singer8.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin-top: 0px;
  padding: 140px 0px 80px 0px;
}

.Eventbox {
  background-color: rgba(255, 249, 231, 0.7);
  padding: 30px 30px;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
  border-top: 80px;
}

.intro h1 {
  width: 78px;
  position: absolute;
  margin-left: -30px;
  margin-top: 5px;
  left: 50%;
  color: #000000;
  font-family: Helvetica;
  font-size: 24px;
  line-height: 29px;
  border-bottom: solid 6px black;
  padding-bottom: 5px;
}

.intro1 {
  display: flex;
}

.introtext1 {
  margin-left: 80px;
  padding-top: 116px;
}

.introtext1 h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  text-align: center;
}

.introtext1 p {
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
  margin-top: 28px;
  margin-left: 15px;
}

.introimg1 img {
  margin-top: 115px;
  margin-right: 80px;
  margin-left: 50px;
}

.intro2 {
  padding-top: 90px;
  display: flex;
}

.introimg2 img {
  margin-left: 125px;
}

.introtext2 {
  margin-left: 60px;
  margin-right: 80px;
}

.introtext2 h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 28px;
}

.introtext2 p {
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
}

.intro3 {
  margin-top: 90px;
  display: flex;
}

.introtext3 {
  margin-left: 81px;
  float: left;
}

.introtext3 h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 28px;
}

.introtext3 p {
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
  margin-left: 15px;
}

.introimg3 img {
  margin-right: 80px;
  margin-left: 50px;
}

/* イベント説明------------- */
#overviewsection {
  margin-top: 120px;
  text-align: center;
}

.overview p {
  margin-left: 108px;
  margin-top: 40px;
  margin-right: 108px;
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 15px;
  line-height: 30px;
  text-align: left;
}

/* 次回のJ-pop jam------------ */

.nextevent h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.nexteventcontent {
  /* display: flex; */
  margin-top: 70px;
  margin-left: 108px;
}

.nexteventimg {
  margin-right: 60px;
  margin-bottom: 40px;
  float: left;
}

.nexteventtext {
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 25px;
  margin-right: 108px;
}

.reservation {
  margin-right: 200px;
  margin-left: 200px;
  background-color: #fff;
  margin-top: 50px;
  padding-bottom: 28px;
}

.reservation h1 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 15px;
  line-height: 23px;
  padding-top: 28px;
  text-align: center;
}

.reservation p {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 11px;
  line-height: 20px;
  text-align: center;
  padding-top: 15px;
}

.reservation a {
  text-decoration: underline;
  color: #000000;
}

.price {
  display: flex;
}

.playerprice {
  margin-left: 35px;
}

.listenerprice {
  margin-left: 18px;
}

.listenerprice p,
.playerprice p {
  text-align: center;
}

.pricedetail {
  text-align: left;
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 11px;
  line-height: 20px;
  letter-spacing: 0.1em;
}

.pricedetail p {
  padding-top: 5px;
  text-align: left;
}

.reservebutton {
  width: 170px;
  height: 50px;
  background-color: #fdd007;
  margin-top: 15px;
  margin: 15px auto 5px;
  box-shadow: 0 0 8px gray;
}

.reservebutton p {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 12px;
}

.reservebutton a {
  text-decoration: none;
}

/* J-pop Jamの特徴----------- */
.character h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  padding-bottom: 70px;
}

.bullet {
  margin-left: 108px;
  margin-bottom: 35px;
  display: flex;
  margin-right: 108px;
}

.bulletimg {
  margin-top: 5px;
}

.bullettext {
  margin-left: 22px;
}

.bullet h3 {
  color: #000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 16px;
  line-height: 30px;
}

.bullet h4 {
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 25px;
}

.categorytitle {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 18px;
  line-height: 27px;
  margin-left: 100px;
  margin-top: 65px;
  margin-bottom: 30px;
}

hr {
  margin-top: 90px;
  margin-right: 65px;
  margin-left: 65px;
  border: 1px dashed #646464;
  margin-bottom: 50px;
}

/* 楽曲リスト --------------*/
.songlist h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.songlistimg {
  background-color: #fff;
  text-align: center;
  margin: 70px 108px 15px;
  padding: 50px 0;
  line-height: 30px;
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 30px;
}

/* スマホ用event.html */
@media (max-width: 767px) {
  .Eventdiv {
    background-position: -375px center;
    padding-bottom: 60px;
    padding-top: 75px;
  }

  .Event {
    margin: 0 15px;
    max-width: 900px;
    padding-bottom: 40px;
  }

  .intro h1 {
    width: 60px;
    font-size: 18px;
  }

  .intro1 {
    display: block;
    width: auto;
  }

  .introtext1 {
    margin: 0 7px 0 7px;
    padding-top: 90px;
  }

  .introtext1 h2 {
    font-size: 16px;
  }

  .introtext1 p {
    margin-left: 0;
  }

  .introimg1 {
    text-align: center;
  }

  .introimg1 img {
    margin: 35px 0 0 0;
  }

  .intro2 {
    display: flex;
    flex-direction: column-reverse;
    padding-top: 75px;
  }

  .introtext2 {
    margin: 0 7px 0 7px;
    text-align: center;
  }

  .introtext2 h2 {
    font-size: 16px;
    margin: 0 auto;
    margin-bottom: 22px;
  }

  .introtext2 p {
    text-align: left;
  }

  .introimg2 {
    text-align: center;
  }

  .introimg2 img {
    margin: 35px 23px 0;
  }

  .intro3 {
    display: block;
    margin-top: 75px;
  }

  .introtext3 {
    margin: 0 7px 0 7px;
    text-align: center;
  }

  .introtext3 h2 {
    font-size: 16px;
    margin: 0 auto;
    margin-bottom: 22px;
  }

  .introtext3 p {
    height: auto;
    text-align: left;
    margin-left: 0;
  }

  .introimg3 {
    text-align: center;
  }

  .introimg3 img {
    margin: 35px 23px 0;
  }

  #overviewsection {
    margin-top: 90px;
  }

  .overview img {
    width: 150px;
    height: auto;
  }

  .overview p {
    font-size: 13px;
    line-height: 22px;
    margin-left: 7px;
    margin-right: 7px;
    padding-right: 7px;
    margin-top: 30px;
  }

  hr {
    margin-top: 67px;
    margin-right: 8px;
    margin-left: 8px;
    border: 1px dashed #646464;
    margin-bottom: 47px;
  }

  .nextevent h2 {
    font-size: 15px;
  }

  .nexteventcontent {
    display: block;
    margin-top: 35px;
    margin-left: 0;
  }

  .nexteventimg {
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    float: none;
  }

  .nexteventtext {
    line-height: 22px;
    margin: 25px auto 0px;
    margin-right: 7px;
    margin-left: 7px;
  }

  .reservation {
    margin-top: 45px;
    margin-right: 25px;
    margin-left: 25px;
  }

  .reservation p {
    margin-left: 20px;
    margin-right: 20px;
  }

  .price {
    display: block;
  }

  .playerprice {
    margin-left: 15px;
    margin-right: 15px;
  }

  .listenerprice {
    margin-left: 15px;
    margin-right: 15px;
  }

  .pricedetail p {
    text-align: center;
  }

  .reservebutton {
    margin: 15px auto 0;
  }

  .character h2 {
    font-size: 15px;
    padding-bottom: 40px;
  }

  .bullet {
    margin-left: 7px;
    margin-right: 7px;
    margin-bottom: 20px;
  }

  .bulletimg {
    margin-top: 2.5px;
  }

  .bullettext {
    margin-left: 7px;
  }

  .bullet h3 {
    font-size: 14px;
    line-height: 22px;
  }

  .bullet h4 {
    font-size: 13px;
    line-height: 22px;
  }

  .categorytitle {
    font-size: 15px;
    line-height: 15px;
    margin-left: 7px;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .songlist h2 {
    font-size: 15px;
    padding-bottom: 30px;
  }

  .songlistimg {
    margin: 0px 7px 0px;
  }
}
</style>