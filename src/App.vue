<script setup>
import XkcdMap from '@/components/xkcdMap.vue'
import XkcdMain from '@/components/xkcdMain.vue'
import XkcdNavigation from '@/components/xkcdNavigation.vue'

import '@/main.css'
</script>

<template>
<div id="xkcdApp">
  <XkcdNavigation id="xkcdNavigation" />
  <XkcdMain />
  <XkcdMap id="xkcdMap" />
</div>
</template>

<style scoped>
#xkcdApp {
  display: grid;
  grid-template-columns: 25vw 75vw;
  grid-template-rows: 25vh 75vh;
  width: calc(100vw - (100vw - 100%));
}

#xkcdMap {
  overflow: hidden;
}

#xkcdMain {
  grid-row-end: span 2;
  height: 100%;
  overflow: scroll;
}
</style>