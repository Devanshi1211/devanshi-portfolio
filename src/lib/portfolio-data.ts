import cuFoundationDoc from "@/assets/code-unnati-foundation-course-2.pdf.asset.json";
import craftathonImg from "@/assets/craftathon-2026.png.asset.json";
import tmSecurityDoc from "@/assets/tech-mahindra-securing-our-business.pdf.asset.json";
import cnDsaDoc from "@/assets/coding-ninjas-dsa.pdf.asset.json";
import ibmDtDoc from "@/assets/ibm-design-thinking.pdf.asset.json";
import fccImg from "@/assets/freecodecamp-responsive-web-design.jpeg.asset.json";
import scalerCert from "@/assets/scaler-python.jpeg.asset.json";
import codechefDoc from "@/assets/codechef-500-rating.pdf.asset.json";
import codechefPythonDoc from "@/assets/codechef-python.pdf.asset.json";
import tmInternshipDoc from "@/assets/tech-mahindra-internship.pdf.asset.json";

import ibmAiImg from "@/assets/ibm-ai.png.asset.json";
import ibmAiDoc from "@/assets/ibm-intro-ai.pdf.asset.json";
import acmegradeImg from "@/assets/acmegrade-machine-learning.pdf.asset.json";
import bestResearchImg from "@/assets/best-research.jpeg.asset.json";
import cnMlDoc from "@/assets/coding-ninjas-ml.pdf.asset.json";
import cnOopsDoc from "@/assets/coding-ninjas-oops.pdf.asset.json";
import deloitteForageCert from "@/assets/deloitte-forage-certificate.png.asset.json";
import urfuSummerAiHackatomCert from "@/assets/urfu-summer-ai-hackatom-certificate.png.asset.json";
import iitPlacementCert from "@/assets/iit-placement-preparation.jpeg.asset.json";

const SCALER_CERT_IMAGE = scalerCert.url;
const IIT_PLACEMENT_IMAGE = iitPlacementCert.url;
const CODECHEF_DOC = codechefDoc.url;

// Single source of truth for portfolio content.
// Placeholders in CAPS are editable stubs — replace with real URLs.

export const LINKS = {
  email: "devanshiis20051211@gmail.com",
  phone: "+91 8140660894",
  location: "",
  linkedin: "https://www.linkedin.com/in/devanshi1211/",
  github: "https://github.com/Devanshi1211",
  leetcode: "https://leetcode.com/u/o4Bsx3WOjv/",
  instagram: "https://instagram.com/devanshi_1211_",
  resume: "RESUME_PDF_URL",
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export const ROLES = [
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI & Deep Learning",
];

export const STATS = [
  { value: "9.64", label: "CGPA / 10" },
  { value: "250+", label: "LeetCode problems" },
  { value: "9", label: "Shipped projects" },
  { value: "22", label: "Certifications" },
];

export type SkillGroup = {
  title: string;
  icon: string;
  accent: "coral" | "amber" | "emerald" | "violet";
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming",
    icon: "code",
    accent: "coral",
    items: ["Python", "SQL", "R"],
  },
  {
    title: "Data & Analytics",
    icon: "chart",
    accent: "amber",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Power BI",
      "EDA",
      "Data Cleaning",
      "Feature Engineering",
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    accent: "emerald",
    items: [
      "Machine Learning",
      "Scikit-learn",
      "TensorFlow",
      "Deep Learning",
      "Generative AI",
      "NLP",
      "Transformers",
      "Regression",
      "Classification",
      "Clustering",
      "Model Evaluation",
      "Hyperparameter Tuning",
    ],
  },
  {
    title: "Development & Tools",
    icon: "wrench",
    accent: "violet",
    items: [
      "Computer Vision",
      "OpenCV",
      "CNN",
      "PyMuPDF",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "GitHub",
      "Jupyter Notebook",
      "Google Colab",
      "VS Code",
    ],
  },
];


export type SoftSkill = {
  title: string;
  description: string;
  icon: string;
  accent: "coral" | "amber" | "emerald" | "violet";
};

export const SOFT_SKILLS: SoftSkill[] = [
  {
    title: "Problem Solving",
    description: "Breaks complex problems into simple, elegant solutions.",
    icon: "puzzle",
    accent: "violet",
  },
  {
    title: "Team Leadership",
    description: "Led project teams in Code Unnati and the Google hackathon.",
    icon: "trophy",
    accent: "amber",
  },
  {
    title: "Communication",
    description: "Clear and concise during teamwork and presentations.",
    icon: "speech",
    accent: "coral",
  },
  {
    title: "Teamwork",
    description: "Comfortable collaborating in technical and hackathon teams.",
    icon: "handshake",
    accent: "emerald",
  },
  {
    title: "Time Management",
    description: "Balances academics, projects, and coding practice effectively.",
    icon: "timer",
    accent: "violet",
  },
  {
    title: "Adaptability",
    description: "Learns new tools and technologies quickly and confidently.",
    icon: "zap",
    accent: "amber",
  },
  {
    title: "Quick Learning",
    description: "Continuously improves through projects and certifications.",
    icon: "book",
    accent: "emerald",
  },
  {
    title: "Presentation Skills",
    description: "Presents research and technical work confidently.",
    icon: "mic",
    accent: "coral",
  },
];

export type WhatIDoCard = {
  id: string;
  title: string;
  shortDescription: string;
  color: "coral" | "amber" | "emerald" | "violet";
  description: string;
  workflow?: string[];
  tech: string[];
  keyAreas: string[];
  exampleProjects: string[];
};

