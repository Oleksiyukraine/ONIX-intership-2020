<template>
  <div id="q-app" v-if="!LOADING">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      LOADING: true,
    };
  },
  created() {
    this.$q.loading.show();
    this.$store.dispatch('account/check').then((isCookie) => {
      if (!isCookie) {
        this.$q.loading.hide();
        this.LOADING = false;
        this.$router.push('/login');
      } else {
        this.$q.loading.show();
        this.$store.dispatch('account/find').then(() => {
          this.LOADING = false;
          this.$q.loading.hide();
        }).catch((error) => {
          console.log('error', error);
          this.$q.loading.hide();
          this.LOADING = false;
          this.$store.dispatch('account/logout');
        });
      }
    });
  },
};
</script>
<style lang="scss">
  /*Animations */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity .8s ease;
  }
  .fade-leave {
    transition: opacity .8s ease;
  }
  .fade-leave-active {
    transition: opacity .8s ease;
    opacity: 0;
  }
</style>
