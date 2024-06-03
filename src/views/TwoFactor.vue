<template>
    <TwoFactorComponent :userName="$route.query.UserName" :returnUrl="$route.query.ReturnUrl" />
</template>

<script lang="ts">
/* eslint-disable */
import TwoFactorComponent from '@/components/two-factor.vue';
import IDBaseComponent from '../components/base/id-base-component';
import Component from 'vue-class-component';

@Component({
  components: {
    TwoFactorComponent
  },
  name: 'TwoFactorView'
})
export default class TwoFactorView extends IDBaseComponent{ 
}
</script>