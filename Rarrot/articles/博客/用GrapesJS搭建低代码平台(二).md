# 用GrapesJS搭建低代码平台(二)
接下来介绍如何自定义组件：

通过学习插件[GrapesJS Navbar](https://github.com/GrapesJS/components-navbar)来学会怎么自定义组件。

## 自定义导航栏组件

### 组件结构和功能
1. **组件的基本定义**：
   - 组件使用 `Components.addType` 方法添加，传入组件的 `id` 和 `model`。
   - `model` 定义了组件的默认属性、样式和子组件。

2. **顶部导航栏的子组件**：
   - `idContainer`: 包含导航栏的主要结构，包含 logo、菜单和汉堡菜单。
   - `idNavMenu`: 包含导航菜单项。
   - `idNavMenuLink`: 定义导航菜单中的每个链接。
   - `idBurgerMenu`: 定义汉堡菜单，当屏幕宽度缩小到一定程度时显示。
   - `idBurgerMenuLine`: 汉堡菜单的每一条线。

3. **样式**:
   - 导航栏和子组件的样式通过 `styles` 属性定义。
   - 提供了媒体查询以处理响应式设计，当宽度小于 768px 时，显示汉堡菜单。

4. **脚本**:
   - 汉堡菜单的展开/折叠功能通过 JavaScript 实现，绑定点击事件。

### 使用方法
1. 定义选项 `opts`，包括 `id`, `label`, `classPrefix` 等。
2. 调用 `addNavBar` 函数，将自定义的导航栏组件添加到 `editor` 中。
3. 使用 `editor.BlockManager.add` 将导航栏组件添加到块管理器中，以便在编辑器中使用。

### 完整的导航栏组件定义

```javascript
export const addNavBar = (editor, opts) => {
  const { Components } = editor;
  const { id, label } = opts;

  const navbarPfx = opts.classPrefix;
  const idContainer = `${id}-container`;
  const idNavMenu = `${id}-nav-menu`;
  const idNavMenuLink = `${id}-nav-menu-link`;
  const idBurgerMenu = `${id}-burger-menu`;
  const idBurgerMenuLine = `${id}-burger-menu-line`;

  Components.addType(id, {
    model: {
      defaults: {
        droppable: false,
        name: label,
        attributes: { class: navbarPfx },
        components: { type: idContainer },
        styles:
          (opts.style ||
            `
          .${navbarPfx} {
            background-color: #fff;
            color: #000;
            min-height: 50px;
            width: 100%;
            border-bottom:2.5px solid #e9e9e9;
          }

          .${navbarPfx}-container {
            // max-width: 1200px;
            margin: 0 auto;
            width: 96%;
          }

          .${navbarPfx}-items-c {
            display: inline-block;
            float: right;
          }

          .${navbarPfx}-container::after {
            content: "";
            clear: both;
            display: block;
          }

          .${navbarPfx}-logo {
            vertical-align: top;
            display: inline-block;
            padding: 10px 5px 1px 5px;
            min-height: 50px; 
            min-width: 50px;  
            max-height: 150px; 
            max-width: 150px;  
            object-fit: contain; /* 确保图像保持纵横比 */
            color: inherit;
            text-decoration: none;
          }

          .${navbarPfx}-menu {
            padding: 10px 0;
            display: block;
            float: right;
            margin: 0;
          }

          .${navbarPfx}-menu-link {
            margin: 0;
            color: inherit;
            text-decoration: none;
            display: inline-block;
            padding: 10px 15px;
          }

          .${navbarPfx}-burger {
            margin: 10px 0;
            width: 45px;
            padding: 5px 10px;
            display: none;
            float: right;
            cursor: pointer;
          }

          .${navbarPfx}-burger-line {
            padding: 1px;
            background-color: black;
            margin: 5px 0;
          }

          @media (max-width: 768px) {
            .${navbarPfx}-items-c {
              display: none;
              width: 100%;
            }

            .${navbarPfx}-burger {
              display: block;
            }

            .${navbarPfx}-menu {
              width: 100%;
            }

            .${navbarPfx}-menu-link {
              display: block;
            }
          }
        `) + opts.styleAdditional,
      },
    },
  });

  Components.addType(idContainer, {
    model: {
      defaults: {
        attributes: { class: `${navbarPfx}-container`, 'data-gjs': 'navbar' },
        name: 'Navbar Container',
        droppable: false,
        draggable: false,
        removable: false,
        copyable: false,
        highlightable: false,
        components: [
          {
            type: 'image',
            attributes: { class: `${navbarPfx}-logo`, src: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/file.png', alt: 'Brand' },
          },
          { type: idBurgerMenu },
          {
            attributes: {
              class: `${navbarPfx}-items-c`,
              'data-gjs': 'navbar-items',
            },
            components: { type: idNavMenu },
          },
        ],
      },
    },
  });

  Components.addType(idNavMenu, {
    model: {
      defaults: {
        name: 'Navbar Menu',
        tagName: 'nav',
        attributes: { class: `${navbarPfx}-menu` },
        components: [
          { type: idNavMenuLink, components: '导航' },
          { type: idNavMenuLink, components: '博客' },
          { type: idNavMenuLink, components: '前端' },
          { type: idNavMenuLink, components: '后端' },
          { type: idNavMenuLink, components: '工具' },
          { type: idNavMenuLink, components: '动画' },
        ],
      },
    },
  });

  Components.addType(idNavMenuLink, {
    extend: 'link',
    model: {
      defaults: {
        name: 'Menu link',
        draggable: `[data-gjs-type="${idNavMenu}"]`,
        attributes: { class: `${navbarPfx}-menu-link` },
      },
    },
  });

  Components.addType(idBurgerMenu, {
    model: {
      defaults: {
        name: 'Burger',
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: function () {
          // @ts-ignore
          const currentEl = this;
          const stringCollapse = 'gjs-collapse';
          const clickEvent = 'click';
          const transitProp = 'max-height';
          let transEndAdded;
          let isAnimating = 0;

          const getTransitionEvent = function () {
            const el = document.createElement('void');
            const transitions = {
              transition: 'transitionend',
              OTransition: 'oTransitionEnd',
              MozTransition: 'transitionend',
              WebkitTransition: 'webkitTransitionEnd',
            };

            for (let t in transitions) {
              // @ts-ignore
              if (el.style[t] !== undefined) {
                return transitions[t];
              }
            }
          };

          const transitEndEvent = getTransitionEvent();

          var getElHeight = function (el) {
            const style = window.getComputedStyle(el);
            const elDisplay = style.display;
            // @ts-ignore
            const elMaxHeight = parseInt(style[transitProp]);

            if (elDisplay !== 'none' && elMaxHeight !== 0) {
              return el.offsetHeight;
            }

            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            const height = el.offsetHeight;
            el.style.height = '';
            el.style.display = '';
            el.style.position = '';
            el.style.visibility = '';

            return height;
          };

          var toggleSlide = function (el) {
            isAnimating = 1;
            var elMaxHeight = getElHeight(el);
            var elStyle = el.style;
            elStyle.display = 'block';
            elStyle.transition = `${transitProp} 0.25s ease-in-out`;
            elStyle.overflowY = 'hidden';

            if (elStyle[transitProp] == '') {
              elStyle[transitProp] = 0;
            }

            if (parseInt(elStyle[transitProp]) == 0) {
              elStyle[transitProp] = '0';
              setTimeout(function () {
                elStyle[transitProp] = elMaxHeight + 'px';
              }, 10);
            } else {
              elStyle[transitProp] = '0';
            }
          };

          const toggle = function (ev) {
            ev.preventDefault();
            if (isAnimating) return;

            const navParent = currentEl.closest('[data-gjs=navbar]');
            const navItems = navParent.querySelector('[data-gjs=navbar-items]');
            navItems && toggleSlide(navItems);

            if (!transEndAdded) {
              navItems.addEventListener(transitEndEvent, function () {
                isAnimating = 0;
                const itemsStyle = navItems.style;
                if (parseInt(itemsStyle[transitProp]) == 0) {
                  itemsStyle.display = '';
                  itemsStyle[transitProp] = '';
                }
              });
              transEndAdded = 1;
            }
          };

          if (!(stringCollapse in currentEl)) {
            currentEl.addEventListener(clickEvent, toggle);
          }

          // @ts-ignore
          currentEl[stringCollapse] = 1;
        },
        attributes: { class: `${navbarPfx}-burger` },
        components: [
          { type: idBurgerMenuLine },
          { type: idBurgerMenuLine },
          { type: idBurgerMenuLine },
        ],
      },
    },
  });

  Components.addType(idBurgerMenuLine, {
    model: {
      defaults: {
        name: 'Burger Line',
        droppable: false,
        draggable: false,
        highlightable: false,
        attributes: { class: `${navbarPfx}-burger-line` },
      },
    },
  });
};
```

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202407201956672.png)


