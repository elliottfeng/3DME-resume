# 冯宇洋 · 个人 3D 简历站

**v1.0.0** · 2026-11-12

基于 [dayinji/sen-3d-resume](https://github.com/dayinji/sen-3d-resume)（提交 `c9a9fe3`，代码 MIT）二次开发。
上游的姓名、人物模型、简历、作品与品牌素材已移除或替换；`LICENSE` 与 `NOTICE` 保留。

## 本地运行

```bash
cd web
npm install
npm run dev        # http://localhost:5173
```

常用命令：

```bash
npm run typecheck
npm run lint
npm run build      # 输出 web/dist
npm run preview
```

## 内容在哪里改

| 想改什么 | 文件 |
|---|---|
| 首屏姓名、About 文案、邮箱/项目链接 | `web/src/App.tsx` 的 `COPY` 与 `hero-meta` |
| 履历、学历、职位、要点 | `web/src/ui/Resume.tsx` 的 `RESUME` |
| 作品列表与板块 | `web/src/data/works.ts` |
| 单个作品详情 | `web/src/content/works/<slug>.md` |
| 相机停靠点 / 履历条数 | `web/src/data/focusPoints.ts` 的 `FOCUS_POINTS` |
| 页面标题、SEO、OG、JSON-LD | `web/index.html` |
| 站点图标 | `web/public/favicon.svg` |

当前履历为 5 条，`FOCUS_POINTS` 也是 5 个（`focus-1` … `focus-5`）。增删履历时两边必须同步。

## 当前 3D 模型状态

`web/public/models/me.glb` 已替换为你自己的模型（intro3d 导出），当前约 **12.1MB**（原文件 19.9MB，已用 WebP + 1K 贴图做保守压缩，几何未简化）。相机动画 `CameraAction` 为 12.5s / 300 帧，正好对应 5 段履历 × 50 帧 + 作品区 50 帧。

| 项目 | 状态 |
|---|---|
| 相机 + `CameraAction` 动画 | ✅ 存在，300 帧 |
| `focus-0` … `focus-5` 空对象 | ⚠️ 存在于 node 数组，但**不在 scene 图中**（intro3d 导出为孤立节点） |
| `focus-works` | ❌ 缺失；作品区复用末节点 |
| 名字含 `eye` 的网格 | ❌ 缺失；眼球跟随自动禁用 |
| 模型尺寸 | 约 2 units 高；`Scene.tsx` 使用 `scale=1.0`；Hero 相机 `heroPull=1.0`，履历停靠点 `pullback=1.3`（半身取景） |

由于 `focus-*` 是孤立节点，`Scene.tsx` 遍历 scene 时找不到它们，**景深对焦会固定在中心**；滚动运镜本身不受影响，截图验证正常。如果希望每个履历节点有独立对焦，需要在 intro3d / Blender 中把 `focus-*` 空对象加入场景后重新导出。

项目区入场时，模型会绕垂直轴顺时针旋转并滑出左侧。退场进度由作品区的实际 DOM 位置驱动，从作品区进入视口开始、覆盖约 1.5 屏滚动，因此与项目进场同步且节奏较慢。实现上把可见模型挂到独立的 `visual` group，glb 相机保持不动，所以是模型自己旋转/滑出，而不是镜头跟着转。相关参数在 `Scene.tsx` 的 `worksExit` 计算与 `visual.rotation.y / position.x`。

### 如果要更换模型

模型需要满足以下约定（详见 `CLAUDE.md`）：

| 需要包含 | 作用 |
|---|---|
| 相机 + 名为 `CameraAction` 的动画 clip | 滚动驱动运镜；总帧数按 24fps 读取 |
| 空对象 `focus-0`（或 `focus-start`） | 首屏对焦锚点（需在 scene 图中） |
| 空对象 `focus-1` … `focus-5` | 每条履历一个停靠点，数量与 `FOCUS_POINTS` 一致 |
| 空对象 `focus-works` | 作品区停靠点（可选） |
| 名字含 `eye` 的网格 | 眼球跟随光标（当前模型没有，自动禁用） |

相机动画帧约定：第 0 帧 = 首屏，第 `50·k` 帧 = 第 k 个履历节点，最后一帧 = 作品区；场景帧率 24fps。

检查模型：

```bash
npx @gltf-transform/cli inspect web/public/models/me.glb
```

### 资源体积

| 文件 | 大小 |
|---|---|
| `web/public/models/me.glb` | 约 12.1MB（WebP / 1K 贴图） |
| `web/public/textures/env.hdr` | 约 1.2MB（由 2048×1024 压到 1024×512） |
| JS bundle | 约 1.7MB（gzip 约 524KB） |

原模型与原 HDR 备份在当前机器的 `%TEMP%` 下，不入仓库。若还需要进一步缩小体积，可以简化几何或把 HDR 换成 three 的 `RoomEnvironment`，但会改变当前取景/光照，需要重新验证。

## 发布到 GitHub Pages（默认）

仓库已包含 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，推送到 `main` 会自动构建 `web/` 并发布。

1. 在 GitHub 新建仓库，把 **Minmall 目录作为仓库根**推送（确保根目录有 `web/` 与 `.github/`）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 推送到 `main`，或在 **Actions → Deploy to GitHub Pages → Run workflow** 手动触发。
4. 工作流会：
   - 注入站点地址 `VITE_SITE_URL`（`https://<owner>.github.io/<repo>/`，用户页为根路径）
   - 构建 `web/dist`
   - 生成对应地址的 `robots.txt` / `sitemap.xml`
   - 通过 `actions/deploy-pages` 发布

默认地址：

```
https://<你的用户名>.github.io/<仓库名>/
```

本地构建也可以手动指定站点地址：

```bash
cd web
VITE_SITE_URL=https://<你的用户名>.github.io/<仓库名>/ npm run build
```

### 可选：Vercel

Vercel 仍然可用：导入仓库后 **Root Directory 设为 `web`**，Framework 选 Vite，Build `npm run build`，Output `dist`；同时设置环境变量 `VITE_SITE_URL=https://你的域名/`。

## 上线前检查清单

- [x] 用自己的 `me.glb` 替换作者模型（intro3d 导出，已压缩到 12.1MB）
- [ ] 确认模型与 `web/public/textures/env.hdr` 的来源/许可；HDR 已压到 1K，但来源仍需核实
- [x] 搜索站点源码，确认没有上游作者的个人内容（`NOTICE`、`LICENSE`、`README.upstream.md` 等归属说明文件会正常出现作者信息）：
  ```bash
  grep -RIn -E "Sen Zheng|郑越升|About Sen|ZOOOP|zooop|senbuzy|buzyzheng|小郑还挺忙|HOTSAR|Bad Printer" \
    web/src web/public web/index.html
  ```
- [x] 站点 URL 自动注入：GitHub Actions 使用 `actions/configure-pages` + `VITE_SITE_URL`，本地构建默认 `http://localhost:5173/`
- [ ] 在 GitHub 仓库启用 Pages，Source 选择 **GitHub Actions**
- [x] `npm run typecheck && npm run lint && npm run build` 全部通过
- [ ] 在手机尺寸下检查滚动、运镜、作品弹窗、减少动态效果模式（桌面已用无头 Chrome 验证）
- [x] 不公开电话号码；站点只展示邮箱与项目链接
- [ ] 如需逐节点景深，把 `focus-*` 空对象加入 scene 后重新导出模型

## 许可与致谢

- 上游代码：[dayinji/sen-3d-resume](https://github.com/dayinji/sen-3d-resume)，MIT，见 `LICENSE`。
- 上游作者的个人内容与素材（姓名、人物模型、简历、作品、品牌图）**不在 MIT 范围内**，本仓库已替换/移除，详见 `NOTICE`。
- 当前 3D 模型：由你通过 intro3d 导出并放入本项目；你已确认模型版权开放、可任意商用。
- 本地字体 Cormorant Upright、Mansalva 来自 Google Fonts，SIL Open Font License。
- `web/public/textures/env.hdr` 已从 2048×1024 压到 1024×512；来源与许可需自行核实，商用前建议替换为可商用 HDR。
