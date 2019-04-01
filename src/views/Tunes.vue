<template>
  <div class="EntryPage">
    <h4 class="mt-3">楽曲情報</h4>
    <card shadow>
      <div>
        楽曲検索/ 譜面
      </div>
      <multiselect
        v-model="selectedTrack"
        deselect-label="楽曲検索"
        placeholder="曲を選んでください。検索も可能"
        :options="trackList"
        :searchable="true"
        track-by="trackId"
        label="Title"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <multiselect
        v-model="selectedKey"
        deselect-label="KEY"
        placeholder="キー"
        :options="keys"
        :searchable="true"
        :allow-empty="false"
        :show-labels="false"
      ></multiselect>
      <div class="scorebox">
        <img :src="pageurl.pageurl1" alt width="50%">
        <img :src="pageurl.pageurl2" alt width="50%">
      </div>
   
        <router-link v-bind:to="{ name : 'Scores', params : { trackid: pageurl.score.trackId }}">
          <base-button size="sm" class="mb-2">譜面全画面表示</base-button>
        </router-link>

          <b-button size="sm" class="mb-2 ml-2" :href="pageurl.score.lyricUrl">
            <i class="fa fa-link"></i> 歌詞情報サイトへ
          </b-button>

      <div>
        <youtube
          :video-id="pageurl.score.trackYoutube||videoId"
          ref="youtube"
          :player-vars="playerVars"
        ></youtube>
      </div>
    </card>
    <ul class="pl-0 m-3 list-group">
      <li class="list-group-item" v-for="item in trackList" :key="item.trackId">
        <router-link v-bind:to="{ name : 'Scores', params : { trackid: item.trackId }}">
          <h4>{{ item.trackTitle }} / {{ item.trackArtist }}</h4>
        </router-link>

        <a size="sm" :href="item.lyricUrl" @click="alt()" role="button">
          <i class="fa fa-link"></i> 歌詞
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
import firebase from "firebase";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  name: "tunes",

  data() {
    return {
      videoId: "XOzGU9hQptU",
      playerVars: {
        autoplay: 0,
        controls: 1,
        showinfo: 0,
        origin: location.protocol + "//" + location.hostname + "/"
      },
      keys: [
        "-0",
        "-1",
        "-2",
        "-3",
        "-4",
        "-5",
        "-6",
        "+1",
        "+2",
        "+3",
        "+4",
        "+5"
      ],
      selectedKey: "-0",
      trackList: [],
      selectedTrack: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    },
    pageurl() {
      var pageurl1 = "";
      var pageurl2 = "";
      var score = "";
      firebase
        .database()
        .ref("trackList/" + this.selectedTrack.trackId)
        .on("value", snapshot => {
          if (snapshot.val()) {
            score = snapshot.val();

            pageurl1 = "/scores/" + score.leadSheet + this.selectedKey + ".png";

            pageurl2 =
              "/scores/" + score.leadSheet + this.selectedKey + "_2.png";
          }
        });
      return { pageurl1, pageurl2, score };
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("trackList/")
          .on("value", snapshot => {
            let list = [];
            let rootList = snapshot.val();
            Object.keys(rootList).forEach((val, key) => {
              list.push(rootList[val]);
            });
            this.trackList = list;
          });
      } else {
      }
    });
  },

  methods: {
  }
};
</script>

<style lang="scss">
iframe {
  width: 100%;
  height: 200px;
  
}
</style>