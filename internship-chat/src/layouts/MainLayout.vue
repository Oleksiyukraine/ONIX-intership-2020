<template>
  <q-layout view="hHh LpR fFf">

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="left = !left"/>
        <q-toolbar-title>
          <div class="text-h5 text-bold cursor-pointer">
            <q-btn flat label="ONIX CHAT" to="/" />
          </div>
        </q-toolbar-title>
        <q-btn flat round dense icon="account_circle" @click="profile = !profile"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
        <div class="text-h5 q-pa-md text-bold">User list: </div>
        <q-list>
          <q-item
            clickable
            v-ripple
            v-for="(user, index) in userList"
            :key="index"
          >
            <q-item>
              <q-item-section top avatar>
                <q-avatar class="q-mr-sm">
                  <img :src="user.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-icon name="circle" color="green" />
                <q-item-label caption>5 min ago</q-item-label>
              </q-item-section>
            </q-item>
          </q-item>
        </q-list>
    </q-drawer>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
    <div class="user-menu" v-if="profile">
      <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              NAME:
            </q-item-section>
            <q-item-section>{{$store.state.account.user.name}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="logout()">
            <q-item-section avatar>
              <q-icon color="primary" name="logout" />
            </q-item-section>
            <q-item-section>Exit</q-item-section>
          </q-item>
        </q-list>
    </div>
    <q-footer reveal bordered class="bg-grey-8 text-white text-right">
      <div class="text-h5 text-bold q-pa-sm">© ONIX nodejs intership 2021</div>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  data() {
    return {
      left: false,
      profile: false,
      menuList: [],
      userList: [
        { name: 'Joan', avatar: 'https://picsum.photos/200/300' },
        { name: 'John', avatar: 'https://picsum.photos/200/300' },
      ],
    };
  },

  created() {
    if (!this.$store.state.account.authenticated) {
      this.$router.push('/login');
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('account/logout').then(() => {
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Logout successful' });
        this.$router.push({ name: 'Login' });
      }).catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'negative', message: error.message });
      });
    },
  },

  computed: {
    role() {
      return this.$store.state.account.user.role;
    },
  },
};
</script>
<style lang="scss" scoped>
  .user-menu {
    background-color: whitesmoke;
    width: 230px;
    position: absolute;
    top: 52px;
    right: 0;
  }
  .user-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
