export const site = {
  name: "Ajiboye Michael",
  role: "UI/UX designer & frontend developer",
  location: "Based in Nigeria · Working remotely",
  availability: true,
  email: "",
  linkedin: "",
  github: "",
  cv: "",
  whatsapp:
    "https://wa.me/2348025147552?text=Hello%20Michael%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you",
  intro:
    "I'm interested in the relationship between thoughtful design and well-built digital products. My work brings interface design, user-flow thinking, and frontend implementation together to create experiences that feel clear, useful, and considered.",
  approach:
    "I start by understanding the problem and the people using the product. From there, I map the experience, shape the interface, and refine the details that make it feel intuitive. When I build, I carry the same care into responsive layouts, accessible interactions, and maintainable code.",
  skills: {
    design: [
      {
        title: "UX Strategy & Structure",
        skills: ["Wireframing", "User flows", "Information architecture", "Competitor & interface analysis"],
      },
      {
        title: "UI Design",
        skills: ["Interface design", "Visual hierarchy", "Typography & color", "Responsive design principles"],
      },
      {
        title: "Prototyping & Design Systems",
        skills: ["Interactive prototyping", "Components & variants", "Auto Layout", "Design systems", "Design handoff"],
      },
      {
        title: "Design Tool",
        skills: ["Figma"],
      },
    ],
    development: [
      {
        title: "Core Technologies",
        skills: ["HTML5", "CSS3", "JavaScript"],
      },
      {
        title: "Responsive Development",
        skills: ["Mobile-first development", "Responsive layouts", "Cross-browser compatibility"],
      },
      {
        title: "Interactive Experiences",
        skills: ["DOM manipulation", "Interactive UI components", "Form validation", "Accessibility fundamentals"],
      },
      {
        title: "Tools & Workflow",
        skills: ["Git & GitHub", "Visual Studio Code", "Browser DevTools", "Figma-to-code implementation", "Website deployment and hosting"],
      },
    ],
    tools: ["Figma", "Visual Studio Code", "Git", "GitHub", "Chrome DevTools"],
    interests: ["Digital products", "Design systems", "Accessible interfaces", "Interaction design", "Responsive experiences", "Design-to-code workflows"],
  },
};

const defaultCaseStudy = {
  overview: "",
  challenge: "",
  goals: [],
  process: [],
  reflection: "",
  prototypeUrl: "",
  sourceUrl: "",
  image: "",
  gallery: [],
};