export const WHAT_I_DO: WhatIDoCard[] = [
  {
    id: "data-analysis",
    title: "Data Analysis",
    shortDescription: "Extracting insights from complex datasets using Pandas, NumPy, and SQL.",
    color: "coral",
    description:
      "I turn raw, messy data into clear, actionable insight. My process moves from cleaning and exploration through analysis and visualization, ending with a conclusion that can drive a decision.",
    workflow: ["Cleaning", "Exploration", "Analysis", "Visualization", "Insight"],
    tech: ["Python", "Pandas", "NumPy", "SQL", "Matplotlib", "EDA", "Data Cleaning", "Data Visualization"],
    keyAreas: ["Exploratory Data Analysis", "Data Cleaning & Preprocessing", "Statistical Analysis", "Visualization & Reporting"],
    exampleProjects: ["SkillMap", "Movie Recommendation System"],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    shortDescription: "Building predictive models with Scikit-learn, regression, classification and evaluation.",
    color: "emerald",
    description:
      "I build end-to-end ML workflows: feature engineering, model selection, rigorous evaluation and tuning. I care more about whether a model generalises than whether it scores well on one split.",
    workflow: ["Problem Framing", "Feature Engineering", "Model Selection", "Evaluation", "Tuning"],
    tech: ["Python", "Scikit-learn", "Regression", "Classification", "Feature Engineering", "Model Evaluation", "Hyperparameter Tuning"],
    keyAreas: ["Supervised Learning", "Model Validation", "Feature Scaling", "Cross-Validation"],
    exampleProjects: ["NeuroTrace", "Movie Recommendation System", "Spam Detection System"],
  },
  {
    id: "ai-nlp",
    title: "AI & NLP",
    shortDescription: "Developing intelligent systems using NLP techniques and TF-IDF vectorization.",
    color: "violet",
    description:
      "I work on text-based AI systems — from TF-IDF classifiers to transformer-backed assistants — with a focus on clean preprocessing, honest evaluation and practical deployment.",
    workflow: ["Text Preprocessing", "Vectorization", "Modeling", "Evaluation", "Deployment"],
    tech: ["Python", "NLP", "TF-IDF", "Text Processing", "Machine Learning", "AI", "Transformers"],
    keyAreas: ["Text Classification", "TF-IDF Vectorization", "Transformer Models", "Conversational AI"],
    exampleProjects: ["Spam Detection System", "AI Chat Assistant", "ViralAI"],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    shortDescription: "Image processing and shape detection using OpenCV and deep learning.",
    color: "amber",
    description:
      "I apply computer vision and signal-processing techniques to structured data like images and time-series signals, combining deep learning with careful preprocessing.",
    workflow: ["Image Preprocessing", "Feature Extraction", "Modeling", "Evaluation", "Inference"],
    tech: ["Python", "OpenCV", "Image Processing", "Feature Extraction", "Computer Vision", "TensorFlow"],
    keyAreas: ["Image Preprocessing", "Signal Processing", "Feature Extraction", "Deep Learning for Vision"],
    exampleProjects: ["NeuroTrace"],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    shortDescription: "Solving complex DSA problems with optimized time and space complexity.",
    color: "coral",
    description:
      "I solve structured algorithmic and SQL problems across arrays, linked lists, trees, graphs and dynamic programming, with 250+ problems on LeetCode and a habit of reasoning about complexity.",
    workflow: ["Understand", "Design", "Code", "Test", "Optimize"],
    tech: ["Python", "C++", "Java", "DSA", "Algorithms", "SQL"],
    keyAreas: ["Arrays & Strings", "Linked Lists & Trees", "Graphs", "Dynamic Programming", "SQL"],
    exampleProjects: ["250+ LeetCode problems", "Top SQL 50 badge"],
  },
  {
    id: "web-app-projects",
    title: "Web / App Projects",
    shortDescription: "Creating functional dashboards and AI tools using React and modern web stack.",
    color: "emerald",
    description:
      "I ship interfaces that make ML and analytics usable by real people — dashboards, booking flows, planners and assistants built with React and connected to data backends.",
    workflow: ["Design", "Build", "Connect", "Test", "Ship"],
    tech: ["React", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB"],
    keyAreas: ["React Components", "Responsive UI", "API Integration", "Dashboard Design"],
    exampleProjects: ["RoyalCare Hospital Website", "SevaSync AI", "AI Study Planner", "SkillMap"],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: "AI / ML" | "Data Science" | "NLP" | "Web";
  summary: string;
  highlights: string[];
  stack: string[];
  demo: string;
  code: string;
  /** Visual direction for the card hero banner */
  visual: { icon: string; from: string; to: string; caption: string };
  impact?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "neurotrace",
    name: "NeuroTrace",
    tagline: "AI-based brain-state detection & analysis platform",
    category: "AI / ML",
    summary:
      "An ML/DL pipeline for EEG-based cognitive-state classification (focus, relaxation, alertness): signal preprocessing, feature extraction, model training, and an interactive real-time dashboard. Uses machine learning, deep learning and neural networks for signal-based data analysis.",
    highlights: [
      "EEG signal preprocessing",
      "Neural-network-based classification",
      "Real-time visualization dashboard",
    ],
    stack: [
      "Python",
      "Scikit-learn",
      "Deep Learning",
      "Neural Networks",
      "EEG Signal Processing",
      "Data Visualization",
    ],
    demo: "https://devanshi-three.vercel.app/",
    code: "GITHUB_URL",
    visual: { icon: "Brain", from: "violet", to: "primary", caption: "EEG signal analytics" },
  },
  {
    id: "sevasync",
    name: "SevaSync AI",
    tagline: "AI-powered NGO resource allocation platform",
    category: "AI / ML",
    summary:
      "An AI-powered platform for NGOs to manage community needs efficiently. It collects data from multiple sources, prioritizes urgent cases using AI logic, and intelligently matches volunteers with the right tasks.",
    highlights: [
      "AI-based urgency detection",
      "Volunteer-task matching system",
      "Real-time dashboard insights",
      "Multi-source data processing",
    ],
    stack: ["React", "Python", "AI", "Dashboard", "NLP"],
    demo: "https://sevasync-ai.vercel.app/",
    code: "GITHUB_URL",
    visual: { icon: "HeartHandshake", from: "emerald", to: "primary", caption: "Community impact dashboard" },
  },
  {
    id: "viralai",
    name: "ViralAI",
    tagline: "AI content generation & recommendation platform",
    category: "AI / ML",
    summary:
      "A full recommendation-system build applying AI/ML/DL/NLP techniques end-to-end. It automates social media workflows — generating posts, captions and structured content using AI-driven logic built for scalability.",
    highlights: [
      "Automated content generation",
      "Smart scheduling workflows",
      "AI-driven text structuring",
      "Recommendation-engine logic",
    ],
    stack: [
      "AI",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Web App",
      "Automation",
      "JavaScript",
    ],
    demo: "https://crafton-main.vercel.app/",
    code: "GITHUB_URL",
    visual: { icon: "Sparkles", from: "amber", to: "coral", caption: "Content + analytics engine" },
  },
  {
    id: "movie-recsys",
    name: "Movie Recommendation System",
    tagline: "Collaborative-filtering recommendation engine",
    category: "Data Science",
    summary:
      "A recommendation engine using collaborative filtering and user-item interaction; it processes a dataset to deliver personalized movie suggestions.",
    highlights: [
      "Collaborative filtering logic",
      "Cosine similarity calculation",
      "Data filtering techniques optimized for recommendation accuracy",
    ],
    stack: ["Python", "Pandas", "Machine Learning", "Recommendation"],
    demo: "https://devanshi1211.github.io/Movie_recommed_system/",
    code: "GITHUB_URL",
    visual: { icon: "Clapperboard", from: "coral", to: "violet", caption: "Personalized suggestions" },
  },
  {
    id: "royalcare",
    name: "RoyalCare Hospital Website",
    tagline: "Healthcare web application",
    category: "Web",
    summary:
      "A healthcare web application for online hospital services, including appointment booking, medicine reminders and a patient-friendly interface.",
    highlights: [
      "Online appointment booking",
      "Medicine reminder system",
      "Intuitive patient navigation",
      "Interactive UI with real-time updates",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Frontend"],
    demo: "https://devanshi1211.github.io/hospital/",
    code: "GITHUB_URL",
    visual: { icon: "Stethoscope", from: "emerald", to: "primary", caption: "Patient-first care portal" },
  },
  {
    id: "spam-detection",
    name: "Spam Detection System",
    tagline: "NLP-based SMS spam classifier",
    category: "NLP",
    summary:
      "An NLP-based spam classifier built on a real SMS dataset, with text preprocessing and machine learning classification.",
    highlights: [
      "TF-IDF vectorization",
      "Logistic regression modeling",
      "Advanced text preprocessing",
    ],
    stack: ["Python", "NLP", "Scikit-learn", "Classification"],
    demo: "LIVE_DEMO_URL",
    code: "GITHUB_URL",
    visual: { icon: "ShieldCheck", from: "coral", to: "amber", caption: "Text classification pipeline" },
  },
  {
    id: "study-planner",
    name: "AI Study Planner",
    tagline: "AI-personalised study scheduler",
    category: "AI / ML",
    summary:
      "An AI-based study planner that generates personalized schedules from user habits and past performance to maximize productivity.",
    highlights: [
      "Personalized schedule generation",
      "Habit-tracking integration",
      "Performance-based adjustments",
      "Automated time management",
    ],
    stack: ["Python", "Streamlit", "AI", "Data Analysis"],
    demo: "LIVE_DEMO_URL",
    code: "GITHUB_URL",
    visual: { icon: "CalendarClock", from: "amber", to: "emerald", caption: "Adaptive study schedules" },
  },
  {
    id: "skillmap",
    name: "SkillMap",
    tagline: "Data-driven skill & career insight system",
    category: "Data Science",
    summary:
      "A data-driven system analyzing student skills to provide career insights — it surfaces strengths and suggests suitable career paths.",
    highlights: [
      "Skill-gap analysis",
      "Data-driven career mapping",
      "Visual progress tracking",
      "Interactive data visualization",
    ],
    stack: ["Python", "Data Analysis", "Visualization", "Pandas"],
    demo: "LIVE_DEMO_URL",
    code: "GITHUB_URL",
    visual: { icon: "Compass", from: "violet", to: "emerald", caption: "Skill-gap mapping" },
  },
  {
    id: "ai-chat-assistant",
    name: "AI Chat Assistant",
    tagline: "Conversational AI chatbot",
    category: "NLP",
    summary:
      "An AI-powered chatbot for interactive communication and assistance — it answers queries, guides users and automates simple tasks.",
    highlights: [
      "Conversational AI interface",
      "Context-aware responses",
      "Basic task automation",
      "Seamless user interaction",
    ],
    stack: ["Python", "NLP", "Chatbot", "AI"],
    demo: "LIVE_DEMO_URL",
    code: "GITHUB_URL",
    visual: { icon: "MessageSquareText", from: "primary", to: "violet", caption: "Conversational interface" },
  },
];


export const PROJECT_FILTERS = [
  "All",
  "AI / ML",
  "Data Science",
  "NLP",
  "Web",
] as const;

export type CertCategory = "Data & AI" | "Programming" | "Professional" | "International";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  category: CertCategory;
  tags: string[];
  summary: string;
  detail: string;
  meta?: string;
  badge?: string;
  featured?: boolean;
  image?: string;
  docUrl?: string;
  logo?: string;
  cover?: string;
};

export type ResearchPaper = {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  publicationDate: string;
  category: string;
  tags: string[];
  summary: string;
  description: string;
  docUrl: string;
  abstractId?: string;
  award?: string;
};

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "impact-of-overtime-study-hours",
    title: "Analyzing the Impact of Overtime Study Hours on Academic Performance Using Machine Learning Regression",
    authors: ["Devanshi Chauhan"],
    publication: "Sigma University International Conference on Advanced Research in Science, Technology & Management (SICARSTM)",
    publicationDate: "28–29 April 2026",
    category: "Machine Learning & Data Analytics",
    tags: ["Machine Learning", "Regression Analysis", "Academic Performance", "SICARSTM"],
    summary: "Awarded 'Best Research' at SICARSTM 2026. Evaluates the impact of extended study hours on academic outcomes using regression modeling.",
    description: "This research paper evaluates the relationship between student study hours and academic performance using machine learning regression algorithms (such as SVR and Linear Regression). Presented at the Sigma University International Conference on Advanced Research in Science, Technology & Management (SICARSTM) organized by Sigma University, Vadodara, Gujarat, India in collaboration with HUTECH University of Technology and UEF, Vietnam (Abstract ID: OPT02-36).",
    docUrl: "/research-papers/reserch paper.pdf",
    abstractId: "OPT02-36",
    award: "Best Research Award",
  },
];

