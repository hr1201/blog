<template>
    <div class="blocks-imgs">
        <img v-show="!showPlaceholder" ref="gifImage" :src="gifSrc" alt="cartoon-img" @load="onGifLoad" class="gif-image" />
        <img v-show="showPlaceholder" :src="placeholderSrc" alt="placeholder-img" class="placeholder-image" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        gifSrc: {
            type: String,
            required: true,
        },
        placeholderSrc: {
            type: String,
            required: true,
        },
    },
    setup() {
        const showPlaceholder = ref(true);

        function onGifLoad() {
            showPlaceholder.value = false;
        }

        return {
            showPlaceholder,
            onGifLoad,
        };
    },
});
</script>

<style scoped>
.blocks-imgs {
    position: relative;
    display: inline-block;
}

.gif-image {
    display: block;
    width: 100%;
    height: 100%;
}

.placeholder-image {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
  