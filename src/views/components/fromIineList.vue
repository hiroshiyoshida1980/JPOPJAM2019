<template>
  <div>
    もらったいいね！！: {{fromiineList.length}}
    <div
      style="height:150px; width:100%; overflow-y:auto; background-color:#FFFFFF; text-align:left; padding:10px; border-radius: 3px;"
    >
      <li
        class="text-base"
        v-for="(item,index) in fromiineList"
        :key="index"
        style="list-style: none;"
      >
        <a class="item-image pr-2">
          <img class="m-1" :src="item.image" width="40" height="40">
        </a>
        <B>{{item.name}}</B>
        から
        <i class="fa fa-thumbs-up"></i>いいね！
      </li>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";

export default {
  name: "fromIineList",
  data() {
    return {
      fromiineList: [],
      iine: 0
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
        this.fromiinelisten();
      } else {
        this.$router.push("/");
      }
    });
    //認証

    firebase
      .database()
      .ref("eventList/" + this.nowJoinSessionInfo + "/fromiineList/")
      .on("value", snapshot => {
        this.fromiinelisten();
      });
  },
  methods: {
    fromiinelisten() {
      var useruid = firebase.auth().currentUser.uid;
      var iinelist = [];
      firebase
        .database()
        .ref(
          "eventList/" + this.nowJoinSessionInfo + "/fromiineList/" + useruid
        )
        .on("value", snapshot => {
          var rootList1 = [];
          if (snapshot.val()) {
            rootList1 = snapshot.val();
            Object.keys(rootList1).forEach(function(val, key) {
              if (rootList1[val].iine) {
                firebase
                  .database()
                  .ref("loginuser/" + val)
                  .on("value", snapshot => {
                    if (snapshot.val()) {
                      iinelist.push(snapshot.val());
                    }
                  });
              }
            });
            this.fromiineList = iinelist;
          }
        });
    },
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