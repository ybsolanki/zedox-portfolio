// Clean, Authentic Portfolio Data for Yug Solanki

export const PORTFOLIO_DATA = {
  profile: {
    handle: "YUG SOLANKI",
    alias: "Zedox",
    fullName: "Yug Solanki",
    role: "IT Student & Software Developer",
    tagline: "Information Technology Student • Android & Game Developer • Tech Enthusiast",
    bio: "Hi! I'm Yug Solanki. I am an Information Technology (IT) student passionate about programming, software development, and modern technology. I enjoy building practical projects — including Android offline communication tools (MeshTalk Native), custom Roblox game mechanics & RNG scripts (Zedox Rarity), and managing game server hosting.",
    status: "IT STUDENT // OPEN FOR FREELANCE & COLLABORATION",
    location: "India",
    education: "Information Technology (IT)",
    focus: "Android Apps, Roblox Game Scripting, Server Hosting & Web Dev",
    githubUser: "ybsolanki",
    githubUrl: "https://github.com/ybsolanki",
    discordTag: "zedoxtech_06334",
    discordUrl: "https://discord.com/users/zedoxtech_06334",
    email: "yugsolanki.dev@gmail.com",

    // Genuine Project Highlights (No fake metrics)
    highlights: [
      {
        title: "MeshTalk Native",
        category: "Android & P2P",
        desc: "Offline peer-to-peer messaging app using Wi-Fi Direct and BLE for emergency communication.",
        accent: "#10b981",
        icon: "Smartphone"
      },
      {
        title: "Zedox Rarity Core",
        category: "Roblox Game Dev",
        desc: "Modular RNG probability script and loot drop mechanics for multiplayer Roblox games.",
        accent: "#f59e0b",
        icon: "Gamepad2"
      },
      {
        title: "Server Hosting & Setup",
        category: "Linux & Networks",
        desc: "Configured Linux dedicated servers with firewall rules, automated scripts, and uptime monitoring.",
        accent: "#8b5cf6",
        icon: "Cpu"
      },
      {
        title: "Modern Web Projects",
        category: "Web Development",
        desc: "Building interactive web apps with React, Three.js WebGL physics, and modern CSS.",
        accent: "#00f0ff",
        icon: "Code2"
      }
    ],

    // Quick Tech Focus Cards for Hero
    focusAreas: [
      { label: "Mobile Dev", title: "Android (Kotlin)", detail: "Offline & P2P Apps" },
      { label: "Game Dev", title: "Roblox & Luau", detail: "Game Systems & RNG" },
      { label: "Infrastructure", title: "Linux Server Setup", detail: "Hosting & Firewalls" },
      { label: "Web Tech", title: "React & JavaScript", detail: "Interactive Web Apps" }
    ]
  },

  // Presentation & Showreel Deck
  showreel: {
    title: "Yug Solanki — Portfolio Showcase",
    subtitle: "A walkthrough of my learning journey, software projects, and tech skills",
    duration: "03:30",
    slides: [
      {
        id: "intro",
        chapter: "01",
        title: "Hi, I'm Yug Solanki",
        subtitle: "IT Student & Software Developer",
        accent: "#00f0ff",
        badge: "ABOUT ME",
        description: "I am an Information Technology student who loves building software. I focus on developing practical applications in Android, game scripting for Roblox, and server management.",
        highlights: [
          "Information Technology (IT) student passionate about coding",
          "Experience in Android (Kotlin), Roblox (Luau), and Web development",
          "Enjoys configuring servers, networking basics, and automation",
          "Available for freelance projects and tech collaborations"
        ],
        codeSnippet: `// Developer Profile: Yug Solanki
const yug = {
  name: "Yug Solanki",
  alias: "Zedox",
  education: "IT Student",
  skills: ["Android / Kotlin", "Roblox / Luau", "Linux / Hosting", "React / Web"],
  status: "Open for freelance & projects"
};`,
        metrics: [
          { label: "Focus", val: "IT Studies" },
          { label: "Approach", val: "Practical Projects" }
        ]
      },
      {
        id: "meshtalk",
        chapter: "02",
        title: "MeshTalk Native",
        subtitle: "Android Offline Crisis Messaging App",
        accent: "#10b981",
        badge: "ANDROID PROJECT",
        description: "An Android application designed to allow phones to message each other during network blackouts or emergencies using Wi-Fi Direct and Bluetooth Low Energy without cellular data or internet.",
        highlights: [
          "Developed in Android Studio with Kotlin",
          "Uses Wi-Fi Direct & Bluetooth Low Energy (BLE)",
          "Peer-to-peer discovery and message forwarding",
          "Built for offline emergency communication"
        ],
        codeSnippet: `class MeshManager(private val context: Context) {
    fun startLocalDiscovery() {
        wifiP2pManager.discoverPeers(channel, object : ActionListener {
            override fun onSuccess() = log("Searching nearby offline devices...")
            override fun onFailure(reason: Int) = log("Discovery failed: $reason")
        })
    }
}`,
        metrics: [
          { label: "Platform", val: "Android / Kotlin" },
          { label: "Connection", val: "P2P / Wi-Fi Direct" }
        ]
      },
      {
        id: "rarity",
        chapter: "03",
        title: "Zedox Rarity Core",
        subtitle: "Roblox Game Mechanics & RNG Script",
        accent: "#f59e0b",
        badge: "GAME DEVELOPMENT",
        description: "A custom probability and random number generator (RNG) engine for Roblox games written in Luau, supporting luck multipliers, item tiers, and smooth gameplay rolls.",
        highlights: [
          "Clean, modular Luau scripting for Roblox Studio",
          "Configurable luck curves and pity systems",
          "Server-authoritative rolls to ensure fair gameplay",
          "Optimized to run smoothly with zero lag"
        ],
        codeSnippet: `function RaritySystem:Roll(player: Player)
    local seed = math.random()
    local luck = player:GetAttribute("LuckBonus") or 1.0
    local rollScore = seed * luck
    return self:DetermineItem(rollScore)
end`,
        metrics: [
          { label: "Language", val: "Luau" },
          { label: "Platform", val: "Roblox Studio" }
        ]
      },
      {
        id: "cloud",
        chapter: "04",
        title: "Game Server Management",
        subtitle: "Linux Server Setup & Protection",
        accent: "#8b5cf6",
        badge: "SERVER HOSTING",
        description: "Experience configuring and maintaining dedicated gaming servers on Linux, setting up firewall rules, automated restarts, performance tuning, and player connectivity.",
        highlights: [
          "Configured Linux Ubuntu game servers with high uptime",
          "Applied firewall rules for port security and connection protection",
          "Monitored server tick rates and memory usage",
          "Automated backup and recovery scripts"
        ],
        codeSnippet: `# Linux Firewall Rule for Port Protection
iptables -A INPUT -p tcp --dport 25565 -m limit --limit 50/sec --limit-burst 100 -j ACCEPT
iptables -A INPUT -p udp --dport 25565 -j ACCEPT`,
        metrics: [
          { label: "Environment", val: "Linux / Ubuntu" },
          { label: "Role", val: "Server Hosting" }
        ]
      },
      {
        id: "future",
        chapter: "05",
        title: "Skills & Future Goals",
        subtitle: "Expanding Full-Stack Web & Software Skills",
        accent: "#ec4899",
        badge: "LEARNING ROADMAP",
        description: "Continuing to learn full-stack web technologies, modern JavaScript frameworks, and database architecture while building real-world applications.",
        highlights: [
          "Interactive web applications with React, Vite, and CSS3",
          "Exploring backend APIs and databases",
          "Seeking freelance development opportunities",
          "Open to collaborations on student & developer projects"
        ],
        codeSnippet: `const roadmap = [
  "Modern Web Frameworks (React, Vite)",
  "Backend Services & Databases",
  "Android Application Features",
  "Roblox Game Systems"
];`,
        metrics: [
          { label: "Availability", val: "Open for Work" },
          { label: "Status", val: "IT Student" }
        ]
      }
    ]
  },

  // Projects
  projects: [
    {
      id: "meshtalk",
      title: "MeshTalk Native",
      tagline: "Android Offline Crisis Messaging App",
      category: "ANDROID / MOBILE",
      accent: "#10b981",
      badge: "FEATURED PROJECT",
      description: "An Android application for offline peer-to-peer communication. Uses Wi-Fi Direct and BLE to send messages without cellular data or internet.",
      simulatorType: "mesh",
      stats: [
        { label: "Tech", val: "Kotlin" },
        { label: "Network", val: "Wi-Fi Direct / BLE" },
        { label: "Internet", val: "Offline" }
      ],
      tags: ["Android", "Kotlin", "Wi-Fi Direct", "BLE", "P2P"],
      github: "https://github.com/ybsolanki",
      liveDemo: "#"
    },
    {
      id: "zedox-rarity",
      title: "Zedox Rarity Core",
      tagline: "Roblox Game RNG & Loot Mechanics",
      category: "ROBLOX / LUAU SCRIPTING",
      accent: "#f59e0b",
      badge: "GAME MECHANICS",
      description: "A custom Luau probability and roll script built for Roblox games, supporting tiered item drops and configurable luck multipliers.",
      simulatorType: "rng",
      stats: [
        { label: "Engine", val: "Roblox Studio" },
        { label: "Language", val: "Luau" },
        { label: "Type", val: "RNG System" }
      ],
      tags: ["Roblox", "Luau", "Game Dev", "RNG", "Multiplayer"],
      github: "https://github.com/ybsolanki",
      liveDemo: "#"
    },
    {
      id: "cloud-sentinel",
      title: "Game Server Network & Hosting",
      tagline: "Community Game Server Configuration",
      category: "SERVER & NETWORKING",
      accent: "#8b5cf6",
      badge: "LINUX HOSTING",
      description: "Game server hosting projects configured on Linux, with firewall protection, performance tweaks, and uptime monitoring.",
      simulatorType: "ping",
      stats: [
        { label: "OS", val: "Linux / Ubuntu" },
        { label: "Protection", val: "Firewall / Limits" },
        { label: "Ping", val: "Low Latency" }
      ],
      tags: ["Linux", "Minecraft", "Java", "Networking", "Firewall"],
      github: "https://github.com/ybsolanki",
      liveDemo: "#"
    },
    {
      id: "antigravity-agent",
      title: "Interactive Web Portfolio",
      tagline: "Modern Web Showcase with 3D Physics & Audio",
      category: "WEB DEVELOPMENT",
      accent: "#00f0ff",
      badge: "REACT & THREE.JS",
      description: "My personal interactive portfolio built with React, Three.js WebGL particle physics, procedural Web Audio sound synthesis, and Antigravity animations.",
      simulatorType: "terminal",
      stats: [
        { label: "Framework", val: "React + Vite" },
        { label: "3D Graphics", val: "Three.js" },
        { label: "Sound", val: "Web Audio API" }
      ],
      tags: ["React", "JavaScript", "Three.js", "CSS3", "Vite"],
      github: "https://github.com/ybsolanki",
      liveDemo: "#"
    }
  ],

  // Skills
  skills: [
    {
      category: "Languages & Mobile Dev",
      accent: "#00f0ff",
      icon: "Smartphone",
      items: [
        { name: "Android App Dev (Kotlin)", level: 88 },
        { name: "Java (Core & OOP)", level: 85 },
        { name: "JavaScript & HTML/CSS", level: 86 },
        { name: "Python Basics", level: 80 }
      ]
    },
    {
      category: "Game Scripting & Roblox",
      accent: "#f59e0b",
      icon: "Gamepad2",
      items: [
        { name: "Roblox Studio & Luau Scripting", level: 92 },
        { name: "Game Mechanics & RNG Systems", level: 90 },
        { name: "Client-Server Communication", level: 86 },
        { name: "UI & Gameplay Scripting", level: 85 }
      ]
    },
    {
      category: "IT, Networking & Linux",
      accent: "#10b981",
      icon: "Cpu",
      items: [
        { name: "Wi-Fi Direct & P2P Networking", level: 88 },
        { name: "Computer Networking Basics (TCP/UDP)", level: 85 },
        { name: "Linux Server Administration", level: 84 },
        { name: "Database & SQL Basics", level: 82 }
      ]
    },
    {
      category: "Tools & Workflow",
      accent: "#8b5cf6",
      icon: "ShieldCheck",
      items: [
        { name: "Git & GitHub Version Control", level: 90 },
        { name: "Android Studio & VS Code", level: 92 },
        { name: "Server Configuration & Firewalls", level: 85 },
        { name: "Vite & React Tooling", level: 84 }
      ]
    }
  ],

  // Timeline
  experience: [
    {
      period: "CURRENT",
      role: "Information Technology (IT) Student",
      company: "Academic Studies",
      badge: "STUDENT",
      accent: "#00f0ff",
      description: "Pursuing Information Technology studies, learning computer science fundamentals, programming, databases, and network engineering while building real projects.",
      achievements: [
        "Coursework in software development, data structures, and networking",
        "Building practical software, mobile apps, and web projects alongside studies",
        "Active member of developer communities"
      ]
    },
    {
      period: "2024 — PRESENT",
      role: "Freelance & Game Scripting Developer",
      company: "Zedox Projects (Personal)",
      badge: "PROJECTS",
      accent: "#f59e0b",
      description: "Developing Roblox game mechanics in Luau, creating Android mobile tools, and setting up dedicated game servers for communities.",
      achievements: [
        "Built the Zedox Rarity RNG framework for game development",
        "Configured and managed Linux gaming servers",
        "Available for freelance commissions and software work"
      ]
    },
    {
      period: "2023 — 2024",
      role: "Android Developer",
      company: "MeshTalk Native Project",
      badge: "MOBILE DEV",
      accent: "#10b981",
      description: "Created MeshTalk Native — an Android app enabling offline peer-to-peer communication using Wi-Fi Direct and Bluetooth Low Energy.",
      achievements: [
        "Implemented P2P device discovery and message routing",
        "Published codebase and continued improving mobile dev skills"
      ]
    }
  ],

  // Terminal Commands
  terminalHelp: [
    { cmd: "whoami", desc: "Learn about Yug Solanki (IT student & developer)" },
    { cmd: "projects", desc: "List Yug's projects (MeshTalk, Zedox Rarity, Servers)" },
    { cmd: "showreel", desc: "Launch Yug's interactive portfolio presentation" },
    { cmd: "zerog", desc: "Toggle zero-gravity physics floating engine" },
    { cmd: "skills", desc: "Output Yug's programming & tech skills" },
    { cmd: "roll", desc: "Test-fire Yug's Roblox RNG roll script" },
    { cmd: "ping", desc: "Test server ping simulation" },
    { cmd: "contact", desc: "Get direct contact details (Discord, GitHub, Email)" },
    { cmd: "clear", desc: "Clear terminal screen buffer" }
  ]
};
