<template>
  <div class="container">
    <div class="tips tabBox">
      <h3 class="tabTitle">1024回家桌面版</h3>
      <div class="testBox">
        <div class="testing">
          <span class="action">试验功能：</span>
          <input
            class="password"
            v-model="password"
            type="password"
            placeholder="输入密码后访问"
          />
          <button class="btn" id="openDor" @click="tiggleHiddenBox">
            芝麻开门
          </button>
          <a
            :href="realJsonLoc.data.android"
            class="btn"
            target="_blank"
            id="android"
            >安卓APP</a
          >
          <a
            :href="realJsonLoc.data.windows"
            class="btn"
            target="_blank"
            id="windows"
            >Windows</a
          >
          <a
            :href="realJsonLoc.data.macbook"
            class="btn"
            target="_blank"
            id="macbook"
            >Mac电脑</a
          >
          <a
            :href="realJsonLoc.data.iphone"
            class="btn"
            target="_blank"
            id="iphone"
            >iPhone版</a
          >
          <a
            :href="realJsonLoc.data.windows"
            class="btn"
            target="_blank"
            id="yongjiu"
            >永久地址</a
          >
          <button class="btn" @click="shareDesk(shareContent)">分享软件</button>
        </div>
        <div class="info" id="info" v-html="moreInfo"></div>
        <div class="guide-time" id="guideTime" v-html="guideTime"></div>
        <input type="text" id="hide" style="opacity: 0; height: 0px" value="" />
      </div>
    </div>
    <div class="contentBox" id="contentBox" v-if="hiddenBox">
      <div class="tabBox" id="hidden">
        <h3 class="tabTitle">隐藏功能</h3>
        <div class="actionBox">
          <div>
            <a
              class="btn"
              href="https://www.baidu.com/"
              target="_blank"
              style="text-decoration: none; margin-left: 0"
              >百度一下</a
            >
          </div>
          <div>
            <button class="btn" id="clearLocal">清空缓存</button>
          </div>
          <div>
            <button class="btn" id="offAd">关闭广告</button>
          </div>
          <div>
            <button class="btn" @click="initInfo(realJsonLoc)">升级提醒</button>
          </div>
          <div>
            <button class="btn" @click="openMessage">打开弹窗</button>
          </div>
          <div>
            <button class="btn" id="onAd">开启广告</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门导航 -->
    <div class="tabBox">
      <h3 class="tabTitle" style="background-color: rgb(0, 108, 130)">
        {{ hotUrls.title }}
      </h3>
      <div class="aBox">
        <a
          class="alink"
          :href="item.url"
          target="_blank"
          id="caoliu"
          v-for="(item, index) in hotUrls.data"
          :key="index"
          >{{ item.title }}
        </a>
      </div>
    </div>
    <!-- 普通导航 -->
    <div class="tabBox" v-for="(val, key, index) in navigations" :key="key">
      <h3 class="tabTitle" style="background-color: rgb(0, 108, 130)">
        {{ val.title }}
      </h3>
      <div class="aBox">
        <a
          class="alink"
          :href="item.url"
          target="_blank"
          id="caoliu"
          v-for="item in val.data"
          >{{ item.title }}
        </a>
      </div>
    </div>
    <div class="footer">
      <a :href="updateUrl" style="display: none" ref="updateA" target="_blank"
        >升级链接</a
      >
      <div class="footBox">
        <div class="title">1024回家是世界上最好的色情网站目录！</div>
        <div class="pInfo">
          1024回家是世界上最好的色情网站目录！
          1024回家是我多年努力工作并差点把我的鸡巴撸掉的结晶。它是一个分享最好的内容为年轻美女和熟妇动作片的免费或付费色情网站的收藏库。如果你是在寻找能在电脑或移动设备上浏览的色情内容的话，那么这个网站能够满足你所有的需求！我不会在这里放置广告，我从不胡说八道，我会直接把所有的信息都提供给你，这也是为什么人们这么喜欢我的原因！我甚至会收到由女性粉丝发来的她们的阴部和胸部的自拍照！
        </div>
      </div>
      <div class="footBox">
        <div class="title">为什么你要创建1024回家？</div>
        <div class="pInfo">
          我决定创建1024回家，是为了向你们提供当今互联网上能找到的最好的色情网站。就跟我们中的很多人一样，某天我正在谷歌上寻找新的撸管材料，但是我对搜索结果并不满意。当今，网上有数百万的提供成人内容的网站，但是其中只有一小部分是真正值得访问的网站。有些网站有太多带病毒的广告和隐藏式弹窗，而其它的网站不是提供的视频质量太差，就是提供的内容根本没法用来撸管。因为TBLOP（色情网站大列表）对他们的项目失去了兴趣，而且主流搜索引擎又都那么没用，所以我把将最好的色情网站从垃圾中过滤出来当成了自己的任务来做，因为每个人的时间都是很宝贵的！
        </div>
      </div>
      <div class="footBox">
        <div class="title">
          我能在你的列表上看到什么样的色情网站呢，还有你是怎样来给它们排名的呢？
        </div>
        <div class="pInfo">
          我这里既有免费网站，也有付费网站。我先是查看了几个流行的网站，比如PornHub、XVideos和xHamster，并基于搜索最多的内容做出了不同的网站题材。之后，我就去谷歌上作了一次地毯式搜索，并手动把那些值得我花时间的最安全的（高清）色情网站加到了我的目录里。那些有潛力但尚未在紅地毯上贏得地位的人可以在我的“名人堂”中找到。接下来就是最难的那一部分，那就是依据质量优劣给每个题材下的网站做排名。我心目中的第一名可能并不是你心目中的第一名，因为每个人的口味都是不一样的。通过点击每个主题下的每个网站边上的放大镜图标，你就能看到一个简短的评论，并了解我对每个网站的看法。还有，我建议在访问这些网站之前先安装一个杀毒软件和广告拦截软件，以保证你的设备不被感染病毒。我希望100%地保证你的安全！
        </div>
      </div>
      <div class="footBox">
        <div class="title">
          在我访问色情网站的时候，如何才能保证我的电脑或手机100%不被恶意软件感染？
        </div>
        <div class="pInfo">
          没人喜欢病毒，不管是数字性病还是勒索软件。以下是我的7条小技巧，它们可以在您访问我列出的这些最佳色情网站和互联网上其它各种色情视频网站的时候，保障您的安全。当您在线观看任何免费色情视频的时候，请务必遵循这些指南！<br />
          1.确保您的网页浏览器和操作系统是最新版本。<br />
          2.安装您最喜欢的杀毒软件或激活Windows Defender防火墙。<br />
          3.广告拦截软件是您的朋友！广告可能会破坏您观看色情内容的体验，但是在大多数情况下，它们是某些网站唯一的资金来源。<br />
          4.当您安装来自未知来源的软件时，请小心。比如：某个色情视频网站可能会要求您安装一个特殊的浏览器插件才能下载某部特定的免费色情影片。虽然您像兔子一样饥渴，但也不能把最基本的常识给忘了。<br />
          5.无视那些说您的设备已经感染了病毒的广告。他们会诱骗您安装特制的杀毒软件，这种软件才会真的让您的PC或手机感染病毒。<br />
          6.不要回复要求您付钱的骗子邮件。没人会录下您在某个色情视频网站上一边观看某部免费色情视频一边撸管的画面。不要因为惊慌失措而把您的家底都掏出来，因为那是骗人的。不用担心，您的个人自慰视频是不会被泄露给您的朋友的。<br />
          7.我知道这对于你们这些饥渴的家伙中的99%都是不可能做到的，但我还是要提一下。那就是，控制好您的老二，用您的脑子思考问题。如果您在某个色情视频网站或任何免费的色情网站上看到了某些“奇怪”的东西，那么您的感觉一般都是对的！
        </div>
      </div>
      <div class="footBox">
        <div class="title">我能做什么来表达我的谢意吗？</div>
        <div class="pInfo">
          当然，我的银行账号是...开玩笑的！你可以帮助我提高我网站的受欢迎程度和世界知名度！我敢肯定，你不是唯一一个在网上艰难地寻找好的色情网站的人，所以，你为什么不帮我宣传一下，把我这个顶级色情网站目录告诉你所有的朋友呢？如果你有坚硬的鸡巴和流水的阴道问题的话，那么我希望每个人想到的尽快解决这些问题的办法就是1024回家！把我的网站设置成你浏览器的默认首页，并自豪地展示给别人看！嘿，我敢打赌，即使是特朗普总统在他没逼可抓的时候也是用我这网站上的资源去找成人娱乐内容的
          ;)
        </div>
      </div>
      <div class="footBox">
        <div class="title">如果我有问题的话，我要怎么才能联系你呢？</div>
        <div class="pInfo">
          如果你认为我的色情列表里面漏掉了某个很棒的XXX网站的话，你可以通过电子邮件联系到我：huijia1024@yandex.com<br />
          P.S.<br />
          如果你是个性感女郎（18+），丰满人妻或性感AV女优的话，你也能直接拨打我的电话号码:911。<br />
          以下是一些可以帮助网站管理员们改善他们的色情网站的小贴士。<br />
          1.将广告数量限制在最低限度。尽可能地减少您的色情视频网站上的背投广告、视频播放器广告、即时通信广告或插播式广告。总是把用户体验放在优先于赚钱的位置，因为您希望访客们再次回到您的网站上。<br />
          2.针对电脑/手机优化您的网站界面，使其具有独一无二的气质。学习竞争对手，好好浏览一下与您的网站题材相同的色情网站中最受欢迎的那个，看看您还缺少哪些功能。<br />
          3.流畅的视频在线播放体验。确保访客们可以在全球范围内流畅地观看您的免费色情视频。减少视频播放期间的30秒广告或背投广告的数量。<br />
          4.可下载的色情视频。提供下载选项，以便访客们可以在您的XXX网站上下载他们喜欢的色情视频。<br />
          5.内容才是王道。如果您想把您的网站打造为世界上最好的色情网站之一，那么您就必须要达到相应的水准。为您的色情网站上传画质尽可能高的，最好的免费色情内容，但是请确保您上传的所有东西都是100%合法的。您肯定不想被判刑，然后在监狱里失去您的肛门童贞吧？<br />
          P.S.<br />
          1.我不是1024回家上列出的任何一个顶级色情网站的所有者，所以我对这些网站上的内容概不负责。我只负责评论色情网站！如果您发现有某个网站上的内容侵犯了您的版权，请直接与那个成人网站的所有者联系，这样他们才能将相关内容删除。<br />
          2.我认识愿意跟您上床的姑娘吗？您是在搞笑吗？没问题，让我掏出我的“魔法棒”，念一段咒语，然后40个处女就会奇迹般地出现在您的卧室里，像崇拜布拉德·皮特一样崇拜您的鸡巴。<br />
          3.您是不是一个“喜欢”（高清）色情网站的宗教狂热分子、保护女性的白衣骑士，或支持#我也是运动的女权主义者？请告诉我，要怎样做才能让您开窍，并使您成为1024回家的忠实粉丝！<br />
          4.对于那些想要展示她们的乳房、阴户或臀部的女性粉丝，我随时欢迎你们给我发送裸照。;)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BoardApi from "@/api/board";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      localVersion: 0.1,
      shareContent: "1024老司机邮箱: 1024xiaoshen@gmail.com",
      gitSource: "https://api.github.com/repos/Sjj1024/Sjj1024/contents",
      sourceUrl: [
        `/navigation`,
        "https://www.cnblogs.com/sdfasdf/p/16101765.html",
        "https://xiaoshen.blog.csdn.net/article/details/129388703",
      ],
      moreInfo: "提示：数据加载中...",
      guideTime: "提示：数据加载中...",
      updateUrl: "https://www.csdn.net/",
      updateA: null,
      password: null,
      hiddenBox: false,
      realJsonLoc: {
        data: {
          android: "",
          windows: "",
          macbook: "",
          iphone: "",
          yongjiu: "",
        },
      },
      hotUrls: {
        title: "",
      },
      navigations: null,
      errorInfo: `加载数据失败!\r
        1.网络可能有问题，请保持网络通畅后再试。\r
        2.网站链接可能需要VPN翻墙后才能访问。\r
        3.有的网络运营商把网站屏蔽了，更换网络后重新打开试试。\r
        4.真不行请发邮件重新获取地址：1024xiaoshen@gmail.com`,
    };
  },
  async created() {
    this.homes = await this.getHomes();
    // 获取1024回家的导航地址
    try {
      this.realJsonLoc = localStorage.getItem("realJson") && JSON.parse(localStorage.getItem("realJson"))
    } catch (error) {
      console.log("序列化realJson失败");
    }
    this.getGithubContent();
  },
  methods: {
    ...mapActions("board", ["getHomes"]),
    openWin(val) {
      window.open(val, "_black");
    },
    tiggleHiddenBox() {
      console.log("tiggleHiddenBox");
    },
    async getGithubContent() {
      var gitContent = await BoardApi.getGitHub();
      console.log("gitContent-----", gitContent);
      var contentBase64 = gitContent.data.content;
      var content = atob(contentBase64);
      var realContent = content.replaceAll("VkdWxlIGV4cHJlc3Npb25z", "");
      // console.log('realContent', realContent)
      this.realJsonLoc = JSON.parse(atob(realContent));
      // 本地缓存
      localStorage.setItem("realJson", JSON.stringify(this.realJsonLoc))
      this.updateUrl = this.realJsonLoc.update.url
      this.moreInfo = this.realJsonLoc.data.more_info
      this.guideTime = this.realJsonLoc.data.guide_time
      this.shareContent = this.realJsonLoc.data.share
      this.hotUrls = this.realJsonLoc.data.navigation.hotbox
      this.navigations = this.realJsonLoc.data.navigation
    },
  },
};
</script>

