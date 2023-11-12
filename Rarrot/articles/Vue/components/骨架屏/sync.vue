<template>
    <div class="sync">
        <div class="sync-content">
            <div class="sync-img">
                <img :src="data.url" width="35" height="35">
                <span>{{ data.name }}</span>
            </div>
            <div class="sync-pop">
                <hr>
                <div>{{ data.desc }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { axios } from './router/axios'

interface Data{
    data:{
        name: string,
        url: string,
        desc: string
    }
}

const {data}=await axios.get<Data>('/data2.json')

</script>
<style lang="less" scoped>
.sync {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    background-color: #f2f1f2;

    .sync-content {
        margin: 20px 20px 10px 20px;

        .sync-img {
            display: flex;
            flex-direction: row;
            align-items: center;

            img {
                border-radius: 50px;
            }

            span {
                margin-left: 5px;
            }
        }

    }
}
</style>