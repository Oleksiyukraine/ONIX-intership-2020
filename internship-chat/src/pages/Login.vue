<template>
  <div class="login-form-wrapper">
    <div class="form-layer">
      <div class="form-body">
        <div class="full-withs">
          <q-img
            src="logo.png"
            spinner-color="white"
            style="width: 100%"
            class="q-my-lg"
          />
        </div>
        <q-form class="q-gutter-md">
          <q-input
            outlined
            lazy-rules
            ref="email"
            type="email"
            v-model="user.email"
            label="Enter email"
            :rules="[rules.required]"
          />
            <template
              v-slot:append
            >
              <q-icon
                name="close"
                @click="user.email = ''"
                class="cursor-pointer"
              />
            </template>
          <q-input class="password-block"
            lazy-rules
            outlined
            ref="password"
            v-model="user.password"
            :type="isPwd ? 'password' : 'text'"
            label="Enter password"
            :rules="[rules.required]"
          >
            <template
              v-slot:append
            >
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="form-footer q-mt-md">
            <q-btn
              class="submit-btn"
              label="Sign in"
              no-caps
              color="green-7"
              @click="login()"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      formHasError: false,
      user: {
        email: '',
        password: '',
      },
      rules: {
        required: (v) => !!v || 'This field is required',
      },
    };
  },
  methods: {
    login() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if ((this.$refs.email).hasError || (this.$refs.password).hasError) {
        this.formHasError = true;
      } else {
        this.$q.loading.show();
        this.$store.dispatch('account/login', this.user).then(() => {
          this.$q.notify({ icon: 'done', color: 'positive', message: 'Login successful' });
          this.$q.loading.hide();
          this.$router.push({ name: 'Home' });
        }).catch((error) => {
          console.log('error', error);
          this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        }).finally(() => {
          this.$q.loading.hide();
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .login-form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: $blue-1;
    .form-layer {
      min-width: 600px;
      padding: 3rem;
      background-color: white;
      box-shadow: 0 0 5px $blue-3;
      .submit-btn {
        width: 100%;
        height: 3rem;
      }
    }
  }
</style>
