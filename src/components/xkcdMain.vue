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
  <main>
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
    <div id="comicImageContainer">
      <div><a :href="'https://xkcd.com/'+store.num+'/'" target="_blank"><img id="image" :src="store.img" /></a></div>
    </div>

    <div id="comicNavContainer">
      <div id="comicNavTitle"><h1>{{ store.title }}</h1></div>
      <div id="comicNavUpper">
        <button class="buttonSquare" @click="onBtnPress(-2)">&lt;&lt;</button>
        <button class="buttonSquare" @click="onBtnPress(-1)">&nbsp;&lt;&nbsp;</button>
        <div id="comicNavUpperCenter">
          <input id="comicRange" type="range" min="1" :max="store.numMax" v-model="store.num" @change="store.getComic(store.num)" /> 
          <div><label for="comicRange">{{ store.num }}/{{ store.numMax }}</label></div>
        </div>
        <button class="buttonSquare" @click="onBtnPress(1)">&nbsp;&gt;&nbsp;</button>
        <button class="buttonSquare" @click="onBtnPress(2)">&gt;&gt;</button>
      </div>
      <div id="comicNavLower">
        <div id="comicNavLowerGoto">  
          <input type="text" v-model="gotoComic" placeholder="comic nr" />
          <button @click="onBtnPress(0)">SEND</button>
        </div>
        <button @click="store.markAsSeen(store.num)">mark as seen</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-rows: 75vh 25vh;
}

#comicImageContainer {
  display: flex;
  align-items: top;
  justify-content: center;

  overflow-y: scroll;
  overflow-x: scroll;

  div {
    margin: 0.4rem;
  }
}

#comicNavContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#comicNavTitle {
  text-align: center;
}

#comicNavUpper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#comicNavUpperCenter {
  display: flex;
  flex-direction: row;

  padding: 0 1rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

#comicNavLower {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#comicNavLowerGoto {
  margin-right: 2rem;
}
</style>
