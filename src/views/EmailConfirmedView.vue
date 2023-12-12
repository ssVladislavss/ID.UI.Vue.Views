<template>
    <v-container style="width: 100%;height: 100%;position: fixed;max-width: 700px;
                        left: 50%;margin-right: -50%;display: flex;
                        justify-content: center;overflow: auto;
                        flex-direction: column;transform: translate(-50%, 0)">
        <p class="text-h3 primary-text text-center">Подтверждение электронного адреса</p>
        <p class="text-h6 text-center">Ваш электронный адрес успешно подтвержден!</p>
    </v-container>
</template>

<script lang="ts">
import IDBaseComponent from '@/components/base/id-base-component';

/* eslint-disable */

export default class EmailConfirmedView extends IDBaseComponent {
    created(): void {
        console.log('ggg');
    }
}

</script>