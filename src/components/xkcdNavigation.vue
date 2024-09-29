<script setup>
import { ref, onMounted } from 'vue'

import { useXkcdStore } from '@/stores/xkcdStore.vue'
import { useKeypress } from 'vue3-keypress';

const store = useXkcdStore()

const gotoComic = ref(null)

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

useKeypress({
  keyEvent: "keydown",
  keyBinds: [{
    keyCode: "left",
    success: () => onBtnPress(-1)
  }, {
    keyCode: "right",
    success: () => onBtnPress(1)
  }, {
    keyCode: "space",
    success: () => store.markAsSeen(store.num)
  }]
})

onMounted(() => {
  store.updateLocalStorage()
})
</script>

<template>
<div id="comicNavContainer">
	<div id="comicNavUpper">
		<button class="buttonSquare" @click="onBtnPress(-2)">&lt;&lt;</button>
		<button class="buttonSquare" @click="onBtnPress(-1)">&nbsp;&lt;&nbsp;</button>
    <div></div>
    <button class="buttonSquare" @click="onBtnPress(1)">&nbsp;&gt;&nbsp;</button>
    <button class="buttonSquare" @click="onBtnPress(2)">&gt;&gt;</button>
	</div>
  <div id="comicNavMiddle">
    <input id="comicRange" type="range" min="1" :max="store.numMax" v-model="store.num" @change="store.getComic(store.num)" /> 
    <div id="comicRangeLabel"><label for="comicRange">{{ store.num }}/{{ store.numMax }}</label></div>
  </div>
	<div id="comicNavLower">
		<span>
      <input type="text" v-model="gotoComic" placeholder="comic nr" />
		  <button @click="onBtnPress(0)">SEND</button>
    </span>
		<button id="btnSeen" @click="store.markAsSeen(store.num)">mark as seen</button>
	</div>
</div>
</template>

<style scoped lang="scss">
#comicNavContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#comicNavTitle {
  text-align: center;
  font-size: 1vw;
}

#comicNavUpper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    width: 20%;
  }

  div {
    flex-grow: 1;
  }
}

#comicNavMiddle {
  display: flex;
  flex-direction: row;

  padding: 0 1rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #comicRange {
    width: 90%;
  }

  #comicRangeLabel {
    width: 82px;

    label {
      width: 82px;
    }
  }
}

#comicNavLower {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  input {
    width: 6vw;
  }

  #btnSeen {
    font-size: 0.5rem;
    white-space: nowrap;
  }
}

#comicNavLowerGoto {
  margin-right: 2rem;
}
</style>