export const CERT_FILTERS = ["All", "Data & AI", "Programming", "Professional", "International"] as const;

export const CERTIFICATIONS: Certification[] = [
  {
    id: "urfu-summer",
    title: "Summer University — Ural Federal University",
    issuer: "Ural Federal University",
    category: "International",
    tags: ["International Program", "Government-Recognized"],
    summary:
      "International program recognized and co-signed by the Ministry of Science and Higher Education of the Russian Federation.",
    detail:
      "This certificate is presented to Chauhan Devanshi Jitendrabhai. Participated in the 'Summer University' project from July 6 to July 19, 2026 at Ural Federal University. Ekaterinburg, 2026. Co-signed by Valery Falkov, Minister of Science and Higher Education of the Russian Federation, and Ilya Obabkov, Rector of Ural Federal University. Bears the official seals of the Ministry of Science and Higher Education of the Russian Federation and Ural Federal University.",
    docUrl: "/certificates/Russia_first.pdf",
    meta: "July 6 – July 19, 2026 · Ekaterinburg, Russia",
    badge: "International program",
    featured: true,
    cover: "/logos/urfu.webp",
  },
  {
    id: "urfu-ai-hackatom",
    title: "Summer University — Information Technologies & AI (Computer Science Track) + HackAtom",
    issuer: "Ural Federal University",
    category: "International",
    tags: ["Artificial Intelligence", "HackAtom", "International"],
    summary:
      "AI-track coursework plus HackAtom project work, both completed at Ural Federal University.",
    detail:
      "This certificate is presented to Chauhan Devanshi Jitendrabhai for the Summer University project at Ural Federal University, Ekaterinburg, 2026. Course: Information Technologies & Artificial Intelligence (Computer Science Track) — Completed. HackAtom project work — Completed. Signed by Ilya Obabkov, Rector of Ural Federal University. Backed by the Ministry of Science and Higher Education of the Russian Federation, Socio Center, Ural Federal University, ObninskTech, and Rosatom.",
    image: urfuSummerAiHackatomCert.url,
    docUrl: "/certificates/Russia_second.pdf",
    meta: "Completion certificate · July 2026",
    badge: "International program",
    featured: true,
    cover: "/logos/urfu.webp",
  },
  {
    id: "deloitte-forage",
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Forage",
    category: "Professional",
    tags: ["Data Analysis", "Forensic Technology"],
    summary: "Job-simulation certificate — not an internship or employment at Deloitte.",
    detail:
      "Certificate of Completion — August 18th, 2026. Over the period of August 2026, Devanshi Chauhan has completed practical tasks in: Data analysis, Forensic technology. Signed by Tina McCreery, Chief Human Resources Officer, Deloitte. Issued by Forage.",
    image: deloitteForageCert.url,
    meta: "August 2026",
    badge: "Job simulation",
    featured: true,
    cover: "/logos/forage.png",
    docUrl: "/certificates/Deloitte_job_certificate.pdf",
  },
  {
    id: "code-unnati",
    title: "SAP Code Unnati — Foundation Course",
    issuer: "Edunet Foundation (CSR initiative of SAP)",
    category: "Professional",
    tags: ["Python", "Artificial Intelligence", "SAP"],
    summary: "Foundation Course under the Code Unnati Program, a CSR initiative of SAP.",
    detail:
      "Certificate of Completion — presented to Devanshi Jitendrabhai Chauhan from Sigma Institute of Engineering for participating in Foundation Course and successfully completing the training on Python Programming, Data Analysis with Python, Artificial Intelligence and SAP Conversational AI Chatbot during 2024–2025 under Code Unnati Program, a CSR initiative of SAP and implemented by Edunet Foundation.",
    meta: "Certificate ID: CU26_27422 · Signed by Nagesh Singh, Chairman, Edunet Foundation",
    badge: "Foundation course",
    featured: true,
    cover: "/logos/sap.png",
    docUrl: "/certificates/codeunnati_1.pdf",
  },
  {
    id: "gfg-ds",
    title: "Data Science Bootcamp",
    issuer: "GeeksforGeeks",
    category: "Data & AI",
    tags: ["Data Science", "Machine Learning"],
    summary: "Applied data science curriculum covering analysis and modelling workflows.",
    detail: "Data Science Bootcamp completed with GeeksforGeeks.",
    cover: "/logos/gfg.jpeg",
    docUrl: "/certificates/GFG_DataScience.pdf",
  },
  {
    id: "acmegrade-ml",
    title: "Machine Learning Training",
    issuer: "Acmegrade",
    category: "Data & AI",
    tags: ["Machine Learning", "Algorithms"],
    summary: "Hands-on machine learning training across core algorithms and evaluation.",
    detail:
      "Certificate of Training Completion — This is to certify that Devanshi Jitendrabhai Chauhan has successfully completed his/her term of Training in Machine Learning from 12-Mar-2024 to 12-Apr-2024 and has proven his/her competency with utmost dedication and promise. Issued by Acmegrade in association with Mood Indigo, IIT Bombay. Signed by Challa Rohit, Academic Head.",
    meta: "12 Mar 2024 – 12 Apr 2024 · Certificate no. AGC2024030035",
    cover: "/logos/acme.jpeg",
    image: acmegradeImg.url,
    docUrl: "/certificates/Acmegrade_MachineLearning.pdf",
  },
  {
    id: "cn-dsa",
    title: "Data Structures & Algorithms",
    issuer: "Coding Ninjas",
    category: "Programming",
    tags: ["DSA", "Problem Solving"],
    summary: "Core data structures and algorithmic problem solving.",
    detail: "Data Structures & Algorithms course completed with Coding Ninjas.",
    cover: "/logos/coding ninja.png",
    docUrl: "/certificates/dsa.pdf",
  },
  {
    id: "ibm-ai",
    title: "Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    category: "Data & AI",
    tags: ["Artificial Intelligence", "AI Concepts"],
    summary: "Foundations of artificial intelligence and its applications.",
    detail:
      "IBM SkillsBuild Completion Certificate — presented to Devanshi Chauhan for the completion of Introduction to Artificial Intelligence (ALM-COURSE_4058918), according to the Adobe Learning Manager system of record.",
    meta: "Completion date: 02 Feb 2026 · Learning hours: 1 hr 15 mins",
    cover: "/logos/ibm.jpeg",
    image: ibmAiImg.url,
    docUrl: "/certificates/skillsbuild_ai.pdf",
  },
  {
    id: "ibm-design-thinking",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM SkillsBuild",
    category: "Professional",
    tags: ["Design Thinking", "Professional"],
    summary: "Practitioner-level certification in Enterprise Design Thinking.",
    detail: "Enterprise Design Thinking Practitioner certification issued by IBM SkillsBuild.",
    cover: "/logos/ibm.jpeg",
    docUrl: "/certificates/skillsbuild.pdf",
  },
  {
    id: "tech-mahindra-security",
    title: "Securing Our Business",
    issuer: "Tech Mahindra",
    category: "Professional",
    tags: ["Information Security", "Corporate Training"],
    summary: "Corporate information-security training completed at Tech Mahindra.",
    detail: "\"Securing Our Business\" training certificate issued by Tech Mahindra.",
    meta: "Completed 8 January 2025 · Signed by Subhash Yadav, Group Head – Technology Learning",
    cover: "/logos/tech mahindra.webp",
    docUrl: "/certificates/tech_mahindra.pdf",
  },
  {
    id: "tech-mahindra-internship",
    title: "Internship Completion Certificate",
    issuer: "Tech Mahindra",
    category: "Professional",
    tags: ["Internship", "Industry"],
    summary: "Three-month internship on the Data Extraction and Analytics project.",
    detail:
      "This is to certify that Chauhan Devanshi Jitendrabhai (ID: C129301) has completed internship program with Tech Mahindra Limited from 28-Jul-2025 to 28-Oct-2025 and was assigned to work on the Project titled Data Extraction and Analytics under the guidance of Rushi Chokshi. Signed by Vinay Agrawal, Head, Business HR, Tech Mahindra Ltd.",
    meta: "28 Jul 2025 – 28 Oct 2025 · Issued 6 Nov 2025 · ID C129301",
    featured: true,
    cover: "/logos/tech mahindra.webp",
    docUrl: "/certificates/tech_mahindra.pdf",
  },
  {
    id: "scaler-python",
    title: "Python Course for Beginners — Mastering the Essentials",
    issuer: "Scaler Topics",
    category: "Programming",
    tags: ["Python", "Fundamentals"],
    summary: "Certificate of Excellence — 121 video tutorials, 16 modules, 10 challenges.",
    detail:
      "Certificate of Excellence awarded to Devanshi Jitendra Chauhan in recognition of the completion of the tutorial: Python Course for Beginners With Certification: Mastering the Essentials. 121 Video Tutorials · 16 Modules · 10 Challenges. Signed by Anshuman Singh, Co-founder, Scaler.",
    meta: "03 July 2024",
    badge: "Python",
    cover: "/logos/scaler.jpeg",
    image: SCALER_CERT_IMAGE,
    docUrl: "/certificates/SCALER_PYTHON.pdf",
  },
  {
    id: "codechef-python",
    title: "Learn Python Programming",
    issuer: "CodeChef",
    category: "Programming",
    tags: ["Python", "Practice"],
    summary: "Python programming course completed on CodeChef.",
    detail: "Learn Python Programming certificate issued by CodeChef.",
    cover: "/logos/codechef.avif",
    docUrl: "/certificates/learn_python.pdf",
  },
  {
    id: "codechef-rating",
    title: "500 Difficulty Rating",
    issuer: "CodeChef",
    category: "Programming",
    tags: ["Competitive Programming", "Problem Solving"],
    summary: "CodeChef 500 difficulty rating achievement.",
    detail: "CodeChef certificate recognising a 500 difficulty rating.",
    cover: "/logos/codechef.avif",
    docUrl: "/certificates/500_rating.pdf",
  },
  {
    id: "cn-ml-basics",
    title: "Basics of Machine Learning",
    issuer: "Coding Ninjas (Code360)",
    category: "Data & AI",
    tags: ["Machine Learning", "Guided Path"],
    summary: "Guided path covering the ML lifecycle, data and environment setup.",
    detail:
      "Certificate of Achievement — This is to certify that Devanshi Chauhan has successfully completed the Basics of Machine Learning guided path on Code360. Modules covered: Introduction, Life cycle of ML, data, myths and artificial intelligence, Setting up the environment etc.",
    meta: "02 February 2026",
    cover: "/logos/coding ninja.png",
    docUrl: "/certificates/machine_learning.pdf",
  },
  {
    id: "sigma-best-research",
    title: "Certificate of Best Research — SICARSTM",
    issuer: "Sigma University (in collaboration with HUTECH & UEF, Vietnam)",
    category: "Professional",
    tags: ["Research Paper", "Machine Learning", "Conference"],
    summary:
      "Awarded 'Best Research' at the Sigma University International Conference on Advanced Research in Science, Technology & Management.",
    detail:
      "This is to certify that Devanshi Chauhan from Sigma University has been awarded the \"Best Research\" for paper entitled 'Analysing the Impact of Overtime Study Hours on Academic Performance Using Machine Learning Regression' with Abstract ID OPT02-36 at the Sigma University International Conference on Advanced Research in Science, Technology & Management (SICARSTM) organized by Sigma University, Vadodara, Gujarat, India held on 28th and 29th April 2026.",
    meta: "28–29 April 2026 · Abstract ID OPT02-36",
    badge: "Best research award",
    featured: true,
    cover: "/logos/sigma.jpeg",
    image: bestResearchImg.url,
    docUrl: "/research-papers/reserch paper.pdf",
  },
  {
    id: "cn-oops",
    title: "OOPs in Python",
    issuer: "Coding Ninjas",
    category: "Programming",
    tags: ["Python", "OOP"],
    summary: "Object-oriented programming in Python.",
    detail:
      "Certificate of Achievement — This is to certify that Devanshi Chauhan has successfully completed the OOPs in Python guided path on Code360 by Coding Ninjas. Modules covered: Intro to OOPs in Python, Classes, objects and access specifiers, Constructors and destructors etc.",
    meta: "29 March 2025",
    cover: "/logos/coding ninja.png",
    docUrl: "/certificates/oops.pdf",
  },
  {
    id: "fcc-web",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    category: "Programming",
    tags: ["HTML", "CSS", "Responsive Design"],
    summary: "Responsive web design certification.",
    detail: "Responsive Web Design certification issued by freeCodeCamp.",
    meta: "March 7, 2024 · ~300 hours of work",
    cover: "/logos/fcc.webp",
    image: fccImg.url,
    docUrl: "/certificates/FREE_CODE_CAMP.pdf",
  },
  {
    id: "code-unnati-advanced",
    title: "SAP Code Unnati — Advanced Course",
    issuer: "Edunet Foundation (CSR initiative of SAP)",
    category: "Professional",
    tags: ["Advanced Program", "Artificial Intelligence", "SAP"],
    summary: "Advanced-level course under the Code Unnati Program by SAP and Edunet Foundation.",
    detail:
      "Advanced Course certificate under the Code Unnati Program, a CSR initiative of SAP implemented by Edunet Foundation. Issued separately from the Foundation Course certificate.",
    badge: "Advanced course",
    cover: "/logos/sap.png",
    docUrl: "/certificates/CodeUnnati_Advanced.pdf",
  },
  {
    id: "google-solution-challenge",
    title: "Solution Challenge 2026: Build with AI",
    issuer: "Google · Hack2Skill",
    category: "Data & AI",
    tags: ["Artificial Intelligence", "Google", "Hack2Skill", "Solution Challenge"],
    summary:
      "Certificate of Participation awarded to Devanshi Chauhan in recognition of their successful prototype submission for Solution Challenge 2026: Build with AI and their contribution to the spirit of innovation and problem-solving.",
    detail:
      "Certificate of Participation awarded to Devanshi Chauhan in recognition of their successful prototype submission for Solution Challenge 2026: Build with AI and their contribution to the spirit of innovation and problem-solving.",
    meta: "Dated 22/07/2026 · Certificate ID: 2026H2S07SCBWAI-PS12595",
    badge: "Solution Challenge",
    cover: "/logos/Google.png",
    docUrl: "/certificates/Google_Solution_Challenge_2026.pdf",
  },
  {
    id: "iit-placement",
    title: "Placement Preparation Programme",
    issuer: "IIP & Abhyuday IIT Bombay",
    category: "Professional",
    tags: ["Placement Preparation", "Professional Development", "IIT Bombay"],
    summary:
      "Certificate of Participation — This is to certify that Devanshi Chauhan has successfully attended a 2 day Placement Preparation Programme on July 16th & 17th, 2024, organised by IIP in association with Abhyuday IIT Bombay.",
    detail:
      "Certificate of Participation — This is to certify that Devanshi Chauhan has successfully attended a 2 day Placement Preparation Programme on July 16th & 17th, 2024, organised by IIP in association with Abhyuday IIT Bombay. Signed by Sanjiv Mittal, Director.",
    meta: "July 16th & 17th, 2024",
    badge: "Placement Preparation",
    cover: "/logos/iit.png",
    image: IIT_PLACEMENT_IMAGE,
    docUrl: "/certificates/IIT_Placement_Preparation_Programme.pdf",
  },
];

