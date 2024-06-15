<template>
    <div class="mb-2">
        <p v-if="SendError" class="text-h3 primary-text text-center">{{ SendErrorMessage }}</p>
        <p v-if="SendComplete" class="text-h3 primary-text text-center">
            Сообщение отправлено, просмотрите Вашу почту и выполните действия, которые описаны в сообщении
        </p>
    </div>

    <v-btn block color="primary" :disabled="!SendLoading || SendComplete" :loading="Loading"
        @click="SendConfirmEmailAsync" large text>{{ sendBtnText }}</v-btn>
</template>

<script lang="ts">
/* eslint-disable */
import IDBaseComponent from "./base/id-base-component";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class SendEmailConfirmComponent extends IDBaseComponent {
    @Prop({ required: true }) userId!: string;
    @Prop({ required: false, default: "Подтвердить" }) sendBtnText?: string;

    SendLoading = false;
    SendComplete = false;
    SendError = false;
    SendErrorMessage = '';

    async SendConfirmEmailAsync() {
        this.SendLoading = true;

        const sendResult = await fetch(`${location.origin}/api/account/${this.userId}/send/confirm/email`, {
            method: "POST",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/json;+charset=utf-8'
            }
        });

        if (sendResult.status != 200) {
            this.SendError = true;
            this.SendErrorMessage = 'Не удалось отправить сообщение. Наверняка это по нашей вине! Попробуйте еще раз, если не выйдет, напишите нам!';
        } else {
            this.SendComplete = true;
        }

        this.SendLoading = false;
    }
}

</script>