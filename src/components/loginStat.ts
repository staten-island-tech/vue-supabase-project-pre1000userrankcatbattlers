import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const cart = ref([]);
  const price = ref({ price: 0 });

  return { cart, price };
});