export type ExperienceEntry = {
  kind: "Internship" | "International Program" | "Leadership";
  location: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  tags: string[];
  accent: "violet" | "emerald" | "amber" | "coral";
  image?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    kind: "Internship",
    location: "India",
    role: "Data Extraction & Analytics Intern",
    org: "Tech Mahindra",
    period: "Jul 2025 – Oct 2025",
    summary:
      "Worked on real-world data extraction, computer vision, and machine learning systems, turning raw and unstructured data into model-ready insight.",
    bullets: [
      "Automated PDF text extraction using Python (PyMuPDF) for high-throughput document processing.",
      "Built an OpenCV-based shape-detection system and developed a P&ID symbol-detection workflow.",
      "Applied ML models (Logistic Regression, Random Forest) for classification tasks on extracted engineering data.",
      "Performed EDA, data cleaning, feature engineering, hyperparameter tuning, and cross-validation to improve data-processing efficiency.",
    ],
    tags: ["Python", "OpenCV", "Machine Learning", "Data Analytics", "TF-IDF", "PyMuPDF"],
    accent: "violet",
  },
  {
    kind: "International Program",
    location: "Yekaterinburg, Russia",
    role: "India Representative — Summer University",
    org: "Ural Federal University (UrFU)",
    period: "Jul 2026",
    summary:
      "Selected as one of India's representatives from Sigma University for an international AI, research, and innovation immersion program recognized and co-signed by the Ministry of Science and Higher Education of the Russian Federation.",
    bullets: [
      "Completed intensive coursework in Information Technologies & Artificial Intelligence (Computer Science Track).",
      "Collaborated with multicultural student and faculty teams during the HackAtom initiative to design and present an AI-driven solution.",
      "Strengthened technical presentation, leadership, and cross-cultural communication skills through workshops and industry visits.",
    ],
    tags: ["AI Research", "International Collaboration", "Leadership", "Presentation", "HackAtom"],
    accent: "emerald",
  },
  {
    kind: "Leadership",
    location: "Vadodara, India",
    role: "Team Leader — SAP Code Unnati Project",
    org: "SAP Code Unnati / Edunet Foundation",
    period: "2025",
    summary:
      "Led a student team project under the SAP Code Unnati CSR initiative focused on AI/ML-driven solution design.",
    bullets: [
      "Managed team coordination, sprint planning, and task distribution across members.",
      "Guided implementation of foundational AI/ML algorithms and data pipelines across the team.",
      "Oversaw project development from planning to completion, ensuring quality and timely delivery.",
    ],
    tags: ["Leadership", "AI/ML", "Team Management", "Python"],
    accent: "amber",
  },
  {
    kind: "Leadership",
    location: "Global",
    role: "Team Leader — Google Solution Challenge 2026",
    org: "Google Developer Program",
    period: "2026 (Ongoing)",
    summary:
      "Leading the development of SevaSync AI — a smart resource-allocation platform built for real-world social impact under Google Developer Student Clubs.",
    bullets: [
      "Designed the end-to-end project architecture, data schema, and workflow.",
      "Leading UI development, backend integration, and AI-based urgency prioritization logic.",
      "Managing development cadence and building the MVP for hackathon submission.",
    ],
    tags: ["Leadership", "AI", "Hackathon", "Product Development", "Social Impact"],
    accent: "coral",
  },
];

