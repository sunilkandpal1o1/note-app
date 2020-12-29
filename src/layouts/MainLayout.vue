<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="glossy" elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/auth')"
          to="/"
          label="Back"
        ></q-btn>
        <q-toolbar-title class="text-center">
          {{
            $route.fullPath.includes('/auth')
              ? 'Login / Register'
              : 'Take a note'
          }}
        </q-toolbar-title>

        <q-btn v-if="!signedIn" to="/auth" label="Login"></q-btn>
        <q-btn v-else label="LogOut" @click="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <p>paragraph {{ signedIn }}</p>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import { firebaseAuth } from '../boot/firebase';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      signedIn: '',
    };
  },
  methods: {
    logout() {
      firebaseAuth.signOut().then(() => {
        console.log('singout');
        // this.currentUser = 'logout';
        this.checkSignIn();
      });
    },
    checkSignIn() {
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          this.signedIn = true;
          return;
        }
        this.signedIn = false;
      });
    },
  },
  computed: {
    isSignedIn() {
      return this.signedIn;
    },
  },
  mounted() {
    this.checkSignIn();
  },
};
</script>
