<template>
    <div class="ra-block">
        Block
        <div class="ra-block__element">
            Element
        </div>
        <div class="ra-block--modifier">
            Modifier
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style lang="less" scoped>
.ra-block {
  color: red;

  &__element {
    color: blue;
  };

  &--modifier{
    color: green;
  }
}
</style>