export const projects = [
  {
    id: "savora",
    number: "01",
    name: "SOVANA",
    category: "UI/UX Design",
    type: "Restaurant discovery & food ordering",
    description:
      "A restaurant discovery and food-ordering experience designed to make exploring meals, viewing restaurant menus, and placing orders feel simple and intuitive.",
    tags: ["User flows", "Interface design", "Prototyping"],
    accent: "savora",
    status: "Concept project",
    tools: ["Figma"],
    ...defaultCaseStudy,
    designUrl:
      "https://www.figma.com/design/9yWMWqSAPP1ZOLfmgn6Viy/Restaurant-App-Portfolio?node-id=2-62173&t=PFQGeoJzaNI9C1lX-1",
    prototypeUrl: "",
    overview:
      "SOVANA is a concept for discovering nearby restaurants and ordering a meal through a clear, welcoming mobile experience. The project explores how browsing and ordering can feel like one connected journey.",
    challenge:
      "Restaurant discovery and food ordering involve several decisions, from choosing a place to reviewing menu details. The design challenge was to make those steps easy to understand without overwhelming the experience.",
    goals: [
      "Make restaurant and meal discovery feel approachable.",
      "Keep menus easy to scan and compare.",
      "Give the ordering journey a clear, consistent structure.",
    ],
    process: [
      {
        title: "Explore the experience",
        text: "Reviewed common restaurant and food-ordering interface patterns to identify useful conventions and opportunities to simplify the journey.",
      },
      {
        title: "Map the user flow",
        text: "Outlined a path from discovering a restaurant through browsing its menu and reviewing an order.",
      },
      {
        title: "Shape the interface",
        text: "Developed a visual direction and reusable interface components for the core screens.",
      },
    ],
    reflection:
      "This concept helped me think about how small interface decisions can make a multi-step task feel more straightforward. Real user feedback and a working prototype would be useful next steps.",
  },
  {
    id: "fintech-banking",
    number: "02",
    name: "Fintech banking app",
    category: "UI/UX Design",
    type: "Digital banking concept",
    description:
      "A digital banking concept focused on making everyday financial tasks easier to navigate through a clear information hierarchy, consistent components, and thoughtful interface design.",
    tags: ["Fintech", "Information architecture", "Components"],
    accent: "fintech",
    status: "Concept project",
    tools: ["Figma"],
    ...defaultCaseStudy,
    designUrl:
      "https://www.figma.com/design/kYbswppJMfBCFOKkjrLXnx/Fintech-Project-Portfolio-O?node-id=18-1723&t=zxS4g5J5z4ruKv5V-1",
    prototypeUrl: "",
    overview:
      "A digital banking concept exploring a clear home for everyday account information and common financial actions. This is a design concept, not a deployed financial product.",
    challenge:
      "Financial interfaces contain information that people need to understand quickly. The challenge was to create a considered hierarchy that supports common tasks while keeping the interface calm and legible.",
    goals: [
      "Prioritize essential account information.",
      "Make common actions easy to locate.",
      "Use consistent components and visual patterns.",
    ],
    process: [
      {
        title: "Review interface patterns",
        text: "Compared familiar banking interface conventions and considered how information grouping affects scanability.",
      },
      {
        title: "Organize core flows",
        text: "Defined key screens and mapped how a person could move between account overview and everyday tasks.",
      },
      {
        title: "Build a visual system",
        text: "Explored typography, spacing, and reusable components to keep the screens consistent.",
      },
    ],
    reflection:
      "The concept reinforced the importance of clarity and consistency in financial interfaces. Further development would benefit from validating the proposed flows with people who use digital banking.",
  },
  {
    id: "taskflow",
    number: "03",
    name: "Taskflow",
    category: "UI/UX Design",
    type: "Project management & productivity concept",
    description:
      "A project-management interface concept designed to help users organize tasks, understand project progress, and navigate their workflows more clearly.",
    tags: ["SaaS", "Dashboard design", "Design system"],
    accent: "taskflow",
    status: "Concept project",
    tools: ["Figma"],
    ...defaultCaseStudy,
    designUrl:
      "https://www.figma.com/design/iQHlmKaTOBwkFDjdK1eXat/SaaS-Portfolio?node-id=0-1&t=b9vpJTxrpFctkpRl-1",
    prototypeUrl: "",
    overview:
      "Taskflow explores a project-management workspace that brings tasks, project context, and progress into a structured interface. It is a concept project rather than a deployed product.",
    challenge:
      "Project tools can present a lot of information at once. The design challenge was to provide useful context while making the next action and the overall project state easy to find.",
    goals: [
      "Give tasks a clear and scannable hierarchy.",
      "Make project status understandable at a glance.",
      "Create consistent patterns that can support multiple views.",
    ],
    process: [
      {
        title: "Structure the information",
        text: "Considered how projects, tasks, and progress indicators relate, then grouped them into a straightforward navigation structure.",
      },
      {
        title: "Explore key views",
        text: "Outlined the project overview and task-focused screens needed to illustrate a typical workflow.",
      },
      {
        title: "Establish components",
        text: "Designed a set of repeatable interface patterns to support consistency across the concept.",
      },
    ],
    reflection:
      "Working through this concept highlighted the balance between showing enough project context and keeping task views focused. A clickable prototype would be a useful next step.",
  },
  {
    id: "verdant",
    number: "06",
    name: "VERDANT",
    category: "Website Development",
    type: "Website Development · Ecommerce",
    description:
      "A home and living storefront concept for discovering decor, kitchenware, mirrors, storage, and everyday household pieces through a considered product-browsing experience.",
    tags: ["Home & living", "Product discovery", "Storefront concept"],
    accent: "verdant",
    status: "Portfolio concept",
    ...defaultCaseStudy,
    tools: [],
    liveUrl: "https://michi-design.github.io/Verdant/#/",
    repositoryUrl: "",
    features: [],
    implementation: "",
    challenges: "",
    futureImprovements: [],
    overview:
      "VERDANT is a home and household ecommerce storefront concept built around a calm lifestyle identity. The supplied project visual presents a brand-led home page alongside product, category, and shopping-bag layouts for home decor and kitchenware.",
    challenge:
      "A home-living catalogue can span many product types. The concept focuses on making the storefront feel cohesive while giving product imagery, category browsing, and shopping information a clear visual hierarchy.",
    objectives: [
      "Create a cohesive home and living storefront.",
      "Organize household products into understandable categories.",
      "Present products with consistent, attractive cards.",
      "Make browsing and product discovery straightforward.",
      "Plan a visual system that can adapt across screen sizes.",
    ],
    processTitle: "Concept & interface direction",
    process: [
      {
        title: "Establish the brand direction",
        text: "Established a restrained, nature-inspired visual direction to connect the home page and product-browsing surfaces.",
      },
      {
        title: "Organize product discovery",
        text: "Organized home decor, kitchenware, mirrors, and storage into clear storefront and category-browsing areas.",
      },
      {
        title: "Present the shopping journey",
        text: "Mapped product detail and shopping-bag layouts as part of the concept, keeping product information and next steps easy to scan.",
      },
    ],
    contribution:
      "My contribution focused on shaping the VERDANT visual direction and organizing the storefront concept across its home page, category browsing, product presentation, and shopping-bag screens.",
    outcome:
      "The result documented here is a cohesive ecommerce interface concept that demonstrates lifestyle branding, organized product discovery, and a consistent presentation across storefront views.",
    verificationNote:
      "The supplied material is a project visual, not the storefront source code. The displayed product and shopping-bag screens do not verify working cart, checkout, payment, inventory, order, or account functionality. No project-specific technology stack or live website was provided for verification.",
  },
  {
    id: "saas-dashboard",
    number: "05",
    name: "SaaS Dashboard Website",
    category: "Website Development",
    type: "Website Development · Dashboard",
    description:
      "A SaaS interface concept focused on presenting dashboard information through structured navigation, summary cards, project views, and a clear visual hierarchy.",
    tags: ["Dashboard concept", "Information hierarchy", "Interface layout"],
    accent: "saas",
    status: "Portfolio concept",
    ...defaultCaseStudy,
    tools: [],
    liveUrl: "https://michi-design.github.io/SaaS-project/",
    repositoryUrl: "",
    features: [],
    implementation: "",
    challenges: "",
    futureImprovements: [],
    overview:
      "The SaaS Dashboard Website concept explores how a web product can introduce its value and show an organized workspace. The supplied visual pairs a product landing-page presentation with a dashboard preview containing navigation, summary information, project cards, and chart-like elements.",
    challenge:
      "Dashboard interfaces can become difficult to scan when navigation, status summaries, project information, and visualizations compete for attention. This concept prioritizes clear grouping and a consistent hierarchy across its presented views.",
    objectives: [
      "Organize dashboard information into understandable sections.",
      "Maintain consistent interface patterns and visual hierarchy.",
      "Plan a layout that can adapt to different screen sizes.",
      "Present navigation and dashboard areas in a clear structure.",
      "Keep the interface easy to scan and understand.",
    ],
    processTitle: "Concept & interface direction",
    process: [
      {
        title: "Define the information structure",
        text: "Grouped navigation, summary cards, project content, and visual status information into distinct areas.",
      },
      {
        title: "Shape the dashboard presentation",
        text: "Applied consistent card and spacing patterns to help the different information groups read as one interface concept.",
      },
      {
        title: "Connect product and workspace views",
        text: "Connected the product introduction with a dashboard preview to communicate the product direction and proposed interface.",
      },
    ],
    contribution:
      "My contribution centered on structuring the product presentation and dashboard concept, arranging navigation, summary cards, project content, and chart-like visuals into a clear hierarchy.",
    outcome:
      "The result documented here demonstrates a considered dashboard presentation and product-facing layout. The supplied visual is illustrative; it does not establish that the dashboard controls, data, or visualizations are interactive.",
    verificationNote:
      "The project source code was not included, so its project-specific technologies, responsive behavior, authentication, backend services, database connections, analytics, and working dashboard interactions cannot be verified. The supplied website URL responded to a basic HTTP request; that does not verify application features.",
  },
  {
    id: "mich-fashion",
    number: "04",
    name: "MICH Fashion Store",
    category: "Website Development",
    type: "Website Development · Ecommerce",
    description:
      "A fashion ecommerce storefront concept for presenting clothing and accessories through a polished brand-led home page, product listings, and shopping-oriented screen layouts.",
    tags: ["Fashion storefront", "Product presentation", "Ecommerce concept"],
    accent: "fashion",
    status: "Portfolio concept",
    ...defaultCaseStudy,
    tools: [],
    liveUrl: "https://michi-design.github.io/E-Commerce-project/",
    repositoryUrl: "",
    features: [],
    implementation: "",
    challenges: "",
    futureImprovements: [],
    overview:
      "MICH Fashion Store is a fashion ecommerce website concept built around a refined storefront identity. The supplied project visual presents a home-page hero, a clothing collection with product cards, and a shopping-cart screen as parts of a connected shopping experience.",
    challenge:
      "A fashion storefront needs to balance brand expression with practical product discovery. The concept focuses on maintaining a consistent visual language while keeping navigation, collection browsing, and shopping information legible.",
    objectives: [
      "Create a visually consistent fashion storefront.",
      "Present clothing and fashion products clearly.",
      "Make the proposed shopping journey straightforward to navigate.",
      "Plan a layout for desktop and mobile viewing.",
      "Provide clear visual pathways from the home page into product collections.",
    ],
    processTitle: "Concept & interface direction",
    process: [
      {
        title: "Set the storefront direction",
        text: "Shaped the concept around a restrained editorial identity that keeps fashion imagery and collection messaging prominent.",
      },
      {
        title: "Organize collection browsing",
        text: "Organized category navigation and product listings with consistent product cards to support visual scanning.",
      },
      {
        title: "Map the shopping screens",
        text: "Mapped product and cart screen concepts to represent the proposed journey beyond the home page.",
      },
    ],
    contribution:
      "My contribution focused on the MICH storefront direction and its home-page, collection, and cart screen concepts, with an emphasis on product presentation and visual consistency.",
    outcome:
      "The result documented here demonstrates a polished fashion storefront concept and a coherent set of shopping-oriented interface layouts. The supplied visual communicates the proposed experience, not verified ecommerce functionality.",
    verificationNote:
      "The storefront source code was not included, so project-specific technologies cannot be verified. The supplied website URL responded to a basic HTTP request, but the pictured product and cart layouts do not confirm working cart behavior, checkout, payment processing, inventory, order processing, or customer accounts.",
  },
];
