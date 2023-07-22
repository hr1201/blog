<template>
    <div id="wrapper">
        <header id="header">
            <h1>Jquery视差滚动示例-世界航空航天史</h1>
        </header>

        <!-- 气球、风景图片层 -->
        <div id="parallax_area1">

        </div>
        <!-- 云层1 -->
        <div id="parallax_area2">
            <img class="parallax_img p2_1" :src="cloudimg[0]" width="488" height="138" alt="cloud" />
            <img class="parallax_img p2_2" :src="cloudimg[2]" width="488" height="138" alt="cloud" />
            <img class="parallax_img p2_3" :src="cloudimg[4]" width="488" height="138" alt="cloud" />
            <img class="parallax_img p2_4" :src="cloudimg[3]" width="488" height="138" alt="cloud" />
            <img class="parallax_img p2_5" :src="cloudimg[1]" width="488" height="138" alt="cloud" />
        </div>
        <!-- 云层2 -->
        <div id="parallax_area3">
            <img class="parallax_img p3_1" :src="cloudimg[4]" width="311" height="105"
                alt="Montgolfier hot air balloon" />
            <img class="parallax_img p3_2" :src="cloudimg[1]" width="311" height="105"
                alt="Frameless parachute" />
            <img class="parallax_img p3_3" :src="cloudimg[4]" width="311" height="105"
                alt="Blanchard's air balloon" />
            <img class="parallax_img p3_4" :src="cloudimg[0]" width="311" height="105"
                alt="Landscape with trees and cows" />
        </div>
    </div>
</template>
<script>
import { onMounted, onBeforeUnmount } from 'vue';

// 配置对象
const Counter = {
    data() {
        return {
            title: "Rarrot的网站",
            cloudimg: [
                'https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide3.png',
                'https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud.png',
                'https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide(2).png',
                'https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide.png',
                'https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud--wide2.png',
            ]
        };
    },
    setup() {
        const handleScroll = function () {
            var scrolled = window.scrollY || document.documentElement.scrollTop;
            document.getElementById('parallax_area1').style.top = (0 - scrolled * 0.75) + 'px';
            document.getElementById('parallax_area2').style.top = (0 - scrolled * 0.5) + 'px';
            document.getElementById('parallax_area3').style.top = (0 - scrolled * 0.25) + 'px';
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll);
        });
    },
};
export default Counter;

</script>
  
<style>
@import './homeBackground.css';
</style>