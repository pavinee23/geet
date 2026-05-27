'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

const LANGUAGE_STORAGE_KEY = 'ge-energy-tech-lang';

const LANGUAGE_OPTIONS = [
  { code: 'th', label: 'ไทย' },
  { code: 'zh', label: '中文' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-tw', label: '繁體中文' },
  { code: 'ms', label: 'Bahasa Melayu' },
];

const TRANSLATIONS = {
  th: {
    nav: { about: 'เกี่ยวกับเรา', services: 'บริการ', technology: 'เทคโนโลยี', contact: 'ติดต่อ', erp: 'เข้าสู่ระบบ ERP →' },
    hero: {
      tag: 'พลังงานอัจฉริยะ · IoT · ERP องค์กร',
      title1: 'พลังงานอัจฉริยะ',
      title2: 'เพื่ออนาคต',
      title3: 'ที่ยั่งยืน',
      sub: 'GE Energy Tech คือทีม Startup ด้านเทคโนโลยีพลังงาน ที่พัฒนาอุปกรณ์ IoT พร้อมจำหน่ายและบริการแพลตฟอร์มมอนิเตอร์ริ่ง วิเคราะห์พลังงานด้วย AI เพื่อยกระดับธุรกิจและสิ่งแวดล้อม',
      cta1: 'ดูบริการทั้งหมด',
      cta2: 'ติดต่อเรา',
      stats: ['อุปกรณ์ที่มอนิเตอร์', 'ลูกค้าองค์กร', 'การันตี uptime', 'ประเทศที่ให้บริการ'],
    },
    about: {
      badge: 'เกี่ยวกับบริษัท',
      title: 'บริษัท จีอี เอเนอร์จี่ เทค จำกัด',
      p1: 'เราเป็น Startup ที่มุ่งสร้างนวัตกรรมเทคโนโลยีพลังงาน โดยพัฒนาอุปกรณ์ IoT และระบบดิจิทัลสำหรับการมอนิเตอร์ริ่งพลังงานแบบเรียลไทม์ในโรงงาน อาคาร และองค์กร',
      p2: 'เราจำหน่ายพร้อมบริการแพลตฟอร์มวิเคราะห์พลังงานด้วย AI เพื่อช่วยลดการใช้พลังงาน ลดต้นทุน ลดการปล่อยคาร์บอน และขับเคลื่อนพลังงานสีเขียวเพื่อลดโลกร้อน',
      pillars: [
        { icon: '🎯', title: 'วิศวกรรมแม่นยำ', desc: 'ออกแบบระบบเน้นความเสถียร เชื่อถือได้ และทำงานต่อเนื่องระยะยาว' },
        { icon: '🤝', title: 'พาร์ทเนอร์ธุรกิจ', desc: 'ทำงานร่วมกับลูกค้าตั้งแต่การวางแผนจนถึงใช้งานจริง' },
        { icon: '🌏', title: 'รองรับระดับภูมิภาค', desc: 'รองรับการใช้งานหลายประเทศและหลายภาษาในเอเชีย' },
        { icon: '🔬', title: 'ขับเคลื่อนด้วย R&D', desc: 'พัฒนานวัตกรรม IoT และ AI อย่างต่อเนื่อง' },
      ],
    },
    services: {
      badge: 'บริการของเรา',
      title: ['โซลูชันครบวงจร', 'สำหรับทุกธุรกิจ'],
      sub: 'ให้บริการครบตั้งแต่พัฒนาอุปกรณ์ IoT จำหน่ายอุปกรณ์ ติดตั้งระบบ ไปจนถึงแพลตฟอร์ม AI สำหรับมอนิเตอร์และวิเคราะห์พลังงาน',
    },
    tech: {
      badge: 'เทคโนโลยีที่ใช้',
      title: ['สร้างด้วย', 'เทคโนโลยีชั้นนำ'],
      sub: 'พัฒนาเทคโนโลยีใหม่ด้านพลังงานอย่างต่อเนื่อง เพื่อเพิ่มประสิทธิภาพพลังงานและรองรับเป้าหมาย Net Zero',
    },
    contact: {
      badge: 'ติดต่อเรา',
      title: ['พร้อมเริ่มโครงการ', 'ของคุณ?'],
      head: 'มาคุยกันได้เลย',
      sub: 'ทีมงานพร้อมให้คำปรึกษา ออกแบบโซลูชัน และประเมินงบประมาณให้โดยไม่มีค่าใช้จ่าย',
      company: 'บริษัท',
      address: 'ที่อยู่',
      systems: 'ระบบ',
      languages: 'ภาษา',
      formTitle: 'ส่งข้อความถึงเรา',
      name: 'ชื่อ – Name',
      email: 'อีเมล – Email',
      subject: 'หัวข้อ – Subject',
      message: 'รายละเอียด – Message',
      submit: 'ส่งข้อความ →',
      placeholders: ['ชื่อของคุณ / Your name', 'email@company.com', 'สนใจบริการ / Service inquiry', 'รายละเอียดโครงการหรือคำถามของคุณ…'],
    },
    footer: { services: 'บริการ', systems: 'ระบบ', rights: 'สงวนลิขสิทธิ์', privacy: 'ความเป็นส่วนตัว', terms: 'เงื่อนไข', portals: 'พอร์ทัลทั้งหมด' },
  },
  en: {
    nav: { about: 'About', services: 'Services', technology: 'Technology', contact: 'Contact', erp: 'ERP Login →' },
    hero: {
      tag: 'Smart Energy · IoT · Enterprise ERP',
      title1: 'Smart Energy',
      title2: 'for a',
      title3: 'Sustainable Future',
      sub: 'GE Energy Tech is an energy-technology startup developing IoT devices and delivering monitoring platforms with AI-powered energy analytics for modern enterprises.',
      cta1: 'Explore Services',
      cta2: 'Contact Us',
      stats: ['Devices Monitored', 'Enterprise Clients', 'Uptime Guarantee', 'Countries Served'],
    },
    about: {
      badge: 'About Company',
      title: 'GE Energy Tech Co., Ltd.',
      p1: 'We are a startup focused on next-generation energy technology, building IoT hardware and digital platforms for real-time energy monitoring across industrial and commercial operations.',
      p2: 'We provide device sales with full service and AI-driven energy analytics to reduce energy waste, lower carbon emissions, accelerate green energy adoption, and help tackle global warming.',
      pillars: [
        { icon: '🎯', title: 'Precision Engineering', desc: 'Built for reliability, stability, and long-term performance.' },
        { icon: '🤝', title: 'Trusted Partnership', desc: 'We collaborate from planning through deployment and support.' },
        { icon: '🌏', title: 'Regional Scale', desc: 'Designed for multi-country and multilingual operations in Asia.' },
        { icon: '🔬', title: 'R&D Driven', desc: 'Continuous innovation in IoT, AI, and energy technology.' },
      ],
    },
    services: {
      badge: 'Our Services',
      title: ['Integrated Solutions', 'for Every Business'],
      sub: 'End-to-end services from IoT device development and deployment to AI energy monitoring and analytics platforms.',
    },
    tech: {
      badge: 'Technology Stack',
      title: ['Built with', 'Leading Technologies'],
      sub: 'Continuous innovation in new energy technologies built to support green transition and Net Zero goals.',
    },
    contact: {
      badge: 'Contact',
      title: ['Ready to Start', 'Your Project?'],
      head: 'Let us talk',
      sub: 'Our team is ready to consult, design, and estimate your project with no upfront fee.',
      company: 'Company', address: 'Address', systems: 'Systems', languages: 'Languages',
      formTitle: 'Send us a message',
      name: 'Name', email: 'Email', subject: 'Subject', message: 'Message',
      submit: 'Send Message →',
      placeholders: ['Your name', 'email@company.com', 'Service inquiry', 'Tell us about your project...'],
    },
    footer: { services: 'Services', systems: 'Systems', rights: 'All rights reserved.', privacy: 'Privacy', terms: 'Terms', portals: 'Portals' },
  },
};

const FALLBACK_LANG = 'en';
const CLONED_LANGS = ['zh', 'vi', 'ko', 'ja', 'zh-tw', 'ms'];
for (const code of CLONED_LANGS) {
  TRANSLATIONS[code] = {
    ...TRANSLATIONS.en,
    nav: { ...TRANSLATIONS.en.nav },
    hero: { ...TRANSLATIONS.en.hero },
    about: { ...TRANSLATIONS.en.about, pillars: [...TRANSLATIONS.en.about.pillars] },
    services: { ...TRANSLATIONS.en.services },
    tech: { ...TRANSLATIONS.en.tech },
    contact: { ...TRANSLATIONS.en.contact },
    footer: { ...TRANSLATIONS.en.footer },
  };
}

const OVERRIDES = {
  zh: { nav: { about: '关于我们', services: '服务', technology: '技术', contact: '联系', erp: 'ERP 登录 →' }, hero: { tag: '智慧能源 · IoT · 企业 ERP', title1: '智慧能源', title2: '迈向', title3: '可持续未来', cta1: '查看服务', cta2: '联系我们', stats: ['监控设备', '企业客户', '可用性保障', '服务国家'] }, services: { badge: '我们的服务', title: ['一体化解决方案', '适用于各类企业'] }, tech: { badge: '技术栈', title: ['采用', '领先技术'] }, contact: { badge: '联系', title: ['准备开始', '您的项目？'], head: '欢迎和我们交流', submit: '发送消息 →' }, footer: { services: '服务', systems: '系统', rights: '版权所有。', privacy: '隐私', terms: '条款', portals: '门户' } },
  vi: { nav: { about: 'Giới thiệu', services: 'Dịch vụ', technology: 'Công nghệ', contact: 'Liên hệ', erp: 'Đăng nhập ERP →' }, hero: { tag: 'Năng lượng thông minh · IoT · ERP doanh nghiệp', title1: 'Năng lượng thông minh', title2: 'cho một', title3: 'tương lai bền vững', cta1: 'Xem dịch vụ', cta2: 'Liên hệ', stats: ['Thiết bị giám sát', 'Khách hàng doanh nghiệp', 'Cam kết uptime', 'Quốc gia phục vụ'] }, services: { badge: 'Dịch vụ của chúng tôi', title: ['Giải pháp tích hợp', 'cho mọi doanh nghiệp'] }, tech: { badge: 'Công nghệ sử dụng', title: ['Xây dựng bằng', 'công nghệ hàng đầu'] }, contact: { badge: 'Liên hệ', title: ['Sẵn sàng bắt đầu', 'dự án của bạn?'], head: 'Hãy trao đổi với chúng tôi', submit: 'Gửi tin nhắn →' }, footer: { services: 'Dịch vụ', systems: 'Hệ thống', rights: 'Mọi quyền được bảo lưu.', privacy: 'Quyền riêng tư', terms: 'Điều khoản', portals: 'Cổng hệ thống' } },
  ko: { nav: { about: '회사 소개', services: '서비스', technology: '기술', contact: '문의', erp: 'ERP 로그인 →' }, hero: { tag: '스마트 에너지 · IoT · 엔터프라이즈 ERP', title1: '스마트 에너지', title2: '지속가능한', title3: '미래를 위해', cta1: '서비스 보기', cta2: '문의하기', stats: ['모니터링 장치', '기업 고객', '가동률 보장', '서비스 국가'] }, services: { badge: '서비스', title: ['통합 솔루션', '모든 비즈니스를 위해'] }, tech: { badge: '기술 스택', title: ['최신', '핵심 기술로 구축'] }, contact: { badge: '문의', title: ['프로젝트를', '시작할 준비가 되셨나요?'], head: '지금 상담해 보세요', submit: '메시지 보내기 →' }, footer: { services: '서비스', systems: '시스템', rights: '모든 권리 보유.', privacy: '개인정보', terms: '이용약관', portals: '포털' } },
  ja: { nav: { about: '会社情報', services: 'サービス', technology: '技術', contact: 'お問い合わせ', erp: 'ERP ログイン →' }, hero: { tag: 'スマートエネルギー · IoT · 企業ERP', title1: 'スマートエネルギー', title2: '持続可能な', title3: '未来へ', cta1: 'サービスを見る', cta2: 'お問い合わせ', stats: ['監視デバイス', '法人顧客', '稼働率保証', '提供国'] }, services: { badge: 'サービス', title: ['統合ソリューション', 'あらゆる企業向け'] }, tech: { badge: '技術スタック', title: ['先進', 'テクノロジーで構築'] }, contact: { badge: 'お問い合わせ', title: ['プロジェクトを', '始めませんか？'], head: 'まずはご相談ください', submit: '送信する →' }, footer: { services: 'サービス', systems: 'システム', rights: '無断転載禁止。', privacy: 'プライバシー', terms: '利用規約', portals: 'ポータル' } },
  'zh-tw': { nav: { about: '關於我們', services: '服務', technology: '技術', contact: '聯絡', erp: 'ERP 登入 →' }, hero: { tag: '智慧能源 · IoT · 企業 ERP', title1: '智慧能源', title2: '迁向', title3: '永續未來', cta1: '查看服務', cta2: '聯絡我們', stats: ['監控設備', '企業客戶', '可用性保證', '服務國家'] }, services: { badge: '我們的服務', title: ['整合解決方案', '適用各類企業'] }, tech: { badge: '技術架構', title: ['採用', '領先技術'] }, contact: { badge: '聯絡', title: ['準備開始', '您的專案？'], head: '歡迎與我們洽談', submit: '送出訊息 →' }, footer: { services: '服務', systems: '系統', rights: '版權所有。', privacy: '隱私', terms: '條款', portals: '入口' } },
  ms: { nav: { about: 'Tentang', services: 'Perkhidmatan', technology: 'Teknologi', contact: 'Hubungi', erp: 'Log Masuk ERP →' }, hero: { tag: 'Tenaga Pintar · IoT · ERP Perusahaan', title1: 'Tenaga Pintar', title2: 'untuk masa depan', title3: 'yang mampan', cta1: 'Lihat Perkhidmatan', cta2: 'Hubungi Kami', stats: ['Peranti Dipantau', 'Pelanggan Korporat', 'Jaminan Uptime', 'Negara Dilayan'] }, services: { badge: 'Perkhidmatan Kami', title: ['Penyelesaian Bersepadu', 'untuk setiap perniagaan'] }, tech: { badge: 'Teknologi', title: ['Dibina dengan', 'teknologi terkemuka'] }, contact: { badge: 'Hubungi', title: ['Bersedia mulakan', 'projek anda?'], head: 'Mari berbincang', submit: 'Hantar Mesej →' }, footer: { services: 'Perkhidmatan', systems: 'Sistem', rights: 'Hak cipta terpelihara.', privacy: 'Privasi', terms: 'Terma', portals: 'Portal' } },
};

for (const [code, ov] of Object.entries(OVERRIDES)) {
  const base = TRANSLATIONS[code];
  if (!base) continue;
  TRANSLATIONS[code] = { ...base, ...ov, nav: { ...base.nav, ...(ov.nav||{}) }, hero: { ...base.hero, ...(ov.hero||{}) }, about: { ...base.about, ...(ov.about||{}) }, services: { ...base.services, ...(ov.services||{}) }, tech: { ...base.tech, ...(ov.tech||{}) }, contact: { ...base.contact, ...(ov.contact||{}) }, footer: { ...base.footer, ...(ov.footer||{}) } };
}

const SERVICES = [
  { icon: '🚀', title: 'Energy Technology Startup Solutions', desc: 'Rapid innovation for energy businesses, from concept validation to production rollout.', tags: ['Startup', 'MVP', 'Scale-up'], accent: 'linear-gradient(90deg,#0ea5e9,#1565c0)', iconBg: 'rgba(14,165,233,0.16)' },
  { icon: '🧩', title: 'IoT Device Development & Sales', desc: 'Design, engineering, and delivery of IoT energy devices with installation and after-sales service.', tags: ['IoT Devices', 'Hardware', 'Service'], accent: 'linear-gradient(90deg,#1565c0,#0097a7)', iconBg: 'rgba(21,101,192,0.15)' },
  { icon: '⚡', title: 'Voltage & Frequency Regulator Innovation', desc: 'Smart devices for voltage stabilization, frequency control, and harmonic distortion (THD) correction.', tags: ['Voltage Regulator', 'Frequency', 'THD'], accent: 'linear-gradient(90deg,#f59e0b,#ea580c)', iconBg: 'rgba(245,158,11,0.14)' },
  { icon: '📡', title: 'Monitoring Platform as a Service', desc: 'Cloud platform for real-time energy monitoring, alerts, and dashboards in one place.', tags: ['Monitoring', 'Cloud Platform', 'Real-time'], accent: 'linear-gradient(90deg,#0097a7,#26c6da)', iconBg: 'rgba(0,151,167,0.15)' },
  { icon: '🤖', title: 'AI Energy Analytics & Management', desc: 'AI-powered EMS for consumption patterns, power quality, demand forecasting, and optimization.', tags: ['AI', 'EMS', 'Power Quality', 'Forecasting'], accent: 'linear-gradient(90deg,#6a1b9a,#9c27b0)', iconBg: 'rgba(106,27,154,0.15)' },
  { icon: '🌱', title: 'Green Energy & Carbon Reduction', desc: 'Innovation for green energy transition, carbon reduction, and measurable climate impact.', tags: ['Green Energy', 'Carbon', 'ESG'], accent: 'linear-gradient(90deg,#2e7d32,#43a047)', iconBg: 'rgba(46,125,50,0.15)' },
  { icon: '🔬', title: 'Next-Gen Energy Innovation Lab', desc: 'R&D for new energy technologies and advanced digital solutions for sustainability.', tags: ['R&D', 'Innovation', 'New Tech'], accent: 'linear-gradient(90deg,#059669,#0891b2)', iconBg: 'rgba(5,150,105,0.14)' },
];

const TECH = [
  { icon: '⚙️', name: 'Next.js', desc: 'Full-stack React framework for production applications.' },
  { icon: '🗄️', name: 'MySQL / Prisma', desc: 'Relational data platform with schema governance.' },
  { icon: '📦', name: 'MQTT Broker', desc: 'Real-time telemetry and event streaming for IoT devices.' },
  { icon: '🤖', name: 'AI Insights Engine', desc: 'Automated monitoring and insight generation.' },
  { icon: '🐳', name: 'Docker & CI/CD', desc: 'Containerized pipelines with repeatable deployments.' },
  { icon: '📱', name: 'Responsive Web App', desc: 'Optimized for desktop, tablet, and mobile.' },
  { icon: '🔐', name: 'JWT / RBAC Auth', desc: 'Token authentication with role-based permissions.' },
  { icon: '☁️', name: 'Cloud Infrastructure', desc: 'Scalable and resilient enterprise architecture.' },
];

const PQ_ITEMS = (lang) => [
  { icon: '🔋', title: lang === 'th' ? 'เครื่องปรับแรงดันอัจฉริยะ' : 'Smart Voltage Regulator', desc: lang === 'th' ? 'พัฒนาอุปกรณ์ปรับแรงดันไฟฟ้าแบบอัตโนมัติ ปกป้องเครื่องจากแรงดันสูงหรือต่ำเกินกำหนด' : 'Automatic voltage regulation protecting equipment from over/under voltage conditions.', tags: ['Voltage Regulator', 'AVR', 'Stabilization'], color: '#f59e0b' },
  { icon: '〰️', title: lang === 'th' ? 'ควบคุมความถี่ไฟฟ้า' : 'Frequency Control System', desc: lang === 'th' ? 'ระบบควบคุมความถี่ไฟฟ้า (Hz) เพื่อมอเตอร์และระบบอิเล็กทรอนิกส์' : 'Maintaining electrical frequency (Hz) stability for motors and sensitive electronics.', tags: ['Frequency', 'Hz Stability', 'Motor Control'], color: '#0ea5e9' },
  { icon: '📉', title: lang === 'th' ? 'แก้ไขความเพี้ยนฮาร์มอนิก (THD)' : 'Harmonic Distortion (THD) Correction', desc: lang === 'th' ? 'เทคโนโลยีกรองความเพี้ยนฮาร์มอนิก ลดความสูญเสียพลังงานและปกป้องระบบไฟฟ้า' : 'Active harmonic filtering to reduce THD, minimize energy losses, and protect electrical systems.', tags: ['THD', 'Harmonic Filter', 'Power Quality'], color: '#e53935' },
  { icon: '📊', title: lang === 'th' ? 'ระบบบริหารจัดการพลังงาน (EMS)' : 'Energy Management System (EMS)', desc: lang === 'th' ? 'แพลตฟอร์มวิเคราะห์ มอนิเตอร์์ และบริหารจัดการพลังงานด้วย AI Dashboard แบบเรียลไทม์' : 'End-to-end platform for monitoring, analyzing, and managing enterprise energy with real-time AI dashboards.', tags: ['EMS', 'Energy Management', 'AI Dashboard'], color: '#7c3aed' },
];

const STATS = ['500+', '15+', '99.9%', '3'];

export default function GePage() {
  const [lang, setLang] = useState('th');
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && LANGUAGE_OPTIONS.some((o) => o.code === stored)) setLang(stored);
  }, []);
  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS[FALLBACK_LANG], [lang]);
  const pq = PQ_ITEMS(lang);

  return (
    <>
      <nav className="get-nav">
        <a href="#hero" className="get-nav-brand">
          <Image src="/ge-energyTech/138568-transparent.png" alt="GE Energy Tech" width={40} height={40} className="get-nav-logo" priority />
          <span className="get-nav-name"><span>GE</span> ENERGY TECH</span>
        </a>
        <div className="get-nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#technology">{t.nav.technology}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <a href="#contact" className="get-nav-cta">{t.nav.erp}</a>
      </nav>

      <section className="get-lang-switch">
        <div className="get-container">
          <div className="get-lang-switch-inner">
            {LANGUAGE_OPTIONS.map((o) => (
              <button key={o.code} type="button" className={`get-lang-btn ${lang === o.code ? 'is-active' : ''}`} onClick={() => setLang(o.code)}>{o.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="get-hero" id="hero">
        <div className="get-hero-bg" aria-hidden />
        <div className="get-hero-grid" aria-hidden />
        <div className="get-hero-inner">
          <div className="get-hero-text">
            <p className="get-hero-tag">{t.hero.tag}</p>
            <h1 className="get-hero-h1">{t.hero.title1}<br /><em>{t.hero.title2}</em> {t.hero.title3}</h1>
            <p className="get-hero-sub">{t.hero.sub}</p>
            <div className="get-hero-actions">
              <a href="#services" className="get-btn get-btn--primary">{t.hero.cta1}</a>
              <a href="#contact" className="get-btn get-btn--ghost">{t.hero.cta2}</a>
            </div>
            <div className="get-hero-stats">
              {STATS.map((v, i) => (
                <div key={v} className="get-hero-stat"><strong>{v}</strong><span>{t.hero.stats[i]}</span></div>
              ))}
            </div>
          </div>
          <div className="get-hero-visual">
            <div className="get-hero-logo-wrap">
              <div className="get-hero-logo-ring" aria-hidden />
              <Image src="/ge-energyTech/138568-transparent.png" alt="GE Energy Tech" width={230} height={230} className="get-hero-logo-img" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="get-section get-about" id="about">
        <div className="get-container">
          <div className="get-about-grid">
            <div className="get-about-text">
              <div className="get-badge" style={{ marginBottom: 20 }}>{t.about.badge}</div>
              <h3>{t.about.title}</h3>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
            <div className="get-about-pillars">
              {t.about.pillars.map((p) => (
                <div key={p.title} className="get-pillar">
                  <span className="get-pillar-icon">{p.icon}</span>
                  <div className="get-pillar-content"><h4>{p.title}</h4><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="get-section get-pq" id="innovation">
        <div className="get-container">
          <div className="get-section-head">
            <div className="get-badge get-badge--amber">
              {lang === 'th' ? 'นวัตกรรมคุณภาพไฟฟ้า' : lang === 'zh' || lang === 'zh-tw' ? '电能质量创新' : lang === 'ja' ? '電力品質イノベーション' : lang === 'ko' ? '전력 품질 혁신' : 'Power Quality Innovation'}
            </div>
            <h2 className="get-section-h2">
              {lang === 'th' ? <>พัฒนา<em>อุปกรณ์และระบบ</em>คุณภาพไฟฟ้า</> : <>Developing <em>Smart Power</em> Quality Devices</>}
            </h2>
            <p className="get-section-sub">
              {lang === 'th' ? 'นวัตกรรมเครื่องปรับแรงดัน ควบคุมความถี่ แก้ไขความเพี้ยนฮาร์มอนิก (THD) และระบบบริหารจัดการพลังงาน (EMS) เพื่อความเสถียรสูงสุด' : 'Innovation in voltage regulation, frequency control, THD correction, and enterprise EMS for maximum stability.'}
            </p>
          </div>
          <div className="get-pq-grid">
            {pq.map((item) => (
              <div key={item.title} className="get-pq-card" style={{ '--pq-color': item.color }}>
                <div className="get-pq-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="get-service-tags" style={{ marginTop: 14 }}>
                  {item.tags.map((tag) => <span key={tag} className="get-service-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="get-section" id="services">
        <div className="get-container">
          <div className="get-section-head">
            <div className="get-badge">{t.services.badge}</div>
            <h2 className="get-section-h2">{t.services.title[0]}<br /><em>{t.services.title[1]}</em></h2>
            <p className="get-section-sub">{t.services.sub}</p>
          </div>
          <div className="get-services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="get-service-card" style={{ '--card-accent': s.accent }}>
                <div className="get-service-icon" style={{ background: s.iconBg }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="get-service-tags">{s.tags.map((tag) => <span key={tag} className="get-service-tag">{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="get-stats-banner">
        <div className="get-container">
          <div className="get-stats-grid">
            {STATS.map((v, i) => (
              <div key={v} className="get-stat-item"><strong>{v}</strong><p>{t.hero.stats[i]}</p></div>
            ))}
          </div>
        </div>
      </div>

      <section className="get-section get-tech" id="technology">
        <div className="get-container">
          <div className="get-section-head">
            <div className="get-badge get-badge--green">{t.tech.badge}</div>
            <h2 className="get-section-h2">{t.tech.title[0]} <em>{t.tech.title[1]}</em></h2>
            <p className="get-section-sub">{t.tech.sub}</p>
          </div>
          <div className="get-tech-grid">
            {TECH.map((tech) => (
              <div key={tech.name} className="get-tech-card">
                <span>{tech.icon}</span><strong>{tech.name}</strong><p>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="get-section get-contact" id="contact">
        <div className="get-container">
          <div className="get-section-head">
            <div className="get-badge">{t.contact.badge}</div>
            <h2 className="get-section-h2">{t.contact.title[0]} <em>{t.contact.title[1]}</em></h2>
          </div>
          <div className="get-contact-inner">
            <div className="get-contact-info">
              <h3>{t.contact.head}</h3>
              <p>{t.contact.sub}</p>
              <div className="get-contact-items">
                {[
                  { icon: '🏢', label: t.contact.company, value: 'GE ENERGY TECH CO., LTD.' },
                  { icon: '📍', label: t.contact.address, value: 'Thailand' },
                  { icon: '🌐', label: t.contact.systems, value: 'Energy Dashboard · ERP · IoT Platform' },
                  { icon: '🌏', label: t.contact.languages, value: 'ไทย · 中文 · Tiếng Việt · English · 한국어 · 日本語 · 繁體中文 · Bahasa Melayu' },
                ].map((item) => (
                  <div key={item.label} className="get-contact-item">
                    <span className="get-contact-item-icon">{item.icon}</span>
                    <div className="get-contact-item-text"><strong>{item.label}</strong><span>{item.value}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <form className="get-contact-form">
              <h4>{t.contact.formTitle}</h4>
              {[
                { label: t.contact.name, type: 'text', ph: t.contact.placeholders[0] },
                { label: t.contact.email, type: 'email', ph: t.contact.placeholders[1] },
                { label: t.contact.subject, type: 'text', ph: t.contact.placeholders[2] },
              ].map((f) => (
                <div key={f.label} className="get-form-field">
                  <label>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div className="get-form-field">
                <label>{t.contact.message}</label>
                <textarea placeholder={t.contact.placeholders[3]} />
              </div>
              <button type="submit" className="get-btn get-btn--primary" style={{ width: '100%', justifyContent: 'center' }}>{t.contact.submit}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="get-footer">
        <div className="get-container">
          <div className="get-footer-inner">
            <div className="get-footer-brand">
              <Image src="/ge-energyTech/138568-transparent.png" alt="GE Energy Tech" width={48} height={48} />
              <h4>GE ENERGY TECH CO., LTD.</h4>
              <p>Energy startup delivering IoT devices, AI energy analytics, and green innovation to reduce global warming impact.</p>
            </div>
            <div className="get-footer-col">
              <h5>{t.footer.services}</h5>
              <ul>
                <li><a href="#services">Energy Monitoring</a></li>
                <li><a href="#services">IoT Devices</a></li>
                <li><a href="#innovation">Power Quality</a></li>
                <li><a href="#services">AI Analytics</a></li>
              </ul>
            </div>
            <div className="get-footer-col">
              <h5>{t.footer.systems}</h5>
              <ul>
                <li><a href="#about">{t.about.badge}</a></li>
                <li><a href="#technology">{t.tech.badge}</a></li>
                <li><a href="#contact">{t.contact.badge}</a></li>
              </ul>
            </div>
          </div>
          <div className="get-footer-bottom">
            <p>� {new Date().getFullYear()} GE Energy Tech Co., Ltd. {t.footer.rights}</p>
            <div className="get-footer-bottom-links">
              <a href="#about">{t.footer.privacy}</a>
              <a href="#about">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
