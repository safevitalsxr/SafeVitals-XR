export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills: string[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Karuna Rahul Mamidi",
    role: "Founder & CEO",
    image: "/founder.jpg",
    bio: "IoT and XR researcher building the future of immersive patient monitoring.",
    linkedin: "https://linkedin.com/in/karuna-rahul-mamidi",
    github: "https://github.com/Karunarahul",
    portfolio: "https://karunarahul.netlify.app/",
    skills: ["IoT Systems", "Embedded Systems", "XR/VR", "Product Strategy"],
  },
  {
    name: "Rakesh Yarabolu",
    role: "Co-Founder",
    image: "/co-founder.jpg",
    bio: "Operations lead driving clinical integrations, workflow design, and strategy.",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: ["Operations", "Clinical Workflows", "Strategy", "Coordination"],
  },
  {
    name: "Chillagundla Balaram",
    role: "Tech Head & Hardware Eng",
    image: "/Technical-lead.jpg",
    bio: "Full-stack developer and hardware architect building our real-time telemetry systems.",
    linkedin: "https://linkedin.com/in/chbalarm",
    github: "https://github.com/balaram753",
    portfolio: "https://balaram.me",
    skills: ["Hardware Architecture", "Full-Stack Dev", "Telemetry", "Linux"],
  },
  {
    name: "Harsha",
    role: "Embedded Eng",
    image: "/harsha.jpg?v=5",
    bio: "Embedded systems engineer developing real-time firmware, telemetry interfaces, and hardware integration.",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: ["Embedded Systems", "Firmware", "Microcontrollers", "Hardware Integration"],
  },
  {
    name: "Kalyani Akshita",
    role: "Bio Med Eng",
    image: "/image.png",
    bio: "Biomedical engineer translating complex biomarker data into clinical insights.",
    linkedin: "https://www.linkedin.com/in/akshita-kalyani-487203288",
    github: "",
    portfolio: "",
    skills: ["Biomedical Eng", "Bioinformatics", "Data Analysis", "Quality Control"],
  },
];
