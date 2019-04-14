<template>
  <div class="Tunes">
    <ul class="pl-0 m-0">
      <li
        style="list-style: none; padding: initial; background-color:#FFFFFF; text-align:left; padding:10px; margin:10px; border-radius: 3px;"
        :class="finClass(item.sessionStatus)"
        class="sessionlist bg-warning Small shadow mr-0 ml-0"
        v-for="(item,index) in entryOrder"
        :key="item.entrynumber"
      >
        No.{{index+1}}：Stage: {{item.stage}} 順番:{{item.fixedOrder}}
        <base-button type="danger" size="sm" class="ml-2" v-b-modal="entryOrderModalId(index)">
          <i class="fa fa-play"></i> JOIN
        </base-button>
        <!-- Modal Component -->
        <b-modal hide-footer :id="'entryOrderModal' + index " title="このセッションにジョイン">
          <p class="my-4">{{item.entune}}{{item.parts}}.{{item.name}}{{item.stage}}</p>
          <h3>パートを選んでJOIN ：{{ radioButtonValue2 }}</h3>

          <label v-for="label in parts" :key="label">
            <input
              type="radio"
              name="radioButtonValue2"
              :value="label"
              :key="label"
              class="option-input"
              v-model="radioButtonValue2"
            >
            {{ label }}
          </label>

          <base-button type="warning" size="sm" @click="sendJoin(index)">Join！</base-button>
        </b-modal>
        <div class="p-1">
          <p class="item-image pr-2 float-left">
            <img class="m-1" :src="item.image" width="40" height="40">
          </p>
          <h5>{{item.name}} {{item.entune}}</h5>
        </div>

        <base-button
          type="white"
          size="sm"
          @click="sendIine(item.artistuid)"
          :class="iineDisable(item.artistuid)"
          class="mb-1"
        >{{item.parts}}.{{item.name}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid1"
          @click="sendIine(item.p_uid1)"
          :class="iineDisable(item.p_uid1)"
        >{{item.player1}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid2"
          @click="sendIine(item.p_uid2)"
          :class="iineDisable(item.p_uid2)"
        >{{item.player2}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid3"
          @click="sendIine(item.p_uid3)"
          :class="iineDisable(item.p_uid3)"
        >{{item.player3}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid4"
          @click="sendIine(item.p_uid4)"
          :class="iineDisable(item.p_uid4)"
        >{{item.player4}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid5"
          @click="sendIine(item.p_uid5)"
          :class="iineDisable(item.p_uid5)"
        >{{item.player5}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid6"
          @click="sendIine(item.p_uid6)"
          :class="iineDisable(item.p_uid6)"
        >{{item.player6}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid7"
          @click="sendIine(item.p_uid7)"
          :class="iineDisable(item.p_uid7)"
        >{{item.player7}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid8"
          @click="sendIine(item.p_uid8)"
          :class="iineDisable(item.p_uid8)"
        >{{item.player8}}</base-button>

        <base-button
          type="white"
          size="sm"
          v-if="item.p_uid9"
          @click="sendIine(item.p_uid9)"
          :class="iineDisable(item.p_uid9)"
        >{{item.player9}}</base-button>

        <ul class="pl-0">
          <li v-for="(img,key) in liveImage(item.entrynumber)" :key="key" class="d-inline-block">
            <img
              class="m-1"
              :src="img.image"
              v-b-modal="liveimageModalId(img.image)"
              width="50"
              height="50"
            >

            <!-- Modal Component -->
            <b-modal :id="'liveimageModalId' + img.image " ok-only centered>
              <div class="mx-auto">
                <img class="m-1" :src="img.image" v-b-modal.modal-2>
                <p>
                  Photo by
                  <!--   <base-button
                type="white"
                size="sm"
                v-if="item.image"
                @click="sendIine(item.uid)"
                :class="iineDisable(item.uid)"
                  ></base-button>-->
                  {{img.name}}
                </p>
              </div>
              <base-button
                type="white"
                size="sm"
                v-if="img.uid==user.uid"
                @click="deleteImage(key,item.entrynumber)"
              >削除</base-button>
            </b-modal>
          </li>

          <liveImageModal :imageEntrynumber="item.entrynumber"/>
        </ul>
      </li>
    </ul>
  </div>
</template>


<script>
import firebase from "firebase";
import liveImageModal from "./liveImageModal";

export default {
  components: {
    liveImageModal
  },
  name: "mainEntryList",
  data() {
    return {
      finSess: "bg-white small finished",
      parts: ["Vo", "Gt", "Ba", "Dr", "Kb", "Per", "cho", "Ins"],
      radioButtonValue2: "Vo",
      iineDisabled: "iined bg-yellow fa fa-check",
      iineAbled: "fa fa-thumbs-up",
      host: "host",
      gest: "",
      entryOrder: {},
      toiineList: [],
      liveImageList: [],
      user: {}
    };
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
            this.listen();
          });
      } else {
        this.$router.push("/");
      }
    });
    //認証
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  methods: {
    listen() {
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
          }
        });

      var pon = [];
      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/liveImage/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const nameList2 = snapshot.val();
            this.liveImageList = nameList2;
          }
        });

      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/toiineList/" +
            this.user.uid
        )
        .on("value", snapshot => {
          if (snapshot.val()) {
            var toiineList = [];
            const nameList2 = snapshot.val();
            Object.keys(nameList2).forEach(function(val, key) {
              if (nameList2[val].iine) {
                toiineList.push(val);
              }
            });
            this.toiineList = toiineList;
          }
        });
    },
    iineDisable(artistuid) {
      var arr = this.toiineList;
      var isButtonDisabled1 = arr.includes(artistuid);
      if (isButtonDisabled1) {
        return this.iineDisabled;
      } else {
        return this.iineAbled;
      }
    },
    playerstatus(status) {
      if (status == "ホストメンバーとして参加中") {
        return this.host;
      } else {
        return this.gest;
      }
    },
    liveImage(entrynumber) {
      return this.liveImageList[entrynumber];
    },
    deleteImage(key, entrynumber) {
      firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/liveImage/" +
            entrynumber +
            "/" +
            key
        )
        .remove();
    },
    entryOrderModalId(index) {
      return "entryOrderModal" + index;
    },
    liveimageModalId(index) {
      return "liveimageModalId" + index;
    },
    finClass(fin) {
      if (fin === "finished") {
        return this.finSess;
      }
    },
    sendIine(artistuid) {
      var useruid = firebase.auth().currentUser.uid;
      var apt = 0;
      var arr = this.toiineList;
      var isButtonDisabled1 = arr.includes(artistuid);



      if (isButtonDisabled1) {
        firebase
          .database()
          .ref(
            "eventList/" +
              this.nowJoinSessionInfo +
              "/toiineList/" +
              useruid +
              "/" +
              artistuid
          )
          .update({
            iine: false
          });

        firebase
          .database()
          .ref(
            "eventList/" +
              this.nowJoinSessionInfo +
              "/fromiineList/" +
              artistuid +
              "/" +
              useruid
          )
          .update({
            iine: false
          });

      } else {
        firebase
          .database()
          .ref(
            "eventList/" +
              this.nowJoinSessionInfo +
              "/toiineList/" +
              useruid +
              "/" +
              artistuid
          )
          .update({
            iine: true
          });

        firebase
          .database()
          .ref(
            "eventList/" +
              this.nowJoinSessionInfo +
              "/fromiineList/" +
              artistuid +
              "/" +
              useruid
          )
          .update({
            iine: true
          });

      }
    },

    sendJoin(index) {
      var useruid = firebase.auth().currentUser.uid;
      var artistname = this.user.name;
      var selectedsessionId = index;
      var selectedParts = this.radioButtonValue2;
      var selper = 0;

      var joinRef = firebase
        .database()
        .ref(
          "eventList/" +
            this.nowJoinSessionInfo +
            "/entryOrder/" +
            selectedsessionId
        );

      joinRef.on("value", snapshot => {
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
          joinRef.update({
            [selplayernumbername]: selectedParts + "." + artistname,
            [selplayernumberuid]: useruid
          });
        }
      }
      var id = "entryOrderModal" + index;
      this.$root.$emit("bv::hide::modal", id, "#btnShow");
    }
  }
};
</script>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
}

.finished::before {
  content: "終了";
}

#host ::before {
  content: "HOST";
}
/*
.sessionlist {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-135deg, #F5365C 30px, transparent 0);
}
*/
</style>