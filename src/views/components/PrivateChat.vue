<template>
  <div>
    <div
      style="height:150px; width:100%; overflow-y:auto; background-color:#EFEFEF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <li
        class="chat text-base pb-2"
        v-for="(item,key) in board"
        :key="key"
        style="list-style: none;"
      >
        <a class="item-image pr-2">
          <img class="m-1" :src="item.image" width="40" height="40">
        </a>
        <B>{{item.name}}</B>
        <a>{{item.message}}</a>
      </li>

      
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'

export default {
  name: "PrivateChat",
  data() {
    return {
      name: "", // 名前
      image: "",
      board: [],
      artistname: "",
      message: "",
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    var useruid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("loginuser/" + useruid + "/message")
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

    firebase
      .database()
      .ref("loginuser/" + useruid + "/image")
      .on("value", snapshot => {
        this.image = snapshot.val();
      });

    firebase
      .database()
      .ref("loginuser/" + useruid + "/name")
      .on("value", snapshot => {
        this.name = snapshot.val();
      });
  },

  methods: {
    sendChat() {
      var artistname = this.name;
      var message = this.message;
      var image = this.image;
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