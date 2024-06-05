<template>
  <div class="qte">
    <button @click="stop">STOP</button>
    <p>click STOP when the meter is <span class="num">{{ target }}%</span> full</p>
    <div>
      <div class="indicator">
        <span class="bar" :style="{width:target-2+'%'}"></span>
        <span class="bar good" :style="{width:4+'%'}"></span>
        <span class="bar" :style="{width:100-(target+2)+'%'}"></span>
      </div>
      <span class="bar active" :style="{width:progress+'%'}"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,defineEmits } from 'vue';
const emit = defineEmits(['win', 'lose'])
const progress = ref(0);
const target = ref(0);
let timer: NodeJS.Timeout | undefined;
onMounted(() => {
  const speed = Math.ceil(Math.random() * 36) +19;
  target.value = Math.ceil(Math.random() * 21) +14;
  timer = setInterval(() => {
    progress.value++;
    if(progress.value > 100) {
      emit('lose');
      return;
    }
  }, speed)
})

function stop() {
  if (!timer) return;
  clearInterval(timer);
  timer = undefined;
  const off = Math.abs(progress.value-target.value);
  emit(off <= 2 ? 'win' : 'lose')
}
</script>

<style scoped>
.qte {
  display:flex;
  flex-direction:column;
  border:2px solid black;
  background-color:grey;
}

.qte button {
  height:8rem;
  width:100%;
  font-size: large;
}

.bar {
  display:block;
  height:20px;
  background-color:red;
}

.indicator * {
  height:10px;
}

.bar.active {
  background-color:magenta;
  z-index:99999;
}

.bar.good {
  background-color:green;
}

.bar.background {
  width:100%;
  background-color:lightgray;
}

.indicator {
  display:flex;
  flex-direction:row;
}

.num {
  font-size: 60px !important;
}
</style>