import {useRatesStore} from "@/service/store/ratesStore.ts";
import {fetchWrapper} from "@/service/api/fetchWrapper.ts";

export class useRatesModel {
    private ratesStore = useRatesStore();

    async getRates() {
        const response = await fetchWrapper.get('https://open.er-api.com/v6/latest/USD');
        this.ratesStore.setRates(response.rates);
    }
}