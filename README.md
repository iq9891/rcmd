# rcmd

> 本地运行 react 组件命令行工具

[![@fe6/rcmd](https://img.shields.io/npm/v/@fe6/rcmd.svg?style=flat-square)](https://www.npmjs.org/package/@fe6/rcmd)
[![NPM downloads](http://img.shields.io/npm/dm/@fe6/rcmd.svg?style=flat-square)](https://npmjs.org/package/@fe6/rcmd)
[![Package Quality](http://npm.packagequality.com/shield/@fe6/rcmd.svg)](http://packagequality.com/#?package=@fe6/rcmd)
[![NPM downloads](https://img.shields.io/npm/dt/@fe6/rcmd.svg?style=flat-square)](https://npmjs.org/package/@fe6/rcmd)

## 使用

```
$ rcmd server
$ rcmd build
```

package.json 配置的例子

```
({
  "config": { // 打包配置
    "publicFolder": "examples", // 公共的本地开发的目录
    "entryStyleFile": "index.tsx", // css 入口文件
    "entryStyleFolder": "styles", // css 入口文件夹
    "entryFile": "index.tsx", // js 入口文件
    "entryFolder": "component", // js 入口文件夹
    "outputFolder": "dist", // 打包输出的文件夹
    "rootFolder": "src", // 源文件的根目录
    "port": 9092 // 本地开发的端口
  }
})
```

## 命令的功能

### rcmd server
  - style
    - 语法检测
    - sass 转译 css
  - js
    - 语法检测
    - tsx 转译
  - html
    - 渲染 react
    - 实时编译

### rcmd build
  - style
    - 语法检测
    - sass 转译 css
    - 压缩
    - postcss 低版本兼容
  - js
    - 语法检测
    - tsx 转译
    - 打包
    - 语法低版本兼容

## 更新历史

### 0.1.0
   - 本地开发命令 `rcmd server` 或者 `rcmd s` [#83a1127](https://github.com/fe6/rcmd/commit/496c11073c665811543d1c709bc56df621ce1982)
   - 本地打包压缩版命令 `rcmd build` 或者 `rcmd b` [#aaed786](https://github.com/fe6/rcmd/commit/aaed7861872c4b10359c41d95c3f60dca4175adb)
