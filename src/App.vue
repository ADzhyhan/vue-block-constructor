<template>
  <div id="app" class="app">
    <div class="container">
      <div class="wrapper">
        <div class="wrapper-top">
          <transition name="component-fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/scss/main.scss" lang="scss"></style>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'app',
  components: {
  },
  computed: {
    ...mapGetters({
      
    })
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({

    }),
  }
}
</script>
