<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-electron-drag">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Tokei Kun
        </q-toolbar-title>

        <q-space />

        <q-btn dense flat icon="remove" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="q-electron-drag">
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-tabs v-model="tab" dense active-color="white" indicator-color="transparent"
        class="bg-primary text-white no-uppercase" align="justify">
        <q-route-tab v-for="nav in navigation" :key="nav.name" :name="nav.name" :icon="nav.icon" :label="nav.label"
          :to="nav.to" exact />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Github',
    caption: 'Tokei Kun 仓库地址',
    icon: 'code',
    link: 'https://github.com/yuwuweichun/tokei-kun'
  },
  {
    title: 'puuung',
    caption: '艺术家 puuung 的官方网站',
    icon: 'web',
    link: 'https://puuung1.com/'
  },
  {
    title: 'Countdown Timer',
    caption: 'Codepen Matt Smith',
    icon: 'hourglass_top',
    link: 'https://codepen.io/AllThingsSmitty/pen/JJavZN'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// 添加导航栏数据
const tab = ref('home')
const navigation = [
  {
    name: 'home',
    icon: 'timelapse',
    label: 'elapsed',
    to: '/'
  },
  {
    name: 'anniversary',
    icon: 'celebration',
    label: 'anniversary',
    to: '/anniversary'
  }
]

function minimize () {
  window.myWindowAPI?.minimize()
}

function toggleMaximize () {
  window.myWindowAPI?.toggleMaximize()
}

function closeApp () {
  window.myWindowAPI?.close()
}

</script>

<style scoped>
.no-uppercase .q-tab__label {
  text-transform: none !important;
}
</style>
