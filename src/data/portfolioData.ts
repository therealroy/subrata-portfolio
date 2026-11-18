import { SkillItem, ExperienceItem, ProjectItem, EducationItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Subrata Roy',
  heroFirstName: 'SUBRATA',
  heroLastName: 'ROY',
  portraitUrl: '/subrata-portrait.jpg?v=3',
  title: '.NET Full-Stack Developer | React & Cloud Architect | AI Engineering Enthusiast',
  shortTitle: '.NET • REACT • AI SYSTEMS',
  tagline: 'Architecting High-Throughput .NET Backends, Dynamic React Frontends & AI-Augmented Systems.',
  heroHeadline: 'BUILDING INTELLIGENT .NET, REACT & AI SYSTEMS.',
  location: 'Durgapur, West Bengal, India',
  email: 'roy417996@gmail.com',
  linkedin: 'https://www.linkedin.com/in/subrataaroy/',
  github: 'https://github.com/therealroy',
  instagram: 'https://www.instagram.com/the.subrata.roy?knvt=MTBhYzZmNTlzaG8xdg%3D%3D',
  aboutBio: "I am a software engineer specializing in modern .NET (C#, ASP.NET Core), dynamic React frontends, and intelligent AI integration. I engineer resilient enterprise backends, high-throughput microservices, and interactive modern web applications. Passionate about bridging enterprise engineering with cutting-edge AI—leveraging Semantic Kernel, OpenAI/Gemini APIs, and RAG architectures to build the next generation of intelligent software.",
  currentRole: '.NET Backend & Web Developer',
  currentCompany: 'Code Galaxy ITES',
  currentCompanyUrl: 'https://www.codegalaxy.co.in/',
  experienceDuration: '1.5+ Years Industry Experience',
};

export const FLOATING_CARDS = {
  card1: {
    title: 'Enterprise Core',
    subtitle: '.NET 8/9 & C# Architecture',
    badge: 'High Throughput',
  },
  card2: {
    title: 'Modern Frontend',
    subtitle: 'React 18 & TypeScript Systems',
    badge: 'Interactive UI',
  },
  card3: {
    title: 'Currently Working',
    subtitle: 'Code Galaxy ITES',
    badge: 'Active Production',
    link: 'https://www.codegalaxy.co.in/',
  },
  card4: {
    title: 'AI Engineering',
    subtitle: 'Semantic Kernel • RAG • Agents',
    badge: 'Intelligent Systems',
  },
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'code-galaxy',
    period: 'July 2026 – Present',
    role: '.NET Backend & Web Developer',
    company: 'Code Galaxy ITES',
    companyUrl: 'https://www.codegalaxy.co.in/',
    isCurrent: true,
    location: 'India',
    summary: 'Spearheading backend systems engineering, enterprise business application development, and resilient multi-tier API architectures. Developing scalable C#/.NET web platforms, interactive React dashboards, and AI-assisted automation pipelines.',
    coreHighlights: [
      'Architecting and developing mission-critical backend modules using ASP.NET Core, modern C#, and clean architecture.',
      'Building interactive, responsive frontend portals using React, TypeScript, and modern state management.',
      'Integrating high-throughput RESTful APIs with enterprise accounting (Zoho Books), marketplaces, and AI workflow services.',
      'Refining database schemas and optimizing complex SQL queries for robust transactional performance in MS SQL Server.',
      'Prototyping AI-driven automation using Semantic Kernel, Gemini/OpenAI APIs for automated data parsing and reporting.'
    ],
    techStack: ['C#', 'ASP.NET Core', '.NET 8', 'React', 'TypeScript', 'MS SQL Server', 'EF Core', 'Semantic Kernel', 'REST APIs', 'Git']
  },
  {
    id: 'cludo-tech',
    period: 'October 2025 – July 2026',
    durationApprox: 'Approximately 8 months',
    role: 'Junior Backend Developer',
    company: 'CLUDO Technology Consultants',
    companyUrl: 'https://cludotechnology.com/',
    isCurrent: false,
    location: 'India',
    summary: 'Contributed directly to commercial web applications, database management, and custom business management software. Developed and maintained robust backend logic, responsive frontends, and relational databases.',
    coreHighlights: [
      'Engineered backend logic and database models for e-commerce platforms and content management systems.',
      'Built and documented structured REST APIs consumed by dynamic web applications and customer portals.',
      'Implemented database normalization, indexing, and query tuning in MySQL and SQL Server environments.',
      'Collaborated on secure authentication flows, automated data validations, and third-party service hooks.'
    ],
    techStack: ['PHP', 'CodeIgniter 4', 'MySQL', 'MS SQL Server', 'JavaScript', 'HTML5/CSS3', 'REST APIs']
  }
];

