export default {
  // pages
  index: {
    title: "Cyber Resilience Act (CRA)",
    description:
      "Quickly find product requirements,<br>vulnerability handling, CE marking and labeling information",
  },
  // API
  categories: {
    all: "All",
    product: "Product",
    vulnerability: "Vulnerability",
    label: "Information and Labeling",
  },
  faq: {
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
