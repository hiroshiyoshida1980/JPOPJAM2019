<template>
  <div class="Tunes" style=" height: 100vh;">
    <div
      style="height:70%; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <ul class="pl-0 m-0">
        <li
          style="list-style: none; padding: initial; background-color:#FFFFFF; text-align:left; padding:10px; margin:10px; border-radius: 3px;"
          class="sessionlist Small shadow mr-0 ml-0"
          :class="finClass(item.sessionStatus)"
          v-for="(item,index) in allSessionInfo.entryOrder"
          :key="index"
        >
          No.{{index+1}} {{item.stage}}St
          <div class="p-1">
            <p class="item-image pr-2 float-left">
              <img class="m-1" :src="item.image" width="40" height="40">
            </p>
            <h2>{{item.name}} {{item.entune}}</h2>
          </div>
          <h7>{{item.pr}}</h7>
          <div
            class="p-1"
          >{{item.player1}} {{item.player2}} {{item.player3}} {{item.player4}} {{item.player5}} {{item.player6}} {{item.player7}} {{item.player8}} {{item.player9}}</div>
        </li>
      </ul>
    </div>
    <div
      class="container"
      style="list-style: none; padding: initial; height:30%; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <div>
        <ul class="pl-0 m-0">
          <li v-for="(item,key) in board" :key="key">
            <a class="item-image">
              <img :src="item.image" width="40" height="40">
            </a>
            <B>{{item.name}} :</B>
            <a>{{item.message}}</a>
          </li>
        </ul>
      </div>
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
      finSess: "d-none",
      slist: [],
      user: {}
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

    firebase
      .database()
      .ref("eventList/" + this.nowJoinSessionInfo)
      .on("value", snapshot => {
        if (snapshot.val()) {
          const allSessionInfo = snapshot.val();
          this.allSessionInfo = allSessionInfo;
        }
      });
  },

  methods: {
    finClass(fin) {
      if (fin === "finished") {
        return this.finSess;
      }
    },
    pr(uid) {
      var userpr = "";
      firebase
        .database()
        .ref("loginuser/" + uid)
        .on("value", snapshot => {
          userpr = snapshot.val();
        });
      return userpr.pr;
    },
    listen() {}
  }
};
</script>

<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
}
</style>