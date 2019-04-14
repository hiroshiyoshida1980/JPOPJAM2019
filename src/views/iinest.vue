<template>
  <div class="iinelist">
    <ul class="pl-0 m-0">
      <li
        style="list-style: none; padding: initial; background-color:#FFFFFF; text-align:center; padding:150px;"
        v-for="(item,index) in oplist"
        :key="index"
      >
        <h1>NO.{{index+1}}</h1>

        <a class="item-image">
          <img :src="item.image" width="100" height="100">
        </a>

        <h1>{{item.name}}</h1>
        <h1>{{item.iine}}いいね！</h1>
      </li>
    </ul>
  </div>
</template>


<script>
import firebase from "firebase/app";

export default {
  name: "iinelist",
  data() {
    return {
      image: "",
      oplist: []
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
      .ref("eventList/" + this.nowJoinSessionInfo + "/fromiineList/")
      .on("value", snapshot => {
        this.listen();
      });
  },

  methods: {
    finClass(fin) {
      if (fin === "finished") {
        return this.finSess;
      }
    },

    listen() {
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
                    const fromiineList1 = [];
                    Object.keys(rootList).forEach(function(val, key) {
                      if (rootList[val].iine) {
                        fromiineList1.push(rootList[val]);
                      }
                    });
                    iine = Object.keys(fromiineList1).length;
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