## 自定义卡片组件

此组件为案例卡片组件，双击图片可以更改图片，点击text可以修改说明文字，需要横向排列可以设置样式的`float`为`left`或`right`。

```JavaScript
export const addCaseCard = (editor) => {
  const { Components } = editor;

  Components.addType('CaseCard', {
    model: {
      defaults: {
        name: 'CaseCard',
        droppable: false,
        attributes: { class: 'case-card' },
        components: [
          {
            type: 'div',
            attributes: { class: 'case-card-wrapper' },
            components: [
              {
                type: 'image',
                // 当拖动图片时，会通过.case-card-image类来更改样式，
                // 但是没有设置class时，会使用随机生成的id来进行属性选择器修改宽高
                attributes: {
                  src: 'https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/rarrot.webp',
                },
              },
              {
                type: 'text',
                attributes: { class: 'case-card-description' },
                content: "Welcome to Mr.Rarrot's Blog",
              },
            ],
          },
        ],
        // script() {
        //   const El = document.getElementById(Id);
        // },
        styles: `
          .case-card-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #e9e9e9;
            padding: 10px;
            margin: 10px;
            width: 350px;
          }
          .case-card-wrapper img {
            max-width: 100%;
            margin-bottom: 10px;
          }
          .case-card-description {
            text-align: center;
          }
        `,
      },
    },
  });
};
```