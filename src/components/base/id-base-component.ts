/* eslint-disable */
import Vue from "vue";
import ComponentVue from 'vue-class-component';

@ComponentVue
export default class IDBaseComponent extends Vue {
    Loading = false;

    SignInRules = {
        Email: [
            (v: string) => !!v || 'Введите e-mail',
            (v: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Введите e-mail',
        ],
        Phone: [
            (v: string) => (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(v)) || 'Введите телефон'
        ],
        Password: [
            (value: string) => value ? true : "Требуется заполнить",

        ],
        TwoFactorCode: [
            (v: string) => !!v || 'Введите код',
            (v: string) => v.length > 6 || 'Длина кода должна быть 6 символовов'
        ]
    }
}