<template>
  <div class="access">
    <div class="accessdiv">
      <div class="accessbox">
        <div class="accessintro">
          <h1>ACCESS</h1>
          <p>
            渋谷 Under Deer Lounge
            <br>〒150-0041 東京都渋谷区神南1-3-4 神南ビル B1
          </p>

          <div class="ggmap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5008679523366!2d139.6990827152218!3d35.664667280198145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188caf55adcd53%3A0x128646a2bc544d4a!2sUNDER+DEER+LOUNGE!5e0!3m2!1sja!2sjp!4v1543755981637"
              width="600"
              height="600"
              frameborder="0"
              style="border:0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "access"
};
</script>

<style>
/* access.html----------------------------------------------------------- */
.accessdiv {
  background: url(/img/gray_syugou09.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin-top: 0px;
  padding: 140px 0px 80px 0px;
}

.accessbox {
  background-color: rgba(255, 249, 231, 0.7);
  padding: 30px 0px 30px;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
  border-top: 80px;
}

.accessintro h1 {
  position: absolute;
  margin-left: -50px;
  margin-top: 5px;
  left: 50%;
  color: #000000;
  font-family: Helvetica;
  font-size: 24px;
  line-height: 29px;
  border-bottom: solid 6px black;
  padding-bottom: 5px;
}

.accessintro p {
  margin: 0;
  padding-top: 90px;
  text-align: center;
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
}

.ggmap {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  margin: 40px 74px 30px 74px;
}

.ggmap iframe,
.ggmap object,
.ggmap embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* スマホ用access.html */
@media (max-width: 767px) {
  .accessdiv {
    padding-bottom: 60px;
    padding-top: 75px;
    background-position: -355px center;
    background-size: cover;
    width: auto;
    height: 100vh;
  }

  .access {
    margin: 0 15px;
    max-width: 900px;
    padding-bottom: 40px;
  }

  .accessintro h1 {
    font-size: 18px;
    margin-left: -30px;
  }

  .ggmap {
    margin: 30px 7px 0px 7px;
    position: relative;
  }

  .ggmap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>