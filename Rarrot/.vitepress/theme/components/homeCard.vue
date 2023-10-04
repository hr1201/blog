<template>
    <div class="home-position">
        <div class="home" v-cloak>
            <div class="cartoon-block">
                <div class="cartoon-title">🐇动画demo</div>
            </div>

            <div class="blocks-position">
                <div class="blocks" v-for="(cartoon, index) in cartoons" :key="index">
                    <!-- 当鼠标悬停时，会进行抖动 -->
                    <div class="blocks-img">
                        <GifImage :gifSrc="cartoon.gif" :placeholderSrc="cartoon.ahref" class="imgGif" />
                    </div>
                    <div class="blocks-text">
                        <p style="font-size:15px;color:#3e52e0;">{{ cartoon.introduce }}</p>
                        <p>{{ cartoon.context }}</p>
                        <div class="blocks-url">
                            <a :href="cartoon.ahref">Visit</a>
                            <!-- github图标 -->
                            <a :href="cartoon.svghref" target="_blank">
                                <svg class="github" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title>GitHub</title>
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue';
import GifImage from './GifImage.vue';

interface cartoonIn {
    gif: string,
    img: string,
    introduce: string,
    context:string,
    ahref: string,
    svghref: string,
}

const cartoons: cartoonIn[] = [
    {
        gif: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012037788.png',
        img: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012037788.png',
        introduce: 'welcome',
        context:'欢迎来到Rarrot的动画库',
        ahref: '/cartoonsMD/O.o欢迎.html',
        svghref: 'https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/欢迎.vue'
    },
    {
        gif: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/cat.gif',
        img: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011758438.png',
        introduce: 'welcome',
        context:'01彩虹猫',
        ahref: '/cartoonsMD/彩虹猫.html',
        svghref: 'https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/彩虹猫.vue'
    },
    {
        gif: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011800704.png',
        img: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310011800704.png',
        introduce: 'welcome',
        context:'文字雨',
        ahref: '/cartoonsMD/文字雨.html',
        svghref: 'https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/文字雨.vue'
    },
    {
        gif: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/GIF%202023-10-1%2020-20-41.gif',
        img: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202310012023351.png',
        introduce: 'welcome',
        context:'ikun篮球',
        ahref: '/cartoonsMD/篮球.html',
        svghref: 'https://github.com/hr1201/blog/blob/main/Rarrot/.vitepress/theme/components/cartoons/ikun.vue'
    }
]

</script>
<style scoped lang="less">
/* v-if闪烁问题 */
[v-cloak] {
    display: none !important;
}

/* 小于960px会增加return-top那一栏并且不会透明 */
// @media (max-width: 960px) {
//     .home {
//         // height: calc(100vh - var(--vp-nav-height) - 47px);
//     }
// }

.cartoon-block {
    margin-top: 40px;
    padding: 40px;
}

@media (max-width: 960px) {
    .cartoon-block {
        padding: 10px;
    }
}

.cartoon-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
}

.blocks-position {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    // background-color: #dee9ee;
    .blocks {
        width: 35%;
        height: 20%;
        border: 1px solid #000000;
        margin-right: 7%;
        margin-bottom: 35px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        // 3px 3px表示阴影在水平和垂直方向上的偏移量，5px表示阴影的模糊半径
        box-shadow: 8px 8px 3px rgb(0, 0, 0);

        .blocks-img {
            margin: 15px;
            display: flex;
            align-items: center;
            overflow: hidden;
            // 添加此行以裁剪放大的图像
            border-radius: 10px;

            // background-color: #191919;
            // 将圆角应用于容器 
            // 将img藏匿于底部，使其悬停扩大的时候看起来是内部扩大
            .imgGif {
                width: 100%;
                height: 100%;
                transition: transform 0.2s;
            }

            .imgGif:hover {
                transform: scale(1.05);
            }
        }


        .blocks-text {
            margin: 15px;

            p {
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: 700;
            }

            .blocks-url {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                a {
                    display: flex;
                }

                .github {
                    display: flex;
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }
            }
        }
    }
}


/* 小于960px会增加return-top那一栏并且不会透明 */
@media (max-width: 740px) {
    .blocks-position .blocks {
        width: 80%;
        margin: auto;
        margin-bottom: 35px;

    }
}
</style>
