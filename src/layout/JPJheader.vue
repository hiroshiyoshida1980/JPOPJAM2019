  <template>
  <header class="header fixed-top" v-if="!isAuth">
    <div class="beforeopen">
      <div class="mobile-menu" @click="menuOpen">
        <img src="/img/menu.svg" alt>
      </div>

      <div class="navlogo">
        <router-link to="/">
          <img src="/img/Nav_Logo.png" alt>
        </router-link>
      </div>
    </div>

    <nav v-bind:class="{ mobilemenuopen: menuOpenClose }">
      <div class="container1">
        <div class="mobile-close" @click="menuClose">
          <img src="/img/close.svg" alt>
        </div>

        <ul class="snip1135" @click="menuClose">
          <li class="current">
            <router-link to="/">TOP</router-link>
          </li>

          <li class="noanim">
            <router-link to="/event">EVENT</router-link>
          </li>

          <li class="noanim">
            <router-link to="/members">MEMBERS</router-link>
          </li>

          <li class="noanim">
            <router-link to="/">
              <img class="mb-4" src="/img/Nav_Logo.png" alt>
            </router-link>
          </li>

          <li class="noanim">
            <a href="https://www.instagram.com/jpopjam/" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li class="noanim">
            <a href="https://twitter.com/jpop_jam" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li class="noanim">
            <a href="https://www.facebook.com/jpopjam/" target="_blank">
              <i class="fa fa-facebook-square"></i>
            </a>
          </li>

          <li class="noanim">
            <router-link to="/access">ACCESS</router-link>
          </li>
          <li class="noanim"></li>
        </ul>
      </div>
    </nav>
  </header>

  <header class="header fixed-top" v-else>
    <div class="beforeopen">
      <div class="mobile-menu" @click="menuOpen">
        <img src="/img/menu.svg" alt>
      </div>

      <div class="navlogo">
        <router-link to="/top">
          <img src="/img/Nav_Logo.png" alt>
        </router-link>
      </div>

      <div class="navicon">
        <router-link to="/userinfoedit">
          <img :src="user.image" alt>
        </router-link>
        {{user.name}}
      </div>
    </div>

    <nav v-bind:class="{ mobilemenuopen: menuOpenClose }">
      <div class="container1">
        <div class="mobile-close" @click="menuClose">
          <img src="/img/close.svg" alt>
        </div>

        <ul class="snip1135" @click="menuClose">
          <li class="current">
            <router-link to="/top">TOP</router-link>
          </li>

          <li class="noanim">
            <router-link to="/userinfoedit">登録情報変更</router-link>
          </li>

          <li class="noanim">
            <router-link to="/tunes">楽曲情報</router-link>
          </li>

          <li class="noanim">
            <router-link to="/">
              <img class="mb-4" src="/img/Nav_Logo.png" alt>
            </router-link>
          </li>
          <li class="noanim">
            <router-link to="/event">EVENT</router-link>
          </li>

          <li class="noanim">
            <router-link to="/members">MEMBERS</router-link>
          </li>

          <li class="noanim">
            <router-link to="/access">ACCESS</router-link>
          </li>

          <li class="noanim">
            <a @click="signOut()">
              <i class="fa fa-sign-out"></i>
            </a>
          </li>

          <li class="noanim"></li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import firebase from "firebase/app";

export default {
  name: "JPJheader",
  data: () => ({
    menuOpenClose: false,
    isAuth: false,
    user: {}
  }),

  //認証
  created() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("loginuser/" + user.uid)
          .on("value", snapshot => {
            this.user = snapshot.val();
            this.isAuth = true;
          });
      } else {
        this.$router.push("/");
        this.isAuth = false;
      }
    });
  },
  //認証
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
    menuOpen() {
      this.menuOpenClose = true;
    },
    menuClose() {
      this.menuOpenClose = false;
    }
  }
};
</script>
<style>
.thumbs img {
  border-radius: 50%;
  vertical-align: top;
  border: solid 2px rgb(245, 245, 232);
}

/* animation ------------*/

/* header ---------------------------------------------*/
header {
  width: 100%;
  height: 60px;
  opacity: 1;
  z-index: 9999;
}

header nav {
  width: 100%;
  height: 60px;
  background-color: #fdd007;
}

header nav ul {
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  list-style-type: none;
}

header nav ul li a {
  display: block; /* リンク領域を広げる */
  padding: 0 1px;
  font-family: Helvetica;
  font-size: 13px;
  color: #000;
  letter-spacing: 1px;
  text-decoration: none;
  line-height: 60px;
}

header nav ul li a:hover img {
  opacity: 0.2;
}

header nav ul li a img {
  height: 40px;
  width: auto;
  margin-top: 10px;
}

.icon {
  font-size: 1.4em;
  line-height: 60px;
}

/* レスポンシブ用ヘッダーのアイコン-------------------*/

.mobile-menu {
  display: none;
  position: absolute;
  right: 20px;
  top: 8px;
}

.mobile-menu img {
  width: 30px;
  height: auto;
}

.mobile-close {
  display: none;
  position: absolute;
  right: 20px;
  top: 8px;
}

.mobile-close img {
  width: 30px;
  height: auto;
}

.navlogo {
  display: none;
  position: absolute;
  left: 20px;
  top: 9px;
}

.navlogo img {
  width: 90px;
  height: auto;
}

.navicon {
  display: none;
}

/* スマホ用ヘッダー */
@media (max-width: 747px) {
  .beforeopen {
    width: 100%;
    height: 47px;
    background-color: #fdd007;
  }
  header {
    width: 100%;
    height: 47px;
    opacity: 1;
    z-index: 50;
  }
  .mobile-menu {
    display: block;
  }

  .navlogo {
    display: block;
  }
  .navicon {
    position: absolute;
    left: 120px;
    top: 12px;
    font-size: 14px;
    overflow: hidden;
    width: 9rem;
    height: 47;
    white-space: nowrap;
    display: block;
  }

  .navicon img {
    border-radius: 50%;
    vertical-align: top;
    width: 25px;
    height: 25px;
  }

  header nav {
    width: 100%;
    height: 100vh;
    background-color: #fdd007;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s, visibility 0s, ease 1s;
  }

  header nav.mobilemenuopen {
    transition-delay: 0s;
    visibility: visible;
    opacity: 1;
  }

  header nav .container {
    width: 100%;
    height: 100vh;
    margin: 0;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
  .mobile-close {
    display: block;
  }

  header nav ul {
    width: 100%;
    height: auto;
    text-align: center;
    display: block;
  }

  header nav ul li.current a {
    border-bottom: none;
  }

  .snip1135 a {
    padding: 0;
    font-size: 19px;
    letter-spacing: 1.46px;
    line-height: 38px;
    margin-bottom: 10px;
  }

  .snip1135 {
    margin-top: 70px;
  }

  .noanim img {
    display: none;
  }

  .noanim a {
    margin-bottom: 0px;
  }

  .snip1135 a:before {
    display: none;
  }
  .snip1135 a:after {
    display: none;
  }

  a:hover,
  a:active {
    text-decoration: none;
    opacity: 0.7;
  }

  #nav-open {
    display: none;
  }
}
</style>