export type AchievementCategory =
  | "Academic"
  | "Sports"
  | "Technical"
  | "Hackathon"
  | "International"
  | "Ongoing";

export type Achievement = {
  title: string;
  detail: string;
  category: AchievementCategory;
  icon: "star" | "award" | "globe" | "code" | "trophy" | "medal" | "briefcase" | "rocket" | "target";
  accent: "coral" | "amber" | "emerald" | "violet";
  points?: string[];
  tags?: string[];
  meta?: string;
  span?: "wide";
};

export const TOP_ACHIEVEMENT: Achievement = {
  title: "Best Research Award",
  detail:
    "Received the Best Research Award at SICARSTM 2026, Sigma University, for \u201cAnalyzing the Impact of Overtime Study Hours on Academic Performance Using Machine Learning Regression\u201d.",
  category: "Academic",
  icon: "star",
  accent: "amber",
  points: [
    "Applied ML regression models (SVR, Linear Regression)",
    "Analyzed real-world student data",
    "Identified negative impact of excessive study hours on performance",
  ],
  tags: ["Machine Learning", "Research", "Data Analysis"],
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Russia Summer University — International Representative",
    detail:
      "Selected as one of India's representatives from Sigma University for the \u201cSummer University\u201d project at Ural Federal University (UrFU), Ekaterinburg, Russia — completing the Information Technologies & Artificial Intelligence (Computer Science Track) and HackAtom project work (July 6–19, 2026). The programme certificate is co-signed by the Minister of Science and Higher Education of the Russian Federation and the Rector of Ural Federal University.",
    category: "International",
    icon: "globe",
    accent: "violet",
    tags: ["International Exposure", "Artificial Intelligence", "HackAtom", "Government-Recognized"],
    span: "wide",
  },
  {
    title: "250+ LeetCode Problems Solved",
    detail:
      "Solved 250+ problems across Data Structures, Algorithms and SQL, with consistent daily practice.",
    category: "Technical",
    icon: "code",
    accent: "emerald",
    meta: "BADGES: TOP SQL 50 | ARRAYS | STRINGS | SORTING | HASH TABLE",
  },
  {
    title: "Gandhinagar Craftathon 2026 — Finalist",
    detail:
      "Participated in a 2-day offline hackathon focused on rapid prototyping, teamwork and real-world problem solving.",
    category: "Hackathon",
    icon: "rocket",
    accent: "coral",
    meta: "PROOF: ID CARD VERIFIED",
  },
  {
    title: "Google Solution Challenge 2026 — SevaSync AI",
    detail:
      "Leading development of SevaSync AI, an AI-powered smart resource-allocation platform for social impact, as part of the Google Developer Program.",
    category: "Ongoing",
    icon: "target",
    accent: "amber",
    tags: ["AI", "Social Impact", "Leadership", "Product Development"],
    meta: "STATUS: ONGOING",
  },
  {
    title: "Tech Mahindra — Data Analysis Internship",
    detail:
      "Worked on data extraction, computer vision, and machine-learning-based systems using Python and OpenCV.",
    category: "Technical",
    icon: "briefcase",
    accent: "violet",
    meta: "PROFESSIONAL MILESTONE — SEE EXPERIENCE",
  },
  {
    title: "AI/ML Project Portfolio",
    detail:
      "Developed multiple real-world projects across Machine Learning, NLP, Computer Vision, Data Analytics and AI.",
    category: "Technical",
    icon: "award",
    accent: "emerald",
  },
  {
    title: "Mathematics Competition Winner",
    detail:
      "Secured 1st position in a Mathematics competition, showing analytical thinking and problem-solving ability.",
    category: "Academic",
    icon: "medal",
    accent: "amber",
  },
  {
    title: "1st Prize — Badminton",
    detail:
      "Achieved 1st position in badminton at Sigma University Sports, showing focus and discipline.",
    category: "Sports",
    icon: "trophy",
    accent: "coral",
  },
  {
    title: "Runner-Up — Kho Kho",
    detail: "Secured runner-up position in Kho Kho, demonstrating teamwork and coordination.",
    category: "Sports",
    icon: "trophy",
    accent: "violet",
  },
];


