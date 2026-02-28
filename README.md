# Personal Website

个人品牌网站，一个简洁的作品集展示页面。

## 项目结构

```
personal_website/
├── index.html    # 主页面
├── css/
│   └── style.css # 样式文件
└── js/
    └── main.js   # 交互逻辑
```

## 功能特点

- **首页轮播图**: 展示光影瞬间
- **关于我**: 个人简介区域
- **作品集**: 卡片式作品展示
- **联系页脚**: 公众号二维码、社交链接

## 技术栈

- HTML5
- CSS3 (响应式设计)
- JavaScript (原生)
- Font Awesome 图标
- Google Fonts

## 快速开始

直接在浏览器中打开：

```bash
# 方法1: 直接打开
open personal_website/index.html

# 方法2: 使用简单HTTP服务器
cd personal_website
python -m http.server 8080
```

然后访问 `http://localhost:8080`

## 自定义

### 修改个人信息
编辑 `index.html` 中的内容：
- 个人介绍: 修改 `<section id="about">` 中的文字
- 作品集: 修改 `js/main.js` 中的数据

### 修改样式
编辑 `css/style.css`

### 修改交互逻辑
编辑 `js/main.js`

## 依赖

- Font Awesome (CDN)
- Google Fonts (CDN)

无需本地安装依赖
