import { motion } from 'framer-motion'
import { SOCIAL_ICONS } from './socialIconMap'
import { FOCUS_POINTS } from '../data/focusPoints'

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}

// 履历条目数量必须与 data/focusPoints.ts 的 FOCUS_POINTS 数量一致（当前 5 条）。
// 早期两段经历（Vantage + 网鱼）合并为一个时间轴节点，以控制相机停靠点数量并保持可读性。
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2011 – 2014',
        place: 'University of Wollongong',
        role: 'B.S. · Economics',
        points: [
          'Core courses: microeconomics, macroeconomics, econometrics, statistics.',
          'Built a solid understanding of global economic trends, policy analysis, and data analysis.',
          'Participated in academic projects, strengthening teamwork and cross-cultural communication.',
        ],
      },
      {
        period: '2016.01 – 2018.02',
        place: 'Early career',
        groups: [
          {
            heading: 'Vantage Global Prime Pty Ltd',
            sub: 'User Operations / CFD Operations · 2016.01–2016.08',
            items: [
              'Managed call statistics for two sales locations; handled daily bank reconciliations and expense records.',
              'Responded to client emails, verified new account documents, and supported account operations.',
              'Adjusted leverage and margin ratios for CFD products.',
            ],
          },
          {
            heading: 'Wangyu Internet Cafe · Sydney',
            sub: 'Store Manager · 2016.08–2018.02',
            items: [
              'Team: recruited, trained, scheduled, and appraised staff; introduced incentives and managed labor costs.',
              'Product & inventory: set pricing and promotions; monitored stock, procurement, stocktaking, and loss reduction.',
              'Business analysis: tracked daily/monthly revenue, traffic, average ticket, and repurchase rate; prepared monthly management reports.',
              'Service & compliance: handled complaints, optimized product mix and service flow; ensured hygiene, safety, and fire compliance.',
            ],
          },
        ],
      },
      {
        period: '2018.05 – 2019.05',
        place: 'Beijing Didi Infinite Technology Development Co., Ltd.',
        role: 'English Customer Service Supervisor',
        points: [
          'Led the customer service team; standardized online communication scripts to improve efficiency and satisfaction.',
          'Managed shift operations and task allocation; set performance standards and analyzed abnormal call-loss rates.',
          'Trained new hires and coordinated business requirements; rated B+ in 2018, top 4% nationally.',
          'Performed daily quality checks to ensure continuous service improvement.',
        ],
        groups: [
          {
            heading: 'Impact',
            items: [
              'Improved team management and training, strengthening capability and stability; optimized service flows to shorten response and resolution time.',
              'Strengthened client communication and service quality, improving satisfaction and loyalty; drove cross-department collaboration and process standardization.',
              'Introduced new tools and analyzed customer feedback to continuously improve service and product.',
            ],
          },
        ],
      },
      {
        period: '2019.06 – 2024.11',
        place: 'Microsoft China · Shanghai Branch',
        role: 'English Technical Support Engineer',
        points: [
          'Provided technical support for Microsoft Azure cloud products, delivering solutions and troubleshooting for global customers.',
          'Communicated with global and enterprise clients via phone and email, handling troubleshooting and debugging.',
          'Ranked top in case volume for consecutive years, with KPI consistently above standards and team average.',
          'Interviewed and trained new employees; designed and delivered training plans.',
        ],
        groups: [
          {
            heading: 'Impact',
            items: [
              'Analyzed existing support processes to identify bottlenecks and inefficiencies.',
              'Designed and implemented standardized processes; monitored execution and analyzed data to improve efficiency and satisfaction.',
              'Collaborated with product, engineering, and operations teams; collected customer feedback to drive product and service improvements.',
            ],
          },
        ],
      },
      {
        period: '2025.04 – 2026.09',
        place: 'Fast Retailing (China) Trading Co., Ltd.',
        role: 'Technical Support',
        groups: [
          {
            heading: 'IF System',
            sub: 'Supplier production data transmission system',
            items: [
              "Provided technical guidance and solution design for partner factories' IF interface development, covering data mapping, logic conversion, and transmission protocols.",
              'Led end-to-end interface testing and data validation (unit, integration, full-volume comparison) to ensure accuracy and correct business logic.',
              'Coordinated factory IF interface project progress, organized status meetings, identified risks and delays, and drove issue resolution for on-time delivery.',
              'Monitored o9 master data quality; established validation rules, daily monitoring, quality reports, and discrepancy identification.',
              'Diagnosed data process errors, performed root-cause analysis, implemented corrective actions, and coordinated with IT for permanent fixes.',
            ],
          },
          {
            heading: 'o9 System',
            sub: 'Supplier production data management system',
            items: [
              'Approved and created o9 user accounts; managed the full lifecycle including permissions, modifications, deactivation, and periodic reviews.',
              'Validated factory production delays, investigated root causes, and coordinated corrective actions with relevant teams.',
              'Delivered initial o9 training for new factories, covering data entry standards, daily workflows, error identification, and basic troubleshooting.',
            ],
          },
          {
            heading: 'FRS System',
            sub: 'Supplier packing needle-detection system',
            items: [
              'Tracked RFID needle-detection equipment from procurement and shipping to installation; coordinated schedules and resolved delays.',
              'Monitored detection data accuracy and transmission status; verified consistency and resolved anomalies for stable, timely data flow.',
            ],
          },
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2011 – 2014',
        place: 'University of Wollongong',
        role: '本科 · 经济学',
        points: [
          '主修微观经济学、宏观经济学、计量经济学、统计学等核心课程。',
          '深入理解全球经济形势、政策分析与数据分析。',
          '参与学术项目，提升团队合作与跨文化沟通能力。',
        ],
      },
      {
        period: '2016.01 – 2018.02',
        place: '早期职业经历',
        groups: [
          {
            heading: 'Vantage Global Prime Pty Ltd',
            sub: '用户运营 / CFD 差价合约交易运营 · 2016.01–2016.08',
            items: [
              '负责两地销售部门通话统计，确保客户需求得到及时响应。',
              '负责部门支出账单整理及每日银行账目对账，确保财务数据准确无误。',
              '负责客户邮件回复和新客户开户资料认证，为客户提供及时的账户支持。',
              '负责合约产品杠杆率以及保证金的调整。',
            ],
          },
          {
            heading: '网鱼网咖悉尼门店',
            sub: '门店店长 · 2016.08–2018.02',
            items: [
              '团队：负责店员招聘、培训、排班及绩效考核，制定员工激励机制，管理全店人员开销与人力成本。',
              '商品与库存：制定商品及服务定价策略，设计并执行促销活动；监控库存、制定采购计划、定期盘点并降低损耗。',
              '经营分析：统计每日/每月营业额，分析客流量、客单价、复购率等指标，编制月度经营报告并向管理层汇报。',
              '服务与合规：处理客户投诉，根据顾客反馈优化商品组合与服务流程；确保卫生、安全及消防合规，处理突发事件。',
            ],
          },
        ],
      },
      {
        period: '2018.05 – 2019.05',
        place: '北京嘀嘀无限科技发展有限公司',
        role: '英文客服主管',
        points: [
          '管理并带领客户服务团队，制定并优化在线话术标准，提高团队效率和客户满意度。',
          '负责人员值班现场管理及任务分配，制定并实施绩效标准，分析呼损率异常并提出解决方案。',
          '负责新入职员工培训，协调并优化业务需求方案，推动产品优化及升级；2018 年度绩效 B+，全国职场排名前 4%。',
          '参与团队成员的日常工作质检，确保服务质量持续提升。',
        ],
        groups: [
          {
            heading: '业绩',
            items: [
              '优化团队管理和培训机制，提升团队专业能力与稳定性；优化客服流程后，显著缩短响应时间和问题解决周期。',
              '加强客户沟通与服务改进，提升客户满意度与忠诚度；推动跨部门协作和流程标准化，解决多项长期遗留问题。',
              '引入创新工具并定期分析客户反馈，持续推动服务改进和产品优化。',
            ],
          },
        ],
      },
      {
        period: '2019.06 – 2024.11',
        place: '微软（中国）有限公司上海分公司',
        role: '英语技术支持工程师',
        points: [
          '负责 Microsoft Azure 云产品的技术支持，提供解决方案并协助全球客户解决技术问题。',
          '通过电话和邮件与全球客户及企业级客户沟通，帮助客户进行 troubleshooting 及 debugging。',
          '在团队中长期保持案件处理量冠军，每年处理的案件为团队之最，KPI 始终不低于标准及平均水平。',
          '参与新晋员工的面试招聘，负责新人培训及培训计划的制定，推动团队整体技能提升。',
        ],
        groups: [
          {
            heading: '业绩',
            items: [
              '分析现有客户支持流程，识别瓶颈和低效环节。',
              '设计并实施标准化流程，定期监控流程执行情况，分析数据并提出改进建议，提升服务效率和客户满意度。',
              '与产品、技术、运营等部门合作，确保流程与其他业务环节无缝衔接；收集客户反馈，推动产品改进或服务升级。',
            ],
          },
        ],
      },
      {
        period: '2025.04 – 2026.09',
        place: '迅销（中国）商贸有限公司',
        role: '技术支持',
        groups: [
          {
            heading: 'IF 系统',
            sub: '供应商生产数据发送系统',
            items: [
              '为合作工厂的 IF 系统接口开发提供技术指导和方案设计，涵盖数据映射、逻辑转换和传输协议。',
              '主导端到端接口测试与数据验证，包括单元测试、接口测试和全量数据比对，确保数据准确性和业务逻辑正确性。',
              '协调跟踪工厂 IF 接口项目进度，组织状态会议，识别风险和延期，推动问题解决以确保按时交付。',
              '监控 o9 系统主数据质量，建立校验规则和日常监控机制，生成质量报告并识别数据差异。',
              '诊断和解决数据处理流程中的错误，进行根因分析，实施纠正措施，并与 IT 协调寻求永久解决方案。',
            ],
          },
          {
            heading: 'o9 系统',
            sub: '供应商生产数据管理系统',
            items: [
              '审批和创建 o9 用户账户，管理账户全生命周期，包括权限分配、修改、停用及定期审查。',
              '验证工厂生产延迟问题，调查根本原因，并与相关团队协作实施纠正措施。',
              '为新工厂提供 o9 系统操作初次培训，涵盖数据录入标准、日常操作流程、错误识别和基本故障排除。',
            ],
          },
          {
            heading: 'FRS 系统',
            sub: '供应商捆包检针系统',
            items: [
              '追踪 RFID 检针设备从采购、运输到安装的全流程进度，协调时间安排并解决流程中的延误问题。',
              '监控检针数据准确性和数据传输通讯状态，核查数据一致性并解决异常，确保数据稳定及时传输。',
            ],
          },
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading = group.link ? (
    <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
      {group.heading}
    </a>
  ) : (
    <span>{group.heading}</span>
  )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            if (!Icon) return null
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
