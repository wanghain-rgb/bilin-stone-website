"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Wind,
  Flame,
  Wrench,
  Globe,
  Leaf,
  Users,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Mail,
} from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { CERTIFICATIONS } from "@/lib/constants";

const content = {
  en: {
    heroTag: "Since 2016",
    heroTitle: "Global Cooling & Heating Solutions Partner",
    heroSub: "From factory to end market — delivering innovation, quality, and sustainability worldwide.",
    intro: {
      title: "Company Introduction",
      body: "Bilin Stone is a global supply chain and manufacturing partner specializing in cooling and heating solutions. Since 2016, we have been committed to delivering high-performance products through the integration of R&D, manufacturing, and global logistics. With a production base in China, and sales and service centers in Australia and the United States, we provide localized support backed by strong global capabilities. We go beyond manufacturing — delivering end-to-end solutions that empower brands to grow efficiently and sustainably worldwide.",
    },
    whatWeDo: {
      title: "What We Do",
      items: [
        { icon: Wind, label: "Cooling Appliances", desc: "Stand Fans & Air Circulators" },
        { icon: Flame, label: "Heating Solutions", desc: "PTC Heaters & Tower Heaters" },
        { icon: Wrench, label: "OEM & ODM", desc: "Custom product development" },
        { icon: Globe, label: "Supply Chain", desc: "End-to-end management" },
      ],
    },
    vision: {
      title: "Our Vision",
      lead: "To be the world's most trusted partner for innovative and sustainable cooling & heating solutions.",
      points: [
        "Drive continuous innovation",
        "Create value for our partners and communities",
        "Build a sustainable future for generations to come",
      ],
    },
    network: {
      title: "Our Global Network",
      body: "With established sales and service centers in Australia and the United States, we provide localized support with global efficiency. From factory to end market, every step is optimized for speed, consistency, and quality.",
      locations: ["China — Production Base", "Australia — Sales & Service", "United States — Sales & Service"],
    },
    csr: {
      title: "Social Responsibility",
      lead: "We believe that sustainable business creates a better future. Bilin Stone is committed to making a positive impact on the environment, society, and our people.",
      pillars: [
        {
          icon: Leaf,
          title: "Environmental Protection",
          points: ["Energy-efficient products", "Responsible use of resources", "Reducing emissions"],
        },
        {
          icon: Users,
          title: "Caring for Our People",
          points: ["Safe and healthy workplace", "Equal opportunities", "Continuous learning"],
        },
        {
          icon: HeartHandshake,
          title: "Contributing to Our Community",
          points: ["Supporting local communities", "Promoting education and well-being"],
        },
        {
          icon: ShieldCheck,
          title: "Responsible Governance",
          points: ["Ethical business practices", "Compliance with international standards", "Transparency"],
        },
      ],
    },
    certs: { title: "Certifications & Compliance" },
    cta: {
      title: "Ready to partner with us?",
      sub: "Contact our team and let's build something great together.",
      btn: "Get in Touch",
      email: "infw@jianhuihome.com",
    },
  },
  zh: {
    heroTag: "成立于 2016 年",
    heroTitle: "全球制冷与取暖解决方案伙伴",
    heroSub: "从工厂到终端市场 — 在全球范围内交付创新、品质与可持续发展。",
    intro: {
      title: "公司介绍",
      body: "Bilin Stone 是专注于制冷与取暖解决方案的全球供应链与制造合作伙伴。自2016年起，我们通过整合研发、制造与全球物流，致力于提供高性能产品。我们在中国设有生产基地，在澳大利亚和美国设有销售与服务中心，以强大的全球能力为客户提供本地化支持。我们不止于制造——我们提供端到端的整体解决方案，助力品牌在全球高效、可持续地成长。",
    },
    whatWeDo: {
      title: "我们的业务",
      items: [
        { icon: Wind, label: "制冷电器", desc: "落地扇与空气循环扇" },
        { icon: Flame, label: "取暖方案", desc: "PTC取暖器与塔式取暖器" },
        { icon: Wrench, label: "OEM & ODM", desc: "定制产品开发" },
        { icon: Globe, label: "供应链管理", desc: "端到端全程管理" },
      ],
    },
    vision: {
      title: "我们的愿景",
      lead: "成为全球最值得信赖的创新型、可持续制冷与取暖解决方案伙伴。",
      points: [
        "持续推动创新",
        "为合作伙伴和社区创造价值",
        "为子孙后代构建可持续的未来",
      ],
    },
    network: {
      title: "全球网络",
      body: "我们在澳大利亚和美国设有销售与服务中心，以全球效率提供本地化支持。从工厂到终端市场，每个环节均针对速度、一致性和品质进行优化。",
      locations: ["中国 — 生产基地", "澳大利亚 — 销售与服务", "美国 — 销售与服务"],
    },
    csr: {
      title: "社会责任",
      lead: "我们相信，可持续的企业经营能创造更美好的未来。Bilin Stone 致力于对环境、社会和员工产生积极影响。",
      pillars: [
        {
          icon: Leaf,
          title: "环境保护",
          points: ["节能高效产品", "资源负责任使用", "减少碳排放"],
        },
        {
          icon: Users,
          title: "关爱员工",
          points: ["安全健康的工作环境", "平等机会", "持续学习成长"],
        },
        {
          icon: HeartHandshake,
          title: "回馈社区",
          points: ["支持本地社区", "促进教育与健康福祉"],
        },
        {
          icon: ShieldCheck,
          title: "负责任治理",
          points: ["道德商业实践", "遵守国际标准", "透明运营"],
        },
      ],
    },
    certs: { title: "认证资质" },
    cta: {
      title: "准备好与我们合作了吗？",
      sub: "联系我们的团队，共同创造卓越。",
      btn: "立即联系",
      email: "infw@jianhuihome.com",
    },
  },
};

