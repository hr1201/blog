import type { Plugin,UserConfig } from 'vitepress'
import { generateSidebar } from './sidebar';
import config from '../config';

// 使用vite插件的fs进行监听文件变化，当变化时看是否能拿到config.ts中的实例，
// 给sidebar进行重新赋值使用vite插件的fs进行监听文件变化，当变化时看是否能拿到config.ts中的实例，给sidebar进行重新赋值

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
                    console.log(`${event} ${path}`);
                    try {
                        // 获取到config的sidebar，需要传入新的sidebar过来
                        (config as UserConfig).themeConfig.sidebar = generateSidebar()
                        await restart();
                        // console.log(typeof path,path)//string

                        console.log('update sidebar...');
                    } catch {
                        console.log(`${event} ${path} faild`);
                        console.log('update sidebar failed');
                    }
                }
            });
        },
    }
}