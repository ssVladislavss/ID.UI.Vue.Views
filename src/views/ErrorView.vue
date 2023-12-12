<template>
  <ErrorComponent />
</template>

<script lang="ts">
/* eslint-disable */
import IDBaseComponent from '@/components/base/id-base-component';
import ErrorComponent from '@/components/error.vue';
import Component from 'vue-class-component';

@Component({
  components: {
    ErrorComponent
  },
  name: 'ErrorView'
})
export default class ErrorView extends IDBaseComponent {}
</script>
