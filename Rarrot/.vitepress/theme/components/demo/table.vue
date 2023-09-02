<template>
    <div style="margin-left: 15px;">
        <div style="margin-bottom: 30px;">
            <input type="text" placeholder="搜索" v-model="searchText">
        </div>
        <table class="gridtable" width="100%">
            <thead>
                <tr>
                    <th width="21%">动物名称</th>
                    <th width="21%">动物单价</th>
                    <th width="21%">动物数量</th>
                    <th width="17%">动物总价</th>
                    <th width="20%">操作</th>
                </tr>
            </thead>
            <tbody align="center">
                <tr v-for="(item, index) in searchDatas" v-bind:key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>
                        <button @click="item.num > 1 ? item.num-- : item.num">⛔</button>
                        {{ item.num }}
                        <button @click="item.num++">➕</button>
                    </td>
                    <td>{{ item.price * item.num }}</td>
                    <td>
                        <button class="btn" @click="deleteItem(index)">删除</button>&nbsp;
                    </td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="名称" v-model="nameTemp"></td>
                    <td><input type="text" placeholder="价格" v-model="priceTemp"></td>
                    <td>
                        <button @click="numTemp > 1 ? numTemp-- : numTemp">⛔</button>
                        {{ numTemp }}
                        <button @click="numTemp++">➕</button>
                    </td>
                    <td>嘻嘻</td>
                    <td>
                        <button class="btn" @click="addItem">增加</button>

                    </td>
                </tr>
            </tbody>
            <tfoot>
                <td colspan="5" align="right">总价：{{ total }}</td>
            </tfoot>

        </table>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'

interface Data {
    name: string,
    price: number,
    num: number,
}

const items: Data[] = reactive([
    {
        name: '鸡鸡',
        price: 66,
        num: 1,
    },
    {
        name: '鸭鸭',
        price: 36,
        num: 1,
    },
    {
        name: '鹅鹅',
        price: 80,
        num: 1,
    },
])

// 计算总价
const total = computed(() => {
    return items.reduce((prev: number, next: Data) => {
        return prev + next.num * next.price
    }, 0)
})

// 删除
const deleteItem = (index: any) => {
    items.splice(index, 1)
}

// 搜索，如果不使用computed的话就需要每次都调用一次这个函数，使其进行更新
const searchText = ref<string>('')
const searchDatas = computed(() => {
    return items.filter((value) => {
        return value.name.includes(searchText.value)
    })
})

// 增加
let nameTemp: string
let priceTemp: number|undefined
let numTemp = ref<Data['num']>(0)
const addItem = () => {
    if (nameTemp != '' && priceTemp!=undefined &&priceTemp > 0 && numTemp.value > 0) {
        let temps: Data = {
            name: nameTemp,
            price: priceTemp,
            num: numTemp.value
        }
        items.push(temps)
        nameTemp = '',
        priceTemp = undefined,
        numTemp.value = 0
    } else {
        alert('请检查是否输入完整，以及价格、数量是否大于0')
    }
}
</script>
<style scoped>
table.gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 15px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
}

table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #89dcff;
}

table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #89dcff;
    background-color: #ffffff;
}

input{
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: 3px;
    padding: 8px 14px;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
}

input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.btn,
.btn:focus {
    position: relative;
    min-width: 30%;
    background: transparent;
    color: #2da8e1;
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    box-sizing: inherit;
    padding: 8px 14px;
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(45, 183, 225, 0);
    outline: 1px solid !important;
    outline-color: rgba(45, 183, 225, 0.5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
}
.btn:hover {
    color: #28c2ec;
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(45, 189, 225, 0.5), 0 0 20px rgba(45, 213, 225, 0.2);
    outline: 1px solid !important;
    outline-color: rgba(45, 183, 225, 0) !important;
    outline-offset: 15px;
    text-shadow: 1px 1px 2px #89dcff;
}
</style>