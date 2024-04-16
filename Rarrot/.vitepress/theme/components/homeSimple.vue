<template>
  <div class="main">
    <div class="layouts">
      <div class="titles">
        <div class="welcome">
          <p>Welcome to Mr. <br />Rarrot's Blog</p>
        </div>
        <div class="introduce">
          <p>
            快来看看
            <a href="./articles/博客/关于博客建立过程.html"> 《我的博客》 </a>
            吧！
          </p>
          <p>
            前往
            <a href="./articles/导航/navigate.html"> 工具导航 </a>
          </p>
          <p>
            进入
            <a href="./cartoonsMD/O.o欢迎.html"> 动画区 </a>
          </p>
        </div>
      </div>

      <div class="img-container">
        <div class="imgs">
          <img
            src="/titleImg2.png"
            style="transform: rotateY(180deg)"
            alt="titleImg3"
          />
        </div>
        <p class="caption" data-astro-cid-j7pv25f6="">
          <i>
            Illustration by
            <a
              href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6"
              target="_blank"
              class="line"
              rel="noopener"
              data-astro-cid-j7pv25f6=""
            >
              Icons 8
            </a>
            from
            <a
              href="https://icons8.com/illustrations"
              class="line"
              target="_blank"
              rel="noopener"
              data-astro-cid-j7pv25f6=""
              >Ouch!</a
            >
          </i>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  font-family: var(--font-family-serif);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-main);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  .layouts {
    display: flex;
    justify-content: space-between;
    margin: 2em;

    .titles {
      display: flex;
      flex-direction: column;
      width: 60%;
      .welcome {
        font-size: 2.5em;
        font-weight: 700;
        margin: 0.5em 0;
        line-height: 1.3;
        p {
          margin: 1.2em 0;
          font-size: 1.4em;
        }
      }
      .introduce {
        p {
          margin-bottom: 1.2em;
          font-size: 1.4em;
        }
      }
    }
    .img-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40%;
      .imgs {
        display: block;
        min-height: 250px;

        .img {
          aspect-ratio: auto 550 / 466;
          height: auto;
          width: 100%;
          max-width: 550px;
          margin-bottom: 1em;
        }
      }
      .caption {
        line-height: 1.75em;
        margin: 1.2em 0;
        font-size: 0.8em;
        font-style: italic;
        text-align: left;

        .line {
          box-sizing: border-box;
          color: inherit;
          text-decoration: none;
          box-shadow: inset 0 -0.12em 0 var(--primary-color);
          transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        .line:hover {
          transition: color linear 0.15s;
        }
      }
    }
  }
}
</style>
