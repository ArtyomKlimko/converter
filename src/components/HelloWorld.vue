<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRatesStore } from "@/service/store/ratesStore.ts";
import { storeToRefs } from "pinia";
import { useRatesModel } from "@/service/models/rates.ts";
import { localeToCurrencyMap } from "@/service/state/locales.ts";
import { currencyEmojis } from "@/service/state/currencyEmojis.ts";

const ratesModel = new useRatesModel();
const amount = ref<number | null>(null);
const fromCurrency = ref('USD');
const toCurrency = ref('EUR');
const { rates, currencies } = storeToRefs(useRatesStore());
const result = ref<number | null>(null);

const convertCurrency = () => {
  if (amount.value !== null && rates.value && rates.value[fromCurrency.value] !== undefined && rates.value[toCurrency.value] !== undefined) {
    const rate = rates.value[toCurrency.value] / rates.value[fromCurrency.value];
    result.value = amount.value * rate;
  }
};

const setDefaultCurrency = () => {
  const userLocale = navigator.language || 'en-US';
  const defaultCurrency = localeToCurrencyMap[userLocale] || 'USD';
  if (currencies.value?.includes(defaultCurrency)) {
    fromCurrency.value = defaultCurrency;
  }
};

onMounted(async () => {
  await ratesModel.getRates();
  setDefaultCurrency();
});
</script>

<template>
  <div class="conver-money-section">
    <div class="convert-money-content">
      <div class="convert-money-item__amount-row">
        <label for="amount">Amount:</label>
        <input id="amount" v-model="amount" type="number" @input="convertCurrency" />
      </div>

      <div class="convert-money-item__from-row">
        <label for="fromCurrency">From:</label>
        <select id="fromCurrency" v-model="fromCurrency" @change="convertCurrency">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }} {{ currencyEmojis[currency] }}
          </option>
        </select>
      </div>

      <div class="convert-money-item__to-row">
        <label for="toCurrency">To:</label>
        <select id="toCurrency" v-model="toCurrency" @change="convertCurrency">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }} {{ currencyEmojis[currency] }}
          </option>
        </select>
      </div>

      <div class="convert-money-item__result-row">
        <p>Result: <strong>{{ result !== null ? result.toFixed(2) : 'N/A' }}</strong></p>
      </div>
    </div>
  </div>
</template>
