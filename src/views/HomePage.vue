<template>
  <div>
    <div>
      <navigation-bar></navigation-bar>
    </div>
    <div>
      <first-page></first-page>
    </div>
    <div>
      <features-page></features-page>
    </div>
    <div>
      <HowItWorksPage></HowItWorksPage>
    </div>
    <div>
      <the-footer></the-footer>
    </div>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script setup>
import FeaturesPage from '../components/FeaturesPage.vue'
import FirstPage from '../components/FirstPage.vue'
import HowItWorksPage from '../components/HowItWorksPage.vue'
import NavigationBar from '../components/NavigationBar.vue'
import TheFooter from '../components/TheFooter.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Work+Sans:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sen&display=swap');
</style>
