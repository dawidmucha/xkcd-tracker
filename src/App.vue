<script setup>
import XkcdMap from '@/components/xkcdMap.vue'
import XkcdMain from '@/components/xkcdMain.vue'
</script>

<template>
    <main id="xkcdTracker">
      <XkcdMap id="map" />
      <XkcdMain id="main" />
    </main>
</template>

<style>
#app {
  padding: 0;
}

#xkcdTracker {
  display: flex;
  flex-direction: row;
}

#map { 
  width: 281px;
  flex-shrink: 0;
  background-color: #666;
}

#main {
  flex-grow: 1;
  background-color: #888;
}
</style>