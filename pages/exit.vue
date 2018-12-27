<template>
  <div />
</template>

<script>
export default {
  layout: 'blank',
  // 用中间件来实现
  middleware: async (ctx) => {
    let { status, data } = await ctx.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
