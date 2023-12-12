/* eslint-disable */
import Vue from "vue";
import ComponentVue from 'vue-class-component';

@ComponentVue
export default class IDBaseComponent extends Vue {
    private loading = false;

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
    }

    get Loading(): boolean {
        return this.loading;
    }
    set Loading(value: boolean) {
        this.loading = value;
    }
}