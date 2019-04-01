<template>
  <div>
    <div class="pos">
      <b-button size="sm" v-b-modal.modal-1>
        <i class="fa fa-youtube"></i>
        <i class="fa fa-music"></i>
      </b-button>

      <!-- Modal Component -->
      <b-modal id="modal-1">
        <h3>{{pageurl.score.trackTitle}} / {{pageurl.score.trackArtist}}</h3>KEY:
        <b-form-select
          size="sm"
          class="text-left"
          style="width:70px;"
          v-model="selectedKey"
          :options="keys"
        ></b-form-select>

        <b-button
          variant="danger"
          class="ml-2"
          size="sm"
          @click="playVideo(pageurl.score.trackYoutube)"
        >
        youtube
        </b-button>
        <b-button variant="warning" size="sm" @click="back()">
          BACK
          <i class="fa fa-backward"></i>
        </b-button>
      </b-modal>
    </div>

    <div class="scorebox">
      <img :src="pageurl.pageurl1" alt width="50%" v-bind:style="{ height: window.height + 'px'  }">
      <img :src="pageurl.pageurl2" alt width="50%" v-bind:style="{ height: window.height + 'px'  }">
    </div>
    <div v-if="nowplaying1">
      <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" @playing="nowplaying"></youtube>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
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
      window: {
        width: 0,
        height: 0
      },
      videoId: "",
      playerVars: {
        autoplay: 1,
        controls: 1,
        showinfo: 0,
        origin: location.protocol + "//" + location.hostname + "/"
      },
      nowplaying: false,
      nowplaying1: false,
      selectedKey: "-0"
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    filterSectionHeight() {
      const filterSectionDOM = document.getElementById("scorebox");
      return filterSectionDOM ? filterSectionDOM.offsetHeight : 0;
    },
    pageurl() {
      var pageurl1 = "";
      var pageurl2 = "";
      var score = "";
      firebase
        .database()
        .ref("trackList/" + this.$route.params.trackid)
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
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
      } else {
        this.$router.push("/");
        alert("登録ログインするとセッション譜面が見れます。");
      }
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    playVideo(id) {
      this.videoId = id;
      this.nowplaying = !this.nowplaying;
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");

      if (this.nowplaying) {
        this.window.height = window.innerHeight - 60;
        this.nowplaying1 = true;
      } else {
        this.window.height = window.innerHeight;
        this.$refs.youtube.player.stopVideo()();
        this.$refs.youtube.player.destroy();
        this.nowplaying1 = false;
      }
    },

    back() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");

      this.$router.push("/tunes");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
};
</script>
<style>
iframe {
  width: 100%;
  height: 60px;
}
.pos {
  position: absolute;
  bottom: 0%;
  right: 0%;
}
</style>
