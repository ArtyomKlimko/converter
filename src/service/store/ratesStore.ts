import { defineStore } from 'pinia';
import { Rates } from "@/service/state/rates.ts";

export const useRatesStore = defineStore('rates', {
    state: () => ({
        rates: null as Rates | null,       // Объект курсов валют
        currencies: null as string[] | null, // Список валют
    }),
    actions: {
        setRates(catalogData: Rates) {
            this.rates = catalogData;
            this.currencies = Object.keys(catalogData);
        },
    },
});
