<template>
  <div>
    <q-card class="my-card">
      <div class="row q-pa-sm">
        <q-space></q-space>
        <q-btn icon="delete" flat round dense v-close-popup @click="confirm" />
      </div>

      <q-card-section class="q-pa-lg">
        {{ note.body }}
      </q-card-section>
      <div class=" text-right q-pa-md">
        <q-btn
          round
          class="text-center"
          color="amber"
          text-color="black"
          icon="edit"
          @click="showEditNote = true"
        />
      </div>
    </q-card>
    <q-dialog v-model="showEditNote">
      <edit-note :id="id" @close="showEditNote = false"></edit-note>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['note', 'id'],
  data() {
    return {
      showEditNote: false,
    };
  },
  components: {
    editNote: require('components/EditNote').default,
  },
  methods: {
    ...mapActions('note', ['deleteNote']),
    confirmDailog() {
      this.$emit('delete');
    },
    confirm() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete this note?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log('>>>> OK');
          this.deleteNote(this.id);
        });
    },
  },
};
</script>

<style></style>
