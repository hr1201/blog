<template>
    <div data-v-4c14007d="" data-v-6c3cc378="" class="VPHero has-image VPHomeHero">
        <div data-v-4c14007d="" class="container">
            <div data-v-4c14007d="" class="main">
                <h1 data-v-4c14007d="" class="name"><span data-v-4c14007d="" class="clip">Rarrot</span></h1>
                <p data-v-4c14007d="" class="text">个人博客网站</p><!--v-if-->
                <div data-v-4c14007d="" class="actions">
                    <div data-v-4c14007d="" class="action"><a data-v-733930f1="" data-v-4c14007d=""
                            class="VPButton medium brand"
                            href="/articles/JavaScript/0认识JavaScript.html">我的博客</a></div>
                    <div data-v-4c14007d="" class="action"><a data-v-733930f1="" data-v-4c14007d=""
                            class="VPButton medium alt" href="/articles/hello.html">示例</a></div>
                </div>
            </div>
            <div data-v-4c14007d="" class="image">
                <div data-v-4c14007d="" class="image-container">
                    <div data-v-4c14007d="" class="image-bg"></div><img data-v-07c0f888="" class="VPImage image-src"
                        src="https://cdn.staticaly.com/gh/hr1201/img@main/imgs/white-cloud.png" alt="Rarrot">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, reactive } from 'vue'
export default {
    name: 'HomeDefaultTheme',

}
</script>
<style lang="less" scoped>
.defaults {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .imgs {
        margin: 0 auto;

        .image-src {}

        // .image-src {
        // }
    }

    .image-src {
        max-width: 192px;
        max-height: 192px;
    }

    .texts {
        margin: 0 auto;

        .name {
            font-size: px;

        }

        p {}
    }

    .btns {
        margin: 0 auto;

        button {}
    }

    @media (min-width: 640px) {
        .image-src {
            max-width: 256px;
            max-height: 256px;
        }
    }
}</style>