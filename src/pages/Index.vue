<template>
  <q-page padding>
    <div class="center row q-pa-d q-gutter-md items-start">
      <note
        v-for="(note, key) in notes"
        :key="key"
        :note="note"
        :id="key"
        @edit="showEditNote = true"
        @delete="confirm = true"
        >Edit Note</note
      >
    </div>
    <q-dialog v-model="showAddNote">
      <add-note @close="showAddNote = false"></add-note>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <confirm-dailog></confirm-dailog>
    </q-dialog>

    <div class="absolute-bottom text-center q-mb-md">
      <q-btn
        round
        icon="add"
        size="24px"
        color="primary"
        @click="showAddNote = true"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import Note from 'src/components/Note.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      showAddNote: false,
      showEditNote: false,
      confirm: false,
    };
  },
  components: {
    note: require('components/Note').default,
    addNote: require('components/AddNote').default,
    confirmDialog: require('components/ConfirmDialog').default,
  },
  name: 'PageIndex',
  computed: {
    ...mapGetters('note', ['notes']),
  },
  methods: {
    ...mapActions('note', ['populateData']),
  },
  mounted() {
    console.log('created');
    this.populateData();
  },
};
</script>
<style lang="scss">
.center {
  width: 80%;
  margin: 0 auto;
}
</style>