export type AcademicEntry = {
  degree: string;
  school: string;
  period: string;
  score: string;
  description: string;
};

export const ACADEMIC_BACKGROUND: AcademicEntry[] = [
  {
    degree: "B.Tech in Information Technology",
    school: "Sigma University, Vadodara",
    period: "2023 – 2027",
    score: "CGPA 9.64 / 10",
    description:
      "Pursuing Information Technology with a focus on data science, machine learning, NLP and applied AI.",
  },
  {
    degree: "Class 12 (PCM)",
    school: "HSC Board",
    period: "2022 – 2023",
    score: "89%",
    description:
      "Completed higher secondary education in Physics, Chemistry and Mathematics.",
  },
  {
    degree: "Class 10",
    school: "SSC Board",
    period: "2020 – 2021",
    score: "97.91%",
    description: "Completed secondary education with distinction.",
  },
];

export const EDUCATION = ACADEMIC_BACKGROUND[0]!;

export const RESUME_SUMMARY = [
  "Data Analyst · Data Scientist · Machine Learning · Artificial Intelligence",
  "B.Tech IT, Sigma University (2023–2027) — CGPA 9.64/10",
  "9 shipped projects across ML, deep learning, NLP and computer vision",
  "Best Research Paper Award, SICARSTM 2026",
];

