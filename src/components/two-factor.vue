<template>
    <div>
        <v-container style="width: 100%;height: 100%;position: fixed;max-width: 600px;
                        left: 50%;margin-right: -50%;display: flex;
                        justify-content: center;overflow: auto;
                        flex-direction: column;transform: translate(-50%, 0)">
            <v-fab-transition>
                <v-btn color="primary" :href="GoToLoginHref" fab text small top left :disabled="Loading">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-fab-transition>
            <p class="text-h6 text-center">Мы отправили код на выбранный Вами способ подтверждения</p>
            <v-form v-model="TwoFactorForm">
                <v-otp-input v-model="OTP" :length="6" :disabled="Loading" @finish="OnFinish"
                    type="number"></v-otp-input>
                <p class="text-caption text-center">Введите значение</p>
                <p v-if="ResendTick > 0" class="text-caption text-center">Переотправить код можно через {{ ResendTick }}
                    сек.</p>
                <v-btn v-else @click="OnResend" text block small>Отправить повторно</v-btn>
            </v-form>
        </v-container>

        <v-overlay absolute :value="Loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </div>

</template>

<script lang="ts">
/* eslint-disable */
import IDBaseComponent from "./base/id-base-component";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class TwoFactorComponent extends IDBaseComponent {
    @Prop({ required: false, default: '' }) returnUrl?: string;
    @Prop({ required: true }) userName!: string;

    TwoFactorCode = '';
    TwoFactorForm = false;

    ResendTick = 300;
    IntervalActive = false;
    Interval = 0;

    OTP = '';

    GoToLoginHref = '';

    mounted() {
        let returnParam = '';

        for (let param in this.$route.query) {
            if (param != 'ReturnUrl' && param != 'UserName')
                returnParam += `&${param}=${this.$route.query[param]}`;
        }

        let pathResult = `${this.returnUrl}${returnParam}`;

        this.GoToLoginHref = `${location.origin}/Account/Login?ReturnUrl=${pathResult}`;

        this.toggleTimer();
    }

    toggleTimer() {
        if (this.IntervalActive) {
            clearInterval(this.Interval);
        } else {
            this.Interval = setInterval(() => {
                if (this.ResendTick > 0) {
                    this.ResendTick = this.ResendTick - 1;
                } else {
                    clearInterval(this.Interval);
                    this.IntervalActive = false;
                }
            }, 1000);

            this.IntervalActive = true;
        }
    }

    async OnFinish(rsp: string) {
        this.Loading = true;

        let returnParam = '';

        for (let param in this.$route.query) {
            if (param != 'ReturnUrl')
                returnParam += `&${param}=${this.$route.query[param]}`;
        }

        try {
            const sendResult = await fetch(`${location.origin}/api/account/login/twoFactor`, {
                method: "POST",
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/json;+charset=utf-8'
                },
                body: JSON.stringify({ UserName: this.userName, TwoFactorCode: rsp, ReturnUrl: `${this.returnUrl}${returnParam}` })
            });

            if (sendResult.status != 200) {
                this.TwoFactorCode = '';

                return;
            }

            const urlRedirect = await sendResult.text();

            location.replace(`${location.origin}${urlRedirect}`);
        } catch (e) {
            console.error(e);
            this.TwoFactorCode = '';
        } finally {
            this.Loading = false;
        }
    }

    async OnResend() {
        this.Loading = true;

        try {
            const resendResult = await fetch(`${location.origin}/api/account/${this.userName}/resend/twoFactor`, {
                method: "POST",
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/json;+charset=utf-8'
                }
            });

            if (resendResult.status == 200) {
                this.ResendTick = 300;
                this.toggleTimer();
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.Loading = false;
        }
    }
}

</script>