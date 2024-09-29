<script setup>
import { ref, onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore.vue'

const store = useXkcdStore()

const gotoComic = ref(null)

onMounted(() => {
  store.updateLocalStorage()

  if(!localStorage.getItem('filter')) localStorage.setItem('filter', 'both')
  if(!localStorage.getItem('size')) localStorage.setItem('size', 'large')
})
</script>

<template>
<div id="xkcdMain">
  <h1>{{ store.title }}</h1>
  <a :href="'https://xkcd.com/'+store.num+'/'" target="_blank"><img id="image" :src="store.img" /></a>
</div>
</template>

<style scoped lang="scss">
#xkcdMain {
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: safe center;
  align-items: safe center;
}
</style>

<!--  * Pinia store print
<div> 
  <b>store:</b>
  <ul>
    <li>day: {{ store.day }}</li>
    <li>month: {{ store.month }}</li>
    <li>year: {{ store.year }}</li>
    <li>title: {{ store.title }}</li>
    <li>img: {{ store.img }}</li>
    <li>alt: {{ store.alt }}</li>
    <li>num: {{ store.num }}</li>
    <li>numMax: {{ store.numMax }}</li>
    <li>size: {{ store.size }}</li>
    <li>filter: {{ store.filter }}</li>
    <li>settingsCurrent: {{ store.settingsCurrent }}</li>
    <li @click="store.markAsSeen(store.num)">mark as seen</li>
  </ul>
</div> 
-->