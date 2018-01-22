<template>
<div id="app">
    <router-view/>
</div>
</template>

<script>
export default {
  	data() {
    	return {}
  	}
}

</script>

<style lang="scss">
@import '~css/common/reset';
@import '~css/common/mixin';
$vm_design: 375;
$vm_fontSize: 37.5;
html{
	font-size: ($vm_fontSize / $vm_design) * 100vw;
	@media screen and (max-width: 320px) {
        font-size: 32px;
  }
  @media screen and (min-width: 640px) {
      font-size: 64px;
  }
}
body {
    font-size: rem(14);
}
</style>
