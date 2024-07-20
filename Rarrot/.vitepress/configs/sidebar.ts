import type { DefaultTheme } from 'vitepress'
import sidebarAuto from './sidebarAuto'
import path from 'node:path';

function generateSidebar() {
    return {
        "/articles/博客": sidebarAuto(
            path.resolve(__dirname, "../../articles/博客"),
        ),

        "/articles/HTML": sidebarAuto(
            path.resolve(__dirname, "../../articles/HTML"),
        ),
        "/articles/css": sidebarAuto(
            path.resolve(__dirname, "../../articles/css"),
        ),

        // 定义"/articles/" 将此配置为路径，只有包含这个路径的才会出现侧边栏
        "/articles/JavaScript": sidebarAuto(
            path.resolve(__dirname, "../../articles/JavaScript"),
        ).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/JavaScript/问题"),
        )).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/JavaScript/脚本"),
        )),

        "/articles/typescript": sidebarAuto(
            path.resolve(__dirname, "../../articles/typescript"),
        ).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/typescript/问题"),
        )),

        "/articles/Vue": sidebarAuto(
            path.resolve(__dirname, "../../articles/Vue"),
        ).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/Vue/问题"),
        )).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/Vue/插件"),
        )),

        "/articles/后端/Nestjs": sidebarAuto(
            path.resolve(__dirname, "../../articles/后端/Nestjs"),
        ),

        "/articles/后端/Nginx": sidebarAuto(
            path.resolve(__dirname, "../../articles/后端/Nginx"),
        ),

        "/cartoonsMD": sidebarAuto(
            path.resolve(__dirname, "../../cartoonsMD"),
            '动画'
        ),
        "/articles/工具": sidebarAuto(
            path.resolve(__dirname, "../../articles/工具"),
        ),

        "/articles/网络": sidebarAuto(
            path.resolve(__dirname, "../../articles/网络"),
        ),

        "/articles/数据结构与算法": sidebarAuto(
            path.resolve(__dirname, "../../articles/数据结构与算法/数据结构"),
        ).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/数据结构与算法/算法"),
        )).concat(sidebarAuto(
            path.resolve(__dirname, "../../articles/数据结构与算法/其他"),
        )),

        "/articles/面试题": sidebarAuto(
            path.resolve(__dirname, "../../articles/面试题"),
        ),
    }
}

export const sidebar: DefaultTheme.Config['sidebar'] = generateSidebar()

export { generateSidebar }
// server.moduleGraph.onFileChange('/@siteData')