<template>
  <div class="Tunes">
    <ul>
      <li
        :class="finClass(item.sessionStatus)"
        v-for="(item,key) in allSessionInfo.entryOrder"
        :key="key"
      >
        No.{{key+1}}：
        {{item.entune}} {{item.parts}}.{{item.name}}
        {{item.stage}}{{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}
      </li>
    </ul>

    <h6 class="is-size-6">
      <B>いろいろつぶやいてね。</B>
    </h6>

    <div
      class="container has-text-centered"
      style="list-style: none; height:50%; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <div>
        <li class="is-size-6" v-for="(item,key) in board" :key="key">
          <a class="item-image">
            <img :src="item.image" width="30" height="30">
          </a>
          <B>{{item.name}} :</B>
          <a v-html="item.message">{{item.message}}</a>
        </li>
      </div>
    </div>

    <h6 class="is-size-4">
      <B>＜いいネスト＞</B>
    </h6>
    <div>
      <ul>
        <li v-for="(item,index) in oplist" :key="index">
          <a class="item-image">
            <img :src="item.image" width="100" height="100">
          </a>
          NO,{{index}}
          <h6 class="is-size-4">{{item.name}} :{{item.iine}}いいね！</h6>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/app";

export default {
  name: "Tunes",
  data() {
    return {
      allSessionInfo: {},
      fields: ["name", "parts", "entune"],
      list: [],
      finlist: [],
      entune: "",
      plyor: 0,
      en1: "",
      artistname: "",
      notbr: "",
      board: [],
      finname: "",
      image: "",
      sortedbanndlist: [],
      sortedacolist: [],
      oplist: [],
      point: "",
      iine: "",
      playt: "",
      comingSessList: [],
      finishedSessList: [],
      nlist: [],
      finSess: "small",
      slist: []
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listen();
      } else {
      }
    });
  },

  methods: {
    finClass(fin) {
      if (fin === "finished") {
        return this.finSess;
      }
    },

    listen() {
      var board = [];
      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/messageBoard/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const rootList = snapshot.val();
            let list = [];

            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });
            this.board = list.reverse();
          }
        });

      // いいネストポイント獲得ランク
      var oplist = [];

      firebase
        .database()
        .ref("loginuser/")
        .on("value", snapshot => {
          if (snapshot.val()) {
            const uidlist = snapshot.val();
            Object.keys(uidlist).forEach((uid, key) => {
              var name = uidlist[uid].name;
              var image = uidlist[uid].image;

              var iine = 0;
              firebase
                .database()
                .ref(
                  "eventList/" +
                    this.nowJoinSessionInfo +
                    "/fromiineList/" +
                    uidlist[uid].uid
                )
                .on("value", snapshot => {
                  if (snapshot.val()) {
                    var rootList = snapshot.val();
                    var fromiineList = [];
                    Object.keys(rootList).forEach(function(val, key) {
                      if (rootList[val].iine) {
                        fromiineList.push(rootList[val]);
                      }
                    });
                    iine = Object.keys(fromiineList).length;
                  }
                });
              var iinelist = {
                name: name,
                image: image,
                iine: iine
              };
              oplist.push(iinelist);
            });
          }
          var toplist = oplist.sort(function(a, b) {
            if (a.iine > b.iine) return -1;
            if (a.iine < b.iine) return 1;
            return 0;
          });
          this.oplist = toplist;
        });

      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo)
        .on("value", snapshot => {
          if (snapshot.val()) {
            const allSessionInfo = snapshot.val();
            this.allSessionInfo = allSessionInfo;
          }
        });
    }
  }
};
</script>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
}
</style>