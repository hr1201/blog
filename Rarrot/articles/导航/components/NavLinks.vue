<template>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
        {{ title }}
        <a class="header-anchor" :href="`#${formatTitle}`">#</a>
    </h2>
    <div class="r-nav-links">
        <NavLink v-for="{ icon, title, desc, link } in items" :key="link" :icon="icon" :title="title"
            :desc="desc" :link="link" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Directive } from 'vue';
import { slugify } from '@mdit-vue/shared'
import NavLink from './NavLink.vue'
import type { NavLinkType } from './type'

const props = defineProps<{
    title: string
    items: NavLinkType[]
}>()

const formatTitle = computed(() => {
    return slugify(props.title)
})
</script>

<style lang="less" scoped>
@r-nav-links-gap: 10px;

.r-nav-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-row-gap: @r-nav-links-gap;
    grid-column-gap: @r-nav-links-gap;
    grid-auto-flow: row dense;
    justify-content: center;
    margin-top: @r-nav-links-gap;

    @media (min-width: 500px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    @media (min-width: 640px) {
        grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    }

    @media (min-width: 960px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (min-width: 1440px) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
}

@media (min-width: 960px) {
    .r-nav-links {
        @r-nav-links-gap: 20px;
        grid-row-gap: @r-nav-links-gap;
        grid-column-gap: @r-nav-links-gap;
    }
}
</style>