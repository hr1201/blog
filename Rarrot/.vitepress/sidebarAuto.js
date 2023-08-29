const path = require("path");
const dirTree = require("directory-tree");

function toSidebarOption(tree = []) {
  if (!Array.isArray(tree)) return [];
  // console.log(tree)
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
function findItemsWithData(items) {
  const itemsWithData = [];

  function traverse(items) {
    for (const item of items) {
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


// let a = sidebarAuto(path.resolve(__dirname, "../articles/JavaScript"),
//   "JavaScript"
// ).concat(sidebarAuto(
//   path.resolve(__dirname, "../articles/JavaScript/问题"),
//   "问题"
// ).concat(sidebarAuto(
//   path.resolve(__dirname, "../articles/JavaScript/你好"),
//   "你好"
// )))
// console.log(a.forEach((value) => {
//   // console.log(value)
// }))

module.exports = sidebarAuto;
