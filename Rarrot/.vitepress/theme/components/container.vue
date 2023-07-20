<template>
    <div id="gitalk-container"></div>
</template>
  
<script setup>
import { onMounted } from 'vue'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

// 了解更多 👉 https://github.com/gitalk/gitalk/
// clientID & clientSecret 👉 https://github.com/settings/applications/new

onMounted(() => {
    const commentConfig = {
        enable: true,
        clientID: 'c0a42713b9ff073bbdf0', //clientID 
        clientSecret: '040960c4d1d7390c7f30fa2fbba178577d9fcb09', //clientSecret
        repo: 'gitalk-evalute', // 评论仓库名
        owner: 'hr1201',
        admin: ['hr1201'], //管理人
        githubID: 'hr1201',
        id: decodeURI(window.location.pathname), // 返回当前 URL 的路径部分作为id
        language: 'zh-CN', //语言
        distractionFreeMode: false  // 无干扰模式
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render('gitalk-container')
})
</script>