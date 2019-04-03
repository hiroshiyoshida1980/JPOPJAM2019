<template>
  <div class="EntryPage">

    <div v-if="user.status == 'not_entry'">
      <h2>エントリー</h2>
      <div class="cp_ipradio">
        <h4 class="mt-3">1.ステージを選ぶ ：{{ radioButtonValue1 }}</h4>
        <label v-for="label in stage" :key="label">
          <input
            type="radio"
            name="radioButtonValue1"
            :value="label"
            class="option-input"
            v-model="radioButtonValue1"
          >
          {{ label }}
        </label>
        <h4 class="mt-3">2.パートを選ぶ ：{{ radioButtonValue2 }}</h4>
        <label v-for="label in parts" :key="label">
          <input
            type="radio"
            name="radioButtonValue2"
            :value="label"
            class="option-input"
            v-model="radioButtonValue2"
          >
          {{ label }}
        </label>

        <h4 class="mt-3">3.曲を選ぶ ：{{ radioButtonValue3 }}</h4>
        <label v-for="item in trackList" :key="item.trackId">
          <input
            type="radio"
            name="radioButtonValue3"
            :value="item.Title"
            class="option-input"
            v-model="radioButtonValue3"
          >
          {{ item.Title }}
        </label>

        <h4 class="mt-3">4.キーを選ぶ ：{{ radioButtonValue4 }}</h4>
        <label v-for="label in keys" :key="label">
          <input
            type="radio"
            name="radioButtonValue4"
            :value="label"
            class="option-input"
            v-model="radioButtonValue4"
          >
          {{ label }}
        </label>
      </div>

      <div style="height:20px;"></div>
      <div>
        <base-button
          v-if="user.status == 'not_entry'"
          type="warning"
          class="mb-3 mb-sm-0"
          @click="newEntry"
        >NEW ENTRY</base-button>
      </div>
    </div>
    <div v-else>{{user.status}}</div>
  </div>
</template>


<script>
import firebase from "firebase/app";
import Multiselect from "vue-multiselect";

export default {
  name: "EntryPage",
  components: { Multiselect },
  data() {
    return {
      board: "",
      selectedStage: null,
      selectedParts: null,
      selectedTunes: null,
      sessionOrderList: [],
      selectedKeys: null,
      selectedSession: [],
      modal: false,
      message: "",
      stageselecter: "Band",
      entrylist: [],
      finSess: "opacity-70",
      stage: ["お任せ(推奨)", "Band", "Aco"],
      radioButtonValue1: "お任せ(推奨)",
      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"],
      radioButtonValue2: "Vo",
      radioButtonValue3: "AM 11:00/HY",
      keys: [
        "原キー",
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
      radioButtonValue4: "原キー",
      entune: "",
      trackid: "-Lau-T5E64LhhBikhSr8",
      artistname: "",
      namelist: [],
      isButtonDisabled: false,
      forjoinlist: [],
      entryOrder: [],
      entryIndex: null,
      entrynumber: 0,
      trackList: [],
      eventList: [],
      user:{}
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    },
    radioButton1() {
      return this.stage[this.radioButtonValue1];
    },
    radioButton2() {
      return this.parts[this.radioButtonValue2];
    },
    radioButton3() {
      return this.tunes[this.radioButtonValue3];
    },
    radioButton4() {
      return this.keys[this.radioButtonValue4];
    }
  },
  created() {
    //認証
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("loginuser/" + user.uid)
          .on("value", snapshot => {
            this.user = snapshot.val();
            this.listen()
          });
      } else {
        this.$router.push("/");
      }
    });
    //認証
  },

  methods: {
    listen() {
      var useruid = this.user.uid;

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
          this.trackList = snapshot.val();
        });

      firebase
        .database()
        .ref("eventList/")
        .on("value", snapshot => {
          this.eventList = snapshot.val();
        });
    },

    newEntry() {
      var useruid = this.user.uid;
      var artistname = this.user.name;
      var played = this.user.played;
      var playtimes = played;
      var image = this.user.image;
      var pr = this.user.pr;

      if (this.selectedStage == "お任せ(推奨)") {
        var selectedStage = this.stageselecter;
      } else {
        var selectedStage = this.radioButtonValue1;
      }

      var selectedKeys = this.radioButtonValue4;
      var selectedTunes = this.radioButtonValue3;
      var selectedParts = this.radioButtonValue2;

      if (
        selectedStage == null ||
        selectedTunes == null ||
        selectedParts == null ||
        selectedKeys == null
      ) {
        this.isButtonDisabled = false;

        alert("全てを選択してください");
      } else {
        if (
          confirm(
            "この内容でエントリーしますか？\n\n" +
              selectedStage +
              "ステージ\n" +
              selectedTunes +
              " key" +
              selectedKeys +
              "\nパート " +
              selectedParts +
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
            image: this.user.image,
            parts: selectedParts,
            artistuid: useruid,
            name: artistname,
            sessionOrder: 0,
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
              image: this.user.image,
              name: artistname,
              message: selectedParts + ">" + selectedTunes + "をエントリー！"
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
                selectedParts +
                "でエントリー中"
            });

          alert("順番が確定するまでお待ちください！楽しんで！");
          this.selectedTunes = null;
          this.selectedParts = null;
        }
      }
    },

    sendJoin(index) {
      var useruid = firebase.auth().currentUser.uid;
      var artistname = this.user.name;
      var selectedsessionId = index;
      var selectedParts = this.selectedParts;

      var selper = 0;

      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/sessionOrder/" +
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
                "/sessionOrder/" +
                selectedsessionId
            )
            .update({
              [selplayernumbername]: selectedParts + "." + artistname,
              [selplayernumberuid]: useruid
            });
        }
      }
      var id = "sessOrderModal" + index;
      this.$root.$emit("bv::hide::modal", id, "#btnShow");
    }
  }
};
</script>


<style lang="scss">
h4 {
  margin-bottom: 10px;
  margin-top: 20px;
}

li {
  margin-bottom: 5px;
}

.item-image img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232);
}

.cp_ipradio {
  width: 90%;
  margin: 2em auto;
  text-align: left;
}
@keyframes click-wave {
  0% {
    position: relative;
    width: 30px;
    height: 30px;
    opacity: 0.35;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-top: -80px;
    margin-left: -80px;
    opacity: 0;
  }
}
.cp_ipradio .option-input {
  position: relative;
  position: relative;
  top: 13.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out 0s;
  color: #ffffff;
  border: none;
  outline: none;
  background: #d7d5cb;
  -webkit-appearance: none;
  appearance: none;
}
.cp_ipradio .option-input:hover {
  background: #fff1b5;
}
.cp_ipradio .option-input:checked {
  background: #fdd007;
}
.cp_ipradio .option-input:checked::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: "✔";
  text-align: center;
}
.cp_ipradio .option-input:checked::after {
  position: relative;
  display: block;
  content: "";
  -webkit-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #fdd007;
}
.cp_ipradio .option-input.radio {
  border-radius: 50%;
}
.cp_ipradio .option-input.radio::after {
  border-radius: 50%;
}
.cp_ipradio label {
  line-height: 30px;
  display: block;
}
.cp_ipradio .option-input:disabled {
  cursor: not-allowed;
  background: #b8b7b7;
}
.cp_ipradio .option-input:disabled::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: "✖︎";
  text-align: center;
}
.cp_ipradio .disabled {
  color: #9e9e9e;
}
</style>