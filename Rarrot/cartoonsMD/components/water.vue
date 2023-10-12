/**
 * 水波荡漾效果
 */

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import WaterRipple from "./waterRipple";
import waterBg from "../images/mountain.jpg";

let canvasWidth = 600;
let canvasHeight = 600;
let timer: number | null = null;
let waterRipple: WaterRipple | null = null;

const boxRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  if (boxRef.value && canvasRef.value) {
    const { offsetWidth, offsetHeight } = boxRef.value;
    canvasWidth = offsetWidth;
    canvasHeight = offsetHeight;
    canvasRef.value.width = canvasWidth;
    canvasRef.value.height = canvasHeight;

    const waterImg = new Image();
    waterImg.src = waterBg;
    waterRipple = new WaterRipple({
      canvas: canvasRef.value,
      background: waterImg,
      boxRef,
    });

    waterRipple.animate();

    timer = window.setInterval(() => {
      const x = Math.floor(canvasWidth * Math.random());
      const y = Math.floor(canvasHeight * Math.random());
      waterRipple?.ripple(x, y);
    }, 1000);

    waterRipple.addMousemove();
  }
})

onUnmounted(() => {
  timer && clearInterval(timer);
  waterRipple?.stop();
})
</script>


<template>
  <div :style="{
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex'
  }" ref="boxRef">
    <canvas ref="canvasRef">
    </canvas>
  </div>
  <!-- <iframe src="https://codepen.io/Dillo/pen/qBLJYOO"
            style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Vue Example1"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
        <iframe allowfullscreen="true" allowpaymentrequest="true" allowtransparency="true" class="cp_embed_iframe "
            frameborder="0" height="483.28997802734375" width="100%" name="cp_embed_1" scrolling="no"
            src="https://codepen.io/michellebarker/embed/vYzqaNO?height=483.28997802734375&amp;default-tab=result&amp;slug-hash=vYzqaNO&amp;user=michellebarker&amp;name=cp_embed_1"
            style="width: 100%; overflow:hidden; display:block;" title="CodePen Embed" loading="lazy"
            id="cp_embed_vYzqaNO"></iframe> -->
</template>