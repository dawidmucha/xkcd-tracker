<script setup>
import XkcdMap from '@/components/xkcdMap.vue'
import XkcdMain from '@/components/xkcdMain.vue'

import '@/main.css'
</script>

<template>
  <div id="xkcdApp">
    <XkcdMap id="xkcdMap" />
    <XkcdMain id="xkcdMain" />
  </div>
</template>

<style scoped>
#xkcdApp {
  display: flex;
  flex-direction: row;
  width: calc(100vw - (100vw - 100%));
}

#xkcdMap {
  width: 281px;
  height: 100vh;
  overflow: hidden;
}

#xkcdMain {
  flex-grow: 1;
}
</style>