export default {
  // Pages
  index: {
    // 頁面標題與描述
    title: "Cyber Resilience Act (CRA)",
    description:
      "Quickly match product requirements,<br>master vulnerability handling, and ensure CE marking and compliance information.",

    // 導覽 / 通用
    themeToggle: "Toggle Theme",
    login: "Login",
    logout: "Logout",

    // 語系選單文字
    langSelect: {
      zh: "Traditional Chinese",
      en: "English",
    },

    // 角色身分翻譯
    roles: {
      super_admin: "Super Administrator",
      admin: "Administrator",
      developer: "Developer",
      viewer: "Viewer",
      default: "Not Logged In",
    },

    // 時程區塊
    scheduleTitle: "What is the key timeline?",
    scheduleSubtitle:
      "The CRA officially entered into force on December 10, 2024, with obligations implemented in phases:",
    tableHeaderDate: "Date",
    tableHeaderMilestone: "Milestone",
    item1Date: "2024/12/10",
    item1Desc: "CRA officially enters into force, with phased obligations kicking off.",
    item2Date: "2026/9/11",
    item2Desc:
      "Reporting obligations take effect: Actively exploited vulnerabilities and major cybersecurity incidents must be reported (including legacy products still within their support period).",
    item3Date: "2027/12/11",
    item3Desc:
      "Full mandatory enforcement: All regulated products must comply to enter the EU market.",

    // 特色卡片區塊
    feature1Title: "Systematic Security",
    feature1Desc:
      "Complies with CRA key requirements through a Secure Development Life Cycle (SDLC) certified by IEC 62443-4-1.",
    feature2Title: "Detect and Verify Vulnerabilities",
    feature2Desc: "Quickly identify and manage security vulnerabilities within products.",
    feature3Title: "Future-Proof Solutions",
    feature3Desc: "Proactively complies with regulatory requirements and evolving EU standards.",

    // 常見問題區塊
    faqSectionTitle: "FAQ",
    searchPlaceholder: "Enter keywords (e.g., product requirements, SBOM, vulnerability...)",
    noResultsTitle: "No matching CRA compliance answers found",
    noResultsDesc: "Try changing your keywords or resetting category filters.",
  },
  footer: {
    copyright: "&copy; 2026 Cyber Resilience Act. All rights reserved.",
  },
  authModal: {
    title: "Member Login (Authorization)",
    subtitle: "Please enter your credentials to log in, or click below for quick testing accounts.",
    emailLabel: "Email",
    emailPlaceholder: "e.g., pm@cra.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    submitBtn: "Confirm Login",
  },
  toast: {
    defaultSuccess: "Submitted successfully!",
    logout: "Successfully logged out, currently not logged in",
    loginAs: "Successfully logged in as [{{roleName}}]!",
  },
  // API
  categories: {
    all: "All",
    product: "Product Requirements",
    vulnerability: "Vulnerability Management",
    label: "Information & Labels",
  },
  faqs: {
    cra_intro: {
      question: "What kind of regulation is the EU Cyber Resilience Act (CRA)?",
      answer:
        "The EU Cyber Resilience Act (CRA) is a mandatory cybersecurity standard for hardware and software products with digital elements entering the EU market, establishing baseline cybersecurity requirements that connected or digital products must meet before and after being placed on the market.",
    },
    cra_requirements: {
      question:
        'What key "product security requirements" does the CRA establish for products preparing to launch?',
      answer:
        "Under the CRA, products must be delivered without any known exploitable vulnerabilities and feature protection proportional to their risk level. Manufacturers must also implement security by default out of the box and provide comprehensive, timely security update channels.",
    },
    vulnerability_process: {
      question:
        'What core practices must manufacturers implement for "vulnerability handling processes"?',
      answer:
        "Manufacturers must establish vulnerability management mechanisms covering the entire product lifecycle, including generating and continuously updating a Software Bill of Materials (SBOM), regularly tracking and patching existing vulnerabilities, and rapidly responding to newly disclosed security weaknesses.",
    },
    compliance_documents: {
      question:
        'What compliance documentation should manufacturers prepare to meet "information disclosure and labeling" rules?',
      answer:
        "Manufacturers must prepare complete CE marking certification, an EU Declaration of Conformity (DoC), details of an appointed EU Authorized Representative, and comprehensive technical documentation including a cybersecurity risk assessment report and an SBOM.",
    },
    sbom_importance: {
      question:
        "Why does an SBOM (Software Bill of Materials) play a critical role in CRA vulnerability management?",
      answer:
        "An SBOM gives manufacturers clear visibility into all third-party and open-source components used within a product. When a new cybersecurity vulnerability emerges, teams can quickly inventory and pinpoint affected product lines, significantly reducing response times.",
    },
    security_by_default: {
      question: 'What does "Security by Default," as emphasized by the CRA, mean in practice?',
      answer:
        '"Security by Default" means that when a product ships or is powered on for the first time, its factory configuration must already be set to the most secure state—such as prohibiting weak default passwords and disabling non-essential network ports and remote services—so users receive baseline protection without extra configuration.',
    },
    support_period_disclosure: {
      question:
        "What key details regarding the security support period must be disclosed in technical documentation and user manuals?",
      answer:
        "Manufacturers must clearly specify the expected security support period (in principle at least 5 years, or aligned with the product's expected lifetime) in both technical documentation and user instructions, committing to provide ongoing security updates and patches throughout that timeframe.",
    },
    conformity_assessment_classes: {
      question:
        "How do digital products classified under important categories (Class I / Class II) complete conformity assessments?",
      answer:
        "For Class I or Class II digital and IoT products listed under important categories, manufacturers must—depending on technical complexity and connectivity risk—conduct either an internal control assessment (self-declaration) or engage an EU Notified Body for third-party type examination.",
    },
    enisa_reporting_timeline: {
      question:
        "Once a cybersecurity vulnerability is discovered, what are the reporting deadlines for notifying the EU's ENISA?",
      answer:
        "Under the CRA, if a manufacturer becomes aware of an actively exploited vulnerability or a severe security incident affecting its product, it must submit an early warning to the EU Agency for Cybersecurity (ENISA) and relevant national CSIRTs within 24 hours of discovery, followed by a complete incident report within 72 hours.",
    },
    ce_marking_display: {
      question:
        "How should CE conformity markings be displayed on hardware versus standalone software products?",
      answer:
        'Physical hardware products must bear a visible, legible, and indelible CE marking on the device itself, its packaging, or accompanying documentation. For standalone software or digital services, the CE marking and compliance information should be prominently displayed on the installation screen, the system\'s "About" page, or the official download website.',
    },
    open_source_stewards: {
      question:
        "Are open-source software projects and Open Source Stewards also subject to CRA regulations?",
      answer:
        "To avoid hindering the open-source community, non-commercial pure open-source development and collaboration fall outside the scope of the CRA. However, if an open-source project is integrated into a commercial supply chain or backed by a commercial entity with a monetized distribution model, corresponding compliance and security maintenance obligations still apply.",
    },
    cicd_sbom_automation: {
      question:
        "How can R&D teams automatically generate CRA-compliant SBOMs within their daily development workflows?",
      answer:
        "R&D teams can integrate scanning tools such as Syft, CycloneDX, or Trivy into their CI/CD automated build pipelines, enabling the system to automatically inventory all dependencies on every build and output standard JSON or XML SBOM files ready for compliance archiving.",
    },
    pm_roadmap_timeline: {
      question:
        "How should Product Managers (PMs) schedule CRA compliance milestones when planning product roadmaps?",
      answer:
        "PMs should account for the CRA transition period (full mandatory enforcement takes effect 36 months after entry into force) and allocate roughly 6 to 12 months in the product roadmap to complete cybersecurity risk assessments, technical documentation, SBOM generation, and third-party assessments to ensure on-time market launch.",
    },
  },
};
