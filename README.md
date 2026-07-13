# IsItReal

学习笔记。

启动方式 …… 不会看配置的么？

## 题目模板

vitepress 自带的快速标记

```
::: details
:::
::: tip
:::
::: danger 请注意
:::
```

更全：

```
::: tip 提示
这是一段提示信息
:::

::: warning 注意
这是警告
:::

::: danger 危险
这是危险提示
:::

::: info 说明
这是普通说明
:::

::: details 点击展开
折叠的详细内容
:::
```




## 安装包

### 快速样式

- 快速样式：`npm install -D markdown-it-mark markdown-it-attrs`

然后在 `.vitepress/config.ts` 里

```js
import markdownItMark from 'markdown-it-mark'
import markdownItAttrs from 'markdown-it-attrs'

export default withMermaid({
  markdown: {
    config: (md) => {
      md.use(markdownItMark)
      md.use(markdownItAttrs)
    },
  },
})
```

`markdown-it-mark` 常见用法： 
```vitepress
~~这是被划掉的内容~~,==这是新的重点==
```

`markdown-it-attrs` 常见用法： 

```vitepress
// 给标题加 id(方便锚点跳转,但 VitePress 标题默认已经自动生成 id 了,这个用处不大)
## 我的标题 {#custom-id}
// 给图片加宽高/样式
![描述](./image.png){width=300px}
![描述](./image.png){.rounded-shadow width=400px}

这是一段说明文字。{.small-gray}


\```js {.my-code-style}
console.log('hello')
\```

```


### 画图工具

- mermaid画图工具：`npm install -D mermaid vitepress-plugin-mermaid`

然后在 `.vitepress/config.ts` 里

```js
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
  mermaid: {
    // 可选：mermaid 自身的配置，比如主题
  },
  mermaidPlugin: {
    class: 'mermaid my-class', // 给渲染出来的容器加 class，方便自定义样式
  },
})
```

注意：withMermaid 返回的类型和 defineConfig 不完全一致（TS 报错的话用 defineConfigWithTheme 或者直接 // @ts-ignore 也行,不影响构建）。


