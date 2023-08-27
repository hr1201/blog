<template>
    <div class="home-position">
        <div class="home" v-cloak>
            <div class="cartoon-block">
                <div class="cartoon-title">🐇动画demo</div>
            </div>

            <div class="blocks">
                <div class="custom-class"></div>
                <!-- 当鼠标悬停时，会进行抖动 -->
                <div class="blocks-img">
                    <img src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/202308241052495.png" alt="cartoon-img">
                </div>
                <div class="blocks-text">
                    <p style="font-size:15px;color:#3e52e0;">welcome</p>
                    <p>欢迎来到Rarrot的动画库</p>
                    <div class="blocks-url">
                        <a href="https://www.rorrot.cc/cartoonsMD/O.o%E6%AC%A2%E8%BF%8E.html">Visit</a>
                        <!-- github图标 -->
                        <svg class="github" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>GitHub</title>
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
console.log()
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
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}

.blocks {
    width: 35%;
    // height: 20%;
    border: 1px solid #000000;
    margin-left: 64px;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    // 3px 3px表示阴影在水平和垂直方向上的偏移量，5px表示阴影的模糊半径
    box-shadow: 8px 8px 3px rgb(0, 0, 0);

    .blocks-img {
        margin: 15px;
        display: flex;
        align-items: center;
        overflow: hidden;
        // 添加此行以裁剪放大的图像
        border-radius: 10px;
        // 将圆角应用于容器 
        // 将img藏匿于底部，使其悬停扩大的时候看起来是内部扩大
        img {
            width: 100%;
            height: 100%;
            transition: transform 0.2s;
        }

        img:hover {
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

/* 小于960px会增加return-top那一栏并且不会透明 */
@media (max-width: 740px) {
    .blocks {
        width: 80%;
        margin: auto;
    }
}
</style>
