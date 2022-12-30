<template>
  <div class="test-box">
    <div class="form-inline">
      <span class="label">请输入充值金额:</span>
      <el-input
        class="input-money"
        v-model="payMoney"
        placeholder="请输入充值金额"
      >
        <template slot="append">元</template>
      </el-input>
    </div>
    <div class="pay-btn">
      <el-button
        type="primary"
        @click="zfbPay"
      >点击支付宝支付</el-button>
      <el-button
        type="success"
        @click="wxPay"
      >点击微信支付</el-button>
    </div>
    <div class="pay-code">
      <QCode
        :content="payLink"
        ref="qrcode"
      ></QCode>
    </div>
  </div>
</template>

<script>
import QCode from '@/components/Qrcode/index.vue'
import PayApi from '@/api/pay'

export default {
  name: 'PayTest',
  components: {
    QCode
  },
  data() {
    return {
      payMoney: '',
      payLink: ''
    }
  },
  methods: {
    async zfbPay() {
      console.log('支付宝支付')
      const res = await PayApi.getPayLink({
        money: parseInt(this.payMoney * 100),
        payType: 'alipay'
      })
      console.log('res---', res)
      if (res.code === 200) {
        this.payLink = res.data.link
        this.$refs.qrcode.showQRCode(this.payLink)
      } else {
        this.$message.error('获取链接失败:' + res.message)
      }
    },
    async wxPay() {
      console.log('微信支付')
      const res = await PayApi.getPayLink({
        money: parseInt(this.payMoney * 100),
        payType: ''
      })
      if (res.code === 200) {
        this.payLink = res.data.link
        this.$refs.qrcode.showQRCode(this.payLink)
      } else {
        this.$message.error('获取链接失败:' + res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-inline {
  display: flex;
  align-items: center;
  .label {
    width: 130px;
  }
  .input-money {
    width: 300px;
  }
}

.pay-btn {
  margin: 15px;
}
</style>