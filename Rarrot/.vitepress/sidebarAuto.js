// const path = require("path");
// const { useData } = require('vitepress')
const dirTree = require("directory-tree");

// params is a Vue ref
// const { params } = useData()

// console.log(params.value)

function toSidebarOption(tree = []) {
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


function sidebarAuto(srcPath, title) {
  const srcDir = dirTree(srcPath, {
    extensions: /\.md$/,
    normalizePath: true,
  });


  return [
    {
      // 判断title有没有值，有就使用传入的title值
      text: title == undefined ?  srcDir.name : title ,
      collapsible: true,
      collapsed: true,
      items: toSidebarOption(srcDir.children),
    },
  ];

}
// let a=sidebarAuto(path.resolve(__dirname, "../articles/typescript"),
// "typescript")
// console.log(a[0])

module.exports = sidebarAuto;
