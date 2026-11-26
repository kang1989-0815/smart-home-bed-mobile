# 智慧家床移动端

按 WinDesign 移动端规范实现的患者与医护服务演示应用。使用 HTML、CSS 和 JavaScript ES Modules，局部通过 Vue 挂载真实 WinDesign Next 头像和单选组件；其余移动端组件为项目本地封装。

## 启动

已包含运行所需的组件构建产物，无需安装依赖。需要 Python 3：

```sh
python3 -m http.server 5187 --bind 127.0.0.1
```

打开 http://127.0.0.1:5187/#/identity 。请通过 HTTP 服务访问，不要直接打开 HTML 文件。

## 功能

- 患者、医护身份入口与本地身份记忆。
- 首页常用服务、患者切换、建床记录切换。
- 就诊卡管理与新增（姓名、手机号、身份证校验）。
- 费用查询及明细、报告查询、服务评价、上门服务。
- 七类体征记录、数值步进器、日期滚轮和统计图表。
- 患者列表、患者详情、处方和医嘱展示。

本项目使用本地示例数据。身份认证、绑卡、咨询、费用和报告均未接入生产接口；保存的数据位于当前浏览器的 localStorage。医护演示账号为 `demo`，演示密码为 `demo123`，仅用于本地界面演示。

## 目录

- `app.js`：路由与应用入口。
- `features.js`、`clinical.js`、`patient.js`：业务页面。
- `mobile-form.js`、`datetime-picker.js`：移动端表单封装。
- `card-management.js`、`bed-history.js`：就诊卡与建床记录。
- `vendor/`：运行所需的 Vue / WinDesign 组件构建产物。
- `vendor-src/`：组件适配器源码及构建脚本。
- `assets/win-avatars/`：头像资源。

## 重建头像和单选组件

需要在本地安装 `vue`、`win-design-next@1.3.4` 和 `esbuild`，然后指定该依赖目录：

```sh
WIN_AVATAR_NODE_MODULES=/absolute/path/to/node_modules node vendor-src/build-avatar.cjs
```

WinDesign 的设计资产和组件依赖遵循其原始授权。本仓库不附带原始 PDF、Sketch 设计文件及个人浏览器数据。
