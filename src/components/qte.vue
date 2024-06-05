<template>
  <div class="qte" @click="stop">
    <p>
      click when the meter is <span class="num">{{ target }}%</span> full
    </p>
    <div class="bars">
      <div class="indicator">
        <span class="bar" :style="{ width: target - 2 + '%' }"></span>
        <span class="bar good" :style="{ width: 4 + '%' }"></span>
        <span class="bar" :style="{ width: 100 - (target + 2) + '%' }"></span>
      </div>
      <span class="bar active" :style="{ width: progress + '%' }"></span>
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
  const speed = Math.ceil(Math.random() * 36) + 24;
  let speeded = Math.random() * 0.2 + 0.1;
  target.value = Math.ceil(Math.random() * 71) + 19;
  timer = setInterval(() => {
    progress.value += speeded;
    speeded *= 1.01;
    if (progress.value > 100) {
      emit("lose");
      return;
    }
  }, speed / 10);
});

function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = undefined;
  const off = Math.abs(progress.value - target.value);
  emit(off <= 3 ? "win" : "lose");
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

.bar.active {
  background-color: magenta;
  z-index: 99999;
}

.bar.good {
  background-color: green;
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
