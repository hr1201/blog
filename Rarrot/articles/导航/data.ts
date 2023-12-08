import type { NavLinkType } from './components/type'

type NavData = {
    title: string
    items: NavLinkType[]
}

export const NAV_DATA: NavData[] = [
    {
        title: '常用工具',
        items: [
            {
                icon: 'https://caniuse.com/img/favicon-128.png',
                title: 'Can I use',
                desc: '前端 API 兼容性查询',
                link: 'https://caniuse.com',
            },
            {
                icon: 'https://tinypng.com/images/apple-touch-icon.png',
                title: 'TinyPNG',
                desc: '在线图片压缩工具',
                link: 'https://tinypng.com',
            },
            {
                icon: 'https://devtool.tech/logo.svg',
                title: '开发者武器库',
                desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
                link: 'https://devtool.tech',
            },
            {
                icon: 'https://tool.lu/favicon.ico',
                title: '在线工具',
                desc: '开发人员的工具箱',
                link: 'https://tool.lu',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEVHcEwQzW4QzW4RzW4RzW4RzW4PzW0QzW4QzW4PzW4QzW0Nzm4QzW6ZGnpRAAAADXRSTlMAcsXt/947o4QnUA+u+yamGAAAALBJREFUeAFjoBdgVDaGAiMBsICJCxw4g/isLkggACiQgizgBhQoQRbwgAo4gxAIuIMFKp04Wby4t3hucRSBCngecZF0EXPbDhdwS3HZ5GLg2QAXcJlQwuzi4HmqAy7gxMwEFChhhAu4MK1y6fYskW4BC0SxO6yc4j2N1bPEAaLCJsT5kIuLjotPiGuIO7pLsQq0oPtlCrKAJ1CAB1mgABRCR5CNAAHO9nIoqJhAo2gDAFi+VHHfOZ2GAAAAAElFTkSuQmCC',
                title: 'Json 中文网',
                desc: 'JSON 在线解析及格式化验证',
                link: 'https://www.json.cn',
            },
        ],
    },
    {
        title: 'AI 导航',
        items: [
            {
                icon: 'https://www.notion.so/images/logo-ios.png',
                title: 'Notion AI（笔记）',
                link: 'https://www.notion.so',
            },
            {
                icon: 'https://www.midjourney.com/apple-touch-icon.png',
                title: 'Midjourney（绘画）',
                link: 'https://www.midjourney.com',
            },
            {
                icon: 'https://plantuml.com/favicon.ico',
                title: 'plantuml（uml）',
                link: 'https://plantuml.com/zh/',
            },
            {
                icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
                title: 'Beautiful.ai（PPT）',
                link: 'https://www.beautiful.ai',
            },
            {
                icon: 'https://chat9.fastgpt.me/favicon.ico',
                title: 'GPT网站',
                link: 'https://chat9.fastgpt.me',
            },
        ],
    },
    {
        title: 'Rarrot的动画库',
        items: [
            {
                icon: '/header.jpg',
                title: 'welcome',
                link: '/cartoonsMD/O.o欢迎.html',
            },
            {
                icon: '/header.jpg',
                title: '01彩虹猫',
                link: '/cartoonsMD/彩虹猫.html',
            },
            {
                icon: '/header.jpg',
                title: '文字雨',
                link: '/cartoonsMD/文字雨.html',
            },
            {
                icon: '/header.jpg',
                title: 'ikun篮球',
                link: '/cartoonsMD/篮球.html',
            },
        ],
    },
    {
        title: 'Vue',
        items: [
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 3',
                desc: '渐进式 JavaScript 框架',
                link: 'https://cn.vuejs.org',
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 2',
                desc: '渐进式 JavaScript 框架',
                link: 'https://v2.cn.vuejs.org',
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue Router',
                desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
                link: 'https://router.vuejs.org/zh',
            },
            {
                icon: 'https://pinia.vuejs.org/logo.svg',
                title: 'Pinia',
                desc: '符合直觉的 Vue.js 状态管理库',
                link: 'https://pinia.vuejs.org/zh/',
            },
            {
                icon: 'https://nuxt.com/icon.png',
                title: 'Nuxt.js',
                desc: '一个基于 Vue.js 的通用应用框架',
                link: 'https://nuxt.com',
            },
            {
                icon: 'https://vueuse.org/favicon.svg',
                title: 'VueUse',
                desc: 'Vue Composition API 的常用工具集',
                link: 'https://vueuse.org',
            },
            {
                icon: 'https://element-plus.gitee.io/images/element-plus-logo-small.svg',
                title: 'Element Plus',
                desc: '基于 Vue 3，面向设计师和开发者的组件库',
                link: 'https://element-plus.gitee.io/zh-CN/',
            },
            {
                icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
                title: 'Ant Design Vue',
                desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
                link: 'https://antdv.com',
            },
            {
                icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
                title: 'Vant',
                desc: '轻量、可定制的移动端 Vue 组件库',
                link: 'https://vant-ui.github.io/vant',
            },
            {
                icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
                title: 'Cube UI',
                desc: '基于 Vue.js 实现的精致移动端组件库',
                link: 'https://didi.github.io/cube-ui',
            },
            {
                icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
                title: 'NutUI',
                desc: '京东风格的轻量级移动端组件库',
                link: 'https://nutui.jd.com',
            },
        ],
    },
    {
        title: 'JavaScript 框架类库',
        items: [
            {
                icon: 'https://svelte.dev/svelte-logo-horizontal.svg',
                title: 'Svelte',
                desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码',
                link: 'https://svelte.dev',
            },
            {
                // icon: 'https://simpleicons.org/icons/jquery.svg',
                icon: 'https://jquery.cuishifeng.cn/images/favicon.ico',
                title: 'jQuery API 中文文档',
                desc: '一个兼容多浏览器的 JavaScript 框架',
                link: 'https://jquery.cuishifeng.cn',
            },
        ],
    },
    {
        title: 'CSS',
        items: [
            {
                icon: 'https://postcss.org/assets/postcss-rBJUTTlj.svg',
                title: 'PostCSS',
                desc: '一个用 JavaScript 转换 CSS 的工具',
                link: 'https://postcss.org',
            },
            {
                icon: 'https://less.bootcss.com/public/ico/favicon.ico',
                title: 'Less',
                desc: '一门向后兼容的 CSS 扩展语言，入门比Sass相对简单一些',
                link: 'https://less.bootcss.com/',
            },
            {
                icon: 'https://sass-lang.com/favicon.ico',
                title: 'Sass',
                desc: '一个成熟，稳定，功能强大的专业级 CSS 扩展语言',
                link: 'https://sass-lang.com',
            },
            {
                icon: 'https://www.tailwindcss.cn/favicons/favicon-16x16.png?v=3',
                title: 'TailwindCSS 中文网',
                desc: '只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。',
                link: 'https://www.tailwindcss.cn',
            },
        ],
    },
    {
        title: 'Node 相关',
        items: [
            {
                icon: 'https://nodejs.org/static/images/favicons/favicon.png',
                title: 'Node.js',
                desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
                link: 'https://nodejs.org/zh-cn',
            },
            {
                icon: 'https://expressjs.com/images/favicon.png',
                title: 'Express',
                desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
                link: 'https://expressjs.com',
            }
        ],
    },
    {
        title: '可视化',
        items: [
            {
                icon: 'https://echarts.apache.org/zh/images/favicon.png',
                title: 'ECharts',
                desc: '一个基于 JavaScript 的开源可视化图表库',
                link: 'https://echarts.apache.org/zh/index.html',
            },
            {
                icon: 'https://www.chartjs.org/favicon.ico',
                title: 'Chart.js',
                desc: '一个简单而灵活的 JavaScript 图表库',
                link: 'https://www.chartjs.org',
            },
            {
                icon: 'https://threejs.org/files/favicon.ico',
                // icon: 'https://threejs.org/files/favicon_white.ico',
                title: 'Three.js',
                desc: 'JavaScript 3d 库',
                link: 'https://threejs.org',
            },
        ],
    },
    {
        title: '编译&构建&打包',
        items: [
            {
                icon: 'https://www.webpackjs.com/icon_180x180.png',
                title: 'Webpack 中文网',
                desc: '一个用于现代 JavaScript 应用程序的静态模块打包工具',
                link: 'https://www.webpackjs.com',
            },
            {
                icon: 'https://cn.vitejs.dev/logo.svg',
                title: 'Vite 中文文档',
                desc: '下一代前端工具链',
                link: 'https://cn.vitejs.dev',
            },
            {
                icon: 'https://www.rollupjs.com/img/favicon.png',
                title: 'Rollup',
                desc: 'Rollup 是一个 JavaScript 模块打包器',
                link: 'https://www.rollupjs.com',
            },
            {
                icon: 'https://turbo.build/images/favicon-dark/apple-touch-icon.png',
                title: 'Turbo',
                desc: 'Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust',
                link: 'https://turbo.build',
            },
            {
                icon: 'https://www.babeljs.cn/img/favicon.png',
                title: 'Babel',
                desc: 'Babel 是一个 JavaScript 编译器',
                link: 'https://www.babeljs.cn',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX/////8s7/5JL/2l//0yz/zwD/++3/4H3/zQD/zgD/5JD//PH/1DX/0gD/1wD/5piZfhCwkA5VSBX1xwOhhBAAABq2lQ0+NRcgHhj/4YQZGRkYGRkuKRgACxoNERkjIRjwwwT/8so5MRgUFRm8mg0snY4pAAAA7UlEQVR4AYWTRQLDMAwEFVC7DpaZk/+/sYYwaY7eMUvUwfODkDkMfI8mWK0BKNYoAOvVMI8A7gBEvThOwAOQxJ3lleIRSjXbxMO8Nuo1EpOnaR1kjZG4PIcZ3WxdkKrdvnaR2w1sfjgeT844Hy+tYTa5aiE9HG93a6SP5+31rg1ctQDWfN4vZ6Sn471rEH2tkO4vlZH1DHzJBzvj3TMuzoBPgeJJw62hAgqZl4yQXOqMX6GNbcpZebzpXT6skQVpC/GQ4jXFh5KeWv4s+bvlgpFLjmKeLlqOpbKXGme59XwaEPebN6YJvnX7fzuDf+x8JgMBv9ZvAAAAAElFTkSuQmCC',
                title: 'esbuild',
                desc: 'An extremely fast bundler for the web',
                link: 'https://esbuild.bootcss.com/getting-started/',
            },
            {
                icon: 'https://swc.rs/favicon/apple-touch-icon.png',
                title: 'SWC',
                desc: 'Rust-based platform for the Web',
                link: 'https://swc.rs',
            },
        ],
    },
    {
        title: '字体图标库',
        items: [
            {
                icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
                title: 'iconfont',
                desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
                link: 'https://www.iconfont.cn',
            },
            {
                icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
                title: 'IconPark 图标库',
                desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
                link: 'https://iconpark.oceanengine.com/official',
            },
            {
                icon: 'https://emoji.muan.co/appicon.png',
                title: 'Emoji searcher',
                desc: 'Emoji 表情大全',
                link: '',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAA3klEQVR4AcTRIQyDMBAF0BPzQWJqEDVNrt+LmZlpvMJg5928weJtkej5BIHGI1FYkq6XTJDQMrNkZ+7E67U/Jf+l/ghcM5+COitoOQEbAcqdbYBmGs/AXLL7acyZQvUyTTJN3l9CG3Yb+gz2IrEMI+9Ct6HvgX9omLs06MrHgBxV7SsDqy0OJgIKbSHpo8C3CrBQjU8BXxrIO9JgUEDRpcGmGbDZkgSVBrPckQAuB19vDNXEwUwATZKVxii4Gqg2ZM3BeouAZwFTfrLq+gh6CrXKtMrkjr/5HnYwdBQAAOK2UWLzwEiRAAAAAElFTkSuQmCC',
                title: 'xicons',
                desc: 'xicons图标库',
                link: 'https://xicons.org/#/zh-CN',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAolBMVEVHcEwadOcZceT9vwL8vgP7vATrQzUWc+n7vASGombqQzU0qFMadOoXcun8vAM0qFMzqFI1q1Mac+jrQzXqQzTqQzXqQzU0qVMZacoXU7DqQzURaXAMY08bdPMjhsZmh7L7vAQac+nqQzU0qFMNZSwadOwXTqYLcez/vwBtiqk2rFQHXygLZA4XS6AadPIXTKMYassXYb0Sa34PaFoVVZ11jaV81rtnAAAAIHRSTlMAY/w+XshLr7cOmIKctKTsMKLqYXnS67uwxr610rDNpl67LfwAAAESSURBVDiN1dLpdoMgEAVgNGKCSZp96Q4itk2s0aR9/1fr4CAE0gdo5xfn3O94ZZSQ/zJplqXm+Dod6tnfTyKXb3KYh+6YfL8JIeLy9KnEkpk8y7tZw5G9f2hQliUAsTQA83wLR9qB5oRARB7IoYBroNoeTBBsMd8Qxn8HKwQpoQhuKsha5ysoMKB/yfhqEXoN3AK8ZsyINyMHVN1+vUR+3BUYoJpLVR3kzn8Ct0A1VVEcD1LKeViAIIYcgXT5gFugzkcLxkFBB+qisGDW53cWDEVdOSCDAs4HPpgFBZwSABcHdkEBZwBU624xDwoSAkDU534Pi5sCQqYChQbmkgkd4VC92kj/tM/7x6fFOPhWf3l+AMXpPXHMnCxVAAAAAElFTkSuQmCC',
                title: 'Google Fonts',
                desc: 'Google Fonts是Google所拥有的一个字体网站',
                link: 'https://fonts.google.com/',
            },
        ],
    },
    {
        title: '前端学习资料',
        items: [
            {
                icon: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png',
                title: 'MDN | Web 开发者指南',
                desc: 'Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资',
                link: 'https://developer.mozilla.org/zh-CN',
            },
            {
                icon: 'https://static.runoob.com/images/favicon.ico',
                title: '菜鸟教程',
                desc: '学的不仅是技术，更是梦想！',
                link: 'https://www.runoob.com',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAe1BMVEX33h/13B/23R/43x/+6CD/6yH54h/54B/95yDy2h9bUg48NgtEPgwzLguWiRdZTxEvKgw5NA3Wwh3v1x4fHAa8qRirmhfn0R53ahLhzB4kIQjV0B///yT67SH/9yFpYhHKthwTEQlNRw9nXRELCwi8rBp8cRLYwxyajRhfcytlAAAAjElEQVR4AYxOgxHAQBDMvT+27f4bjDXOjtfKL8AGhAAjdBGEEso4RYIdDJaqphsms2zH3RnEPd8MwijWkzC5iDTLi9Kq8gLvid3haGZRN60rQLkjLmdR1w8E7gjljOZjW5yEH0515A7QdoXcCCx12/HnsLHbiJ/X+F4lvISy+yregDgHpHyB1oG5mAAAWd8Ijul7VNQAAAAASUVORK5CYII=',
                title: 'ES6 入门教程',
                desc: '阮一峰的网络日志',
                link: 'http://es6.ruanyifeng.com',
            },
        ],
    },
    {
        title: '社区',
        items: [
            {
                title: 'Github',
                icon: {
                    svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
                },
                desc: '一个面向开源及私有软件项目的托管平台',
                link: 'https://github.com',
            },
            {
                icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
                title: 'Stack Overflow',
                desc: '全球最大的技术问答网站',
                link: 'https://stackoverflow.com',
            },
            {
                title: '稀土掘金',
                icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
                desc: '面向全球中文开发者的技术内容分享与交流平台',
                link: 'https://juejin.cn',
            },
            {
                title: 'V2EX',
                icon: 'https://www.v2ex.com/favicon.ico',
                desc: '一个关于分享和探索的地方',
                link: 'https://www.v2ex.com',
            },
            {
                title: 'SegmentFault 思否',
                icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
                desc: '技术问答开发者社区',
                link: 'https://segmentfault.com',
            },
            {
                title: '博客园',
                // icon: 'https://common.cnblogs.com/favicon.ico',
                icon: '	https://www.cnblogs.com/images/logo.svg?v=2SMrXdIvlZwVoB1akyXm38WIKuTHVqvGD0CweV-B6cY',
                desc: '博客园是一个面向开发者的知识分享社区',
                link: 'https://www.cnblogs.com',
            },
            {
                title: '知乎',
                icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
                desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
                link: 'https://juejin.cn',
            },
        ],
    },
    {
        title: '周刊',
        items: [
            {
                title: '阮一峰的网络日志',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB3VBMVEUAAAD///+np6dbW1ugoKD7+/uBgYEAAAA+Pj55eXlwcHDu7u4gICCfn5/KysrCwsJ6enrv7+/d3d0PDw86OjqwsLC4uLhgYGDl5eXt7e1DQ0PJyckdHR01NTVMTEwxMTFra2sSEhJOTk7m5uYcHByJiYnExMT5+fkUFBQVFRUZGRksLCxoaGjFxcXh4eH8/Py9vb1HR0c8PDzIyMjLy8vi4uKHh4dWVlZhYWFNTU1KSkpXV1cBAQEHBwdeXl7GxsZdXV0rKytmZmaysrKTk5M9PT1JSUmdnZ3x8fGLi4sfHx+RkZE0NDRQUFAnJycCAgKbm5v4+PiampojIyPk5OQ/Pz9SUlIbGxuDg4MkJCSqqqrn5+dkZGTW1tZ/f3+jo6P19fWzs7MXFxeIiIjy8vJsbGzo6OikpKQMDAzZ2dnR0dFYWFgoKChERET+/v66uro3NzdZWVkEBASrq6tnZ2d7e3u/v7+VlZXOzs4WFhb09PQGBgZ+fn6QkJAzMzM4ODi8vLzc3NwDAwPNzc3MzMwODg63t7dcXFyEhIQmJiYiIiK7u7sICAgRERF9fX05OTlfX1/39/f29vbX19dAQECurq7Hx8eCgoLe3t5ISEjT09OXl5fs7Oz6+voaGhqjDbVuAAAAAXRSTlMAQObYZgAAAZtJREFUeAFiIAwYkQGgTnrYjigIoCi6bnRj27Zt27Zt20Yj7o7zq+Hooc54l8vE1AzSpMDcgrS0srayEQHAlLZ29g6OTkLg7OLq5u7uAXgKgJeLt48v/fwDGKgOEBQcEkrSNixcHURERkXHxMbFJwj2kJjE5JTUCMEx09IzMrOYnZObl68GCgqLiktKy/hTeYUCVFa5Vmck1tTW1ZMNjYqbbGpuYZlnawvb0M6OOChAJ7u60VPN3j74s3/AYVAGhoZHRoGCsfRxTLiQnJySgZJp/Dczy5/m0ubVj7mwSC75Lq8Innt+lbRcW++qHtzI7F9XAZvc2sB2JBt2yI5dFTC614qhfXLyoPQwQXDV6WQk7YVf7ijxOOok2wMCEOEVXhR9irNz4KTK/2JFDhxmLq/oAwfNvLbcNTCH7JWCcB25MwQ0ulrpq+YxP8kLKbjmzaEzgNtj2747oGB5x1MKogLu8dPDma0XGh+nvbkEKTAY8ROs+AQscJn6Z9V7gJEWwAtJA9TBK9/ew0guQQBacz76PiOzDZACWRGQ9A00clFp4pIy1wAAAABJRU5ErkJggg==',
                link: 'https://www.ruanyifeng.com/blog/archives.html',
            },
            {
                title: 'MDH 前端周刊',
                icon: 'https://www.yuque.com/favicon.ico',
                link: 'https://www.yuque.com/chencheng/mdh-weekly',
            },
            {
                title: '值得一读技术博客',
                icon: 'https://daily-blog.chlinlearn.top/favicon.ico',
                link: 'https://daily-blog.chlinlearn.top/',
            },
            {
                title: '前端技术文章',
                icon: 'https://fed.chanceyu.com/static/favicon.ico',
                link: 'https://fed.chanceyu.com/',
            },
        ],
    },
    {
        title: '摸鱼专用',
        items: [
            {
                icon: 'https://momoyu.cc/icon-192.png',
                title: '摸摸鱼热榜',
                // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
                link: 'https://momoyu.cc',
            },
            {
                icon: 'https://static.hdslb.com/mobile/img/512.png',
                title: '哔哩哔哩',
                // desc: '',
                link: 'https://www.bilibili.com',
            },
            {
                icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
                title: 'YouTube',
                // desc: '',
                link: 'https://www.youtube.com',
            },
            {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAA3ElEQVR4Ac2SGQDFMBBE1ylOcYpTner0neK0TnGpU53iFKc6xWl+p+f25D7InZ295Cv0mGjFUOzWDVVVa/WykaBiaBBFfsiyory3JASRjs8mInqxUGRw47CIBIy7Ew0Sh0nED4OXCwkNh8h7GrrgCkVK9a7w6Q2BjoVa6Oo9EZEDVJ7I1M4UeMDXzIEhvoukFxNMaP8o4gpon1l9qnqc7DcPIgpd7Ce0t/fJVO0q0qIsVeuY1XwNYK1gwm8J2GAqvHRF5mD7BcG0Rl6yegjw0BqdakE8Bni0RyjyDf4Y1Y0n0wNT4wAAAABJRU5ErkJggg==',
                title: 'X',
                // desc: '',
                link: 'https://twitter.com',
            },
            {
                icon: 'https://www.pixiv.net/favicon.ico',
                title: 'Pixiv',
                // desc: '',
                link: 'https://www.pixiv.net',
            },
            {
                icon: 'https://modestpanda.github.io/img/favicon-16x16.png?v=2.0.0-beta.4',
                title: 'Humble熊猫',
                link: 'https://modestpanda.github.io/',
            }
        ],
    },
]