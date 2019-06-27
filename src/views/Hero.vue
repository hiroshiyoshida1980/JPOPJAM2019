<template>
  <section class="section-hero section-shaped my-0">
    <div class="indexrespimg">
      <div class="bg-video-wrap">
        <div class="overlay"></div>

        <video
          src="https://res.cloudinary.com/jpopjam/video/upload/v1553566270/jpopjamm.mp4"
          loop
          muted
          autoplay
        ></video>
      </div>

      <div class="maintext">
        <p>Be Pop , Not a Snob</p>
        <div class>
          <div class="reserve">
            <div class="reservetext">
              <router-link to="/event">
                <h3>6/12 (水) J-POP JAM</h3>
                <p>
                  オープン 18:00 / スタート 18:30
                  <br>@渋谷UNDER DEER LOUNGE
                  <br>>>詳細はこちら
                </p>
              </router-link>

              <signinModal></signinModal>
              <signupnModal></signupnModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import signinModal from "./components/SigninModal";
import signupnModal from "./components/SignupModal";

export default {
  components: {
    signinModal,
    signupnModal
  },

};
</script>

<style>
.maintext {
  width: 100%;
  text-align: center;
  display: block;
  position: absolute;
  top: calc(50% - 120px);
  animation: fade-in 0.8s 0.7s ease-out 1 forwards normal;
}
.maintext p {
  color: #ffffff;
  font-family: "Avenir Next";
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  line-height: 34px;
  letter-spacing: 0.2rem;
}

.bg-video-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-attachment: fixed;
}
.indexrespimg {
  background: url(/img/Main1.jpg) center center/cover;
}
video {
  min-width: 100%;
  min-height: 100vh;
  z-index: 10;
}
.overlay {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 50%
  );
  background-size: 4px 4px;
}

/* スマホ用index.html */
@media (max-width: 767px) {
  video {
    display: none;
  }

  .maintext p {
    font-size: 25px;
  }
}
/* イベント詳細-------- */

.reserve {
  width: 310px;
  background-color: rgba(255, 249, 231, 0.7);
  border-radius: 3px;
  margin: auto;
}
.maintext {
  padding-bottom: 10px;
}
.reservetext h3 {
  color: #000000;

  font-size: 15px;
  line-height: 23px;
  padding-top: 28px;
  text-align: center;
}

.reserve p {
  color: #000000;

  font-size: 11px;
  line-height: 20px;
  text-align: center;
  padding-top: 15px;
}

.reservebutton0 {
  width: 170px;
  height: 50px;
  background-color: #fdd007;
  margin-top: 15px;
  margin: 15px auto;
  margin-bottom: 40px;
  box-shadow: 0 0 8px gray;
}

.reservebutton0 p {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 12px;
}

.reservebutton0 a {
  text-decoration: none;
  color: #000000;
}
</style>
