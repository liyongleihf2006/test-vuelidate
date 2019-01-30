# my-vue-webpack
**概述**

自己写的webpack打包vue的配置

**为什么自己写，而不使用vue-cli?**

因为我感觉vue-cli太复杂了，不方便自己改造或扩展，自己写一个配置至少明白每一项是用来干什么，出了问题也好排查

**我的webpack配置思想**

- 开发环境将node_modules引入的组件打包到dll.js中,一是为了浏览器缓存,二是为了开发服务每次修改自动编译时的速率更快(应该会更快吧?--至少监听的资源少了，节省内存)
- 生产环境将node_modules引入的组件抽出到node_modules.js中，不使用开发环境的配置方式的原因是可能会对其进行tree-shaking
- babelrc.js中根据是开发环境还是生产环境来决定env是使用最新版本的chrome还是兼容低版本的ie，提升打包速率
- 在开发环境中mock自动注入,代码要无侵染性
- 项目中资源的引入方式既要支持使用传统的标签引入方式(即js通过script,css通过link),也要支持import方式引入
- 开发环境中的第三方资源（我指的是使用bower等方式引入的）不需要打包到dist中,而只需要项目引入中指向其路径(应该会提升编译速率吧?--)
