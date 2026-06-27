# PokePop

宝可梦属性克制快捷查询工具，基于 Tauri v2 构建。

## 功能

- **属性克制查询** — 搜索宝可梦或手动选择属性，计算攻击方对防守方的克制倍率（支持双属性）
- **属性克制表** — 18×18 交互式克制矩阵，点击表头/行头/单元格筛选并高亮，支持双属性合并显示
- **按属性查宝可梦** — 按属性筛选宝可梦列表，支持单属性或双属性组合查询
- **闪光切换** — 点击宝可梦图片切换普通/闪光形态
- **全局快捷键** — `Ctrl+Alt+1` 呼出/隐藏窗口
- **系统托盘** — 托盘图标，左键单击显示/隐藏，右键菜单退出
- **大头针固定** — 固定后窗口失焦不自动隐藏
- **毛玻璃透明** — Windows 丙烯酸模糊效果，圆角窗口

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

安装包位于 `src-tauri/target/release/bundle/nsis/`。

## 数据来源

- 宝可梦数据：[42arch/pokemon-dataset-zh](https://github.com/42arch/pokemon-dataset-zh)

## 作者

[@ZTMYO](https://github.com/ZTMYO)
