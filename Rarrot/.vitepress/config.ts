import { defineConfig } from "vitepress";
// import sidebarAuto from './sidebarAuto'
// 用于生成sitemap
import { createContentLoader } from "vitepress";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { nav } from "./configs/nav";
import { sidebar } from "./configs/sidebar";
import { FileHMR } from "./configs/watchfiles";
import { withPwa } from "@vite-pwa/vitepress";

interface Link {
  url: string;
  lastmod: number | undefined;
}

const links: Link[] = [];

export default withPwa(
  defineConfig({
    title: "Rarrot",
    description: "Rarrot的个人博客网站",
    head: [
      ["link", { rel: "icon", href: "/favicon.ico" }],
      [
        "meta",
        { name: "baidu-site-verification", content: "codeva-90hqhBZdbA" },
      ],
    ],
    lastUpdated: true,
    // cleanUrls: true,

    markdown: {
      lineNumbers: true,
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
      // theme: 'one-dark-pro',
      math: true,
    },

    // 用于生成sitemap
    transformHtml: (_, id, { pageData }) => {
      if (!/[\\/]404\.html$/.test(id)) {
        links.push({
          url: pageData.relativePath
            .replace(/\/index\.md$/, "/")
            .replace(/\.md$/, ".html"),
          lastmod: pageData.lastUpdated,
        });
      }
    },
    buildEnd: async ({ outDir }) => {
      const sitemap = new SitemapStream({
        hostname: "https://www.rorrot.cc/",
      });
      const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
      sitemap.pipe(writeStream);
      links.forEach((link) => sitemap.write(link));
      sitemap.end();
      await new Promise((r) => writeStream.on("finish", r));
    },

    themeConfig: {
      // logo: {
      //   light: '/logo-light.svg',
      //   dark: '/logo-dark.svg',
      // },
      logo: "https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230508210154.jpg",

      // https://vitepress.dev/reference/default-theme-config
      footer: {
        message: "Released under the MIT License.",
        copyright: `Copyright © 2023.4-${new Date().getFullYear()}.${
          new Date().getMonth() + 1
        }`,
      },
      algolia: {
        appId: "A5NVAQQUEO",
        apiKey: "fa9cdd39aee827af75ca9ead469cec1b",
        indexName: "rorrot",
      },

      lastUpdatedText: "更新日期",
      docFooter: {
        prev: "上一页",
        next: "下一页",
      },
      darkModeSwitchLabel: "主题",
      outline: [2, 3],
      outlineTitle: "本页目录",
      sidebarMenuLabel: "目录",
      returnToTopLabel: "回到顶部",
      editLink: {
        pattern:
          "https://github.com/hr1201/hr1201.github.io/blob/main/Rarrot/:path",
        text: "在GitHub编辑此页",
      },
      socialLinks: [
        { icon: "discord", link: "https://discord.gg/Bad7NNcr" },
        { icon: "github", link: "https://github.com/hr1201" },
        { icon: "twitter", link: "https://twitter.com/hungrng75647520" },
        // 自定义社交连接
        // {
        //  icon: {
        //   svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        //  },
        //  link: "...",
        // },
      ],
      nav: nav,
      sidebar: sidebar,
    },
    vite: {
      plugins: [FileHMR()],
    },
    pwa: {
      outDir: ".vitepress/dist", // 输出目录
      registerType: "autoUpdate", // 注册类型为自动更新
      includeManifestIcons: false, // 不包含清单图标
      manifest: {
        id: "/", // 清单 ID
        name: 'Rarrot_blog', // 应用名称
        short_name: 'blog', // 应用的短名称
        description: '博客', // 应用的描述
        theme_color: "#ffffff", // 主题颜色
        icons: [
          {
            src: "/titleImg.png", // 图标路径
            sizes: "120x120", // 图标尺寸
            type: "image/png", // 图标类型
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
            handler: "CacheFirst", // 缓存优先策略
            options: {
              cacheName: "google-fonts-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
            handler: "CacheFirst", // 缓存优先策略
            options: {
              cacheName: "gstatic-fonts-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
            handler: "NetworkFirst", // 网络优先策略
            options: {
              cacheName: "jsdelivr-images-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
        ],
      },
    },
  })
);
