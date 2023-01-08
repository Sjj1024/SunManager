<template>
  <div class="dashboard-container">
    <div
      class="home-box"
      v-for="(item, index) in homes"
      :key="index"
    >
      <h3>{{ item.key }}</h3>
      <div class="path-box">
        <span
          v-for="(path, ind) in item.homes"
          :key="ind"
          @click="openWin(path)"
          class="path"
        >{{ path }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      homes: []
    }
  },
  async created() {
    this.homes = await this.getHomes()
  },
  methods: {
    ...mapActions('board', ['getHomes']),
    openWin(val){
      window.open(val, "_black")
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.path-box {
  .path {
    margin-right: 30px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
