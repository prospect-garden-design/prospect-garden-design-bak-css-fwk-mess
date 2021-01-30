# TODO

# fix

# new

- design-tokens支持theming
  - 最终的用法是，用户修改theme.js/json，然后触发切换样式
  - 样式配置对象 > css vars形式的样式表 > 通过style属性设置/动态创建class样式表/直接修改cssom

# refactor

# later

# test

# engineering

- [ ] 升级@wojtekmaj/enzyme-adapter-react-17到官方版

- jest测试时最好从module字段读取import的包
- `npm install --legacy-peer-deps` to `npm i` when npm 7 is popular and stable
- package.json的scripts切换到自定义脚本的版本，尽量不直接用cli，方便扩展

- Code splitting and asynchronous loading with dynamic `import`
- release subpackage workflow

# wontfix
