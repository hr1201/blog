// export default function VitePluginAutoSidebar() {
//     return {
//         name: "VitePluginAutoSidebar",
//         configureServer: ({ watcher, restart }: ViteDevServer) => {
//             const fsWatcher = watcher.add("*.md");
//             fsWatcher.on("all", (event, filePath) => {
//                 if (event === "addDir") return;
//                 if (event === "unlinkDir") return;
//                 if (event == "add") return;
//                 if (event === "unlink") {
//                     restart();
//                     return;
//                 }
//                 if (event === "change") {
//                     const title = matchTitle(filePath);
//                     const route = getRoute(opts.root, filePath);
//                     if (!route || !title) return;
//                     // 未更新 title
//                     if (title === titleCache[route]) return;
//                     restart();
//                     return;
//                 }
//             });
//         },
//     };
// }

