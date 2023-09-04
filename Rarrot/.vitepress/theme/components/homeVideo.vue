<template>
    <section class="videos">
        <video class="video-slide" src="./images/mountain3.mp4" autoplay muted loop></video>
        <div class="content">
            <h1>个人博客网站<br><span>Rarrot</span></h1>
            <p>去成为你想成为的人，什么时候都可以开始；去做你想做的事，任何方向都值得努力。追梦路上，没有不受重力的飞翔。吝惜汗水和能量，哪一条路都是弯路；朝着目标努力前进，整个世界都会为你让路。以后那么长，不是想出来的，是过出来的。
            </p>
            <a href="#">我的博客</a>
        </div>
        <div class="social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
        <!-- <div class="slider-navigation">
            <div class="nav-btn"></div>
            <div class="nav-btn"></div>
            <div class="nav-btn"></div>
            <div class="nav-btn"></div>
            <div class="nav-btn"></div>
        </div> -->
    </section>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
</script>
<style lang='less' scoped>
// body{
//     background: fixed;
// }
section {
    margin: 0;
    padding: 0;
    padding: 100px 200px;
}

.videos {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #80834a;

    .content {
        z-index: 17;
        color: #fff;
        width: 75%;
        margin-top: 50px;

        h1 {
            font-size: 4em;
            font-weight: 900;
            line-height: 75px;
            margin-bottom: 40px;

            span {
                font-size: 1.2em;
                font-weight: 600;
            }
        }

        p {
            margin-bottom: 65px;
        }

        a {
            background: #fff;
            padding: 15px 35px;
            color: #2c2e10;
            font-size: 1.1em;
            font-weight: 500;
            text-decoration: none;
            border-radius: 2px;
        }

    }

    .social {
        z-index: 17;
        position: absolute;
        right: 30px;
        display: flex;
        flex-direction: column;
        transition: 0.5s ease;

        a {
            color: #fff;
            font-size: 1.6em;
        }

        a:not(:last-child) {
            margin-bottom: 20px;
        }

        a:hover {
            transform: scale(1.3);
        }
    }

    video {
        z-index: 000;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .slider-navigation {
        z-index: 17;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(80px);
        margin-bottom: 12px;

        .nav-btn {
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
            transition: 0.3sd ease;
        }

        .nav-btn:not(:last-child) {
            margin-right: 20px;
        }

        .nav-btn:hover {
            transform: scale(1.2);
        }

        // 点击变颜色
        .nav-btn:hover {
            background: #747140;
        }
    }
}

.videos:before {
    z-index: 15;
    content: '';
    position: absolute;
    background: rgba(37, 21, 4, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

}

@media (max-width:1040px) {
    section {
        padding: 100px 20px;
    }

    .videos .social {
        right: 15px;
    }
}

@media (max-width:640px) {
    .videos .content h1 {
        font-size: 3em;
    }
}

@media (max-width:460px) {
    .videos .content h1 {
        font-size: 2em;
        line-height: 55px;
        margin-bottom: 10px;
    }

    .videos .content a {
        padding: 12px 30px;
    }
}
</style>