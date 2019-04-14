<template>
  <div>
    <div class="b-container">
      <b-row>
        <b-col cols="10">
      
          <b-input type="text" size="sm" placeholder="いろんなコメントください" v-model="message"></b-input>
        </b-col>
        <b-col cols="2">
          <base-button size="sm" class="float-right" @click="sendChat">送信</base-button>
        </b-col>
      </b-row>
    </div>
    <div
      style="height:120px; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <li
        class="chat text-base"
        v-for="item in board"
        :key="item.id"
        style="list-style: none;"
      >
        <a class="item-image pr-1">
          <img class="m-1" :src="item.image" width="25" height="25">
        </a>
        <B class="">{{item.name}}</B>
        <a class="p-1 " v-html="item.message">{{item.message}}</a>
      </li>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";

export default {
  name: "Chat",
  data() {
    return {
      board: [],
      message: "",
      user:{}
    };
  },

  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
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
          });
      } else {
        this.$router.push("/");
      }
    });
    //認証
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
          var borad = list.reverse();
          this.board = borad;
        }
      });
  },

  methods: {
    sendChat() {
      var artistname = this.user.name;
      var message = this.message;
      var image = this.user.image;
      firebase
        .database()
        .ref("eventList/" + this.nowJoinSessionInfo + "/messageBoard/")
        .push({
          image: image,
          name: artistname,
          message: message
        });
      this.message = "";
    }
  }
};
</script>


<style>
.item-image img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232);
}


</style>