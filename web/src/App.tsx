import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import * as THREE from 'three'
import Scene from './scene/Scene'
import NoiseOverlay from './ui/NoiseOverlay'
import Resume from './ui/Resume'
import Works from './ui/Works'
import LoadingScreen from './ui/LoadingScreen'
import SceneErrorBoundary from './ui/SceneErrorBoundary'
import { useStore } from './store'

function Backdrop() {
  // 点击空白处收起详情
  const setActive = useStore((s) => s.setActive)
  return (
    <mesh position={[0, 0, -40]} onClick={() => setActive(null)}>
      <planeGeometry args={[600, 300]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'About Me',
    status: 'Technical Support / System Implementation / Data Analysis · Shanghai',
    paragraphs: [
      "I'm Elliott Feng — 11 years of experience, 8+ years across technical support, system implementation, customer relations, and data analysis. I've delivered projects at Microsoft Azure, Didi, and retail supply-chain teams, and I keep exploring AIGC and web development.",
    ],
    highlights: ['11 years', '8+ cross-functional', 'Team management', 'Data analysis', 'Fluent English', 'AIGC'],
    links: [
      { label: 'Email', href: 'mailto:elliottfeng@mail.com' },
      { label: 'Copy Me ↗', href: 'https://copy-me.streamlit.app/' },
    ],
  },
  zh: {
    title: 'About Me',
    status: '技术支持 / 系统实施 / 数据分析 · 上海',
    paragraphs: [
      '我是冯宇洋（Elliott Feng），11 年工作经验、8 年以上跨领域经历，专注技术支持、系统实施、客户关系与数据分析。曾在 Microsoft Azure、滴滴与零售供应链团队推动项目落地，也在持续探索 AIGC 与 Web 开发。',
    ],
    highlights: ['11 年工作经验', '8+ 年跨领域', '团队管理', '客户关系', '数据分析', '英语流利', 'AIGC'],
    links: [
      { label: '邮箱', href: 'mailto:elliottfeng@mail.com' },
      { label: 'Copy Me ↗', href: 'https://copy-me.streamlit.app/' },
    ],
  },
}

// 检测 WebGL 是否可用：不可用时跳过 3D Canvas，改用静态背景，保证内容仍可阅读。
function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])
  return supported
}

