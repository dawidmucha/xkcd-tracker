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
  <XkcdMap id="xkcdMap"/>
</div>
</template>

<style scoped>
#xkcdApp {
  display: grid;
  grid-template-columns: 25vw 75vw;
  grid-template-rows: 20vh 80vh;
  width: calc(100vw - (100vw - 100%));
}

#xkcdNavigation {
  background-color: rgba(0, 0, 0, 0.2);
}

#xkcdMap {
  overflow: auto;

  background-color: rgba(0, 0, 0, 0.3);
}

#xkcdMain {
  grid-row-end: span 2;
  height: 100%;
  overflow: auto;
}
</style>