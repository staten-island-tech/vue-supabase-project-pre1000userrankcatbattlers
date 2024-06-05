import { defineStore } from "pinia";
import { supabase } from "../../utils/supabase";
import { ref, type Ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const aretheyintheleaderboardview = ref(true);
  const localDeaths = ref(0);
  const isLogginPage = ref(true);
  return { localDeaths, aretheyintheleaderboardview, isLogginPage };
});