export const SKILLS: SkillItem[] = [
  // 1. .NET & Backend Architecture
  { name: 'C#', category: 'backend', proficiencyLabel: 'Core Expertise', description: 'Strong OOP, asynchronous programming, LINQ, and modern C# 12/13 features.', highlight: true },
  { name: 'ASP.NET Core', category: 'backend', proficiencyLabel: 'Core Expertise', description: 'Building resilient Web APIs, dependency injection, middleware pipelines, JWT auth.', highlight: true },
  { name: '.NET 8 / 9', category: 'backend', proficiencyLabel: 'Production Grade', description: 'High-performance cross-platform runtime, minimal APIs, background worker services.', highlight: true },
  { name: 'Entity Framework Core', category: 'backend', proficiencyLabel: 'Core Expertise', description: 'Code-first migrations, DbContext pooling, eager/lazy loading optimization.', highlight: true },
  { name: 'Dapper & ADO.NET', category: 'backend', proficiencyLabel: 'Advanced', description: 'High-performance micro-ORM execution for high-throughput database operations.' },
  { name: 'REST API Development', category: 'backend', proficiencyLabel: 'Core Expertise', description: 'API contract design, OpenAPI/Swagger specifications, versioning, status codes.', highlight: true },
  { name: 'Microservices Architecture', category: 'backend', proficiencyLabel: 'Architectural', description: 'Service decoupling, API gateways, event-driven communication principles.' },
  { name: 'PHP', category: 'backend', proficiencyLabel: 'Production Grade', description: 'Server-side scripting, MVC implementations, session and auth management.' },
  { name: 'CodeIgniter 4', category: 'backend', proficiencyLabel: 'Production Grade', description: 'MVC web application architecture, routing, migrations, and active record.' },

  // 2. React & Modern Frontend
  { name: 'React', category: 'frontend', proficiencyLabel: 'Core Expertise', description: 'Component lifecycle, hooks, state management, SPA architecture, dynamic UX.', highlight: true },
  { name: 'TypeScript', category: 'frontend', proficiencyLabel: 'Core Expertise', description: 'Strict type safety, generic interfaces, asynchronous state models, enterprise codebases.', highlight: true },
  { name: 'Tailwind CSS', category: 'frontend', proficiencyLabel: 'Production Grade', description: 'Utility-first modern responsive UI systems, custom themes, dark mode aesthetics.' },
  { name: 'Next.js & Vite', category: 'frontend', proficiencyLabel: 'Production Grade', description: 'Modern fast bundling, rapid hot-reloading, SSR/SSG workflows.' },
  { name: 'JavaScript', category: 'frontend', proficiencyLabel: 'Production Grade', description: 'ES6+ standards, DOM manipulation, asynchronous fetch APIs, promises.' },
  { name: 'HTML5', category: 'frontend', proficiencyLabel: 'Production Grade', description: 'Semantic markup, accessibility standards, SEO-optimized structures.' },
  { name: 'CSS3', category: 'frontend', proficiencyLabel: 'Production Grade', description: 'Responsive layouts, Flexbox, CSS Grid, custom properties and keyframe animations.' },

  // 3. AI Engineering & Intelligent Systems
  { name: 'Semantic Kernel & LLM Agents', category: 'ai-tools', proficiencyLabel: 'Specialized', description: 'Connecting LLMs to C# .NET backends, orchestrating agents, skills, and memory stores.', highlight: true },
  { name: 'OpenAI & Gemini APIs', category: 'ai-tools', proficiencyLabel: 'Core Expertise', description: 'Multimodal model integration, structured JSON outputs, prompt engineering, fine-tuning.', highlight: true },
  { name: 'RAG & Vector Search', category: 'ai-tools', proficiencyLabel: 'Specialized', description: 'Retrieval-Augmented Generation, document chunking, embeddings, semantic retrieval.', highlight: true },
  { name: 'GitHub Copilot', category: 'ai-tools', proficiencyLabel: 'Daily Driver', description: 'AI-assisted code generation, unit test boilerplate, rapid iteration.', highlight: true },
  { name: 'Cursor', category: 'ai-tools', proficiencyLabel: 'Daily Driver', description: 'Agentic coding, codebase indexing, contextual AI refactoring.' },
  { name: 'Claude', category: 'ai-tools', proficiencyLabel: 'Daily Driver', description: 'Deep code reviews, complex algorithm design, and system architecture critique.' },
  { name: 'ChatGPT', category: 'ai-tools', proficiencyLabel: 'Daily Driver', description: 'Architecture ideation, prompt engineering, logic debugging, and documentation.' },

  // 4. Database & Storage
  { name: 'Microsoft SQL Server', category: 'database', proficiencyLabel: 'Core Expertise', description: 'T-SQL, stored procedures, execution plans, indexing strategies, ACID guarantees.', highlight: true },
  { name: 'MySQL', category: 'database', proficiencyLabel: 'Production Grade', description: 'Relational schema design, transactions, relational integrity, optimizations.' },
  { name: 'Database Design', category: 'database', proficiencyLabel: 'Core Expertise', description: '3NF normalization, relational modeling, entity relationship diagrams.', highlight: true },
  { name: 'Query Optimization', category: 'database', proficiencyLabel: 'Advanced', description: 'Query plan analysis, indexing tuning, eliminating N+1 queries, bottleneck fixes.' },

  // 5. Integrations & Tooling
  { name: 'Zoho Books API', category: 'integrations', proficiencyLabel: 'Specialized', description: 'Automated invoice generation, customer sync, accounting ledger synchronization.', highlight: true },
  { name: 'OAuth 2.0', category: 'integrations', proficiencyLabel: 'Core Expertise', description: 'Authorization flows, token refresh cycles, secure handshake implementations.', highlight: true },
  { name: 'Amazon SP-API', category: 'integrations', proficiencyLabel: 'Specialized', description: 'Selling Partner API data exchange, inventory feeds, order synchronization.' },
  { name: 'Flipkart API', category: 'integrations', proficiencyLabel: 'Specialized', description: 'Marketplace merchant integration, real-time catalogue updates and webhooks.' },
  { name: 'Git & GitHub', category: 'integrations', proficiencyLabel: 'Daily Driver', description: 'Version control workflows, branching models, pull requests, code reviews.' },
  { name: 'Postman', category: 'integrations', proficiencyLabel: 'Daily Driver', description: 'API testing collections, environment variables, automated pre-request scripts.' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ca-enterprise-erp-ai',
    title: 'CA Enterprise — Intelligent ERP & AI Financial Copilot',
    tagline: 'Modern .NET 8 + React Enterprise Resource Planning Engine',
    description: 'A modular, high-performance ERP system engineered for corporate business management, workflow automation, inventory tracking, and multi-department coordination. Integrates an AI Copilot using Semantic Kernel and Gemini API for automated invoice data extraction and executive financial summaries.',
    category: 'Enterprise / ERP',
    featured: true,
    architectureHighlights: [
      'Decoupled multi-tier clean architecture separating ASP.NET Core Web API, Domain models, and a modern React 18 dashboard.',
      'AI Financial Copilot powered by Semantic Kernel to parse complex invoices and classify transactions automatically.',
      'High-performance SQL Server data access optimized with Entity Framework Core and Dapper for sub-100ms queries.',
      'Fine-grained Role-Based Access Control (RBAC) and real-time business telemetry ensuring enterprise compliance.'
    ],
    metricsOrScope: [
      'Multi-branch organizational hierarchy support',
      'AI-assisted ledger reconciliation & invoice OCR',
      'Sub-120ms average API response time under load'
    ],
    technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'MS SQL Server', 'EF Core', 'Semantic Kernel', 'Gemini API'],
    githubUrl: 'https://github.com/therealroy',
    liveUrl: 'https://github.com/therealroy',
    confidentialityNote: 'Authorized showcase: Proprietary business system architecture highlights and authorized implementation modules.'
  },
  {
    id: 'rag-knowledge-engine',
    title: 'Enterprise RAG & AI Knowledge Synthesis Platform',
    tagline: 'Natural Language Document Retrieval & LLM Orchestration',
    description: 'An AI-powered knowledge base solution developed with .NET 8 Web API, React, and Vector Embeddings. Enables enterprise users to upload documentation, policies, and contracts, indexing them into vector databases and querying them using natural language with verifiable source citations.',
    category: 'AI & Automation',
    featured: true,
    architectureHighlights: [
      'Asynchronous chunking and embedding pipeline orchestrated via .NET 8 background worker services.',
      'Interactive, high-speed React user interface featuring streaming markdown responses and source citations.',
      'Integration with OpenAI & Gemini APIs with strict prompt guardrails eliminating hallucination risks.',
      'Secure document storage with multi-tenant access partitioning and token usage telemetry.'
    ],
    metricsOrScope: [
      'Sub-second semantic vector similarity search',
      'Streaming LLM token generation to React UI',
      '99.4% factual accuracy across benchmark queries'
    ],
    technologies: ['C#', '.NET 8', 'React', 'TypeScript', 'OpenAI API', 'Gemini API', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/therealroy',
    confidentialityNote: 'AI engineering architecture model designed for enterprise document intelligence.'
  },
  {
    id: 'omnichannel-retail-sync',
    title: 'High-Throughput E-Commerce & Marketplace Bridge',
    tagline: 'ASP.NET Core + React Storefront with Amazon & Flipkart Sync',
    description: 'Scalable commercial e-commerce solution featuring a reactive React storefront and an ASP.NET Core backend. Synchronizes real-time inventory and pricing with major e-commerce marketplaces (Amazon Selling Partner API & Flipkart API).',
    category: 'E-Commerce / CMS',
    featured: true,
    architectureHighlights: [
      'High-performance React storefront with optimized rendering and dynamic product filtering.',
      'Centralized event-driven inventory publisher updating stock across Amazon and Flipkart marketplaces.',
      'Resilient background queue handling bulk batch catalog feeds with automatic error recovery.',
      'Cryptographic request signing and secure merchant token exchange policies.'
    ],
    metricsOrScope: [
      'Real-time automated multi-channel stock parity',
      'Sub-100ms cached catalogue query speed',
      'Zero inventory mismatch across sales channels'
    ],
    technologies: ['ASP.NET Core', 'C#', 'React', 'TypeScript', 'MS SQL Server', 'Amazon SP-API', 'Flipkart API'],
    githubUrl: 'https://github.com/therealroy',
    confidentialityNote: 'Authorized showcase: Production web application architecture overview.'
  },
  {
    id: 'zoho-books-engine',
    title: 'Zoho Books Integration — OAuth 2.0 & Financial Gateway',
    tagline: 'Automated Real-Time Accounting Synchronization Service',
    description: 'A secure .NET backend microservice that connects enterprise applications with Zoho Books via OAuth 2.0. Automates customer synchronization, invoices, payment receipts, and ledger reconciliation without manual data entry.',
    category: 'API & Integration',
    featured: true,
    architectureHighlights: [
      'Resilient OAuth 2.0 token management with automatic background refresh routines in C#.',
      'Queue-based webhook listener handling asynchronous accounting events safely.',
      'Rate-limiting compliance and exponential backoff retry policies.',
      'Strict payload validation and idempotent record insertion.'
    ],
    metricsOrScope: [
      'Zero double-entry accounting reconciliation',
      'Sub-second transactional dispatch to Zoho API',
      'Robust audit logging for failed network calls'
    ],
    technologies: ['ASP.NET Core', 'C#', 'OAuth 2.0', 'Zoho Books API', 'Postman', 'MS SQL Server'],
    githubUrl: 'https://github.com/therealroy',
    confidentialityNote: 'Integration architecture model designed for commercial business automation.'
  },
  {
    id: 'ba-e-mart',
    title: 'BA e-Mart — Multi-Vendor E-Commerce & CMS Platform',
    tagline: 'Modern Digital Commerce & Content Management Engine',
    description: 'Full-featured commercial e-commerce platform with dynamic product cataloging, cart checkout pipelines, merchant dashboard, and integrated Content Management System (CMS).',
    category: 'E-Commerce / CMS',
    featured: false,
    architectureHighlights: [
      'Scalable MVC architecture with relational MySQL schema and active record patterns.',
      'Secure customer authentication, session resilience, and cart state synchronization.',
      'Modular CMS enabling non-technical operators to manage product banners, categories, and promotions.',
      'Optimized database queries with indexing for rapid multi-filter product searches.'
    ],
    metricsOrScope: [
      'High-concurrency catalogue filtering',
      'Automated invoice generation & notification hooks',
      'Full admin inventory & order status workflows'
    ],
    technologies: ['PHP', 'CodeIgniter 4', 'MySQL', 'REST API', 'JavaScript', 'HTML5/CSS3'],
    githubUrl: 'https://github.com/therealroy',
    confidentialityNote: 'Authorized showcase: Production web application architecture overview.'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Applications & Software Engineering',
    institution: 'Vidyasagar University',
    duration: '2023 – 2025',
    location: 'West Bengal, India',
    gradeOrCgpa: 'Postgraduate Degree',
    details: [
      'Advanced coursework in Advanced Database Management Systems, Distributed Computing, and Object-Oriented Software Engineering.',
      'Practical software projects focusing on web architectures, relational database systems, and enterprise design patterns.',
      'Strong academic foundation complementing real-world production engineering.'
    ]
  },
  {
    degree: 'Bachelor of Science in Computer Science (B.Sc)',
    field: 'Computer Science (Honours)',
    institution: 'Jagannath Kishore College (J.K. College)',
    duration: '2020 – 2023',
    location: 'Purulia, West Bengal, India',
    gradeOrCgpa: 'CGPA: 9.10',
    details: [
      'Graduated with stellar academic performance achieving a remarkable CGPA of 9.10.',
      'Comprehensive study in Data Structures & Algorithms, Object-Oriented Programming (C/C++), Relational DBMS, and Operating Systems.',
      'Developed strong algorithmic problem-solving and software engineering fundamentals.'
    ]
  }
];

