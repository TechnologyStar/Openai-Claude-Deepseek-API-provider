# 静态HTML多语言版本 / Static HTML Multilingual Version

## 📁 文件说明 / File Description

本目录包含完全独立的多语言静态HTML页面，无需Node.js环境即可直接在浏览器中打开使用。

This directory contains fully standalone multilingual static HTML pages that can be opened directly in a browser without requiring a Node.js environment.

### 文件列表 / File List

- **index.html** - 自动语言检测入口页面 / Auto language detection entry page
- **index.zh-CN.html** - 中文版本（底本）/ Chinese version (base)
- **index.en.html** - 英文版本 / English version
- **index.ru.html** - 俄语版本 / Russian version
- **index.fr.html** - 法语版本 / French version

## 🌟 特性 / Features

### ✅ 完全自包含 / Fully Self-Contained
- 所有样式直接内嵌在HTML中
- 无需外部CSS/JS文件
- 无需构建工具或服务器
- 可直接用浏览器打开

All styles are embedded directly in the HTML
No external CSS/JS files required
No build tools or server needed
Can be opened directly with a browser

### 🌍 多语言支持 / Multilingual Support
- 🇨🇳 中文 (Chinese) - 底本版本
- 🇬🇧 English - Based on Chinese content
- 🇷🇺 Русский (Russian) - Based on Chinese content
- 🇫🇷 Français (French) - Based on Chinese content

### 📊 完整数据 / Complete Data
- 60+ API提供商信息
- 8个推荐应用
- 标签图例说明
- 使用指南
- 贡献指南

60+ API providers information
8 recommended applications
Tag legend explanations
Usage guide
Contribution guide

### 🎨 现代设计 / Modern Design
- 渐变背景色
- 毛玻璃效果
- 响应式布局
- 移动端适配
- 悬停动画效果

Gradient backgrounds
Glassmorphism effects
Responsive layout
Mobile-friendly
Hover animations

## 🚀 使用方法 / Usage

### 方法1：直接打开 / Method 1: Direct Opening

```bash
# 在浏览器中打开任意HTML文件
# Open any HTML file in a browser

# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

### 方法2：本地服务器 / Method 2: Local Server

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (如果已安装 / if installed)
npx http-server -p 8000

# 然后访问 / Then visit
# http://localhost:8000
```

### 方法3：在线部署 / Method 3: Online Deployment

可以直接将HTML文件部署到以下平台：
You can directly deploy HTML files to the following platforms:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **GitLab Pages**
- 任何支持静态文件的主机 / Any static file hosting

## 🔄 与React版本的关系 / Relationship with React Version

### React版本 (client/) / React Version
- 需要Node.js环境和构建
- 支持更复杂的交互功能
- 使用TanStack Query进行数据获取
- 支持客户端路由
- 适合开发和扩展功能

Requires Node.js environment and build
Supports more complex interactive features
Uses TanStack Query for data fetching
Supports client-side routing
Suitable for development and extending features

### HTML版本 (当前目录) / HTML Version (Current Directory)
- 纯静态文件，无需构建
- 完全自包含，易于部署
- 可直接分享和使用
- 适合快速查看和分享
- 适合无法运行Node.js的环境

Pure static files, no build required
Fully self-contained, easy to deploy
Can be directly shared and used
Suitable for quick viewing and sharing
Suitable for environments without Node.js

## 📝 内容更新 / Content Updates

如需更新内容，请遵循以下步骤：
To update content, follow these steps:

1. **更新中文版本（底本）**：编辑 `index.zh-CN.html`
   Update Chinese version (base): Edit `index.zh-CN.html`

2. **同步到其他语言**：根据中文版本更新其他语言文件
   Sync to other languages: Update other language files based on Chinese version

3. **保持一致性**：确保所有语言版本的数据条目数量一致
   Maintain consistency: Ensure all language versions have the same number of data entries

## 🎯 浏览器兼容性 / Browser Compatibility

支持所有现代浏览器：
Supports all modern browsers:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## 📱 移动端支持 / Mobile Support

所有HTML页面都经过优化，支持移动设备：
All HTML pages are optimized for mobile devices:

- 响应式设计 / Responsive design
- 触摸友好 / Touch-friendly
- 性能优化 / Performance optimized
- 小屏幕适配 / Small screen adapted

## 🔗 相关链接 / Related Links

- 项目主页 / Project Homepage: https://github.com/TechnologyStar/Openai-Claude-Deepseek-API-provider
- 中文README / Chinese README: [../README.md](../README.md)
- React版本 / React Version: [./client/](./client/)

## 📄 许可证 / License

与项目主仓库保持一致。
Same as the main project repository.

---

**Made with ❤️ by TechnologyStar**
