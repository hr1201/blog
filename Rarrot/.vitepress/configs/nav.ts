import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '导航', link: '/articles/导航/navigate' },
    { text: '博客', link: '/articles/博客/关于博客建立过程' },
    {
        text: '前端',
        items: [
            { text: "HTML", link: "/articles/HTML/浏览器渲染过程" },
            { text: "css", link: "/articles/css/css工作流程" },
            { text: "JavaScript", link: "/articles/JavaScript/0认识JavaScript" },
            { text: "typescript", link: "/articles/typescript/01-基础类型" },
            { text: "Vue", link: "/articles/Vue/01-Vue3基础语法" },
        ],
    },
    {
        text: '后端',
        items: [
            { text: "Nest", link: "/articles/后端/Nestjs/nestcli" },
            { text: "Nginx", link: "/articles/后端/Nginx/Nginx" },
        ]
    },
    { text: '算法', link: '/articles/数据结构与算法/其他/好用方法' },
    { text: '工具', link: '/articles/工具/nvm' },
    { text: '动画', link: '/cartoonsMD/O.o欢迎' },
]