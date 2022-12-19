<template>
  <div class="base-box">
    <div class="inline">
      <div class="left">
        <span class="lable">用户名:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">ID:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">等级:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">邮箱:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">威望:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">发帖数量:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">注册时间:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">金钱:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">定期存款:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">活期存款:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">定期存款:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">可邀请否:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">是否租借:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">两步认证:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">密保邮箱:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献连接:</span>
        <span>{{ base.username }}</span>
      </div>
      <div class="right">
        <span class="lable">作品展示:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    base: {
      type: Object,
      default: () => {
        return {
          id: '111',
          username: '我是用户名啊',
          grade: ''
        }
      }
    }
  },
  data() {
    return {
      id: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base-box {
  padding-top: 20px;
  .inline {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    .left {
      width: 50%;
    }
    .right {
      width: 50%;
    }
    .lable {
      display: inline-block;
      min-width: 70px;
      text-align: right;
      // font-weight: 700;
      margin-right: 10px;
    }
  }
}
</style>