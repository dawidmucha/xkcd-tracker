<!-- eslint-disable no-unused-vars -->
<script setup>
import { useXkcdStore } from '@/stores/xkcdStore.js'

const props = defineProps(['selectedSizeProp', 'selectedFilterProp'])

const store = useXkcdStore()
</script>

<template>
  <div id="settingsContainer">
    <div class="settingsContainer" v-show="store.settingsCurrent === ''">
      <button @click="store.setSettingsCurrent('size')">size</button>
      <button @click="store.setSettingsCurrent('filter')">filter</button>
    </div>
    <div class="settingsContainer" v-show="store.settingsCurrent === 'size'">
      <button class="buttonSquare" @click="store.setSettingsCurrent('')">&nbsp;&lt;&nbsp;</button>
      <button @click="store.settingsChange('size', 'large')" :disabled="selectedSizeProp == 'large'">large</button>
      <button @click="store.settingsChange('size', 'small')" :disabled="selectedSizeProp == 'small'">small</button>
      <button @click="store.settingsChange('size', 'minimal')" :disabled="selectedSizeProp == 'minimal'">minimal</button>
    </div>
    <div class="settingsContainer" v-show="store.settingsCurrent === 'filter'">
      <button class="buttonSquare" @click="store.setSettingsCurrent('')">&nbsp;&lt;&nbsp;</button>
      <button @click="store.settingsChange('filter', 'seen')" :disabled="selectedFilterProp == 'seen'">seen</button>
      <button @click="store.settingsChange('filter', 'unseen')" :disabled="selectedFilterProp == 'unseen'">unseen</button>
      <button @click="store.settingsChange('filter', 'both')" :disabled="selectedFilterProp == 'both'">both</button>
    </div>
  </div>
</template>

<style scoped>
.settingsContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin: 0.5rem 0;
}
</style>