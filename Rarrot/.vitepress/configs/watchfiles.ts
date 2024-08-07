// import { defineConfig } from 'vitepress';
import type { Plugin,UserConfig } from 'vitepress'
import { generateSidebar } from './sidebar';
import defineConfig from '../config';

// 使用vite插件的fs进行监听文件变化，当变化时看是否能拿到config.ts中的实例，
// 给sidebar进行重新赋值使用vite插件的fs进行监听文件变化，当变化时看是否能拿到config.ts中的实例，给sidebar进行重新赋值

// configureServer 在运行生产版本时不会被调用
export const FileHMR = (): Plugin => {
    return {
        name: 'vite-file-hmr',
        configureServer({
            watcher,
            restart
        }) {
            const fsWatcher = watcher.add('*.md');
            fsWatcher.on('all', async (event: string, path: string) => {
                if (event !== 'change') {
                    try {
                        // 获取到config的sidebar，需要传入新的sidebar过来
                        (defineConfig as UserConfig).themeConfig.sidebar = generateSidebar()
                        await restart();
                        // console.log(typeof path,path)//string
                    } catch (error: any){
                        console.log(error)
                    }
                }
            });
        },
    }
}
