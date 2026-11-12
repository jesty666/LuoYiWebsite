# LuoYiWebsite

洛弈官方产品介绍页，使用原生 HTML、CSS 和 JavaScript 构建，适合直接部署到 Cloudflare Pages。

## 本地预览

```bash
python3 -m http.server 4173
```

打开 <http://localhost:4173>。

## Cloudflare Pages

这是纯静态站点，不需要构建命令：

- Framework preset：`None`
- Build command：留空
- Build output directory：`.`

也可以把仓库连接到 Cloudflare Pages，推送到 `main` 后自动部署。

## 文件结构

- `index.html`：官网页面结构和 SEO 元信息。
- `styles.css`：响应式布局、视觉样式和动画。
- `script.js`：导航、滚动出现和功能预览切换。
- `public/assets/`：洛弈图标和 App 截图。
- `_headers`：Cloudflare Pages 的缓存与安全响应头。
