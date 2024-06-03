import { defineStore } from "pinia";
import { supabase } from "../../utils/supabase";
import { UserResponse } from "@supabase/supabase-js";
import { ref, type Ref } from "vue";

export const userSessionStore = defineStore("user", async () => {
  const { data, error } = await supabase.auth.getUser();
  let loggedvalue: boolean = false;
  if (data === null) {
    loggedvalue = false;
  } else {
    loggedvalue = true;
  }
  return loggedvalue;
});