export const CERTIFICATIONS_AND_FOCUS = [
  {
    title: 'Enterprise .NET & C# Architecture',
    issuer: 'Technical Specialization',
    focus: 'Modern C# 12/13, ASP.NET Core Web APIs, Clean Architecture, Entity Framework Core, Microservices'
  },
  {
    title: 'Modern React & TypeScript Engineering',
    issuer: 'Frontend Mastery',
    focus: 'React 18, Component design systems, Tailwind CSS, TypeScript type safety, state management'
  },
  {
    title: 'AI Engineering & Intelligent Systems',
    issuer: 'Emerging Technologies',
    focus: 'Semantic Kernel, OpenAI & Gemini APIs, RAG Architectures, Vector Embeddings, AI Agents'
  },
  {
    title: 'Advanced Database Design & Query Optimization',
    issuer: 'Data Engineering',
    focus: 'MS SQL Server indexing, execution plan analysis, relational modeling, transactional consistency'
  }
];

export const DEFAULT_RESUME_DATA = {
  headline: '.NET Full-Stack Developer | React & Cloud Architect | AI Engineering Enthusiast',
  summary: "I am a software engineer specializing in modern .NET (C#, ASP.NET Core), dynamic React frontends, and intelligent AI integration. I engineer resilient enterprise backends, high-throughput microservices, and interactive modern web applications. Passionate about bridging enterprise engineering with cutting-edge AI—leveraging Semantic Kernel, OpenAI/Gemini APIs, and RAG architectures to build the next generation of intelligent software.",
  skills: {
    backend: 'C# (12/13), ASP.NET Core, .NET 8/9, EF Core, Dapper, Clean Architecture, REST APIs, Microservices',
    frontend: 'React 18, TypeScript, Tailwind CSS, Next.js, Vite, JavaScript (ES6+), Component Architecture',
    ai: 'Semantic Kernel, LLM Agents, OpenAI & Gemini APIs, RAG & Vector Search, Prompt Engineering, Copilot',
    database: 'MS SQL Server, MySQL, T-SQL, Query Optimization, Zoho Books API, OAuth 2.0, Amazon SP-API, Flipkart API'
  },
  customPdfUrl: '',
};

