<template>
    <div class="inp-form">
        <input class="inp" name="text" :required="true" type="text" placeholder="打开F12,进行输入测试">
        <span class="inp-border"></span>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style scoped>
.inp-form {
    --width-of-inp: 200px;
    --border-height: 1px;
    --border-before-color: rgba(252, 215, 53, 0.39);
    --border-after-color: #fdd835;
    --inp-hovered-color: #f8f2d84b;
    position: relative;
    width: var(--width-of-inp);
    margin-top: 20px;
}

.inp {
    color: var(--vp-c-text-1);
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
}

.inp-border {
    position: absolute;
    background: var(--border-after-color);
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: 0.3s;
}

.inp:hover {
    background: var(--inp-hovered-color);
}

.inp:focus {
    outline: none;
}

.inp:focus~.inp-border {
    width: 100%;
}
</style>