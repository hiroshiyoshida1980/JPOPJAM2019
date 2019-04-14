<template>
  <div class="history">
    <div class="historydiv">
      <div class="history">
        <div class="historyintro">
          <h1>HISTORY</h1>
          <div>
            <div class="historyinfo">
              <div class="historytext">
                <ul class="pl-0">
                  <li v-for="item in finishedEventList" :key="item">
                    <h2>
                      {{item.eventTitle}}
                      <br>
                      {{item.eventDate}}@{{item.eventPlace}}
                    </h2>

                    <div class="historyimg">
                      <ul class="pl-0">
                        <li
                          v-for="(img,key) in item.liveImage.all"
                          :key="key"
                          class="d-inline-block"
                        >
                          <img
                            class="m-1"
                            :src="img.image"
                            v-b-modal="liveimageModalId(img.image)"
                            width="60"
                          >

                          <!-- Modal Component -->
                          <b-modal :id="'liveimageModalId' + img.image " ok-only centered>
                            <div class="mx-auto">
                              <img class="m-1" :src="img.image" v-b-modal.modal-2 width="100%">
                              <p>
                                Photo by
                                <a :href="img.url">{{img.name}}</a>
                                <br>※使用される場合は作者のクレジットをお願いいたします。
                              </p>
                            </div>
                          </b-modal>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/app";

export default {
  name: "history",
  data() {
    return {
      finishedEventList: []
    };
  },
  computed: {
    nowJoinSessionInfo() {
      return this.$store.state.nowJoinSessionInfo;
    }
  },
  created() {
    var finishedEvent = [];
    firebase
      .database()
      .ref("eventList/")
      .on("value", snapshot => {
        var rootList = [];
        rootList = snapshot.val();
        Object.keys(rootList).forEach((val, key) => {
          if (rootList[val].eventStatus == "finished")
            finishedEvent.push(rootList[val]);
        });
        this.finishedEventList = finishedEvent;
      });
  },
  methods: {
    liveimageModalId(index) {
      return "liveimageModalId" + index;
    }
  }
};
</script>

<style>
/* history.html------------------------------------------------------- */
.historydiv {
  background: url(/img/gray_band2.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin-top: 0px;
  padding: 140px 0px 80px 0px;
}

.history {
  background-color: rgba(255, 249, 231, 0.7);
  padding: 30px 0px 50px;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
  border-top: 80px;
}

.historyintro h1 {
  position: absolute;
  margin-left: -55px;
  margin-top: 5px;
  left: 50%;
  color: #000000;
  font-family: Helvetica;
  font-size: 24px;
  line-height: 29px;
  border-bottom: solid 6px black;
  padding-bottom: 5px;
}

.historyinfo {
  padding-top: 40px;
  display: flex;
}

.historyimg img {
  margin-left: 70px;
  margin-top: 70px;
}

.historytext {
  margin-left: 40px;
  margin-top: 70px;
}

.historytext h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 15px;
  line-height: 23px;
  font-weight: bold;
}

.historytext h4 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 15px;
  line-height: 23px;
}

/* もっと見るをクリックしたときのテキスト------- */
.grad-wrap {
  margin-right: 70px;
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
  margin-top: 15px;
}

.grad-btn {
  margin-left: 43%;
}

.grad-item {
  position: relative;
  overflow: hidden;
  height: 0px; /*隠した状態の高さ*/
}

.grad-item::before {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.grad-trigger {
  display: none; /*チェックボックスは常に非表示*/
}
.grad-trigger:checked + .grad-btn {
  display: none; /*チェックされていたら、grad-btnを非表示にする*/
}
.grad-trigger:checked ~ .grad-item {
  height: auto; /*チェックされていたら、高さを戻す*/
}
.grad-trigger:checked ~ .grad-item::before {
  display: none; /*チェックされていたら、grad-itemのbeforeを非表示にする*/
}

.fas fa-angle-down {
  font-size: 15px;
}

/* メンバー二人目以降----------------- */
.historyinfo2 {
  padding-top: 30px;
  display: flex;
}

.historyimg2 img {
  margin-left: 70px;
}

.historytext2 {
  margin-left: 40px;
}

.historytext2 h2 {
  color: #000000;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 15px;
  line-height: 23px;
  font-weight: bold;
}

.historytext2 p {
  margin-right: 70px;
  color: #333333;
  font-family: "Hiragino Kaku Gothic Pro";
  font-size: 13px;
  line-height: 22px;
  margin-top: 15px;
}

/* スマホ用history.html */
@media (max-width: 767px) {
  .historydiv {
    padding-bottom: 60px;
    padding-top: 75px;
    background-position: -355px center;
    background-size: cover;
    width: auto;
    height: auto;
  }

  .history {
    max-width: 900px;
    padding-bottom: 40px;
  }

  .historyintro h1 {
    font-size: 18px;
    margin-left: -40px;
  }

  .historyinfo {
    display: block;
  }

  .historyimg {
    text-align: center;
  }

  .historyimg img {
    margin-left: 0;
    margin-top: 50px;
  }

  .historytext {
    margin-left: 7px;
    margin-right: 7px;
    margin-top: 45px;
  }

  .historytext h2 {
    text-align: center;
    font-size: 13px;
  }

  .historytext p {
    margin-right: 0;
    font-size: 13px;
  }

  .grad-wrap {
    margin-right: 20px;
  }

  .historyinfo2 {
    padding-top: 0;
    display: block;
  }

  .historyimg2 {
    text-align: center;
  }

  .historyimg2 img {
    margin-left: 0;
  }

  .historytext2 {
    margin-left: 7px;
    margin-right: 7px;
    margin-top: 45px;
  }

  .historytext2 h2 {
    text-align: center;
    font-size: 13px;
  }

  .historytext2 p {
    margin-right: 0;
    font-size: 13px;
  }
}
</style>

