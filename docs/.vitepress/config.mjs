import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import colorTextPlugin from './plugins/markdown-it-color.js'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
    // 网站标题
    title: 'zzq323 的技术博客',
    base: '/blog/',
    markdown: {
        config: (md) => {
            md.use(mathjax3)
            md.use(markdownItMark)  // ==高亮==
            md.use(markdownItIns)   // ++下划线++
            md.use(markdownItSub)   // ~下标~
            md.use(markdownItSup)   // ^上标^
            md.use(colorTextPlugin)
        }
    },
    // 引入 KaTeX 样式
    head: [
        [
            'script',
            {
                src: 'https://polyfill.io/v3/polyfill.min.js?features=es6'
            }
        ],
        [
            'script',
            {
                id: 'MathJax-script',
                async: true,
                src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
            }
        ]
    ],
    // 网站描述
    description: '算法、前端、后端、数据库技术笔记',
    // 新增：禁用死链接检查
    ignoreDeadLinks: true,
    // 主题配置
    themeConfig: {
        outline: {
            level: [2, 4], // 显示 h2 到 h4
            label: '目录', // 可选,自定义标题文字,默认是 "On this page"
        },
        // 顶部导航栏（大分类）
        nav: [
            { text: '首页', link: '/' },
            { text: '算法', link: '/algorithm/', activeMatch: '/algorithm/' },
            { text: '前端', link: '/frontend/' },
            { text: '后端', link: '/backend/' },
            { text: '数据库', link: '/database/' },
            { text: '使用工具', link: '/tools/' },
            { text: '测试', link: '/test/' },
            { text: '运维', link: '/operations/' },
        ],
        // 侧边栏配置（多层分类）
        sidebar: {
            // 算法栏目的侧边栏
            '/algorithm/': [
                {
                    text: '首页',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '简介', link: '/algorithm/index' },
                    ]
                },
                {
                    text: '基础',
                    collapsed: false,
                    items: [
                        { text: '懒人语法块', link: '/algorithm/basics/usually' },
                        { text: '排序算法', link: '/algorithm/basics/sorting' },
                        { text: '双指针', link: '/algorithm/basics/two-pointer' },
                    ]
                },
                {
                    text: '数据结构',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '数组、指针、链表', link: '/algorithm/data-structure/array' },
                        { text: '线段树-树状数组', link: '/algorithm/data-structure/interval-tree' },
                        { text: '二叉树与平衡树', link: '/algorithm/data-structure/bin-tree' },
                    ]
                },
                {
                    text: '动态规划',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '基础线性dp', link: '/algorithm/dynamic-programming/linear' },
                        { text: '背包问题', link: '/algorithm/dynamic-programming/bag' },
                        { text: '区间dp', link: '/algorithm/dynamic-programming/interval' },
                        { text: '树形dp', link: '/algorithm/dynamic-programming/tree' },
                        { text: '数位dp', link: '/algorithm/dynamic-programming/digital' },
                        { text: '状压dp', link: '/algorithm/dynamic-programming/state' },
                        { text: '题单', link: '/algorithm/dynamic-programming/collection' },
                    ]
                },
                {
                    text: '计算几何',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '闭包', link: '/algorithm/computational-geometry/linear' },
                        { text: '半平面角', link: '/algorithm/computational-geometry/interval' },
                        { text: '', link: '/algorithm/computational-geometry/tree' },
                    ]
                },
                {
                    text: '数论',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '幂等性', link: '/algorithm/number-theory/linear' },
                        { text: '', link: '/algorithm/number-theory/interval' },
                        { text: '', link: '/algorithm/number-theory/tree' },
                    ]
                },
                {
                    text: '图论',
                    collapsed: false,  // 默认展开
                    items: [
                        { text: '图论基础', link: '/algorithm/graph-theory/graph' },
                        { text: '并查集', link: '/algorithm/graph-theory/disjoint-set' },
                        { text: '', link: '' },
                    ]
                },

            ],

            // 前端栏目的侧边栏
            '/frontend/': [
                {
                    text: 'uniapp',
                    collapsed: false,
                    items: [
                        { text: 'Flex 布局', link: '/frontend/css/flex' }
                    ]
                },
                {
                    text: 'miniApp',
                    collapsed: false,
                    items: [
                        { text: '常用语法', link: '/frontend/css/flex' }
                    ]
                },
                {
                    text: 'Vue',
                    collapsed: false,
                    items: [
                        { text: '响应式原理', link: '/frontend/vue/reactive' },
                        { text: 'Composition API', link: '/frontend/vue/composition-api' }
                    ]
                },
                {
                    text: 'React',
                    collapsed: false,
                    items: [
                        { text: 'Hooks 详解', link: '/frontend/react/hooks' }
                    ]
                },
                {
                    text: '传统H5知识点',
                    collapsed: false,
                    items: [
                        { text: 'Flex 布局', link: '/frontend/css/flex' }
                    ]
                },

            ],

            // 后端栏目的侧边栏
            '/backend/': [
                {
                    text: 'SpringCloud',
                    collapsed: false,
                    items: [
                        { text: 'Spring 框架', link: '/backend/nodejs/express' }
                    ]
                },
                {
                    text: 'Node.js',
                    collapsed: false,
                    items: [
                        { text: 'Express 框架', link: '/backend/nodejs/express' }
                    ]
                },
                {
                    text: 'Python',
                    collapsed: false,
                    items: [
                        { text: 'FastApi', link: '/backend/python/fastapi' }
                    ]
                }
            ],

            // 数据库栏目的侧边栏
            '/database/': [
                {
                    text: '流式技术',
                    collapsed: false,
                    items: [
                        { text: "流式技术基础", link: '/database/stream/' },
                        { text: "KafKa 基础", link: '/database/stream/' },
                    ]
                },
                {
                    text: '持久化 数据库',
                    collapsed: false,
                    items: [
                        { text: 'MySQL 基础', link: '/database/mysql/' },
                        { text: 'TdeEngine 基础', link: '/database/mysql/' },
                        { text: 'MINIO 基础', link: '/database/mysql/' },
                    ]
                },
                {
                    text: '内存/缓存 数据库',
                    collapsed: false,
                    items: [
                        { text: 'Redis 基础', link: '/database/redis/basic' }
                    ]
                }
            ],
            '/tools/': [
                {
                    text: '其他工具',
                    collapsed: false,
                    items: [
                        { text: "latex", link: '/tools/latex' },
                    ]
                },
            ],
            '/test/': [
                {
                    text: '测试知识',
                    collapsed: false,
                    items: [
                        { text: "docker", link: '/operations/docker' },
                        { text: "K8S", link: '/operations/K8S' },
                        { text: "Nacos", link: '/operations/nacos' },
                        { text: "Ngnix", link: '/operations/ngnix' },
                        { text: "云效流水线配置", link: '/operations/pipeline' },
                    ]
                },
            ],
            '/operations/': [
                {
                    text: '运维知识',
                    collapsed: false,
                    items: [
                        { text: "docker", link: '/operations/docker' },
                        { text: "K8S", link: '/operations/K8S' },
                        { text: "Nacos", link: '/operations/nacos' },
                        { text: "Ngnix", link: '/operations/ngnix' },
                        { text: "云效流水线配置", link: '/operations/pipeline' },
                    ]
                },
            ],
        },
        // 社交链接（可选）
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ZZQ323' }
        ],
        // 页脚（可选）
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present'
        },
        // 搜索功能（可选）
        search: {
            provider: 'local'
        },
    },

    mermaid: {
        // 可选：mermaid 自身的配置，比如主题
    },
    mermaidPlugin: {
        class: 'mermaid my-class', // 给渲染出来的容器加 class，方便自定义样式
    },
})