export default function AboutContent() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
            {c.heroTag}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl max-w-3xl leading-tight">
            {c.heroTitle}
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-8">{c.heroSub}</p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{c.intro.title}</h2>
            <p className="text-gray-600 leading-8 text-base max-w-3xl">{c.intro.body}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4 shrink-0 text-amber-500" />
              <a href="mailto:infw@jianhuihome.com" className="hover:text-amber-600 transition-colors">
                infw@jianhuihome.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">{c.whatWeDo.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.whatWeDo.items.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
                      <Icon className="h-7 w-7 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{c.vision.title}</h2>
          <p className="text-lg text-gray-700 leading-8 italic mb-8">&ldquo;{c.vision.lead}&rdquo;</p>
          <ul className="space-y-3">
            {c.vision.points.map((p) => (
              <li key={p} className="flex items-center justify-center gap-3 text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-6">{c.network.title}</h2>
              <p className="text-gray-300 leading-8 mb-8">{c.network.body}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.network.locations.map((loc) => (
                  <div key={loc} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                    <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="text-sm text-gray-200">{loc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
              {[
                { label: lang === "zh" ? "生产基地" : "Production Bases", val: "2" },
                { label: lang === "zh" ? "销售中心" : "Sales Centers", val: "2" },
                { label: lang === "zh" ? "覆盖市场" : "Markets Served", val: "50+" },
                { label: lang === "zh" ? "年OEM/ODM项目" : "OEM/ODM Projects/yr", val: "30+" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-800 p-8 text-center">
                  <div className="text-4xl font-bold text-amber-400">{s.val}</div>
                  <div className="text-sm text-gray-400 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">{c.csr.title}</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">{c.csr.lead}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.csr.pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 pb-6 px-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 mb-4">
                      <Icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                    <ul className="space-y-1.5">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">{c.certs.title}</h2>
          <div className="flex flex-wrap justify-center" style={{ gap: "10px" }}>
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={56}
                  height={48}
                  style={{ height: "48px", width: "auto", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black">{c.cta.title}</h2>
          <p className="mt-3 text-black/70">{c.cta.sub}</p>
          <p className="mt-2 text-sm text-black/60">{c.cta.email}</p>
          <Link
            href="/inquiry"
            className={buttonVariants({
              size: "lg",
              className: "mt-6 bg-black text-white hover:bg-gray-800 inline-flex items-center gap-2",
            })}
          >
            {c.cta.btn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
