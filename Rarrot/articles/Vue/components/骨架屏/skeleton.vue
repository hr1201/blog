<template>
    <div class="sync">
        <div class="sync-content">
            <div class="img"></div>
            <div class="name"></div>
        </div>
        <hr style="width:100%;margin-left: 0;" >
        <div class="sync-img"></div>
        <div class="sync-pop"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
</script>
<style lang="less" scoped>
.sync {
    display: flex;
    flex-direction:column;
    // align-items: center;
    justify-content: center;
    margin: 20px 0;
    background-color: #ffffff;

    .sync-content {
        display: flex;
        align-items: center;

        .img {
            width: 40px;
            height: 40px;
            border-radius: 50px;
            background-color: #cdcbcd;
        }
        .name {
            width: 50px;
            height: 12px;
            margin-left: 5px;
            background-color: #cdcbcd;
        }
    }

    .sync-img {
        height: 12px;
        background-color: #cdcbcd;
        margin: 10px 0;
    }
    .sync-pop{
        height: 12px;
        background-color: #cdcbcd;
    }

}
</style>