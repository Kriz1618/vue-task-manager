<template>
  <div class="row">

    <h1>Register</h1>

    <form @submit.prevent="signUp" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input v-model.trim="email" id="email" type="email" class="validate" required>
          <label for="email">Email</label>
        </div>

      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model.trim="pass1" id="password" :type="showPass1 ? 'text' : 'password'" minlength="6"
            class="validate">
          <label for="password">Password</label>
          <p>
            <label>
              <input v-model="showPass1" type="checkbox" />
              <span>{{ showPass1? 'hide': 'show' }} pass</span>
            </label>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input v-model.trim="pass2" id="comfirm_password" :type="showPass2 ? 'text' : 'password'" minlength="6"
            class="validate">
          <label for="comfirm_password">Comfirm Password</label>
          <p>
            <label>
              <input v-model="showPass2" type="checkbox" />
              <span>{{ showPass2? 'hide': 'show' }} pass</span>
            </label>
          </p>
        </div>
      </div>

      <button class="waves-effect waves-light btn" :disabled="!isFormValid">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import store from '@/store/store';
export default {
  data: () => ({
    email: '',
    pass1: '',
    pass2: '',
    showPass1: false,
    showPass2: false,
  }),
  computed: {
    isFormValid() {
      return this.email && this.pass1.length > 6 && this.pass1 === this.pass2;
    }
  },
  methods: {
    async signUp() {
      if (this.pass1 && this.pass1 === this.pass2) {
        const api_key = 'AIzaSyBAR2Os5viqoKhtV61K2MpmzzqTszeG7_U';

        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: this.email,
              password: this.pass1,
              returnSecureToken: true
            })
          }
        );

        const data = await res.json();

        if (data.error) {
          M.toast({
            html: 'Internal error!',
            displayeLaength: 1500,
            classes: 'rounded red'
          });
          return;
        }

        store.login(data);
        this.$router.push('/projects');
      }
    }
  }
}
</script>
