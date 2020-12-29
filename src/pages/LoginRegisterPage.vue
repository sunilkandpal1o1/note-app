<template>
  <div class="login">
    <q-card class="login">
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-8 text-dark"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" icon="login" label="Login" />
        <q-tab name="register" icon="face" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <auth-form :tab="tab"></auth-form>
        </q-tab-panel>

        <q-tab-panel name="register">
          <auth-form :tab="tab"></auth-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'login',
    };
  },
  components: {
    authForm: require('components/LoginRegisterForm').default,
  },
};
</script>

<style>
.login {
  width: 70%;
  margin: auto;
  margin-top: 50px;
}
</style>
