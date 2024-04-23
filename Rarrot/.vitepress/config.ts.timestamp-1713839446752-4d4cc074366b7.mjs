// Rarrot/.vitepress/config.ts
import { defineConfig } from "file:///D:/%E7%AC%94%E8%AE%B0/blog/node_modules/.pnpm/vitepress@1.0.0-rc.31_@algolia+client-search@4.19.1_less@4.2.0_markdown-it-mathjax3@4.3.2_sea_ai7hn6gghmarmdicuzynkzmw7y/node_modules/vitepress/dist/node/index.js";
import { SitemapStream } from "file:///D:/%E7%AC%94%E8%AE%B0/blog/node_modules/.pnpm/sitemap@7.1.1/node_modules/sitemap/dist/index.js";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";

// Rarrot/.vitepress/configs/nav.ts
var nav = [
  { text: "\u5BFC\u822A", link: "/articles/\u5BFC\u822A/navigate" },
  { text: "\u535A\u5BA2", link: "/articles/\u535A\u5BA2/\u5173\u4E8E\u535A\u5BA2\u5EFA\u7ACB\u8FC7\u7A0B" },
  {
    text: "\u524D\u7AEF",
    items: [
      { text: "HTML", link: "/articles/HTML/\u6D4F\u89C8\u5668\u6E32\u67D3\u8FC7\u7A0B" },
      { text: "css", link: "/articles/css/css\u5DE5\u4F5C\u6D41\u7A0B" },
      { text: "JavaScript", link: "/articles/JavaScript/0\u8BA4\u8BC6JavaScript" },
      { text: "typescript", link: "/articles/typescript/01-\u57FA\u7840\u7C7B\u578B" },
      { text: "Vue", link: "/articles/Vue/01-Vue3\u57FA\u7840\u8BED\u6CD5" },
      { text: "Nestjs", link: "/articles/Nestjs/\u4F9D\u8D56\u6CE8\u5165\u548C\u63A7\u5236\u53CD\u8F6C" }
    ]
  },
  {
    text: "\u540E\u7AEF",
    items: [
      { text: "Nest", link: "/articles/\u540E\u7AEF/Nestjs/nestcli" },
      { text: "Nginx", link: "/articles/\u540E\u7AEF/Nginx/Nginx" }
    ]
  },
  { text: "\u7B97\u6CD5", link: "/articles/\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5/\u5176\u4ED6/\u597D\u7528\u65B9\u6CD5" },
  { text: "\u9762\u8BD5\u9898", link: "/articles/\u9762\u8BD5\u9898/JavaScript\u57FA\u7840" },
  { text: "\u7F51\u7EDC", link: "/articles/\u7F51\u7EDC/TCP-IP\u6A21\u578B" },
  { text: "\u5DE5\u5177", link: "/articles/\u5DE5\u5177/nvm" },
  { text: "\u52A8\u753B", link: "/cartoonsMD/O.o\u6B22\u8FCE" }
];

// Rarrot/.vitepress/configs/sidebarAuto.ts
import dirTree from "file:///D:/%E7%AC%94%E8%AE%B0/blog/node_modules/.pnpm/directory-tree@3.5.1/node_modules/directory-tree/lib/directory-tree.js";
function toSidebarOption(tree = []) {
  if (!Array.isArray(tree))
    return [];
  return tree.map((v) => {
    if (v.children !== void 0) {
      return {
        text: v.name,
        collapsible: true,
        collapsed: true,
        items: toSidebarOption(v.children)
      };
    } else {
      return {
        text: v.name.replace(".md", ""),
        link: v.path.split("Rarrot")[1].replace(".md", "")
      };
    }
  });
}
function findItemsWithData(items) {
  const itemsWithData = [];
  function traverse(items2) {
    for (const item of items2) {
      if (!item.items) {
        itemsWithData.push(item);
      }
    }
  }
  traverse(items);
  return itemsWithData;
}
function sidebarAuto(srcPath, title) {
  const srcDir = dirTree(srcPath, {
    extensions: /\.md$/,
    normalizePath: true
  });
  const sidebarItems = toSidebarOption(srcDir.children);
  const itemsWithData = findItemsWithData(sidebarItems);
  return [
    {
      // 判断title有没有值，有就使用传入的title值
      text: title == void 0 ? srcDir.name : title,
      collapsible: true,
      collapsed: true,
      items: itemsWithData
    }
  ];
}
var sidebarAuto_default = sidebarAuto;

// Rarrot/.vitepress/configs/sidebar.ts
import path from "node:path";
var __vite_injected_original_dirname = "D:\\\u7B14\u8BB0\\blog\\Rarrot\\.vitepress\\configs";
function generateSidebar() {
  return {
    "/articles/\u535A\u5BA2": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u535A\u5BA2")
    ),
    "/articles/HTML": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/HTML")
    ),
    "/articles/css": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/css")
    ),
    // 定义"/articles/" 将此配置为路径，只有包含这个路径的才会出现侧边栏
    "/articles/JavaScript": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/JavaScript")
    ).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/JavaScript/\u95EE\u9898")
    )).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/JavaScript/\u811A\u672C")
    )),
    "/articles/typescript": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/typescript")
    ).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/typescript/\u95EE\u9898")
    )),
    "/articles/Vue": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/Vue")
    ).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/Vue/\u95EE\u9898")
    )).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/Vue/\u63D2\u4EF6")
    )),
    "/articles/\u540E\u7AEF/Nestjs": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u540E\u7AEF/Nestjs")
    ),
    "/articles/\u540E\u7AEF/Nginx": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u540E\u7AEF/Nginx")
    ),
    "/cartoonsMD": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../cartoonsMD"),
      "\u52A8\u753B"
    ),
    "/articles/\u5DE5\u5177": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u5DE5\u5177")
    ),
    "/articles/\u7F51\u7EDC": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u7F51\u7EDC")
    ),
    "/articles/\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5/\u6570\u636E\u7ED3\u6784")
    ).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5/\u7B97\u6CD5")
    )).concat(sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5/\u5176\u4ED6")
    )),
    "/articles/\u9762\u8BD5\u9898": sidebarAuto_default(
      path.resolve(__vite_injected_original_dirname, "../../articles/\u9762\u8BD5\u9898")
    )
  };
}
var sidebar = generateSidebar();

