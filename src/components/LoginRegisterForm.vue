<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      outlined
      type="text"
      v-model="formData.name"
      label="Name"
      class="q-mb-md"
    ></q-input>
    <q-input
      outlined
      type="email"
      v-model="formData.email"
      label="Email"
      class="q-mb-md"
    ></q-input>
    <q-input
      outlined
      type="password"
      v-model="formData.password"
      label="Password"
      class="q-mb-md"
    ></q-input>
    <div class="row">
      <q-space></q-space>
      <q-btn
        color="primary"
        :label="tab == 'login' ? 'Sign In' : 'Sign Up'"
        type="submit"
      ></q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';
import { firebaseAuth } from '../boot/firebase';
export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('user', ['registerUser', 'loginUser']),
    ...mapActions('note', ['onLogin']),
    submitForm() {
      if (this.tab == 'login') {
        this.loginUser(this.formData);
        firebaseAuth.onAuthStateChanged(user => {
          this.onLogin();
          if (user) this.$router.push({ path: '/' });
        });
      } else {
        this.registerUser(this.formData);
        firebaseAuth.onAuthStateChanged(user => {
          if (user) this.$router.push({ path: '/' });
          this.onLogin();
        });
      }
    },
  },
};
</script>

<style></style>
