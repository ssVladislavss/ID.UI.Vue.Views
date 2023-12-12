<template>
  <LoginComponent :returnUrl="$route.query.ReturnUrl" />
</template>

<script lang="ts">
/* eslint-disable */
import LoginComponent from '../components/login.vue';
import IDBaseComponent from '../components/base/id-base-component';
import Component from 'vue-class-component';

@Component({
  components: {
    LoginComponent
  },
  name: 'LoginView'
})
export default class LoginView extends IDBaseComponent {
}
</script>
