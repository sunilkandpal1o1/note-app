<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none" invert>
      <div class="text-h6">Add new note</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <form @submit.prevent="formSubmit($event)">
      <q-card-section>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input
            ref="noteBody"
            v-model="newNote.body"
            type="textarea"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Add Note" color="primary" class="q-mr-md" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      newNote: {
        body: '',
      },
    };
  },
  methods: {
    ...mapActions('note', ['addNote', 'add']),
    formSubmit(e) {
      this.$refs.noteBody.validate();
      if (!this.$refs.noteBody.hasError) {
        console.log('no error');
        // this.addNote(this.newNote);
        this.addNote(this.newNote);
        this.$emit('close');
      }
    },
  },
  //   props: ['showAddNote'],
};
</script>

<style></style>