function Hero({
  lang,
  cueOpacity,
  reducedMotion,
}: {
  lang: Lang
  cueOpacity: MotionValue<number>
  reducedMotion: boolean
}) {
  const { title, status, paragraphs, highlights, links } = COPY[lang]
  // 使用窗口滚动而不是 about 元素自身位置：首屏内容较高时，
  // 基于元素位置的进度会在 scrollY=0 时就开始虚化，导致标题一进来就看不见。
  const { scrollY } = useScroll()
  const blur = useTransform(scrollY, [0, 220], ['blur(0px)', 'blur(14px)'])
  const opacity = useTransform(scrollY, [0, 260], [1, 0])
  // 视差：标题上升更快、字距随滚动拉开；正文上升慢一点
  const titleY = useTransform(scrollY, [0, 320], [0, -90])
  const bodyY = useTransform(scrollY, [0, 320], [0, -46])
  const titleSpacing = useTransform(scrollY, [0, 320], ['0.01em', '0.32em'])
  return (
    <section className="hero">
      <motion.div
        className="about"
        lang={lang}
        style={reducedMotion ? undefined : { filter: blur, opacity }}
      >
        {/* 入场动画放内层，避免其 fill 锁住 opacity 覆盖外层滚动 opacity */}
        <div className="about-intro">
          <motion.h1
            className="about-title"
            style={reducedMotion ? undefined : { y: titleY, letterSpacing: titleSpacing }}
          >
            {title}
          </motion.h1>
          <p className="about-status">{status}</p>
          {paragraphs.map((p, i) => (
            <motion.p key={i} className="about-body" style={reducedMotion ? undefined : { y: bodyY }}>
              {p}
            </motion.p>
          ))}
          <ul className="about-highlights" aria-label="个人优势">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="about-links">
            {links.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="scroll-cue"
        style={reducedMotion ? undefined : { opacity: cueOpacity }}
        aria-hidden="true"
      >
        <span className="scroll-cue-label">{lang === 'en' ? 'SCROLL' : '向下滚动'}</span>
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </motion.div>
    </section>
  )
}

export default function App() {
  // 默认中文；如需中英切换，可恢复 LangToggle 并补充英文内容。
  const [lang] = useState<Lang>('zh')
  const reduceMotion = useReducedMotion()
  const webgl = useWebGLSupport()
  const { scrollY } = useScroll()
  // 作品区蒙层：以作品区顶部从视口底进入到视口中部的进度，驱动 3D 渐暗 + 模糊
  const worksRef = useRef(null)
  const { scrollYProgress: worksProgress } = useScroll({
    target: worksRef,
    offset: ['start end', 'start center'],
  })
  const fogBg = useTransform(
    worksProgress,
    [0, 1],
    ['rgba(8, 11, 18, 0)', 'rgba(8, 11, 18, 0.41)'] // 压暗减半（原 0.82）
  )
  // 滚动渐暗：离开首屏后压暗 3D 场景，保证履历文字可读
  const scrimOpacity = useTransform(scrollY, [0, 520], [0, 0.34])
  // 首屏滚动提示随之淡出
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0])
  // 噪点蒙版：首页完全关闭，进入履历后再淡入，避免压暗 3D 模型
  const noiseOpacity = useTransform(scrollY, [0, 420], [0, 1])
  // 磨砂右轨：进入履历区后淡入（首屏不磨砂）
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const railOpacity = useTransform(scrollY, [vh * 0.5, vh * 1.1], [0, 1])
  // 首屏装饰画框/角标：滚动后淡出
  const heroChromeOpacity = useTransform(scrollY, [0, 280], [1, 0])

  return (
    <>
      <a href="#main" className="skip-link">
        跳到主要内容
      </a>

      {/* 加载遮罩：模型全部加载完成前覆盖全屏，完成后淡出 */}
      {webgl !== false && <LoadingScreen />}

      {/* 固定的 3D 背景；WebGL 不可用时用静态渐变兜底 */}
      <div className="scene-bg" aria-hidden="true">
        {webgl && (
          <SceneErrorBoundary fallback={<div className="scene-fallback" />}>
            <Canvas
              shadows={{ type: THREE.PCFShadowMap }}
              dpr={[1, 1.5]}
              camera={{ position: [0, 5, 19], fov: 39, near: 0.1, far: 500 }}
              gl={{
                antialias: false,
                stencil: false,
                depth: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.05,
              }}
            >
              <color attach="background" args={['#0a0e16']} />
              <Suspense fallback={null}>
                <Backdrop />
                <Scene reducedMotion={Boolean(reduceMotion)} />
              </Suspense>
            </Canvas>
          </SceneErrorBoundary>
        )}
        {webgl === false && <div className="scene-fallback" />}
      </div>

      {/* 滚动渐暗蒙层（首页为 0，不压暗模型） */}
      <motion.div className="scrim" style={{ opacity: scrimOpacity }} aria-hidden="true" />

      {/* 作品区固定蒙层：仅压暗（减半），模糊先注释掉 */}
      <motion.div
        className="stage-fog"
        style={{ background: fogBg /* , backdropFilter: fogBlur, WebkitBackdropFilter: fogBlur */ }}
        aria-hidden="true"
      />

      {/* 固定磨砂右轨（进入履历区淡入） */}
      <motion.div className="glass-rail" style={{ opacity: railOpacity }} aria-hidden="true" />

      {/* 首屏装饰：发丝内框 + 四角定位标 + 角标元数据（随滚动淡出） */}
      <motion.div className="hero-chrome" style={{ opacity: heroChromeOpacity }} aria-hidden="true">
        <div className="hero-frame" />
        <span className="hero-mark tl">+</span>
        <span className="hero-mark tr">+</span>
        <span className="hero-mark bl">+</span>
        <span className="hero-mark br">+</span>
        <div className="hero-meta hm-tl">
          <span className="hm-name">冯宇洋 Elliott Feng</span>
          <span>Technical Support · Operations · Data</span>
        </div>
        <div className="hero-meta hm-tr">Portfolio — 2026</div>
        <div className="hero-meta hm-bl">Azure · o9 · AIGC</div>
        <div className="hero-meta hm-right">Based in Shanghai · China</div>
      </motion.div>

      {/* 全屏胶片噪点蒙层：首页关闭，进入履历后淡入（multiply 混合会压暗模型） */}
      {webgl && !reduceMotion && (
        <motion.div style={{ opacity: noiseOpacity }}>
          <NoiseOverlay />
        </motion.div>
      )}

      {/* 可滚动内容 */}
      <main id="main" className="content">
        <Hero lang={lang} cueOpacity={cueOpacity} reducedMotion={Boolean(reduceMotion)} />
        <Resume lang={lang} />
        <Works lang={lang} innerRef={worksRef} />
      </main>
    </>
  )
}
