<template>
  <div class="qte" @click="stop">
    <p>
      click when the meter is <span class="num">{{ target }}%</span> full
    </p>
    <div class="bars">
      <div class="indicator">
        <span class="bar" :style="{ width: target - 2 + '%' }"></span>
        <span class="bar good" :style="{ width: 4 + '%'}"></span>
        <span class="bar" :style="{ width: 100 - (target + 2) + '%' }"></span>
      </div>
      <span class="bar active" :style="{ width: progress + '%', backgroundColor: (color?'yellow':'magenta') }">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
const emit = defineEmits(["win", "lose"]);
const progress = ref(0);
const target = ref(0);
let timer: NodeJS.Timeout | undefined;
onMounted(() => {
  const speed = Math.ceil(Math.random() * 11) + 39;
  let speeded = Math.random() * 0.1 + 0.2;
  target.value = Math.ceil(Math.random() * 71) + 19;
  // target.value = 90;
  timer = setInterval(async () => {
    // if (Math.abs(progress.value - target.value) <= 3) return;
    // if (Math.abs(progress.value - target.value) <= 3 && progress.value - target.value+speeded/10 > 3) return;
    progress.value += speeded/10;
    speeded *= 1.0065;
    if (progress.value > 100) {
      await stop();
      return;
    }
  }, speed/100);
});

import { nextTick } from "vue";
const color = ref(false)
const message=ref("")
async function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = undefined;
  // be secretly nice to the player
  await nextTick();
  const off = Math.abs(progress.value - target.value);
  if (off < 3 && off > 2) progress.value = (progress.value-target.value > 0) ? target.value+2 : target.value-2;
  const status= off <= 3;
  message.value=status ? "you did it!!!" : "YOU FAILED!!!";
  let count = 0;
  setInterval(()=>{
    color.value = !color.value;
    count++;
    if (count > 7) emit(status ? "win" : "lose");
  }, 100)
}
</script>

<style scoped>
.qte {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
}

.bar {
  display: block;
  height: 20px;
  background-color: red;
}

.bars {
  width: 100vw;
}

.bar.good {
  background-color: green;
  z-index: 9999;
}

.bar.active {
  z-index: 99999;
  text-align: right;
}

.bar.background {
  width: 100%;
  background-color: lightgray;
}

.indicator {
  display: flex;
  flex-direction: row;
  height: 10px;
}

.num {
  font-size: 60px !important;
}
</style>
