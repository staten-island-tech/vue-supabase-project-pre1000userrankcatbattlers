import { defineStore } from "pinia";
import { supabase } from "../../utils/supabase";
import { ref, type Ref } from "vue";


export const useUserStore = defineStore("user", () => {
  const localDeaths = ref(0)
  console.log(localDeaths)
  return { localDeaths }
  
  //start session start counting deaths

  

  //supabase.from("profiles").update({username:username.value}).eq("id", data.user.id)
});