export type CodingBadge = {
  name: string;
  platform: string;
  note?: string;
  icon: "code" | "trophy" | "bolt" | "flame" | "check" | "database";
  tone: "coral" | "violet" | "emerald" | "amber" | "primary" | "slate";
};

export const CODING_BADGES: CodingBadge[] = [
  { name: "Python ★★", platform: "LeetCode", icon: "code", tone: "coral" },
  { name: "Achiever – Strings", platform: "LeetCode", icon: "trophy", tone: "violet" },
  { name: "Achiever – Sorting", platform: "HackerRank", icon: "trophy", tone: "violet" },
  { name: "Achiever – Math", platform: "Codeforces", icon: "trophy", tone: "violet" },
  { name: "Achiever – Linked List", platform: "LeetCode", icon: "trophy", tone: "violet" },
  { name: "Achiever – Hash Table", platform: "LeetCode", icon: "trophy", tone: "violet" },
  { name: "Achiever – Arrays", platform: "LeetCode", icon: "trophy", tone: "violet" },
  { name: "Time Complexity Wizard", platform: "HackerRank", icon: "bolt", tone: "primary" },
  { name: "5 Days Coding Streak", platform: "LeetCode", icon: "flame", tone: "amber" },
  { name: "250 Problems Solved", platform: "LeetCode", icon: "check", tone: "amber" },
  { name: "Introduction to Pandas", platform: "Kaggle", icon: "database", tone: "slate" },
  { name: "Top SQL 50", platform: "LeetCode", note: "22 May 2025", icon: "database", tone: "primary" },
];

