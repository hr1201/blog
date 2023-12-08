<template>
  <a v-if="link" class="r-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box">
      <div class="box-header">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img v-lazy="icon" :src="icon" :alt="title + 'R'" onerror="this.parentElement.style.display='none'" />
        </div>
        <!-- 此title用于适配algolia -->
        <h5 v-if="title" :id="formatTitle" class="title">{{ title }}</h5>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Directive } from 'vue';
import { NavLinkType } from './type'
import { slugify } from '@mdit-vue/shared'

const props = defineProps<{
  icon?: NavLinkType['icon']
  title?: NavLinkType['title']
  desc?: NavLinkType['desc']
  link: NavLinkType['link']
}>()

// 适配algolia爬虫
const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') {
    // console.log('svg'+props.icon.svg);
    return props.icon.svg
  }
  return ''
})

// 自定义懒加载指令
let vLazy: Directive<HTMLImageElement, string> = async (el, bingding) => {
  // console.log(el)
  const defaultImg = await import('/header.jpg')
  el.src = defaultImg.default
  // console.log(bingding.value)
  // 使用js提供的api对可视化界面内的元素进行监控s
  const obServe = new IntersectionObserver(
    (entries) => {
      // console.log(entries)
      // 通过判断intersectionRatio，可以知道元素是否显示在页面上，然后进行加载
      if (entries[0].intersectionRatio > 0) {
        setTimeout(() => {
          el.src = bingding.value
        }, 0)
        // 在判断完之后就可以进行取消监听
        obServe.unobserve(el)
      }
    },
    {
      rootMargin: '0px',
      threshold: 0.000001,
    }
  )
  // 将el传入obServe中进行监听
  obServe.observe(el)
}
</script>

<style lang="less" scoped>
.r-nav-link {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--vp-c-bg-soft);
  }

  .box {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 100%;
    color: var(--vp-c-text-1);

    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 6px;
    width: 48px;
    height: 48px;
    font-size: 24px;
    background-color: var(--vp-c-mute);
    transition: background-color 0.25s;

    :deep(svg) {
      width: 24px;
      fill: currentColor;
    }

    :deep(img) {
      border-radius: 4px;
      width: 24px;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: 10px 0 0;
    line-height: 20px;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 960px) {
  .r-nav-link {
    .box {
      padding: 8px;
    }

    .icon {
      width: 40px;
      height: 40px;
    }

    .title {
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>