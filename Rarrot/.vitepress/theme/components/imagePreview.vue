<template>
    <!-- infinite是否可以无限循环预览 -->
    <!-- hide-on-click-modal当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview -->
    <ElImageViewer v-if="show" :infinite="false" hide-on-click-modal teleported :url-list="previewImageInfo.list"
        :initial-index="previewImageInfo.idx" @close="show = false" />
</template>
<script setup lang="ts">
import { ElImageViewer } from 'element-plus'
import 'element-plus/dist/index.css'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vitepress'
const route = useRoute();

const show = ref(false)
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>(
    {
        url: '',
        list: [],
        idx: 0
    }
)

function previewImage(e: Event) {
    const target = e.target as HTMLElement
    const currentTarget = e.currentTarget as HTMLElement
    if (route.path.includes('cartoonsMD')||route.path.includes('navigate')) {
        show.value = false
    } else if (target.tagName.toLowerCase() === 'img') {
        const imgs = currentTarget.querySelectorAll<HTMLImageElement>(
            '.content-container .main img'
        )
        const idx = Array.from(imgs).findIndex(el => el === target)
        const urls = Array.from(imgs).map(el => el.src)

        const url = target.getAttribute('src')
        previewImageInfo.url = url!
        previewImageInfo.list = urls
        previewImageInfo.idx = idx

        // 兼容点击main之外的图片
        if (idx === -1 && url) {
            previewImageInfo.list.push(url)
            previewImageInfo.idx = previewImageInfo.list.length - 1
        }
        show.value = true
    }
}
onMounted(() => {
    const docDomContainer = document.querySelector('#VPContent')
    docDomContainer?.addEventListener('click', previewImage)
})

onUnmounted(() => {
    const docDomContainer = document.querySelector('#VPContent')
    docDomContainer?.removeEventListener('click', previewImage)
})
</script>
