<template>
  <div class="q-pa-md" v-if="!LOADING">
    <div class="text-h4 text-bold q-mb-md">Room: {{ $route.params.id }}</div>
    <div class="chat-wrapper row">
      <div class="chat-left-side col-8">
        <div class="q-pa-md full-width justify-center">
          <div class="body-chat">
            <q-chat-message
              v-for="(message, index) in messages"
              :key="index"
              :name="message.ownerId.name"
              :avatar="message.ownerId.avatar"
              :text="[message.text]"
              :sent="message.ownerId._id === $store.state.account.user._id"
            />
          </div>
          <div class="footer-wrapper">
            <q-input
              bottom-slots
              v-model="text"
              label="Enter text here..."
              dense
            >
              <template v-slot:append>
                <q-icon
                  v-if="text !== ''"
                  name="close"
                  @click="text = ''"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="sendMessage()"/>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="chat-right-side col-4">
        <div class="q-pa-md premium-content-wrapper">
          <div class="text-subtitle1 text-center">Some premium content here:</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomPage',
  data() {
    return {
      LOADING: true,
      room: null,
      text: '',
      messages: [],
    };
  },
  sockets: {
    messageList(messages) {
      this.messages = messages;
    },
    newMessage(message) {
      this.messages.push(message);
    },
  },
  mounted() {
    this.$q.loading.show();
    this.$store.dispatch('rooms/getById', this.$route.params.id).then((res) => {
      this.room = res.data;
      this.LOADING = false;
      this.$q.loading.hide();
      this.$socket.emit('clientConnectToRoom', this.$route.params.id);
    }).catch((e) => {
      this.$q.loading.hide();
      this.$q.notify({ icon: 'report_problem', color: 'negative', message: e.message });
    });
  },
  methods: {
    sendMessage() {
      const msg = {
        ownerId: this.$store.state.account.user._id,
        roomId: this.$route.params.id,
        text: this.text,
      };
      this.text = '';
      // if (this.text.length > 3) {
      //   this.$socket.emit('typing', userId);
      // }
      this.$socket.emit('clientSendMessage', msg);
    },
  },
};
</script>

<style lang="scss" scoped>
  .chat-wrapper {
    display: flex;
    box-shadow: 0 0 1px black;
    width: 100%;
    height: 80vh;
  }
  .chat-left-side {
    display: flex;
    background-color: whitesmoke;
    box-shadow: 0 0 1px grey;
  }
  .chat-right-side {
    display: flex;
  }
  .premium-content-wrapper {
    width: 100%;
  }
  .body-chat {
    height: 665px;
    overflow: auto;
  }
</style>
