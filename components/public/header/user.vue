<template>
  <div class="m-user">
    <template v-if="user">
      欢迎你, <span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link 
        class="login"
        to="/login">
        立即登录
      </nuxt-link>
      <nuxt-link 
        class="register"
        to="/register">
        注册
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async mounted () {
    // status 是sxios最外层的对象获取http相应状态的
    // data是其返回的数据结构
    // data里面是dbs/interfance/users.js返回的对象
    const {status, data: {user}}  = await this.$axios.get('/users/getUser')
    if (status === 200) {
      this.user = user
    }
  }
}
</script>

<style lang="scss">
</style>
