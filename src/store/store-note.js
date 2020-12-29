import Vue from 'vue';
import { uid } from 'quasar';
import { firebaseApp, firebaseAuth, firestore } from '../boot/firebase';
import firebase from 'firebase';
const state = {
  notes: {
    id1: {
      body: 'this is a reminder that everything is awesome',
    },
    id2: {
      body: 'not so good',
    },
  },
};

const actions = {
  addNote: ({ commit }, payload) => {
    console.log('actions reached');

    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;

      firestore
        .collection('notes')
        .add({
          body: payload.body,
          uid: userId,
        })
        .then(value => {
          console.log('response', value.id);
          firestore
            .collection('users')
            .doc(userId)
            .update({
              notes: firebase.firestore.FieldValue.arrayUnion(value.id),
            });
          console.log('udated');
          commit('addNote', { uid: value.id, data: payload });
        })
        .catch(err => console.log(err.message));
    } else {
      commit('addNote', { uid: uid(), data: payload });
    }
  },
  add: () => {
    console.log('add action reached');
    firestore
      .collection('notes')
      .add({
        body: 'hello',
      })
      .then(res => console.log(res));
  },
  editNote: ({ commit }, payload) => {
    console.log('editNote action ', payload);
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      firestore
        .collection('notes')
        .doc(payload.id)
        .update({
          body: payload.update.body,
          uid: userId,
        });
      commit('editNote', payload);
    }
    // commit('editNote', payload);
  },
  deleteNote: ({ commit }, payload) => {
    console.log('deleteNote action ', payload);
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      firestore
        .collection('notes')
        .doc(payload)
        .delete()
        .then(() => {
          console.log('deleted');
          firestore
            .collection('users')
            .doc(userId)
            .update({
              notes: firebase.firestore.FieldValue.arrayRemove(payload),
            });
          console.log('udated');
          commit('deleteNote', payload);
        })
        .catch(err => console.log(err.message));
    } else {
      commit('deleteNote', payload);
    }
    // commit('deleteNote', payload);
  },
  populateData: ({ commit }, payload) => {
    console.log('populate action');
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const userId = firebaseAuth.currentUser.uid;
        commit('populateData', userId);
      }
    });
    // const userId = firebaseAuth.currentUser.uid;
    // console.log('userId', firebaseAuth.currentUser);
    // commit('populateData');
  },
  onLogin: () => {
    const userId = firebaseAuth.currentUser.uid;
    for (let note in state.notes) {
      console.log('note onlogin', note);
      firestore
        .collection('notes')
        .doc(note)
        .set({
          body: note.body,
          uid: userId,
        })
        .then(value => {
          console.log('response', value.id);
          firestore
            .collection('users')
            .doc(userId)
            .update({
              notes: firebase.firestore.FieldValue.arrayUnion(value.id),
            });
          console.log('udated');
          //   commit('addNote', { uid: value.id, data: payload });
        });
    }
  },
};

const mutations = {
  addNote: (state, payload) => {
    console.log('mutation reached');
    const newId = payload.uid;

    Vue.set(state.notes, newId, payload.data);
    console.log(state.notes);
  },
  editNote: (state, payload) => {
    state.notes[payload.id] = {
      ...payload.update,
    };
    console.log('eidtnote mutation ', state.notes);
  },
  deleteNote: (state, payload) => {
    Vue.delete(state.notes, payload);

    console.log(state.notes);
  },
  populateData: (state, payload) => {
    console.log('populate data uid: ');
    // console.log(firebaseAuth.currentUser);
    console.log(payload);
    firestore
      .collection('notes')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          console.log('data', data);
          let id = doc.id;
          Vue.set(state.notes, id, data);
          console.log('state notes', state.notes);
          //   Vue.set(state.notes, doc.id, { body: data.body });
        });
      });
  },
};

const getters = {
  notes: state => {
    console.log('reached getter');

    return state.notes;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
