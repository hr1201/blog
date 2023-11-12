<template>
    <div class="card">
        <header>
            <div>
                标题
            </div>
            <div>
                副标题
            </div>
        </header>
        <section>
            <div>
                内容
                <recursionInput :data="data"></recursionInput>
            </div>
        </section>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import recursionInput from './recursionInput.vue'
interface cardType {
    index: string,
    checked: boolean,
    children?: cardType[]
}

const data = reactive<cardType[]>([
    {
        index: '1-1',
        checked: false,
        children: [
            {
                index: '1-1-1',
                checked: false,
            },
            {
                index: '1-1-2',
                checked: false,
            },
        ]
    },
    {
        index: '1-2',
        checked: false,
    },
    {
        index: '1-3',
        checked: false,
        children: [
            {
                index: '1-3-1',
                checked: false,
            },
            {
                index: '1-3-2',
                checked: false,
                children: [
                    {
                        index: '1-3-2-1',
                        checked: false,
                    },
                    {
                        index: '1-3-2-2',
                        checked: false,
                    },
                ]
            },
        ]
    },
    {
        index: '1-4',
        checked: false,
    },
])

</script>
<style lang="less" scoped>
@border: #000;

.card {
    border: 1px solid @border;
    width: 400px;

    header {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        border-bottom: 1px solid @border;
    }

    section {
        padding: 5px;
        min-height: 300px;
    }
}
</style>