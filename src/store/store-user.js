import { firebaseAuth, firestore } from '../boot/firebase';
import Vue from 'vue';
import router from '../router/index';
const state = {};

const mutations = {};

const actions = {
  registerUser: ({ commit }, payload) => {
    console.log('registerUser action ', payload);
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
        let userId = firebaseAuth.currentUser.uid;
        firestore
          .collection('users')
          .doc(userId)
          .set({
            name: payload.name,
            email: payload.email,
            online: true,
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  loginUser: ({ commit }, payload) => {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => console.log('response', res))
      .catch(err => console.log('err message', err.message));
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
