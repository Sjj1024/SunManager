<template>
  <div
    id="qrCode"
    ref="qrCodeDiv"
  ></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'qrCode',
  props: {
    content: {
      type: String,
      default: () => {
        'Vue实现生成二维码'
      }
    }
  },
  data() {
    return {}
  },
  // mounted: function () {
  //   this.$nextTick(function () {
  //     this.showQRCode()
  //   })
  // },
  methods: {
    showQRCode(content) {
      new QRCode(this.$refs.qrCodeDiv, {
        text: content,
        width: 200,
        height: 200,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      })
    }
  }
}
</script>

<style lang='scss'>
#qrCode {
  display: inline-block;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 15%;

  img {
    width: 200px;
    height: 200px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
  }
}
</style>