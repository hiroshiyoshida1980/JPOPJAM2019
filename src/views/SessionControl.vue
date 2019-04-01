<template>
  <div class="SessionControl">
    <h2>順番表</h2>
    <div
      style="height:500px; width:100%; overflow-y:auto; background-color:#808080; text-align:left; padding:10px; border-radius: 3px;"
    >
      <draggable
        :options="{group:'group', animation: 150}"
        v-model="entryOrder"
        element="ul"
        @end="draggableEnd()"
        class="pl-0"
      >
        <li
          v-for="(item,index) in entryOrder"
          :key="item.entrynumber"
          style="list-style: none; background-color:#FFFFFF; text-align:left; padding:10px; margin:10px; border-radius: 3px;"
        >
          <B>No.{{index+1}} [{{item.playtimes}}回Play]</B>
          {{item.parts}}.{{item.name}} {{item.entune}}
          {{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
          <div>
            <base-button size="sm" @click="changeStage(index,item.stage)">{{item.stage}}</base-button>
            <base-button size="sm" @click="finishSess(index,item)">{{item.sessionStatus}}</base-button>
            <base-button size="sm" @click="fixSessOrder(index,item)">{{item.fixedOrder}}</base-button>
            <base-button size="sm" v-b-modal="sessOrderModalId(index)">JOIN</base-button>
            <base-button size="sm" @click="deleteSess(index,item)">削除</base-button>

            <!-- Modal Component -->
            <b-modal @ok="sendJoin(index)" :id="'sessOrderModal' + index " title="このセッションにジョイン">
              <p class="my-4">{{item.entune}}{{item.parts}}.{{item.name}}{{item.stage}}</p>

              <multiselect
                v-model="selected"
                deselect-label="一人を選んでください。"
                track-by="artistuid"
                label="name"
                placeholder="誰の代理？"
                :options="loginUserList"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
              ></multiselect>

              <multiselect
                v-model="selectedParts"
                deselect-label="パートを選んでください。"
                placeholder="パートを選ぶ。"
                :options="parts"
                :searchable="true"
                :show-labels="false"
              ></multiselect>
            </b-modal>
          </div>
        </li>
      </draggable>
    </div>

    <div style="height:50px;"></div>
    <router-link to="/toMonitor">
      <h2>画面表示</h2>
    </router-link>
    <div style="height:50px;"></div>

    <h2>代理エントリー</h2>
    <div style="background-color: lightgray;">
      <multiselect
        v-model="selectedEntry"
        deselect-label="一人を選んでください。"
        track-by="uid"
        label="name"
        placeholder="誰の代理？"
        :options="loginUserList"
        :custom-label="customLabel"
        :searchable="true"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <div style="height:10px;"></div>

      <multiselect
        v-model="selectedStage"
        deselect-label="ステージを選んでください。"
        placeholder="ステージを選ぶ。"
        :options="stage"
        :searchable="true"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <div style="height:10px;"></div>
      <multiselect
        v-model="selectedPartsEntry"
        deselect-label="パートを選んでください。"
        placeholder="パートを選ぶ。"
        :options="parts"
        :searchable="true"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <div style="height:10px;"></div>
      <multiselect
        v-model="selectedTunes"
        deselect-label="曲を選んでください。"
        placeholder="曲を選ぶ。"
        :options="trackList"
        :searchable="true"
        track-by="trackId"
        label="Title"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <div style="height:10px;"></div>
      <multiselect
        v-model="selectedKeys"
        deselect-label="キーを選んでください"
        placeholder="キーを選ぶ。"
        :options="keys"
        :searchable="true"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>

      <div>
        <base-button @click="newEntry">代理NEW ENTRY</base-button>
      </div>
    </div>
    <div style="height:50px;"></div>
    <h2>YOUTUBEライブ配信</h2>

    <base-input v-model="videoId" type="text" placeholder="videoId"></base-input>
    <div>
      <base-button @click="sendvideoId">sendvideoId</base-button>
    </div>
    <div style="height:50px;"></div>

    <h2>イベント作成</h2>

    <base-input type="text" placeholder="イベントタイトル" v-model="eventTitle"></base-input>

    <DatePickers v-on:date="datepick"/>
    <base-input type="text" placeholder="場所" v-model="eventPlace"></base-input>

    <base-input type="text" placeholder="スタート時間" v-model="eventStartTime"></base-input>

    <b-textarea placeholder="詳細" v-model="eventDetail"></b-textarea>
    <div v-html="compiledMarkdown"></div>

    <base-button @click="eventSet()">送信</base-button>
    <div style="height:20px;"></div>

    <base-button @click="trackinn()">trakc</base-button>

    <h2>楽曲登録</h2>

    <base-input type="text" placeholder="タイトル/アーティスト名" v-model="trackTitle"></base-input>

    <base-input type="text" placeholder="歌詞URL" v-model="lyricUrl"></base-input>

    <base-input type="text" placeholder="YOUTUBE" v-model="trackYoutube"></base-input>

    <base-input type="text" placeholder="リードシート" v-model="leadsheet"></base-input>

    <base-button @click="trackSet()">送信</base-button>
    <div style="height:20px;"></div>

    <base-button style="text-align: left;" @click="sendReset">全ポイントリセット</base-button>
  </div>
</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";
import draggable from "vuedraggable";
import Datepicker from "vuejs-datepicker";
import DatePickers from "./components/JavascriptComponents/DatePickers";

export default {
  name: "SessionControl",
  components: { Multiselect, draggable, Datepicker, DatePickers },

  data() {
    return {
      trackTitle: "",
      lyricUrl: "",
      leadsheet: "",
      trackYoutube: "",
      today: "2018-10-04",
      DatePickerFormat: "yyyy-MM-dd",
      list: [],
      eventTitle: "",
      modalShow: false,
      eventDetail: "",
      eventDate: "",
      eventPlace: "",
      eventStartTime: "",
      mslist: "",
      eboard: "",
      entrylist: [],
      videoId: "https://www.youtube.com/watch?v=XOzGU9hQptU",
      finlist: [],
      finnumber: 0,
      selectedSession: [],
      selectedplSession: [],
      selectedplSession2: [],
      selectedplSession3: [],
      selectedPersonpr: [],
      selectedfinSession: [],
      selectedParts: null,
      selectedPartsEntry: null,
      entune: "",
      plyor: [],
      result: "",
      selectedsess: "",
      selectedPerson: [],
      loginUserList: [],
      en1: "",
      nowplaynumber: "",
      artistname: "",
      notbr: "",
      isButtonDisabled: false,
      show: true,
      toOrder: [],
      finname: "",
      image: "",
      sortedbanndlist: [],
      sortedacolist: [],
      toplist: [],
      point: "",
      iine: "",
      playt: "",
      clist: [],
      flist: [],
      nlist: [],
      forSelectlist: [],
      slist: [],
      entryOrder: [], // 最新状態はここにコピーされる
      name: "", // 名前
      board: "",
      selected: null,
      selectedEntry: null,
      selectedStage: null,
      selectedKeys: null,
      stageselecter: "Band",
      stage: ["お任せ(推奨)", "Band", "Aco"],
      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"],
      keys: [
        "原キー",
        "+6",
        "+5",
        "+4",
        "+3",
        "+2",
        "+1",
        "-1",
        "-2",
        "-3",
        "-4",
        "-5",
        "-6"
      ],
      trackList: [],
      namelist: [],
      entrystatus: [],
      selectedTunes: "",
      newName: "",
      isAllSelected: false,
      selectedTrackId: [],
      entrynumber: 0
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    },
    compiledMarkdown: function() {
      const MarkdownIt = require("markdown-it");
      const meta = require("markdown-it-meta");
      const md = new MarkdownIt();
      md.use(meta);
      const result = md.render(this.eventDetail);

      return result;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();
        this.today = year + "-" + month + "-" + date;

        this.listen();
      } else {
      }
    });
  },

  methods: {
    customLabel ({ name, image }) {
      return `${name} – ${image}`
    },
    datepick(date) {
      this.eventDate = date;
    },
    listen() {
      var useruid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("loginuser/" + useruid)
        .on("value", snapshot => {
          var loginuser = snapshot.val();
          this.name = loginuser.name;
          this.image = loginuser.image;
        });

      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const rootList = snapshot.val();
            let eo = [];
            Object.keys(rootList).forEach((val, key) => {
              eo.push(rootList[val]);
            });
            this.entryOrder = eo;
            this.entrynumber = eo.length;
          }
        });

      firebase
        .database()
        .ref("trackList/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const rootList = snapshot.val();
            let list3 = [];

            Object.keys(rootList).forEach((val, key) => {
              list3.push(rootList[val]);
            });
            this.trackList = list3;
          }
        });

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });

            var nlist = list.filter(function(element) {
              return element.status !== "";
            });

            this.loginUserList = nlist;
          }
        });
    },

    selectAllTracks() {
      if (this.isAllSelected) {
        this.selectedTrackId = [];
        this.isAllSelected = false;
      } else {
        this.selectedTrackId = [];
        for (var item in this.trackList) {
          this.selectedTrackId.push(this.trackList[item].trackId);
        }
        this.isAllSelected = true;
      }
    },
    select() {
      if (this.selectedTrackId.length !== this.trackList.length) {
        this.isAllSelected = false;
      } else {
        this.isAllSelected = true;
      }
    },

    draggableEnd() {
      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/")
        .set(this.entryOrder);
    },

    deleteSess(index, item) {
      if (window.confirm(item.name + "の" + item.entune + "を削除しますか？")) {
        firebase
          .database()
          .ref("loginuser/" + item.artistuid)
          .update({ status: "not_entry" });

        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .remove();
      }
    },

    fixSessOrder(index, item) {
      if (
        window.confirm(item.name + "の" + item.entune + "を順番確定しますか？")
      ) {
        firebase
          .database()
          .ref("loginuser/" + item.artistuid + "/message")
          .push({
            image: this.image,
            name: this.nowJoinSessionInfo,
            message: "セッションの順番が確定しました。"
          });

        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .update({ fixedOrder: "確定済" });
      }
    },

    sessOrderModalId(index) {
      return "sessOrderModal" + index;
    },

    finishSess(index, item) {
      var times = 0;
      firebase
        .database()
        .ref("loginuser/" + item.artistuid + "/played")
        .once("value", snapshot => {
          times = snapshot.val();
        });

      if (item.sessionStatus == "finished") {
        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .update({ sessionStatus: "coming" });

        firebase
          .database()
          .ref("loginuser/" + item.artistuid)
          .update({ played: times - 1, status: "now_entry" });
      } else {
        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .update({ sessionStatus: "finished" });

        firebase
          .database()
          .ref("loginuser/" + item.artistuid)
          .update({ played: times + 1, status: "not_entry" });
      }
    },

    changeStage(index, stage) {
      if (stage == "Band") {
        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .update({ stage: "Aco" });
      } else {
        firebase
          .database()
          .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/" + index)
          .update({ stage: "Band" });
      }
    },

    eventSet() {
      if (
        confirm(
          "この内容で登録しますか？\n\n" +
            this.eventTitle +
            "\n" +
            this.eventDetail +
            "\n" +
            this.eventDate +
            "\n" +
            this.eventPlace +
            "\n" +
            this.eventStartTime +
            "\n" +
            this.selectedTrackId
        )
      ) {
        var myRef = firebase
          .database()
          .ref("eventList/")
          .push();
        var key = myRef.getKey();

        var newData = {
          eventId: key,
          eventTitle: this.eventTitle,
          eventDetail: this.eventDetail,
          eventPlace: this.eventPlace,
          eventStartTime: this.eventStartTime,
          eventDate: this.eventDate,
          selectedTrackId: this.selectedTrackId
        };

        myRef.set(newData);
      }
    },

    trackSet() {
      if (
        confirm(
          "この内容で登録しますか？\n\n" +
            this.trackTitle +
            "\n" +
            this.lyricUrl +
            "\n" +
            this.leadsheet +
            "\n" +
            this.trackYoutube
        )
      ) {
        var myRef = firebase
          .database()
          .ref("trackList/")
          .push();
        var key = myRef.getKey();

        var newData = {
          trackId: key,
          trackTitle: this.trackTitle,
          lyricUrl: this.lyricUrl,
          trackYoutube: this.trackYoutube,
          leadsheet: this.leadsheet
        };

        myRef.set(newData);
      }
    },

    sendvideoId() {
      var videoId = this.videoId;
      var result = videoId.replace("https://www.youtube.com/watch?v=", "");
      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/videoId/")
        .set({
          ID: result
        });
    },

    newEntry() {
      var useruid = this.selectedEntry["uid"];
      var artistname = this.selectedEntry["name"];
      var played = 0;
      var playtimes = played;
      var image = "";
      var pr = "";

      firebase
        .database()
        .ref("loginuser/" + useruid + "/played")
        .once("value", snapshot => {
          played = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/image")
        .once("value", snapshot => {
          image = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/name")
        .on("value", snapshot => {
          artistname = snapshot.val();
        });

      firebase
        .database()
        .ref("loginuser/" + useruid + "/pr")
        .on("value", snapshot => {
          pr = snapshot.val();
        });

      if (this.selectedStage == "お任せ(推奨)") {
        var selectedStage = this.stageselecter;
      } else {
        var selectedStage = this.selectedStage;
      }

      var selectedKeys = this.selectedKeys;
      var selectedTunes = this.selectedTunes.Title;
      var selectedPartsEntry = this.selectedPartsEntry;

      if (
        useruid == null ||
        selectedStage == null ||
        selectedTunes == null ||
        selectedPartsEntry == null ||
        selectedKeys == null
      ) {
        this.isButtonDisabled = false;

        alert("全てを選択してください");
      } else {
        if (
          confirm(
            "この内容でエントリーしますか？\n\n" +
              artistname +
              "\n" +
              selectedStage +
              "ステージ\n" +
              selectedTunes +
              " key" +
              selectedKeys +
              "\nパート " +
              selectedPartsEntry +
              "\n ※ 一度エントリーすると基本変更はできません！\nどうしても変更の場合はスタッフまで。"
          )
        ) {
          var myRef = firebase
            .database()
            .ref("eventList/" + this.nowJoinSessionInfo + "/entryOrder/")
            .push();
          var key = myRef.getKey();

          var newData = {
            playtimes: played,
            entrynumber: key,
            stage: selectedStage,
            entune: selectedTunes + "." + selectedKeys,
            image: image,
            parts: selectedPartsEntry,
            artistuid: useruid,
            name: artistname,
            sessionStatus: "coming",
            pr: pr,
            fixedOrder: "未確定"
          };

          firebase
            .database()
            .ref(
              "eventList/" +
                this.nowJoinSessionInfo +
                "/entryOrder/" +
                this.entrynumber
            )
            .set(newData);

          firebase
            .database()
            .ref("eventList/" + this.nowJoinSessionInfo + "/messageBoard/")
            .push({
              image: image,
              name: artistname,
              message: selectedPartsEntry + ">" + selectedTunes + "をエントリー！"
            });

          firebase
            .database()
            .ref("loginuser/" + useruid)
            .update({
              status:
                selectedTunes +
                " " +
                selectedKeys +
                "を" +
                selectedPartsEntry +
                "でエントリー中"
            });

          alert("順番が確定するまでお待ちください！楽しんで！");
        }
      }
    },

    sendJoin(key) {
      var useruid = this.selected["uid"];
      var artistname = this.selected["name"];
      var selectedsessionId = key;
      var selectedParts = this.selectedParts;

      var selper = 0;

      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/entryOrder/" +
            selectedsessionId
        )
        .on("value", snapshot => {
          if (snapshot.val()) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              var result = val.match(/player./);

              if (result != null) {
                list.push(rootList[val]);
              }
            });

            selper = list.length;
          }
        });
      var selp = selper + 1;
      var selplayernumbername = "player" + selp;
      var selplayernumberuid = "p_uid" + selp;
      if (artistname == null || selectedParts == null) {
        this.isButtonDisabled = false;

        alert("すべてを選択してください");
      } else {
        if (
          confirm(
            "この内容でジョインしますか？\n" + artistname + "\n" + selectedParts
          )
        ) {
          firebase
            .database()
            .ref(
              "eventList/" +
                this.nowJoinSessionInfo +
                "/entryOrder/" +
                selectedsessionId
            )
            .update({
              [selplayernumbername]: selectedParts + "." + artistname,
              [selplayernumberuid]: useruid
            });
          this.modalShow = false;
        }
      }
    },
    trackinn() {
      var rootList = [
        {
          trackYoutube: "SX_ViT4Ra7k",
          trackTitle: "Lemon/米津 玄師",
          titleSlug: "Lemon_yonetsugenshi",
          lyricUrl: "https://gakufu.gakki.me/m/data/OCD2258.html",
          leadSheet: "Lemon"
        },
        {
          trackYoutube: "9qRCARM_LfE",
          trackTitle: "愛を伝えたいだとか/あいみょん",
          titleSlug: "aiwotsutaetaidatoka_aimyon",
          lyricUrl: "https://gakufu.gakki.me/m/data/RQ06666.html",
          leadSheet: "aiwotsutaetaidatoka_aimyon"
        },
        {
          trackYoutube: "BLJ_G0rnL7M",
          trackTitle: "AM11:00/HY",
          titleSlug: "AMichiichi:zerozero_HY",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT00312.html",
          leadSheet: "AM1100"
        },
        {
          trackYoutube: "-9DxpPiE458",
          trackTitle: "Automatic/宇多田ヒカル",
          titleSlug: "Automatic_utadahikaru",
          lyricUrl: "http://gakufu.gakki.me/m/data/M00175.html",
          leadSheet: "Automatic"
        },
        {
          trackYoutube: "l7z0QXvE1gs",
          trackTitle: "BabyILoveYou/TEE",
          titleSlug: "BabyILoveYou_TEE",
          lyricUrl: "http://gakufu.gakki.me/m/data/N00743.html",
          leadSheet: "Baby_I_Love_You"
        },
        {
          trackYoutube: "WCthorsEn-U",
          trackTitle: "ChooChooTRAIN/EXILE",
          titleSlug: "ChooChooTRAIN_EXILE",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT00683.html",
          leadSheet: "Choo_Choo_TRAIN"
        },
        {
          trackYoutube: "gsVGf1T2Hfs",
          trackTitle: "DragonNight/SEKAINOOWARI",
          titleSlug: "DragonNight_SEKAINOOWARI",
          lyricUrl: "http://gakufu.gakki.me/m/data/N03483.html",
          leadSheet: "Dragon_Night"
        },
        {
          trackYoutube: "aHIR33pOUv0",
          trackTitle: "Everything/MISIA",
          titleSlug: "Everything_MISIA",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT00988.html",
          leadSheet: "Everything"
        },
        {
          trackYoutube: "o1sUaVJUeB0",
          trackTitle: "FirstLove/宇多田ヒカル",
          titleSlug: "FirstLove_utadahikaru",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT01067.html",
          leadSheet: "First_Love"
        },
        {
          trackYoutube: "LgBxze0ye94",
          trackTitle: "GetWild/TMNETWORK",
          titleSlug: "GetWild_TMNETWORK",
          lyricUrl: "https://gakufu.gakki.me/m/data/RQ06341.html",
          leadSheet: "Get_Wild"
        },
        {
          trackYoutube: "1mzLzI3dU6U",
          trackTitle: "GLAMOROUSSKY/中嶋美嘉",
          titleSlug: "GLAMOROUSSKY_nakajimayoshiyoshimi",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT01222.html",
          leadSheet: "GLAMOROUS_SKY"
        },
        {
          trackYoutube: "2MNL2mU8pBE",
          trackTitle: "HANABI/Mr.Children",
          titleSlug: "HANABI_Mr.Children",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT01330.html",
          leadSheet: "HANABI"
        },
        {
          trackYoutube: "k7D6CguCXqc",
          trackTitle: "ILOVEYOU/クリス・ハート",
          titleSlug: "ILOVEYOU_kurisu・haーto",
          lyricUrl: "https://gakufu.gakki.me/m/data/N02787.html",
          leadSheet: "I_LOVE_YOU_クリス・ハート"
        },
        {
          trackYoutube: "rzfxsiPAa6o",
          trackTitle: "ILOVEYOU/尾崎豊",
          titleSlug: "ILOVEYOU_ozakiyutaka",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT2076.html",
          leadSheet: "I_LOVE_YOU_尾崎豊"
        },
        {
          trackYoutube: "5wCC02E3w3c",
          trackTitle: "LA・LA・LALOVESONG/久保田利伸",
          titleSlug: "LA・LA・LALOVESONG_kubotatoshinobu",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT01805.html",
          leadSheet: "LA・LA・LA_LOVE_SONG"
        },
        {
          trackYoutube: "6A7j6eryPV4",
          trackTitle: "LOVEマシーン/モーニング娘。",
          titleSlug: "LOVEmashiーn_moーningumusume。",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT2809.html",
          leadSheet: "LOVEマシーン"
        },
        {
          trackYoutube: "4-Gw0TAM6-Q",
          trackTitle: "R.Y.U.S.E.I/三代目JSoulBrothers",
          titleSlug: "R.Y.U.S.E.I_sandaimeJSoulBrothers",
          lyricUrl: "http://gakufu.gakki.me/m/data/N03107.html",
          leadSheet: "R.Y.U.S.E.I"
        },
        {
          trackYoutube: "PLgYflfgq0M",
          trackTitle: "STAYTUNE/Suchmos",
          titleSlug: "STAYTUNE_Suchmos",
          lyricUrl: "http://gakufu.gakki.me/m/data/RQ05590.html",
          leadSheet: "STAY_TUNE"
        },
        {
          trackYoutube: "B2fPYlGKdXM",
          trackTitle: "STORY/AI",
          titleSlug: "STORY_AI",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT03064.html",
          leadSheet: "STORY"
        },
        {
          trackYoutube: "AzNq9K_NmG4",
          trackTitle: "SWEET MEMORIES/松田聖子",
          titleSlug: "SWEETMEMORIES_matsudaseiko",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT03159.html",
          leadSheet: "Sweet_Memories"
        },
        {
          trackYoutube: "8lU_5XgOGGA",
          trackTitle: "ultrasoul/B'z",
          titleSlug: "ultrasoul_B'z",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT03378.html",
          leadSheet: "ultra_soul"
        },
        {
          trackYoutube: "mE_jH0J0ClA",
          trackTitle: "WINDINGROAD/絢香×コブクロ",
          titleSlug: "WINDINGROAD_ayaka×kobukuro",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT03524.html",
          leadSheet: "WINDING_ROAD"
        },
        {
          trackYoutube: "yfZIaTZJo0o",
          trackTitle: "YAHYAHYAH/CHAGEandASKA",
          titleSlug: "YAHYAHYAH_CHAGEandASKA",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT03571.html",
          leadSheet: "YAH_YAH_YAH"
        },
        {
          trackYoutube: "vCBlyz7VmS8",
          trackTitle: "カブトムシ/AIKO",
          titleSlug: "kabutomushi_AIKO",
          lyricUrl: "http://gakufu.gakki.me/m/data/M00262.html",
          leadSheet: "カブトムシ"
        },
        {
          trackYoutube: "f2w9JwQaT4U",
          trackTitle: "くちばしにチェリー/エゴラッピン",
          titleSlug: "kuchibashinichileriー_egorappin",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT04745.html",
          leadSheet: "くちばしにチェリー"
        },
        {
          trackYoutube: "73w8J-o9614",
          trackTitle: "ハナミズキ/一青窈",
          titleSlug: "hanamizuki_hitoto窈",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT06420.html",
          leadSheet: "ハナミズキ"
        },
        {
          trackYoutube: "1Z3Co85ACO0",
          trackTitle: "ひまわりの約束/秦基博",
          titleSlug: "himawarinoyakusoku_hatahajimehaku",
          lyricUrl: "http://gakufu.gakki.me/m/data/N03251.html",
          leadSheet: "ひまわりの約束"
        },
        {
          trackYoutube: "4Cx8gyCcA7c",
          trackTitle: "プレイバック Part2/山口百恵",
          titleSlug: "pureibakkuPartni_yamaguchimomoe",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT06841.html",
          leadSheet: "プレイバックPart2"
        },
        {
          trackYoutube: "51CH3dPaWXc",
          trackTitle: "ロビンソン/スピッツ",
          titleSlug: "robinson_supittsu",
          lyricUrl: "http://gakufu.gakki.me/m/data/M00036.html",
          leadSheet: "ロビンソン"
        },
        {
          trackYoutube: "AgfUewgwPOw",
          trackTitle: "ロマンスの神様/広瀬香美",
          titleSlug: "romansunokamisama_hirosekoumi",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT07741.html",
          leadSheet: "ロマンスの神様"
        },
        {
          trackYoutube: "gU5oN0KVofU",
          trackTitle: "愛をこめて花束を/SuperFly",
          titleSlug: "aiwokometehanatabawo_SuperFly",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT07971.html",
          leadSheet: "愛をこめて花束を"
        },
        {
          trackYoutube: "_PRzpqbcc-s",
          trackTitle: "何度でも/DREAMSCOMETRUE",
          titleSlug: "nandodemo_DREAMSCOMETRUE",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT08455.html",
          leadSheet: "何度でも"
        },
        {
          trackYoutube: "H_he4RMr2qs",
          trackTitle: "丸の内サディステック/椎名林檎",
          titleSlug: "marunouchisadelisutekku_shiinaringo",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT08866.html",
          leadSheet: "丸の内サディスティック"
        },
        {
          trackYoutube: "6lKTQbrM9RI",
          trackTitle: "今夜はブギーバック/小沢健二featuringスチャダラパー",
          titleSlug: "konyahabugiーbakku_ozawakenjifeaturingsuchadarapaー",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT09878.html",
          leadSheet: "今夜はブギーバック"
        },
        {
          trackYoutube: "wHw6W4BznTM",
          trackTitle: "三日月/絢香",
          titleSlug: "mikaduki_ayaka",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT10038.html",
          leadSheet: "三日月"
        },
        {
          trackYoutube: "FS8ht8M7SJA",
          trackTitle: "残酷な天使のテーゼ/高橋洋子",
          titleSlug: "zankokunatenshinoteーze_takahashiyouko",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT10064.html",
          leadSheet: "残酷な天使のテーゼ"
        },
        {
          trackYoutube: "jOegTv3a2h4",
          trackTitle: "糸/中島みゆき",
          titleSlug: "ito_nakajimamiyuki",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT10145.html",
          leadSheet: "糸"
        },
        {
          trackYoutube: "u8EkSB9zSpE",
          trackTitle: "小さな恋のうた/MONGOL800",
          titleSlug: "chiisanakoinouta_MONGOLhachizerozero",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT10602.html",
          leadSheet: "小さな恋のうた"
        },
        {
          trackYoutube: "wnFGY_NToEI",
          trackTitle: "接吻/ORIGINAL LOVE",
          titleSlug: "seppun_ORIGINALLOVE",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT11361.html",
          leadSheet: "接吻"
        },
        {
          trackYoutube: "J5Z7tIq7bco",
          trackTitle: "奏/スキマスイッチ",
          titleSlug: "sou_sukimasuicchi",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT11475.html",
          leadSheet: "奏"
        },
        {
          trackYoutube: "-tKVN2mAKRI",
          trackTitle: "打上花火/DAOKO",
          titleSlug: "uchiagehanabi_DAOKO",
          lyricUrl: "https://gakufu.gakki.me/m/data/N08503.html",
          leadSheet: "打上花火"
        },
        {
          trackYoutube: "j7CDb610Bg0",
          trackTitle: "天体観測/BUMPOFCHICKEN",
          titleSlug: "tentaikansoku_BUMPOFCHICKEN",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT11945.html",
          leadSheet: "天体観測"
        },
        {
          trackYoutube: "gEX21myCfU8",
          trackTitle: "白い恋人達/桑田佳祐",
          titleSlug: "shiroikoibitotachi_kuwatakeisuke",
          lyricUrl: "https://gakufu.gakki.me/m/data/DT12398.html",
          leadSheet: "白い恋人達"
        },
        {
          trackYoutube: "2hACJAwT4ik",
          trackTitle: "夜空ノムコウ/SMAP",
          titleSlug: "yozoranomukou_SMAP",
          lyricUrl: "http://gakufu.gakki.me/m/data/M00258.html",
          leadSheet: "夜空ノムコウ"
        },
        {
          trackYoutube: "jhOVibLEDhA",
          trackTitle: "恋/星野源",
          titleSlug: "koi_hoshinohajime",
          lyricUrl: "http://gakufu.gakki.me/m/data/N06915.html",
          leadSheet: "恋"
        },
        {
          trackYoutube: "dFf4AgBNR1E",
          trackTitle: "恋するフォーチュンクッキー/AKB48",
          titleSlug: "koisurufuloーchunkukkiー_AKByonhachi",
          lyricUrl: "http://gakufu.gakki.me/m/data/N02289.html",
          leadSheet: "恋するフォーチュンクッキー"
        },
        {
          trackYoutube: "8iSG4jIUkcU",
          trackTitle: "そばかす/JUDYANDMARY",
          titleSlug: "sobakasu_JUDYANDMARY",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT05660.html",
          leadSheet: "そばかす"
        },
        {
          trackYoutube: "JeYJnSuYgrs",
          trackTitle: "つつみ込むように.../MISIA",
          titleSlug: "tsutsumikomuyouni..._MISIA",
          lyricUrl: "http://gakufu.gakki.me/m/data/DT05915.html",
          leadSheet: "つつみ込むように"
        },
        {
          trackYoutube: "uKgmu8g-kXE",
          trackTitle: "ハピネス/AI",
          titleSlug: '"hapinesu_AI',
          lyricUrl: "http://gakufu.gakki.me/m/data/N00723.html",
          leadSheet: "ハピネス"
        }
      ];

      Object.keys(rootList).forEach((val, key) => {
        var myRef = firebase
          .database()
          .ref("trackList/")
          .push();

        var tt = rootList[val].trackTitle.split("/");

        var key = myRef.getKey();

        var data = {
          trackId: key,
          lyricUrl: rootList[val].lyricUrl,
          leadSheet: rootList[val].leadSheet,
          titleSlug: rootList[val].titleSlug,
          trackTitle: tt[0],
          Title: rootList[val].trackTitle,
          trackArtist: tt[1],
          trackYoutube: rootList[val].trackYoutube
        };

        myRef.set(data);
      });
    },
    sendReset() {
      if (confirm("本当にポイント、プレイ回数をリセットしますか？")) {
        firebase
          .database()
          .ref("loginuser/")
          .on("value", snapshot => {
            if (snapshot.val()) {
              const rootList = snapshot.val();
              let list = [];

              Object.keys(rootList).forEach((val, key) => {
                firebase
                  .database()
                  .ref("loginuser/" + val)
                  .update({
                    getapt: 0,
                    apt: 0,
                    played: 0,
                    status: ""
                  });
              });
            }
          });
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
}
</style>