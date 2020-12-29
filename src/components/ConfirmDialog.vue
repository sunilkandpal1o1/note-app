<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="warning" color="negative" text-color="white" />
      <span class="q-ml-sm">Do you really want to delete this note?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Delete" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {};
</script>

<style></style>