export type OnlineProfile = {
  name: string;
  tagline: string;
  href: string;
  icon: "github" | "linkedin" | "code" | "chef" | "ninja" | "gfg" | "codolio" | "instagram";
  tone: "coral" | "violet" | "emerald" | "amber" | "primary" | "slate";
};

export const ONLINE_PROFILES: OnlineProfile[] = [
  { name: "GitHub", tagline: "Code repositories & projects", href: "https://github.com/Devanshi1211", icon: "github", tone: "slate" },
  { name: "LinkedIn", tagline: "Professional network", href: "https://www.linkedin.com/in/devanshi1211/", icon: "linkedin", tone: "primary" },
  { name: "LeetCode", tagline: "DSA & problem solving", href: "https://leetcode.com/u/o4Bsx3WOjv/", icon: "code", tone: "amber" },
  { name: "CodeChef", tagline: "Competitive programming", href: "https://www.codechef.com/users/devanshiis2005", icon: "chef", tone: "coral" },
  { name: "Coding Ninjas", tagline: "Learning & coding practice", href: "https://www.naukri.com/code360/profile/15d930a2-a8d9-4253-87aa-39036c236bed", icon: "ninja", tone: "violet" },
  { name: "GeeksforGeeks", tagline: "DSA & articles", href: "https://www.geeksforgeeks.org/profile/dc391eh1p", icon: "gfg", tone: "emerald" },
  { name: "Codolio", tagline: "Coding profile analytics", href: "https://codolio.com/profile/devu1211", icon: "codolio", tone: "amber" },
  { name: "Instagram", tagline: "Personal & creative presence", href: "https://instagram.com/devanshi_1211_", icon: "instagram", tone: "coral" },
];

export type Competition = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  status: string;
  statusTone: "amber" | "emerald" | "violet" | "coral";
  ongoing?: boolean;
  description: string;
  contributions: string[];
  impact: string[];
  tags: string[];
  accent: "coral" | "amber" | "emerald" | "violet";
  proofLabel?: string;
  proofImage?: string;
  proofNote?: string;
};

export const COMPETITIONS: Competition[] = [
  {
    id: "gsc-2026",
    index: "01",
    title: "Google Solution Challenge 2026",
    subtitle: "SevaSync AI · Google Developer Program",
    status: "Ongoing",
    statusTone: "amber",
    ongoing: true,
    description:
      "Developing SevaSync AI, an AI-powered system for NGO resource allocation. It processes community data, prioritizes needs using AI, and matches volunteers to tasks based on real-time availability.",
    contributions: [
      "Designed the end-to-end resource-allocation workflow",
      "Implemented AI-based urgency-prioritization logic",
      "Developed a real-time dashboard for analytics",
    ],
    impact: [
      "Improves efficiency in NGO resource management",
      "Enables faster response to community needs",
    ],
    tags: ["AI", "ML", "Data Analysis", "Dashboard", "Volunteer Matching"],
    accent: "amber",
    proofLabel: "View Certificate",
    proofImage: "/certificates/Google_Solution_Challenge_2026.pdf",
  },
  {
    id: "craftathon-2026",
    index: "02",
    title: "Gandhinagar Craftathon 2026",
    subtitle: "Gandhinagar University · Team Dhaniyaa",
    status: "Finalist",
    statusTone: "coral",
    description:
      "Selected as a Finalist in a 2-day offline hackathon focused on real-world problem solving. Collaborated in a team to build and prototype impactful solutions under intense time constraints.",
    contributions: [
      "Built a real-world solution under time pressure",
      "Worked in a team-based competitive environment",
      "Focused on rapid development and innovation",
    ],
    impact: [
      "Built a real-world solution within a limited timeframe",
      "Strengthened teamwork and rapid problem-solving",
    ],
    tags: ["Hackathon", "Teamwork", "Innovation", "Rapid Prototyping"],
    accent: "coral",
    proofLabel: "View Certificate",
    proofImage: craftathonImg.url,
  },
  {
    id: "urfu-hackatom",
    index: "03",
    title: "Russia — Summer University: Information Technologies & AI + HackAtom",
    subtitle: "Ural Federal University, Ekaterinburg",
    status: "Completed",
    statusTone: "emerald",
    description:
      "Course: Information Technologies & Artificial Intelligence (Computer Science Track) — Completed. HackAtom project work — Completed.",
    contributions: [
      "Completed the Computer Science track in Information Technologies & Artificial Intelligence",
      "Completed HackAtom project work with international teams",
    ],
    impact: [
      "Backed by the Ministry of Science and Higher Education of the Russian Federation, Socio Center, ObninskTech, and Rosatom",
      "International exposure through collaborative AI project work",
    ],
    tags: ["AI", "Machine Learning", "International", "Hackathon"],
    accent: "violet",
    proofLabel: "View Certificate",
    proofImage: "/certificates/Russia_second.pdf",
  },
];
