<template>
    <p align="right">
        <img class="inverted-image" alt="0" src="https://profile-counter.glitch.me/rorrot.cc/count.svg" />
    </p>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
</script>
<style scoped>
.inverted-image {
    filter: invert(var(--vp-inverted-image-filter));
    width: 145px;
    height: 20px;
}


</style>