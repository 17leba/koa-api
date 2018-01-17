<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import '~css/common/reset';
@import '~css/common/mixin';
body{
	font-size: vw(14);
}
</style>
