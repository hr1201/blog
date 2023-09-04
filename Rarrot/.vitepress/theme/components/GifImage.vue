<template>
    <div class="blocks-imgs">
        <img v-show="!showPlaceholder" ref="gifImage" :src="gifSrc" alt="cartoon-img" @load="onGifLoad" class="gif-image" />
        <img v-show="showPlaceholder" :src="placeholderSrc" alt="placeholder-img" class="placeholder-image" />

    </div>
</template>
  
<script>
export default {
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
    data() {
        return {
            showPlaceholder: true,
        };
    },
    methods: {
        onGifLoad() {
            this.showPlaceholder = false;

        },
    },
};
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
  