<style scoped lang="scss">
.container{
  height: 100vh;
  overflow-y: scroll;
}

.tips {
  color: gray;
  font-size: 14px;
}

.testBox {
  padding: 1px 20px;
}

.testing {
  margin: 0 0 10px 0;
}

.password {
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 200px;
  padding-right: 30px;
  line-height: 28px;
}

.action {
  color: black;
  font-weight: 600;
}

.clicked {
  color: red !important;
}

.btn {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: black;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 600;
  padding: 3px 5px;
  font-size: 13px;
  border-radius: 3px;
  margin-left: 10px;
  margin-top: 10px;
}

.btn:hover {
  background: #fff;
  border: 1px solid #dcdfe6;
  transition: 0.1s;
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.hidden {
  /* display: block; */
  display: none;
}

.ico-img {
  width: 20px;
  height: 20px;
  background-image: url("https://static.zhihu.com/heifetz/favicon.ico");
  background-size: contain;
}

.tabBox {
  margin-bottom: 10px;
  font-weight: 400;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tabTitle {
  margin: 0px 0px 8px 0px;
  font-weight: 600;
  font-size: 18px;
  color: white;
  padding: 10px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  background-color: rgb(0, 108, 130);
  box-shadow: rgb(0 108 130 / 35%) 0px 0px 16px;
}

.aBox {
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.info {
  /* color: red; */
  margin-top: 5px;
}

.actionBox {
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.oneTest {
  width: 10%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}

.alink {
  display: inline-block;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 30px;
  padding: 0px 16px 0px 0px;
  font-size: 16px;
  text-align: left;
  color: black;
  text-decoration: none;
}

@media (min-width: 1200px) {
  .alink {
    width: 10%;
  }
}

@media (max-width: 1200px) {
  .alink {
    width: 14%;
  }
}

@media (max-width: 992px) {
  .alink {
    width: 15%;
  }
}

@media (max-width: 768px) {
  .alink {
    width: 20%;
  }
}

@media (max-width: 576px) {
  .alink {
    width: 31%;
  }
}

.alink:hover {
  color: #409eff;
}

.footer {
  color: white;
  font-size: 16px;
  padding: 10px;
  min-height: 1000px;
  /* border-radius: 10px; */
  background-image: linear-gradient(
    to bottom,
    #00ccff 0%,
    #017acf 41%,
    #017acf 100%
  );
}

.footBox {
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
