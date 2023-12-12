<template>
    <v-container style="width: 100%;height: 100%;position: fixed;max-width: 700px;
                        left: 50%;margin-right: -50%;display: flex;
                        justify-content: center;overflow: auto;
                        flex-direction: column;transform: translate(-50%, 0)">
        <p class="text-h3 error-text text-center">Ошибка</p>
        <p class="text-h6 text-center">Приложение неизвестно либо не настроено</p>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import Component from 'vue-class-component';
import IDBaseComponent from './base/id-base-component';

@Component
export default class ErrorComponent extends IDBaseComponent { }
</script>