// Rarrot/.vitepress/configs/watchfiles.ts
var FileHMR = () => {
  return {
    name: "vite-file-hmr",
    configureServer({
      watcher,
      restart
    }) {
      const fsWatcher = watcher.add("*.md");
      fsWatcher.on("all", async (event, path2) => {
        if (event !== "change") {
          console.log(`${event} ${path2}`);
          try {
            config_default.themeConfig.sidebar = generateSidebar();
            await restart();
            console.log("update sidebar...");
          } catch {
            console.log(`${event} ${path2} faild`);
            console.log("update sidebar failed");
          }
        }
      });
    }
  };
};

// Rarrot/.vitepress/config.ts
import { withPwa } from "file:///D:/%E7%AC%94%E8%AE%B0/blog/node_modules/.pnpm/@vite-pwa+vitepress@0.4.0_vite-plugin-pwa@0.19.8/node_modules/@vite-pwa/vitepress/dist/index.mjs";
var links = [];
var config_default = withPwa(
  defineConfig({
    title: "Rarrot",
    description: "Rarrot\u7684\u4E2A\u4EBA\u535A\u5BA2\u7F51\u7AD9",
    head: [
      ["link", { rel: "icon", href: "/favicon.ico" }],
      [
        "meta",
        { name: "baidu-site-verification", content: "codeva-90hqhBZdbA" }
      ]
    ],
    lastUpdated: true,
    // cleanUrls: true,
    markdown: {
      lineNumbers: true,
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
      // theme: 'one-dark-pro',
      math: true
    },
    // 用于生成sitemap
    transformHtml: (_, id, { pageData }) => {
      if (!/[\\/]404\.html$/.test(id)) {
        links.push({
          url: pageData.relativePath.replace(/\/index\.md$/, "/").replace(/\.md$/, ".html"),
          lastmod: pageData.lastUpdated
        });
      }
    },
    buildEnd: async ({ outDir }) => {
      const sitemap = new SitemapStream({
        hostname: "https://www.rorrot.cc/"
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
        copyright: `Copyright \xA9 2023.4-${(/* @__PURE__ */ new Date()).getFullYear()}.${(/* @__PURE__ */ new Date()).getMonth() + 1}`
      },
      algolia: {
        appId: "A5NVAQQUEO",
        apiKey: "fa9cdd39aee827af75ca9ead469cec1b",
        indexName: "rorrot"
      },
      lastUpdatedText: "\u66F4\u65B0\u65E5\u671F",
      docFooter: {
        prev: "\u4E0A\u4E00\u9875",
        next: "\u4E0B\u4E00\u9875"
      },
      darkModeSwitchLabel: "\u4E3B\u9898",
      outline: [2, 3],
      outlineTitle: "\u672C\u9875\u76EE\u5F55",
      sidebarMenuLabel: "\u76EE\u5F55",
      returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
      editLink: {
        pattern: "https://github.com/hr1201/hr1201.github.io/blob/main/Rarrot/:path",
        text: "\u5728GitHub\u7F16\u8F91\u6B64\u9875"
      },
      socialLinks: [
        { icon: "discord", link: "https://discord.gg/Bad7NNcr" },
        { icon: "github", link: "https://github.com/hr1201" },
        { icon: "twitter", link: "https://twitter.com/hungrng75647520" }
        // 自定义社交连接
        // {
        //  icon: {
        //   svg: '<svg role="img" viewBox="0 0 24 24" xmlns="SVG namespace"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        //  },
        //  link: "...",
        // },
      ],
      nav,
      sidebar
    },
    vite: {
      plugins: [FileHMR()]
    },
    pwa: {
      outDir: ".vitepress/dist",
      // 输出目录
      registerType: "autoUpdate",
      // 注册类型为自动更新
      includeManifestIcons: false,
      // 不包含清单图标
      manifest: {
        id: "/",
        // 清单 ID
        name: "Rarrot_blog",
        // 应用名称
        short_name: "blog",
        // 应用的短名称
        description: "\u535A\u5BA2",
        // 应用的描述
        theme_color: "#ffffff",
        // 主题颜色
        icons: [
          {
            src: "/titleImg-120.png",
            // 图标路径
            sizes: "120x120",
            // 图标尺寸
            type: "image/png"
            // 图标类型
          },
          {
            src: "/titleImg-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "titleImg-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
        // 匹配需要缓存的文件类型
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            // 匹配需要缓存的 Google 字体
            handler: "CacheFirst",
            // 缓存优先策略
            options: {
              cacheName: "google-fonts-cache",
              // 缓存名称
              expiration: {
                maxEntries: 10,
                // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200]
                // 缓存的响应状态码
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            // 匹配需要缓存的 Google 字体
            handler: "CacheFirst",
            // 缓存优先策略
            options: {
              cacheName: "gstatic-fonts-cache",
              // 缓存名称
              expiration: {
                maxEntries: 10,
                // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200]
                // 缓存的响应状态码
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            // 匹配需要缓存的 jsdelivr 图片
            handler: "NetworkFirst",
            // 网络优先策略
            options: {
              cacheName: "jsdelivr-images-cache",
              // 缓存名称
              expiration: {
                maxEntries: 10,
                // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 7
                // 缓存有效期，7天
              },
              cacheableResponse: {
                statuses: [0, 200]
                // 缓存的响应状态码
              }
            }
          }
        ]
      }
    }
  })
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmFycm90Ly52aXRlcHJlc3MvY29uZmlnLnRzIiwgIlJhcnJvdC8udml0ZXByZXNzL2NvbmZpZ3MvbmF2LnRzIiwgIlJhcnJvdC8udml0ZXByZXNzL2NvbmZpZ3Mvc2lkZWJhckF1dG8udHMiLCAiUmFycm90Ly52aXRlcHJlc3MvY29uZmlncy9zaWRlYmFyLnRzIiwgIlJhcnJvdC8udml0ZXByZXNzL2NvbmZpZ3Mvd2F0Y2hmaWxlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFx1N0IxNFx1OEJCMFxcXFxibG9nXFxcXFJhcnJvdFxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTdCMTRcdThCQjBcXFxcYmxvZ1xcXFxSYXJyb3RcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNyVBQyU5NCVFOCVBRSVCMC9ibG9nL1JhcnJvdC8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcclxuLy8gaW1wb3J0IHNpZGViYXJBdXRvIGZyb20gJy4vc2lkZWJhckF1dG8nXHJcbi8vIFx1NzUyOFx1NEU4RVx1NzUxRlx1NjIxMHNpdGVtYXBcclxuaW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcclxuaW1wb3J0IHsgU2l0ZW1hcFN0cmVhbSB9IGZyb20gXCJzaXRlbWFwXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVdyaXRlU3RyZWFtIH0gZnJvbSBcIm5vZGU6ZnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcclxuaW1wb3J0IHsgbmF2IH0gZnJvbSBcIi4vY29uZmlncy9uYXZcIjtcclxuaW1wb3J0IHsgc2lkZWJhciB9IGZyb20gXCIuL2NvbmZpZ3Mvc2lkZWJhclwiO1xyXG5pbXBvcnQgeyBGaWxlSE1SIH0gZnJvbSBcIi4vY29uZmlncy93YXRjaGZpbGVzXCI7XHJcbmltcG9ydCB7IHdpdGhQd2EgfSBmcm9tIFwiQHZpdGUtcHdhL3ZpdGVwcmVzc1wiO1xyXG5cclxuaW50ZXJmYWNlIExpbmsge1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIGxhc3Rtb2Q6IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuY29uc3QgbGlua3M6IExpbmtbXSA9IFtdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcclxuICBkZWZpbmVDb25maWcoe1xyXG4gICAgdGl0bGU6IFwiUmFycm90XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJSYXJyb3RcdTc2ODRcdTRFMkFcdTRFQkFcdTUzNUFcdTVCQTJcdTdGNTFcdTdBRDlcIixcclxuICAgIGhlYWQ6IFtcclxuICAgICAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2Zhdmljb24uaWNvXCIgfV0sXHJcbiAgICAgIFtcclxuICAgICAgICBcIm1ldGFcIixcclxuICAgICAgICB7IG5hbWU6IFwiYmFpZHUtc2l0ZS12ZXJpZmljYXRpb25cIiwgY29udGVudDogXCJjb2RldmEtOTBocWhCWmRiQVwiIH0sXHJcbiAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgbGFzdFVwZGF0ZWQ6IHRydWUsXHJcbiAgICAvLyBjbGVhblVybHM6IHRydWUsXHJcblxyXG4gICAgbWFya2Rvd246IHtcclxuICAgICAgbGluZU51bWJlcnM6IHRydWUsXHJcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGlraWpzL3NoaWtpL2Jsb2IvbWFpbi9kb2NzL3RoZW1lcy5tZCNhbGwtdGhlbWVzXHJcbiAgICAgIC8vIHRoZW1lOiAnb25lLWRhcmstcHJvJyxcclxuICAgICAgbWF0aDogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU3NTI4XHU0RThFXHU3NTFGXHU2MjEwc2l0ZW1hcFxyXG4gICAgdHJhbnNmb3JtSHRtbDogKF8sIGlkLCB7IHBhZ2VEYXRhIH0pID0+IHtcclxuICAgICAgaWYgKCEvW1xcXFwvXTQwNFxcLmh0bWwkLy50ZXN0KGlkKSkge1xyXG4gICAgICAgIGxpbmtzLnB1c2goe1xyXG4gICAgICAgICAgdXJsOiBwYWdlRGF0YS5yZWxhdGl2ZVBhdGhcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL2luZGV4XFwubWQkLywgXCIvXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC5tZCQvLCBcIi5odG1sXCIpLFxyXG4gICAgICAgICAgbGFzdG1vZDogcGFnZURhdGEubGFzdFVwZGF0ZWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZEVuZDogYXN5bmMgKHsgb3V0RGlyIH0pID0+IHtcclxuICAgICAgY29uc3Qgc2l0ZW1hcCA9IG5ldyBTaXRlbWFwU3RyZWFtKHtcclxuICAgICAgICBob3N0bmFtZTogXCJodHRwczovL3d3dy5yb3Jyb3QuY2MvXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB3cml0ZVN0cmVhbSA9IGNyZWF0ZVdyaXRlU3RyZWFtKHJlc29sdmUob3V0RGlyLCBcInNpdGVtYXAueG1sXCIpKTtcclxuICAgICAgc2l0ZW1hcC5waXBlKHdyaXRlU3RyZWFtKTtcclxuICAgICAgbGlua3MuZm9yRWFjaCgobGluaykgPT4gc2l0ZW1hcC53cml0ZShsaW5rKSk7XHJcbiAgICAgIHNpdGVtYXAuZW5kKCk7XHJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiB3cml0ZVN0cmVhbS5vbihcImZpbmlzaFwiLCByKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRoZW1lQ29uZmlnOiB7XHJcbiAgICAgIC8vIGxvZ286IHtcclxuICAgICAgLy8gICBsaWdodDogJy9sb2dvLWxpZ2h0LnN2ZycsXHJcbiAgICAgIC8vICAgZGFyazogJy9sb2dvLWRhcmsuc3ZnJyxcclxuICAgICAgLy8gfSxcclxuICAgICAgbG9nbzogXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvaHIxMjAxL2ltZ0BtYWluL2ltZ3MvJUU1JUJFJUFFJUU0JUJGJUExJUU1JTlCJUJFJUU3JTg5JTg3XzIwMjMwNTA4MjEwMTU0LmpwZ1wiLFxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xyXG4gICAgICBmb290ZXI6IHtcclxuICAgICAgICBtZXNzYWdlOiBcIlJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cIixcclxuICAgICAgICBjb3B5cmlnaHQ6IGBDb3B5cmlnaHQgXHUwMEE5IDIwMjMuNC0ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0uJHtcclxuICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDFcclxuICAgICAgICB9YCxcclxuICAgICAgfSxcclxuICAgICAgYWxnb2xpYToge1xyXG4gICAgICAgIGFwcElkOiBcIkE1TlZBUVFVRU9cIixcclxuICAgICAgICBhcGlLZXk6IFwiZmE5Y2RkMzlhZWU4MjdhZjc1Y2E5ZWFkNDY5Y2VjMWJcIixcclxuICAgICAgICBpbmRleE5hbWU6IFwicm9ycm90XCIsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXHU2NkY0XHU2NUIwXHU2NUU1XHU2NzFGXCIsXHJcbiAgICAgIGRvY0Zvb3Rlcjoge1xyXG4gICAgICAgIHByZXY6IFwiXHU0RTBBXHU0RTAwXHU5ODc1XCIsXHJcbiAgICAgICAgbmV4dDogXCJcdTRFMEJcdTRFMDBcdTk4NzVcIixcclxuICAgICAgfSxcclxuICAgICAgZGFya01vZGVTd2l0Y2hMYWJlbDogXCJcdTRFM0JcdTk4OThcIixcclxuICAgICAgb3V0bGluZTogWzIsIDNdLFxyXG4gICAgICBvdXRsaW5lVGl0bGU6IFwiXHU2NzJDXHU5ODc1XHU3NkVFXHU1RjU1XCIsXHJcbiAgICAgIHNpZGViYXJNZW51TGFiZWw6IFwiXHU3NkVFXHU1RjU1XCIsXHJcbiAgICAgIHJldHVyblRvVG9wTGFiZWw6IFwiXHU1NkRFXHU1MjMwXHU5ODc2XHU5MEU4XCIsXHJcbiAgICAgIGVkaXRMaW5rOiB7XHJcbiAgICAgICAgcGF0dGVybjpcclxuICAgICAgICAgIFwiaHR0cHM6Ly9naXRodWIuY29tL2hyMTIwMS9ocjEyMDEuZ2l0aHViLmlvL2Jsb2IvbWFpbi9SYXJyb3QvOnBhdGhcIixcclxuICAgICAgICB0ZXh0OiBcIlx1NTcyOEdpdEh1Ylx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NVwiLFxyXG4gICAgICB9LFxyXG4gICAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICAgIHsgaWNvbjogXCJkaXNjb3JkXCIsIGxpbms6IFwiaHR0cHM6Ly9kaXNjb3JkLmdnL0JhZDdOTmNyXCIgfSxcclxuICAgICAgICB7IGljb246IFwiZ2l0aHViXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL2hyMTIwMVwiIH0sXHJcbiAgICAgICAgeyBpY29uOiBcInR3aXR0ZXJcIiwgbGluazogXCJodHRwczovL3R3aXR0ZXIuY29tL2h1bmdybmc3NTY0NzUyMFwiIH0sXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU3OTNFXHU0RUE0XHU4RkRFXHU2M0E1XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICBpY29uOiB7XHJcbiAgICAgICAgLy8gICBzdmc6ICc8c3ZnIHJvbGU9XCJpbWdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJTVkcgbmFtZXNwYWNlXCI+PHRpdGxlPkRyaWJiYmxlPC90aXRsZT48cGF0aCBkPVwiTTEyLi4uNi4zOHpcIi8+PC9zdmc+JyxcclxuICAgICAgICAvLyAgfSxcclxuICAgICAgICAvLyAgbGluazogXCIuLi5cIixcclxuICAgICAgICAvLyB9LFxyXG4gICAgICBdLFxyXG4gICAgICBuYXY6IG5hdixcclxuICAgICAgc2lkZWJhcjogc2lkZWJhcixcclxuICAgIH0sXHJcbiAgICB2aXRlOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtGaWxlSE1SKCldLFxyXG4gICAgfSxcclxuICAgIHB3YToge1xyXG4gICAgICBvdXREaXI6IFwiLnZpdGVwcmVzcy9kaXN0XCIsIC8vIFx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVxyXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLCAvLyBcdTZDRThcdTUxOENcdTdDN0JcdTU3OEJcdTRFM0FcdTgxRUFcdTUyQThcdTY2RjRcdTY1QjBcclxuICAgICAgaW5jbHVkZU1hbmlmZXN0SWNvbnM6IGZhbHNlLCAvLyBcdTRFMERcdTUzMDVcdTU0MkJcdTZFMDVcdTUzNTVcdTU2RkVcdTY4MDdcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBpZDogXCIvXCIsIC8vIFx1NkUwNVx1NTM1NSBJRFxyXG4gICAgICAgIG5hbWU6ICdSYXJyb3RfYmxvZycsIC8vIFx1NUU5NFx1NzUyOFx1NTQwRFx1NzlGMFxyXG4gICAgICAgIHNob3J0X25hbWU6ICdibG9nJywgLy8gXHU1RTk0XHU3NTI4XHU3Njg0XHU3N0VEXHU1NDBEXHU3OUYwXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdcdTUzNUFcdTVCQTInLCAvLyBcdTVFOTRcdTc1MjhcdTc2ODRcdTYzQ0ZcdThGRjBcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsIC8vIFx1NEUzQlx1OTg5OFx1OTg5Q1x1ODI3MlxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvdGl0bGVJbWctMTIwLnBuZ1wiLCAvLyBcdTU2RkVcdTY4MDdcdThERUZcdTVGODRcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMTIweDEyMFwiLCAvLyBcdTU2RkVcdTY4MDdcdTVDM0FcdTVCRjhcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIiwgLy8gXHU1NkZFXHU2ODA3XHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL3RpdGxlSW1nLTE5Mi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcInRpdGxlSW1nLTUxMi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntjc3MsanMsaHRtbCxzdmcscG5nLGljbyx0eHQsd29mZjJ9XCJdLCAvLyBcdTUzMzlcdTkxNERcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTY1ODdcdTRFRjZcdTdDN0JcdTU3OEJcclxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbVxcLy4qL2ksIC8vIFx1NTMzOVx1OTE0RFx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NCBHb29nbGUgXHU1QjU3XHU0RjUzXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLCAvLyBcdTdGMTNcdTVCNThcdTRGMThcdTUxNDhcdTdCNTZcdTc1NjVcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJnb29nbGUtZm9udHMtY2FjaGVcIiwgLy8gXHU3RjEzXHU1QjU4XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAsIC8vIFx1NjcwMFx1NTkyN1x1N0YxM1x1NUI1OFx1Njc2MVx1NzZFRVx1NjU3MFxyXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzY1LCAvLyBcdTdGMTNcdTVCNThcdTY3MDlcdTY1NDhcdTY3MUZcdUZGMEMzNjVcdTU5MjlcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhY2hlYWJsZVJlc3BvbnNlOiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF0sIC8vIFx1N0YxM1x1NUI1OFx1NzY4NFx1NTRDRFx1NUU5NFx1NzJCNlx1NjAwMVx1NzgwMVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ3N0YXRpY1xcLmNvbVxcLy4qL2ksIC8vIFx1NTMzOVx1OTE0RFx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NCBHb29nbGUgXHU1QjU3XHU0RjUzXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLCAvLyBcdTdGMTNcdTVCNThcdTRGMThcdTUxNDhcdTdCNTZcdTc1NjVcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJnc3RhdGljLWZvbnRzLWNhY2hlXCIsIC8vIFx1N0YxM1x1NUI1OFx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLCAvLyBcdTY3MDBcdTU5MjdcdTdGMTNcdTVCNThcdTY3NjFcdTc2RUVcdTY1NzBcclxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSwgLy8gXHU3RjEzXHU1QjU4XHU2NzA5XHU2NTQ4XHU2NzFGXHVGRjBDMzY1XHU1OTI5XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFswLCAyMDBdLCAvLyBcdTdGMTNcdTVCNThcdTc2ODRcdTU0Q0RcdTVFOTRcdTcyQjZcdTYwMDFcdTc4MDFcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9jZG5cXC5qc2RlbGl2clxcLm5ldFxcLy4qL2ksIC8vIFx1NTMzOVx1OTE0RFx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NCBqc2RlbGl2ciBcdTU2RkVcdTcyNDdcclxuICAgICAgICAgICAgaGFuZGxlcjogXCJOZXR3b3JrRmlyc3RcIiwgLy8gXHU3RjUxXHU3RURDXHU0RjE4XHU1MTQ4XHU3QjU2XHU3NTY1XHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwianNkZWxpdnItaW1hZ2VzLWNhY2hlXCIsIC8vIFx1N0YxM1x1NUI1OFx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLCAvLyBcdTY3MDBcdTU5MjdcdTdGMTNcdTVCNThcdTY3NjFcdTc2RUVcdTY1NzBcclxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDcsIC8vIFx1N0YxM1x1NUI1OFx1NjcwOVx1NjU0OFx1NjcxRlx1RkYwQzdcdTU5MjlcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhY2hlYWJsZVJlc3BvbnNlOiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF0sIC8vIFx1N0YxM1x1NUI1OFx1NzY4NFx1NTRDRFx1NUU5NFx1NzJCNlx1NjAwMVx1NzgwMVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbik7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1xcXFxuYXYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNyVBQyU5NCVFOCVBRSVCMC9ibG9nL1JhcnJvdC8udml0ZXByZXNzL2NvbmZpZ3MvbmF2LnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnXHJcblxyXG5leHBvcnQgY29uc3QgbmF2OiBEZWZhdWx0VGhlbWUuQ29uZmlnWyduYXYnXSA9IFtcclxuICAgIHsgdGV4dDogJ1x1NUJGQ1x1ODIyQScsIGxpbms6ICcvYXJ0aWNsZXMvXHU1QkZDXHU4MjJBL25hdmlnYXRlJyB9LFxyXG4gICAgeyB0ZXh0OiAnXHU1MzVBXHU1QkEyJywgbGluazogJy9hcnRpY2xlcy9cdTUzNUFcdTVCQTIvXHU1MTczXHU0RThFXHU1MzVBXHU1QkEyXHU1RUZBXHU3QUNCXHU4RkM3XHU3QTBCJyB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTUyNERcdTdBRUYnLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJIVE1MXCIsIGxpbms6IFwiL2FydGljbGVzL0hUTUwvXHU2RDRGXHU4OUM4XHU1NjY4XHU2RTMyXHU2N0QzXHU4RkM3XHU3QTBCXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcImNzc1wiLCBsaW5rOiBcIi9hcnRpY2xlcy9jc3MvY3NzXHU1REU1XHU0RjVDXHU2RDQxXHU3QTBCXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIkphdmFTY3JpcHRcIiwgbGluazogXCIvYXJ0aWNsZXMvSmF2YVNjcmlwdC8wXHU4QkE0XHU4QkM2SmF2YVNjcmlwdFwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJ0eXBlc2NyaXB0XCIsIGxpbms6IFwiL2FydGljbGVzL3R5cGVzY3JpcHQvMDEtXHU1N0ZBXHU3ODQwXHU3QzdCXHU1NzhCXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlZ1ZVwiLCBsaW5rOiBcIi9hcnRpY2xlcy9WdWUvMDEtVnVlM1x1NTdGQVx1Nzg0MFx1OEJFRFx1NkNENVwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJOZXN0anNcIiwgbGluazogXCIvYXJ0aWNsZXMvTmVzdGpzL1x1NEY5RFx1OEQ1Nlx1NkNFOFx1NTE2NVx1NTQ4Q1x1NjNBN1x1NTIzNlx1NTNDRFx1OEY2Q1wiIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NTQwRVx1N0FFRicsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIk5lc3RcIiwgbGluazogXCIvYXJ0aWNsZXMvXHU1NDBFXHU3QUVGL05lc3Rqcy9uZXN0Y2xpXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIk5naW54XCIsIGxpbms6IFwiL2FydGljbGVzL1x1NTQwRVx1N0FFRi9OZ2lueC9OZ2lueFwiIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHsgdGV4dDogJ1x1N0I5N1x1NkNENScsIGxpbms6ICcvYXJ0aWNsZXMvXHU2NTcwXHU2MzZFXHU3RUQzXHU2Nzg0XHU0RTBFXHU3Qjk3XHU2Q0Q1L1x1NTE3Nlx1NEVENi9cdTU5N0RcdTc1MjhcdTY1QjlcdTZDRDUnIH0sXHJcbiAgICB7IHRleHQ6ICdcdTk3NjJcdThCRDVcdTk4OTgnLCBsaW5rOiAnL2FydGljbGVzL1x1OTc2Mlx1OEJENVx1OTg5OC9KYXZhU2NyaXB0XHU1N0ZBXHU3ODQwJyB9LFxyXG4gICAgeyB0ZXh0OiAnXHU3RjUxXHU3RURDJywgbGluazogJy9hcnRpY2xlcy9cdTdGNTFcdTdFREMvVENQLUlQXHU2QTIxXHU1NzhCJyB9LFxyXG4gICAgeyB0ZXh0OiAnXHU1REU1XHU1MTc3JywgbGluazogJy9hcnRpY2xlcy9cdTVERTVcdTUxNzcvbnZtJyB9LFxyXG4gICAgeyB0ZXh0OiAnXHU1MkE4XHU3NTNCJywgbGluazogJy9jYXJ0b29uc01EL08ub1x1NkIyMlx1OEZDRScgfSxcclxuXSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1xcXFxzaWRlYmFyQXV0by50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU3JUFDJTk0JUU4JUFFJUIwL2Jsb2cvUmFycm90Ly52aXRlcHJlc3MvY29uZmlncy9zaWRlYmFyQXV0by50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IGRpclRyZWUgZnJvbSAnZGlyZWN0b3J5LXRyZWUnO1xyXG4vLyBpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xyXG5cclxuaW50ZXJmYWNlIFNpZGViYXJJdGVtIHtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgbGluaz86IHN0cmluZztcclxuICBjb2xsYXBzaWJsZT86IGJvb2xlYW47XHJcbiAgY29sbGFwc2VkPzogYm9vbGVhbjtcclxuICBpdGVtcz86IFNpZGViYXJJdGVtW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvU2lkZWJhck9wdGlvbih0cmVlOiBhbnlbXSA9IFtdKTogU2lkZWJhckl0ZW1bXSB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHRyZWUpKSByZXR1cm4gW107XHJcbiAgcmV0dXJuIHRyZWUubWFwKCh2KSA9PiB7XHJcbiAgICBpZiAodi5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGV4dDogdi5uYW1lLFxyXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICBpdGVtczogdG9TaWRlYmFyT3B0aW9uKHYuY2hpbGRyZW4pLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0ZXh0OiB2Lm5hbWUucmVwbGFjZShcIi5tZFwiLCBcIlwiKSxcclxuICAgICAgICBsaW5rOiB2LnBhdGguc3BsaXQoXCJSYXJyb3RcIilbMV0ucmVwbGFjZShcIi5tZFwiLCBcIlwiKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gXHU1OTgyXHU2NzlDXHU3QjJDXHU0RTAwXHU2QkI1XHU1MjE3XHU4ODY4XHU1MTc3XHU2NzA5aXRlbXNcdTVDNUVcdTYwMjdcdUZGMENcdTVDMDZcdTRFMERcdTYzQThcdTUxNjVpdGVtc1dpdGhEYXRhXHJcbmZ1bmN0aW9uIGZpbmRJdGVtc1dpdGhEYXRhKGl0ZW1zOiBTaWRlYmFySXRlbVtdKTogU2lkZWJhckl0ZW1bXSB7XHJcbiAgY29uc3QgaXRlbXNXaXRoRGF0YTogU2lkZWJhckl0ZW1bXSA9IFtdO1xyXG5cclxuICBmdW5jdGlvbiB0cmF2ZXJzZShpdGVtczogU2lkZWJhckl0ZW1bXSkge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgIGlmICghaXRlbS5pdGVtcykge1xyXG4gICAgICAgIGl0ZW1zV2l0aERhdGEucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhdmVyc2UoaXRlbXMpO1xyXG5cclxuICByZXR1cm4gaXRlbXNXaXRoRGF0YTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNpZGViYXJBdXRvKHNyY1BhdGg6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcpOiBTaWRlYmFySXRlbVtdIHtcclxuICBjb25zdCBzcmNEaXIgPSBkaXJUcmVlKHNyY1BhdGgsIHtcclxuICAgIGV4dGVuc2lvbnM6IC9cXC5tZCQvLFxyXG4gICAgbm9ybWFsaXplUGF0aDogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgc2lkZWJhckl0ZW1zID0gdG9TaWRlYmFyT3B0aW9uKHNyY0Rpci5jaGlsZHJlbik7XHJcblxyXG4gIGNvbnN0IGl0ZW1zV2l0aERhdGEgPSBmaW5kSXRlbXNXaXRoRGF0YShzaWRlYmFySXRlbXMpO1xyXG5cclxuICAvLyBjb25zb2xlLmxvZyhpdGVtc1dpdGhEYXRhKTtcclxuICByZXR1cm4gW1xyXG4gICAge1xyXG4gICAgICAvLyBcdTUyMjRcdTY1QUR0aXRsZVx1NjcwOVx1NkNBMVx1NjcwOVx1NTAzQ1x1RkYwQ1x1NjcwOVx1NUMzMVx1NEY3Rlx1NzUyOFx1NEYyMFx1NTE2NVx1NzY4NHRpdGxlXHU1MDNDXHJcbiAgICAgIHRleHQ6IHRpdGxlID09IHVuZGVmaW5lZCA/IHNyY0Rpci5uYW1lIDogdGl0bGUsXHJcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgIGl0ZW1zOiBpdGVtc1dpdGhEYXRhLFxyXG4gICAgfSxcclxuICBdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlU2VydmVyKHNlcnZlcjoge1xyXG4gIHdhdGNoZXI6IHtcclxuICAgIGFkZDogKGFyZzA6IHN0cmluZykgPT4gdm9pZDsgb246IChhcmcwOiBzdHJpbmcsIGFyZzE6IChwYXRoIC8vIGltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XHJcbiAgICAgIDogYW55KSA9PiB2b2lkKSA9PiB2b2lkO1xyXG4gIH07XHJcbn0pIHtcclxuICBjb25zdCBzcmNQYXRoID0gJy4uLy4uLy4uL1JhcnJvdCc7IC8vIFx1OEJGN1x1NjZGRlx1NjM2Mlx1NEUzQVx1NEY2MFx1NzY4NFx1NkU5MFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxyXG4gIHNlcnZlci53YXRjaGVyLmFkZChyZXNvbHZlKHNyY1BhdGgpKTtcclxuICBzZXJ2ZXIud2F0Y2hlci5vbignY2hhbmdlJywgKHBhdGgpID0+IHtcclxuICAgIGlmIChwYXRoLmVuZHNXaXRoKCcubWQnKSkge1xyXG4gICAgICAvLyBcdTVGNTMgLm1kIFx1NjU4N1x1NEVGNlx1NTNEMVx1NzUxRlx1NTNEOFx1NTMxNlx1NjVGNlx1RkYwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1NEZBN1x1OEZCOVx1NjgwRlxyXG4gICAgICBzaWRlYmFyQXV0byhzcmNQYXRoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG4vLyBsZXQgYSA9IHNpZGViYXJBdXRvKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vYXJ0aWNsZXMvSmF2YVNjcmlwdFwiKSxcclxuLy8gICBcIkphdmFTY3JpcHRcIlxyXG4vLyApLmNvbmNhdChzaWRlYmFyQXV0byhcclxuLy8gICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2FydGljbGVzL0phdmFTY3JpcHQvXHU5NUVFXHU5ODk4XCIpLFxyXG4vLyAgIFwiXHU5NUVFXHU5ODk4XCJcclxuLy8gKSlcclxuLy8gY29uc29sZS5sb2coYS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKHZhbHVlKVxyXG4vLyB9KSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpZGViYXJBdXRvOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU3QjE0XHU4QkIwXFxcXGJsb2dcXFxcUmFycm90XFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTclQUMlOTQlRTglQUUlQjAvYmxvZy9SYXJyb3QvLnZpdGVwcmVzcy9jb25maWdzL3NpZGViYXIudHNcIjtpbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gJ3ZpdGVwcmVzcydcclxuaW1wb3J0IHNpZGViYXJBdXRvIGZyb20gJy4vc2lkZWJhckF1dG8nXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVNpZGViYXIoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwiL2FydGljbGVzL1x1NTM1QVx1NUJBMlwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9cdTUzNUFcdTVCQTJcIiksXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgXCIvYXJ0aWNsZXMvSFRNTFwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9IVE1MXCIpLFxyXG4gICAgICAgICksXHJcbiAgICAgICAgXCIvYXJ0aWNsZXMvY3NzXCI6IHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL2Nzc1wiKSxcclxuICAgICAgICApLFxyXG5cclxuICAgICAgICAvLyBcdTVCOUFcdTRFNDlcIi9hcnRpY2xlcy9cIiBcdTVDMDZcdTZCNjRcdTkxNERcdTdGNkVcdTRFM0FcdThERUZcdTVGODRcdUZGMENcdTUzRUFcdTY3MDlcdTUzMDVcdTU0MkJcdThGRDlcdTRFMkFcdThERUZcdTVGODRcdTc2ODRcdTYyNERcdTRGMUFcdTUxRkFcdTczQjBcdTRGQTdcdThGQjlcdTY4MEZcclxuICAgICAgICBcIi9hcnRpY2xlcy9KYXZhU2NyaXB0XCI6IHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL0phdmFTY3JpcHRcIiksXHJcbiAgICAgICAgKS5jb25jYXQoc2lkZWJhckF1dG8oXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vYXJ0aWNsZXMvSmF2YVNjcmlwdC9cdTk1RUVcdTk4OThcIiksXHJcbiAgICAgICAgKSkuY29uY2F0KHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL0phdmFTY3JpcHQvXHU4MTFBXHU2NzJDXCIpLFxyXG4gICAgICAgICkpLFxyXG5cclxuICAgICAgICBcIi9hcnRpY2xlcy90eXBlc2NyaXB0XCI6IHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL3R5cGVzY3JpcHRcIiksXHJcbiAgICAgICAgKS5jb25jYXQoc2lkZWJhckF1dG8oXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vYXJ0aWNsZXMvdHlwZXNjcmlwdC9cdTk1RUVcdTk4OThcIiksXHJcbiAgICAgICAgKSksXHJcblxyXG4gICAgICAgIFwiL2FydGljbGVzL1Z1ZVwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9WdWVcIiksXHJcbiAgICAgICAgKS5jb25jYXQoc2lkZWJhckF1dG8oXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vYXJ0aWNsZXMvVnVlL1x1OTVFRVx1OTg5OFwiKSxcclxuICAgICAgICApKS5jb25jYXQoc2lkZWJhckF1dG8oXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vYXJ0aWNsZXMvVnVlL1x1NjNEMlx1NEVGNlwiKSxcclxuICAgICAgICApKSxcclxuXHJcbiAgICAgICAgXCIvYXJ0aWNsZXMvXHU1NDBFXHU3QUVGL05lc3Rqc1wiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9cdTU0MEVcdTdBRUYvTmVzdGpzXCIpLFxyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIFwiL2FydGljbGVzL1x1NTQwRVx1N0FFRi9OZ2lueFwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9cdTU0MEVcdTdBRUYvTmdpbnhcIiksXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgXCIvY2FydG9vbnNNRFwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9jYXJ0b29uc01EXCIpLFxyXG4gICAgICAgICAgICAnXHU1MkE4XHU3NTNCJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgXCIvYXJ0aWNsZXMvXHU1REU1XHU1MTc3XCI6IHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL1x1NURFNVx1NTE3N1wiKSxcclxuICAgICAgICApLFxyXG5cclxuICAgICAgICBcIi9hcnRpY2xlcy9cdTdGNTFcdTdFRENcIjogc2lkZWJhckF1dG8oXHJcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vYXJ0aWNsZXMvXHU3RjUxXHU3RURDXCIpLFxyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIFwiL2FydGljbGVzL1x1NjU3MFx1NjM2RVx1N0VEM1x1Njc4NFx1NEUwRVx1N0I5N1x1NkNENVwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9cdTY1NzBcdTYzNkVcdTdFRDNcdTY3ODRcdTRFMEVcdTdCOTdcdTZDRDUvXHU2NTcwXHU2MzZFXHU3RUQzXHU2Nzg0XCIpLFxyXG4gICAgICAgICkuY29uY2F0KHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL1x1NjU3MFx1NjM2RVx1N0VEM1x1Njc4NFx1NEUwRVx1N0I5N1x1NkNENS9cdTdCOTdcdTZDRDVcIiksXHJcbiAgICAgICAgKSkuY29uY2F0KHNpZGViYXJBdXRvKFxyXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL2FydGljbGVzL1x1NjU3MFx1NjM2RVx1N0VEM1x1Njc4NFx1NEUwRVx1N0I5N1x1NkNENS9cdTUxNzZcdTRFRDZcIiksXHJcbiAgICAgICAgKSksXHJcblxyXG4gICAgICAgIFwiL2FydGljbGVzL1x1OTc2Mlx1OEJENVx1OTg5OFwiOiBzaWRlYmFyQXV0byhcclxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9hcnRpY2xlcy9cdTk3NjJcdThCRDVcdTk4OThcIiksXHJcbiAgICAgICAgKSxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNpZGViYXI6IERlZmF1bHRUaGVtZS5Db25maWdbJ3NpZGViYXInXSA9IGdlbmVyYXRlU2lkZWJhcigpXHJcblxyXG5leHBvcnQgeyBnZW5lcmF0ZVNpZGViYXIgfVxyXG4vLyBzZXJ2ZXIubW9kdWxlR3JhcGgub25GaWxlQ2hhbmdlKCcvQHNpdGVEYXRhJykiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFx1N0IxNFx1OEJCMFxcXFxibG9nXFxcXFJhcnJvdFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1N0IxNFx1OEJCMFxcXFxibG9nXFxcXFJhcnJvdFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcXFxcd2F0Y2hmaWxlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU3JUFDJTk0JUU4JUFFJUIwL2Jsb2cvUmFycm90Ly52aXRlcHJlc3MvY29uZmlncy93YXRjaGZpbGVzLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4sVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcclxuaW1wb3J0IHsgZ2VuZXJhdGVTaWRlYmFyIH0gZnJvbSAnLi9zaWRlYmFyJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuLy8gXHU0RjdGXHU3NTI4dml0ZVx1NjNEMlx1NEVGNlx1NzY4NGZzXHU4RkRCXHU4ODRDXHU3NkQxXHU1NDJDXHU2NTg3XHU0RUY2XHU1M0Q4XHU1MzE2XHVGRjBDXHU1RjUzXHU1M0Q4XHU1MzE2XHU2NUY2XHU3NzBCXHU2NjJGXHU1NDI2XHU4MEZEXHU2MkZGXHU1MjMwY29uZmlnLnRzXHU0RTJEXHU3Njg0XHU1QjlFXHU0RjhCXHVGRjBDXHJcbi8vIFx1N0VEOXNpZGViYXJcdThGREJcdTg4NENcdTkxQ0RcdTY1QjBcdThENEJcdTUwM0NcdTRGN0ZcdTc1Mjh2aXRlXHU2M0QyXHU0RUY2XHU3Njg0ZnNcdThGREJcdTg4NENcdTc2RDFcdTU0MkNcdTY1ODdcdTRFRjZcdTUzRDhcdTUzMTZcdUZGMENcdTVGNTNcdTUzRDhcdTUzMTZcdTY1RjZcdTc3MEJcdTY2MkZcdTU0MjZcdTgwRkRcdTYyRkZcdTUyMzBjb25maWcudHNcdTRFMkRcdTc2ODRcdTVCOUVcdTRGOEJcdUZGMENcdTdFRDlzaWRlYmFyXHU4RkRCXHU4ODRDXHU5MUNEXHU2NUIwXHU4RDRCXHU1MDNDXHJcblxyXG5leHBvcnQgY29uc3QgRmlsZUhNUiA9ICgpOiBQbHVnaW4gPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAndml0ZS1maWxlLWhtcicsXHJcbiAgICAgICAgY29uZmlndXJlU2VydmVyKHtcclxuICAgICAgICAgICAgd2F0Y2hlcixcclxuICAgICAgICAgICAgcmVzdGFydFxyXG4gICAgICAgIH0pIHtcclxuICAgICAgICAgICAgY29uc3QgZnNXYXRjaGVyID0gd2F0Y2hlci5hZGQoJyoubWQnKTtcclxuICAgICAgICAgICAgZnNXYXRjaGVyLm9uKCdhbGwnLCBhc3luYyAoZXZlbnQ6IHN0cmluZywgcGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgIT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZXZlbnR9ICR7cGF0aH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTUyMzBjb25maWdcdTc2ODRzaWRlYmFyXHVGRjBDXHU5NzAwXHU4OTgxXHU0RjIwXHU1MTY1XHU2NUIwXHU3Njg0c2lkZWJhclx1OEZDN1x1Njc2NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY29uZmlnIGFzIFVzZXJDb25maWcpLnRoZW1lQ29uZmlnLnNpZGViYXIgPSBnZW5lcmF0ZVNpZGViYXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZXN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiBwYXRoLHBhdGgpLy9zdHJpbmdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgc2lkZWJhci4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtldmVudH0gJHtwYXRofSBmYWlsZGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIHNpZGViYXIgZmFpbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUixTQUFTLG9CQUFvQjtBQUluVCxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLGVBQWU7OztBQ0pqQixJQUFNLE1BQWtDO0FBQUEsRUFDM0MsRUFBRSxNQUFNLGdCQUFNLE1BQU0sa0NBQXdCO0FBQUEsRUFDNUMsRUFBRSxNQUFNLGdCQUFNLE1BQU0sMEVBQXdCO0FBQUEsRUFDNUM7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sNERBQXlCO0FBQUEsTUFDL0MsRUFBRSxNQUFNLE9BQU8sTUFBTSw0Q0FBd0I7QUFBQSxNQUM3QyxFQUFFLE1BQU0sY0FBYyxNQUFNLCtDQUFxQztBQUFBLE1BQ2pFLEVBQUUsTUFBTSxjQUFjLE1BQU0sbURBQStCO0FBQUEsTUFDM0QsRUFBRSxNQUFNLE9BQU8s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
