<template>
  <div class="row">
    <h1>Login</h1>

    <form @submit.prevent="loginUser" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input v-model.trim="email" id="email" type="email" class="validate" required>
          <label for="email">Email</label>
        </div>

      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model.trim="pass" id="password" :type="showPass ? 'text' : 'password'" minlength="6"
            class="validate">
          <label for="password">Password</label>
          <p>
            <label>
              <input v-model="showPass" type="checkbox" />
              <span>Show Pass</span>
            </label>
          </p>
        </div>
      </div>

      <button class="waves-effect waves-light btn" :disabled="!isFormValid">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import router from '@/router';
import store from '@/store/store';
export default {
  data: () => ({
    email: '',
    pass: '',
    showPass: false,
    invalidCredentials: false
  }),
  computed: {
    isFormValid() {
      return this.email && this.pass;
    }
  },
  methods: {
    async loginUser() {
      if (this.pass && this.email) {
        const api_key = process.env.VUE_APP_API_KEY;

        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: this.email,
              password: this.pass,
              returnSecureToken: true
            }),
          }
        );

        const data = await res.json();
        const error = data?.error?.message;
        if (error) {
          this.invalidCredentials = ['EMAIL_NOT_FOUND', 'INVALID_PASSWORD'].includes(error);
          this.showError();
          return;
        }
        store.login(data);
        setTimeout(() => router.push('/projects'), 500);
      } else {
        return;
      }
    },
    showError() {
      M.toast({
        html: this.invalidCredentials ? 'Invalid credentials!' : 'Internal error!',
        displayeLaength: 1500,
        classes: 'rounded red'
      });
    }
  }
}
</script>
