import { AnalysisData } from "./analysis";

export const mockAnalysisData: AnalysisData = {
  project: {
    name: "JSPSample",
    language: "Java",
    files: 4,
    size_kb: 1
  },
  analysis: {
    complexity_score: 2,
    component_hierarchy: {
      summary: "Flat architecture with HTML and embedded Java code in JSP files. No component-based structure.",
      issues: [
        "No separation of concerns",
        "Single-page design",
        "Deeply nested scriptlets and HTML"
      ],
      examples: ["welcome.jsp"]
    },
    modularity: {
      summary: "Highly monolithic with no modular boundaries. All components are tightly coupled.",
      issues: [
        "No reusable components",
        "JavaScript/HTML mixed with business logic",
        "Cannot independently update parts"
      ],
      examples: ["web.xml and JSP files"]
    },
    outdated_code: {
      summary: "Uses legacy technologies (Java 1.7, Servlet 3.1.0, DTD-based web.xml).",
      issues: [
        "Unsupported Java version",
        "Outdated Servlet API (v3.1.0)",
        "DTD web.xml format"
      ],
      examples: ["pom.xml", "web.xml", "welcome.jsp"]
    },
    mixed_patterns: {
      summary: "Mixes presentation markup (HTML), server-side scripting (scriptlets), and minimal design patterns.",
      issues: [
        "Scriptlet-based Java in JSP (<%, %> )",
        "No MVC separation",
        "Violation of presentation/logic separation"
      ],
      examples: ["welcome.jsp code blocks"]
    },
    legacy_state_management: {
      present: true,
      description: "Uses direct request/response parameters without frameworks like Spring MVC or component state management.",
      examples: ["request.getParameter() in welcome.jsp"]
    }
  },
  dependencies: {
    total: 1,
    outdated: 1,
    vulnerable: 0,
    list: [
      {
        name: "javax.servlet-api",
        version: "3.1.0",
        status: "outdated",
        issues: ["Potential security flaws", "Unsupported since 2016"]
      }
    ]
  },
  vulnerabilities: {
    count: 0,
    risk_level: "Low",
    details: []
  },
  migration: {
    recommended_framework: "React",
    suggested_tools: [
      "Babel",
      "Webpack",
      "RESTEasy",
      "Spring Boot"
    ],
    strategy: {
      overview: "Retain backend processes while migrating frontend to React. Create REST APIs and decouple presentation layer.",
      benefits: [
        "Better maintainability",
        "Improved UI/UX",
        "Modern tooling integration"
      ],
      risks: [
        "Backward compatibility challenges",
        "New QA requirements",
        "Data transformation overhead"
      ],
      technical_considerations: [
        "API-first development",
        "State management strategy",
        "Authentication refactor"
      ]
    },
    phases: [
      {
        name: "Environment Setup",
        description: "Prepare development environment with React tools and REST API foundation.",
        estimated_time_weeks: "2",
        progress_percent: 0,
        deliverables: ["React development environment", "REST API scaffold"],
        tools_used: ["npm", "Create React App", "Postman"]
      },
      {
        name: "Backend Refactor",
        description: "Extract business logic into services and create REST endpoints.",
        estimated_time_weeks: "3",
        progress_percent: 0,
        deliverables: ["REST APIs", "Backend validation logic"],
        tools_used: ["Spring Framework", "JUnit"]
      },
      {
        name: "Frontend Development",
        description: "Build React UI with state management (Redux) and integration with backend APIs.",
        estimated_time_weeks: "4",
        progress_percent: 0,
        deliverables: ["React application", "Responsive UI components"],
        tools_used: ["React", "Redux", "axios"]
      }
    ]
  },
  ai_tools: {
    legacy_analysis: {
      method: "Static code analysis via AST parsing of JSP files and dependency scanning.",
      findings: ["Embedded scriptlets found", "Outdated Java version detected"]
    },
    dependency_mapping: {
      method: "Automated dependency graph generation from POM file.",
      findings: ["Identified single dependency tree"]
    },
    complexity_scoring: {
      method: "Weighted SLOC and nesting level calculations.",
      rationale: "Determine migration effort - extremely low computational complexity."
    },
    anti_pattern_detection: {
      method: "Pattern recognition of anti-patterns (e.g., scriptlets, direct database calls).",
      patterns_found: [
        "Scriptlet anti-pattern",
        "Direct database access in view layer"
      ]
    }
  },
  progress: {
    completed_phases: 0,
    total_phases: 3,
    milestones: [
      "Environment Setup",
      "Backend Refactor",
      "Frontend Development"
    ]
  }
};