<script setup>
import XkcdSettings from '@/components/xkcdSettings.vue'
import { useXkcdStore } from '@/stores/xkcdStore.js'
import { ref, reactive } from 'vue'

const store = useXkcdStore()

const selectedSize = ref('small')
const selectedFilter = ref('unseen')

// if(localStorage.getItem('size') != null) selectedSize.value = localStorage.getItem('size')
// if(localStorage.getItem('filter') != null) selectedFilter.value = localStorage.getItem('filter')

const ls = ref([])
if(localStorage.getItem('xkcd') != null) {
  ls.value = localStorage.getItem('xkcd').split(',').map(Number)
}

store.$subscribe(() => {
  if (!localStorage.getItem('xkcd')) return

  ls.value = localStorage.getItem('xkcd').split(',').map(Number)

  switch(store.size) {
    case "minimal": selectedSize.value = "minimal"; break
    case "small": selectedSize.value = "small"; break
    case "large": selectedSize.value = "large"; break
    default: selectedSize.value = ""
  }

  switch(store.filter) {
    case "unseen": selectedFilter.value = "unseen"; break
    case "seen": selectedFilter.value = "seen"; break
    case "both": selectedFilter.value = "both"; break
    default: selectedFilter.value = ""
  }
})

const isComicShown = (setting, comic) => {
  if(setting === "both") return true
  else return ((setting === "unseen" && comic === 0) || (setting === "seen" && comic === 1)) // if unseen, comic === 0 | if seen, comic === 1
}
</script>

<template>
  <div>
    <div id="xkcdMap">
      <XkcdSettings :selectedSizeProp="selectedSize" :selectedFilterProp="selectedFilter" />

      <ul id="xkcdMapList">
        <span v-for="comicNumber in store.numMax" :key="comicNumber" class="tileSpan">
          <li v-if="isComicShown(selectedFilter, ls[comicNumber])"> 
            <!-- <div @click="store.getComic(comicNumber)">{{ comicNumber }} {{ ls[comicNumber] === 0 ? "" : " - Seen" }}</div>  -->
            <div @click="store.getComic(comicNumber)" :class="{ 
              mapTile: true,
              mapTileSeen: ls[comicNumber], 
              mapTileUnseen: !ls[comicNumber],
              mapTileMinimal: !!(selectedSize === 'minimal'),
              mapTileSmall: !!(selectedSize === 'small'),
              mapTileLarge: !!(selectedSize === 'large'),
              mapTileCurrent: comicNumber === store.num
            }"><div>{{ comicNumber }}</div></div>
          </li>
          <li v-else class="tileSpanHider"></li>
        </span>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#xkcdMap {
  height: 100%;
  overflow-y: scroll;
}

#xkcdMapList {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.mapTile {
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  text-shadow: black 0 0 5px;
}

.mapTileLarge {
  font-size: 12px;
  width: 36px;
  height: 36px;
  
  margin: 4px;
}

.mapTileSmall {
  font-size: 8px;
  width: 22px;
  height: 22px;

  margin: 1px;
}

.mapTileMinimal {
  width: 6px;
  height: 6px;
  font-size: 0;

  margin: 0px 1px 1px 0px;
}

.mapTileSeen {
  background-color: green;
}

.mapTileUnseen {
  background-color: darkred;
}

.mapTileCurrent {
  box-sizing: border-box;
  border: 1px solid yellow;
}

.tileSpan:has(.tileSpanHider) {
  display: none;
}
</style>