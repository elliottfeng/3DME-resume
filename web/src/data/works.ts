// 作品集数据（双语）。板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.tsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link?, slug? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  /** 分组内容只作展示，不弹详情（用于技能 / 兴趣这类非项目内容） */
  plain?: boolean
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '亮点',
    visitLabel: '访问作品',
    detailPlaceholder: '作品介绍待补充',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'projects',
        no: '01',
        title: '项目',
        tagline: 'Python · Streamlit · AIGC',
        items: [
          {
            name: 'Copy Me',
            meta: 'Streamlit 在线应用',
            tags: ['Python', 'Streamlit', 'AIGC'],
            link: 'https://copy-me.streamlit.app/',
            slug: 'copy-me',
          },
          {
            name: '个人 3D 主页',
            meta: '当前站点',
            tags: ['React', 'Three.js', 'TypeScript'],
            slug: 'portfolio-3d',
          },
        ],
        footer: '在线体验：copy-me.streamlit.app',
      },
      {
        id: 'aigc',
        no: '02',
        title: 'AIGC 实验',
        tagline: 'Prompt · Stable Diffusion · ComfyUI',
        items: [
          {
            name: 'Prompt 与图像生成',
            meta: '探索 / 工作流',
            tags: ['Prompt', 'Stable Diffusion'],
            slug: 'prompt-workflow',
          },
          {
            name: 'ComfyUI 工作流',
            meta: '节点式生成流程',
            tags: ['ComfyUI', 'Stable Diffusion'],
            slug: 'comfyui-workflow',
          },
        ],
      },
      {
        id: 'web',
        no: '03',
        title: '独立站',
        tagline: 'WordPress · PHP · Discord',
        items: [
          {
            name: 'WordPress 站点搭建与维护',
            meta: '独立站点',
            tags: ['WordPress', 'PHP'],
            slug: 'wordpress-site',
          },
          {
            name: 'Discord 社区工具',
            meta: '社区 / 自动化',
            tags: ['Discord', 'Automation'],
            slug: 'discord-tools',
          },
        ],
      },
      {
        id: 'skills',
        no: '04',
        title: '技能与兴趣',
        tagline: 'English · Excel / SQL · AIGC',
        plain: true,
        groups: [
          {
            heading: '专业技能',
            items: [
              '英语：流利的口语与书面沟通，能与国际客户及跨国团队有效合作',
              '数据分析：熟练使用 Excel、SQL 进行业务分析与决策支持',
              '技术支持：Azure 云支持、o9 / IF / FRS 系统实施与运营',
            ],
          },
          {
            heading: '兴趣与探索',
            items: [
              '健身：注重身心健康，保持稳定的工作状态',
              'AIGC：Prompt、Stable Diffusion、ComfyUI',
              '建站：WordPress 独立站、PHP 论坛、Discord 论坛',
              '学习中：Python、Git、大模型训练、RAG、数据打标',
            ],
          },
        ],
        footer: '11 年工作经验 · 上海 · 开放新机会',
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Highlights',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Work description coming soon',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'projects',
        no: '01',
        title: 'Projects',
        tagline: 'Python · Streamlit · AIGC',
        items: [
          {
            name: 'Copy Me',
            meta: 'Streamlit app',
            tags: ['Python', 'Streamlit', 'AIGC'],
            link: 'https://copy-me.streamlit.app/',
            slug: 'copy-me',
          },
          {
            name: 'Personal 3D Portfolio',
            meta: 'This site',
            tags: ['React', 'Three.js', 'TypeScript'],
            slug: 'portfolio-3d',
          },
        ],
        footer: 'Live demo: copy-me.streamlit.app',
      },
      {
        id: 'aigc',
        no: '02',
        title: 'AIGC Experiments',
        tagline: 'Prompt · Stable Diffusion · ComfyUI',
        items: [
          {
            name: 'Prompt & Image Generation',
            meta: 'Exploration / workflow',
            tags: ['Prompt', 'Stable Diffusion'],
            slug: 'prompt-workflow',
          },
          {
            name: 'ComfyUI Workflow',
            meta: 'Node-based generation',
            tags: ['ComfyUI', 'Stable Diffusion'],
            slug: 'comfyui-workflow',
          },
        ],
      },
      {
        id: 'web',
        no: '03',
        title: 'Independent Sites',
        tagline: 'WordPress · PHP · Discord',
        items: [
          {
            name: 'WordPress Site Building & Maintenance',
            meta: 'Independent site',
            tags: ['WordPress', 'PHP'],
            slug: 'wordpress-site',
          },
          {
            name: 'Discord Community Tools',
            meta: 'Community / automation',
            tags: ['Discord', 'Automation'],
            slug: 'discord-tools',
          },
        ],
      },
      {
        id: 'skills',
        no: '04',
        title: 'Skills & Interests',
        tagline: 'English · Excel / SQL · AIGC',
        plain: true,
        groups: [
          {
            heading: 'Professional skills',
            items: [
              'English: fluent verbal and written communication with global clients and cross-functional teams',
              'Data analysis: Excel and SQL for business analysis and decision support',
              'Technical support: Azure cloud support; o9 / IF / FRS system implementation and operations',
            ],
          },
          {
            heading: 'Interests & exploration',
            items: [
              'Fitness and a healthy lifestyle',
              'AIGC: Prompt, Stable Diffusion, ComfyUI',
              'Web building: WordPress, PHP forums, Discord communities',
              'Currently learning: Python, Git, LLM training, RAG, data labeling',
            ],
          },
        ],
        footer: '11 years of experience · Shanghai · Open to opportunities',
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
// 目前不使用任何上游封面图；填入自己的作品封面后在这里配置。
export const SECTION_COVERS: Record<string, string> = {}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
