<template>
    <v-container style="width: 100%;height: 100%;position: fixed;max-width: 700px;
                        left: 50%;margin-right: -50%;display: flex;
                        justify-content: center;overflow: auto;
                        flex-direction: column;transform: translate(-50%, 0)">
        <p class="text-h3 primary-text text-center">Подтверждение электронного адреса</p>
        <p class="text-h6 text-center mb-3">Время ожидания подтверждения истекло!</p>
        <SendEmailConfirmComponent :userId="$route.query.UserId" sendBtnText="Отправить повторно" />
    </v-container>
</template>

<script lang="ts">
import IDBaseComponent from '@/components/base/id-base-component';
import Component from "vue-class-component";
import SendEmailConfirmComponent from "@/components/send-confirm-email.vue";
/* eslint-disable */
@Component({
    components: {
        SendEmailConfirmComponent
    }
})
export default class EmailConfirmedView extends IDBaseComponent {
    
}

</script>