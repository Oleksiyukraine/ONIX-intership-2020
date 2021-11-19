<template>
  <div class="q-pa-md" v-if="!LOADING">
    <div class="header">
      <div class="text-h5 text-bold q-mb-md">Room list: </div>
      <div>
        <q-btn label="Create room" @click="newRoomPopup = !newRoomPopup" />
      </div>
    </div>
    <div class="body row">
      <div
        class="col-3 q-pa-sm room-wrapper"
        v-for="(room, index) in rooms"
        :key="index"
         @click="goToRoom(room)"
      >
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="room.ownerId.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ room.ownerId.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-subtitle1">{{ room.title }}</div>
              <div class="text-subtitle2">{{ room.description }}</div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="newRoomPopup">
      <q-card>
        <q-card-section>
          <div class="text-h6">Create new room</div>
        </q-card-section>

        <q-card-section class="q-pt-none room-popup">
          <q-input
            v-model="newRoomObject.title"
            label="Title"
          />
          <q-input
            v-model="newRoomObject.description"
            label="Description"
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Create" color="primary" v-close-popup @click="createRoom()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      LOADING: true,
      newRoomPopup: false,
      newRoomObject: {
        title: '',
        description: '',
        ownerId: this.$store.state.account.user._id,
        usersId: [],
      },
      rooms: [],
    };
  },

  mounted() {
    this.LOADING = false;
    this.$q.loading.show();
    this.$store.dispatch('rooms/list').then((res) => {
      this.rooms = res.data;
      console.log('data', res.data);
      this.LOADING = false;
      this.$q.loading.hide();
    }).catch((e) => {
      this.$q.loading.hide();
      this.$q.notify({ icon: 'report_problem', color: 'negative', message: e.message });
    });
  },

  methods: {
    goToRoom(room) {
      this.$router.push(`/room/${room._id}`);
    },
    createRoom() {
      this.$q.loading.show();
      this.$store.dispatch('rooms/create', this.newRoomObject).then((res) => {
        this.$router.push(`/room/${res.data._id}`);
      }).catch((e) => {
        this.$q.loading.hide();
        this.$q.notify({ icon: 'report_problem', color: 'negative', message: e.message });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .room-popup {
    width: 500px;
  }
  .room-wrapper {
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 1px gray;
    }
  }
</style>
