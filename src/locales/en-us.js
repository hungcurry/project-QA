export default {
// pages
  index: {
    title: "Cyber Resilience Act (CRA)",
    description:
      "Quickly find product requirements,<br>vulnerability handling, CE marking and labeling information",
  },
  nav: {
    themeToggle: "Toggle Theme",
    login: "Login",
    logout: "Logout",
  },
  schedule: {
    title: "What is the key timeline?",
    subtitle: "The CRA officially entered into force on December 10, 2024, with obligations implemented in phases:",
    tableHeaderDate: "Date",
    tableHeaderMilestone: "Milestone",
    item1Date: "2024/12/10",
    item1Desc: "CRA officially enters into force, with phased obligations kicking off.",
    item2Date: "2026/9/11",
    item2Desc: "Reporting obligations take effect: Actively exploited vulnerabilities and major cybersecurity incidents must be reported (including legacy products still within their support period).",
    item3Date: "2027/12/11",
    item3Desc: "Full mandatory enforcement: All regulated products must comply to enter the EU market.",
  },
  faq: {
    sectionTitle: "FAQ",
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
    errorMsg: "Invalid account or password, please try again.",
    submitBtn: "Confirm Login",
    quickTestTitle: "Quick Test Accounts:",
    pmBtn: "PM Account",
    rdBtn: "RD Account",
    randomBtn: "Random Account",
  },
  toast: {
    defaultSuccess: "Submitted successfully!",
  },
  // API
  categories: {
    all: "All",
    product: "Product",
    vulnerability: "Vulnerability",
    label: "Information and Labeling",
  },
  faqs: {
    cra_intro: {
      question: "What is the EU Cyber Resilience Act (CRA)?",
      answer:
        "The EU Cyber Resilience Act (CRA) is an EU regulation that establishes mandatory cybersecurity requirements for products with digital elements, including hardware and software, sold on the EU market.",
    },
    cra_requirements: {
      question: "What are the key product requirements under the CRA?",
      answer:
        "Products must achieve an appropriate level of cybersecurity and be delivered without known vulnerabilities. Manufacturers must implement security by default and provide adequate security updates.",
    },
    vulnerability_process: {
      question: "What key steps must manufacturers take in their vulnerability handling process?",
      answer:
        "Vulnerability handling covers the entire product lifecycle, including creating and maintaining an SBOM, tracking and remediating known vulnerabilities, and promptly addressing newly discovered vulnerabilities.",
    },
    compliance_documents: {
      question:
        "What compliance documents and declarations are required for information and labeling?",
      answer:
        "Requirements include CE marking, the EU Declaration of Conformity (DoC), appointment of an authorized representative where required, technical documentation including a cybersecurity risk assessment, and an SBOM.",
    },
    sbom_importance: {
      question: "Why is an SBOM so important for CRA vulnerability handling?",
      answer:
        "An SBOM helps manufacturers identify all third-party and open-source software dependencies in a product, making it easier to determine the scope of affected components when a vulnerability emerges.",
    },
  },
};
