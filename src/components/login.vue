<template>
    <v-container style="width: 100%;height: 100%;position: fixed;max-width: 600px;
                        left: 50%;margin-right: -50%;display: flex;
                        justify-content: center;overflow: auto;
                        flex-direction: column;transform: translate(-50%, 0)">
        <v-window v-model="WindowStep">
            <v-window-item :value="1">
                <v-container>
                    <p class="text-h6 text-center">Здравствуйте, для продолжения необходимо войти аккаунт</p>
                    <v-form v-model="SignInForm">
                        <v-text-field autofocus label="Электронный адрес" v-model="UserName" :rules="SignInRules.Email"
                            :disabled="Loading" hint="Обязательный параметр" persistent-hint />
                        <v-text-field label="Пароль" v-model="Password" @click:append="PasswordVisible = !PasswordVisible"
                            :append-icon="PasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="PasswordVisible ? 'text' : 'password'" :disabled="Loading" :rules="SignInRules.Password"
                            hint="Обязательный параметр" persistent-hint />
                        <div class="d-flex justify-space-between">
                            <v-checkbox v-model="RememberMe" dense label="Запомнить меня" :disabled="Loading"></v-checkbox>
                            <v-btn @click="() => { WindowStep = 2; UserName = ''; }" text>Забыли пароль?</v-btn>
                        </div>
                    </v-form>
                    <v-card-actions>
                        <v-btn block color="primary" :disabled="!SignInForm" :loading="Loading" @click="SignInAsync" large
                            text>Войти</v-btn>
                    </v-card-actions>
                </v-container>
            </v-window-item>
            <v-window-item :value="2">
                <v-fab-transition>
                    <v-btn color="primary" fab text small top left @click="() => { WindowStep = 1; UserName = ''; }"
                        :disabled="Loading">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-fab-transition>
                <v-form v-model="ResetPasswordForm">
                    <v-text-field autofocus label="Электронный адрес" v-model="UserName" :rules="SignInRules.Email"
                        :disabled="Loading" hint="На  указанный адрес мы отправим инструкцию для сброса пароля"
                        persistent-hint />
                </v-form>
                <v-card-actions>
                    <v-btn block color="primary" :disabled="!ResetPasswordForm" :loading="Loading"
                        @click="ResetPasswordAsync" large text>Сбросить пароль</v-btn>
                </v-card-actions>
            </v-window-item>
        </v-window>
    </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import IDBaseComponent from "./base/id-base-component";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class LoginComponent extends IDBaseComponent {
    @Prop({ required: false, default: '' }) returnUrl?: string;

    WindowStep = 1;

    UserName = '';
    Password = '';
    PasswordVisible = false;
    RememberMe = false;

    SignInForm = false;
    ResetPasswordForm = false;

    Items = [
        {
            text: 'Забыли пароль?',
            disabled: false,
            href: '',
        }
    ]

    async ResetPasswordAsync(): Promise<void> {
        this.Loading = true;

        try {
            const splitted = this.returnUrl?.split('&');

            let client_id = '';

            if (splitted != undefined && splitted != null)
                for (let item of splitted)
                    if (item.includes('client_id'))
                        client_id = item.split('=')[1];

            const sendResult = await fetch(`${location.origin}/api/account/${this.UserName}/password/reset`, {
                method: "PUT",
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/json;+charset=utf-8'
                },
            });

            const result = await sendResult.json();
            if (result.succedeed) {
                this.WindowStep = 1;
                this.UserName = '';
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.Loading = false;
        }
    }

    async SignInAsync(): Promise<void> {

        this.Loading = true;

        let returnParam = '';

        for (let param in this.$route.query) {
            if (param != 'ReturnUrl')
                returnParam += `&${param}=${this.$route.query[param]}`;
        }

        try {
            const sendResult = await fetch(`${location.origin}/api/account/login`, {
                method: "POST",
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/json;+charset=utf-8'
                },
                body: JSON.stringify({ UserName: this.UserName, Password: this.Password, RememberMe: this.RememberMe, ReturnUrl: `${this.returnUrl}${returnParam}` })
            });

            const urlRedirect = await sendResult.text();

            location.replace(`${location.origin}${urlRedirect}`);
        } catch (e) {
            console.error(e);
        } finally {
            this.Loading = false;
        }
    }
}
</script>