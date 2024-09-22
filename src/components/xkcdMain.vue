<script setup>
import { ref, onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore'

const store = useXkcdStore()

const gotoComic = ref(null)

onMounted(() => {
  store.updateLocalStorage()
})

const onBtnPress = (option) => {
  const _gotoComic = gotoComic.value
  gotoComic.value = null

  switch(option) {
    case -2:
      store.getComic(1)
      break
    case -1:
      if(store.num > 1) store.getComic(store.num - 1)
      break
    case 0:
      store.getComic(_gotoComic)
      break
    case 1:
      if(store.num < store.numMax) store.getComic(store.num + 1)
      break
    case 2:
      store.getComic(store.numMax)
      break
    default:
      console.error("onBtnPress value outside <-2, 2> range")
  }
}
</script>

<template>
<div id="xkcdMain">
  <a :href="'https://xkcd.com/'+store.num+'/'" target="_blank"><img id="image" :src="store.img" /></a>
</div>
</template>

<style scoped lang="scss">
#xkcdMain {
  display: flex;
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