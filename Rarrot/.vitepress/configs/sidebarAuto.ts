import { resolve } from 'path';
import dirTree from 'directory-tree';
// import path from 'node:path';

interface SidebarItem {
  text: string;
  link?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  items?: SidebarItem[];
}

function toSidebarOption(tree: any[] = []): SidebarItem[] {
  if (!Array.isArray(tree)) return [];
  return tree.map((v) => {
    if (v.children !== undefined) {
      return {
        text: v.name,
        collapsible: true,
        collapsed: true,
        items: toSidebarOption(v.children),
      };
    } else {
      return {
        text: v.name.replace(".md", ""),
        link: v.path.split("Rarrot")[1].replace(".md", ""),
      };
    }
  });
}

// 如果第一段列表具有items属性，将不推入itemsWithData
function findItemsWithData(items: SidebarItem[]): SidebarItem[] {
  const itemsWithData: SidebarItem[] = [];

  function traverse(items: SidebarItem[]) {
    for (const item of items) {
      if (!item.items) {
        itemsWithData.push(item);
      }
    }
  }

  traverse(items);

  return itemsWithData;
}


function sidebarAuto(srcPath: string, title?: string): SidebarItem[] {
  const srcDir = dirTree(srcPath, {
    extensions: /\.md$/,
    normalizePath: true,
  });

  const sidebarItems = toSidebarOption(srcDir.children);

  const itemsWithData = findItemsWithData(sidebarItems);

  // console.log(itemsWithData);
  return [
    {
      // 判断title有没有值，有就使用传入的title值
      text: title == undefined ? srcDir.name : title,
      collapsible: true,
      collapsed: true,
      items: itemsWithData,
    },
  ];
}

export function configureServer(server: {
  watcher: {
    add: (arg0: string) => void; on: (arg0: string, arg1: (path // import path from 'node:path';
      : any) => void) => void;
  };
}) {
  const srcPath = '../../../Rarrot'; // 请替换为你的源文件路径
  server.watcher.add(resolve(srcPath));
  server.watcher.on('change', (path) => {
    if (path.endsWith('.md')) {
      // 当 .md 文件发生变化时，重新生成侧边栏
      sidebarAuto(srcPath);
    }
  });
}
// let a = sidebarAuto(path.resolve(__dirname, "../articles/JavaScript"),
//   "JavaScript"
// ).concat(sidebarAuto(
//   path.resolve(__dirname, "../articles/JavaScript/问题"),
//   "问题"
// ))
// console.log(a.forEach((value) => {
//   console.log(value)
// }))

export default sidebarAuto;