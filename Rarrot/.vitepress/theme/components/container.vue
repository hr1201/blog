<template>
      <div class="comments">
        <Giscus
			v-if="showComment"
			:is="'script'"
			:key="title.value"
			repo= "hr1201/gitalk-evalute"
			repo-id= "R_kgDOJ9WSwA"
			category= "Announcements"
			category-id="DIC_kwDOJ9WSwM4CYA7u"
			mapping="pathname"
			strict="0"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="bottom"
			:theme="isDark ? 'transparent_dark' : 'light'"
			lang="zh-CN"
			loading="lazy"
        />
      </div>
</template>

<script lang="ts" setup>
import { useData,useRoute } from 'vitepress'
import Giscus from '@giscus/vue'
import { ref, watch } from "vue";

const { isDark,title } = useData()
const route = useRoute();

const showComment = ref(true);
watch(
	() => route.path,
	() => {
		showComment.value = false;
		if(route.path.includes('cartoonsMD')||route.path.includes('navigate')){
			showComment.value=false
		}else{
			setTimeout(() => {
				showComment.value = true;
			}, 50);
		}	
	},
	{
		immediate: true,
	}
);
</script>

<style scoped>
.comments {
	padding: 20px 0;
	border-radius: 10px;
	margin: 15px 0;
	padding: 10px 13px 0px 13px;
}
</style>
