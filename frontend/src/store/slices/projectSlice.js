import { createSlice } from "@reduxjs/toolkit";

const mockProjects = [
  {
    id: "1",
    title: "EcoTrack",
    description:
      "A smart IoT platform that helps businesses monitor and reduce their carbon footprint in real-time. Our sensors and AI-powered dashboard provide actionable insights for sustainability.",
    category: "CleanTech",
    fundingGoal: 500000,
    fundingRaised: 325000,
    founderId: "1",
    founderName: "Ali Hassan",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-06-15",
    investors: ["2", "5"],
  },
  {
    id: "2",
    title: "MediChain",
    description:
      "Blockchain-powered electronic health records system ensuring patient data privacy while enabling seamless sharing between healthcare providers. HIPAA compliant and decentralized.",
    category: "HealthTech",
    fundingGoal: 750000,
    fundingRaised: 450000,
    founderId: "4",
    founderName: "Zohaib Musharraf",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-07-20",
    investors: ["2"],
  },
  {
    id: "3",
    title: "FinLit",
    description:
      "A gamified financial literacy app for Gen-Z. Learn investing, budgeting, and crypto through interactive simulations and compete with friends on leaderboards.",
    category: "FinTech",
    fundingGoal: 300000,
    fundingRaised: 300000,
    founderId: "1",
    founderName: "Ali Hassan",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    status: "funded",
    createdAt: "2025-04-10",
    investors: ["2", "5"],
  },
  {
    id: "4",
    title: "AgriSense",
    description:
      "Precision agriculture platform using drone imagery and machine learning to optimize crop yields. Helps farmers reduce water usage by 40% and increase profits.",
    category: "AgriTech",
    fundingGoal: 600000,
    fundingRaised: 180000,
    founderId: "4",
    founderName: "Zohaib Musharraf",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-08-05",
    investors: ["5"],
  },
  {
    id: "5",
    title: "LearnVerse",
    description:
      "An immersive VR education platform that lets students explore historical events, scientific phenomena, and complex concepts in a 3D virtual environment.",
    category: "EdTech",
    fundingGoal: 400000,
    fundingRaised: 95000,
    founderId: "1",
    founderName: "Ali Hassan",
    image:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-09-01",
    investors: [],
  },
  {
    id: "6",
    title: "SwiftDeliver",
    description:
      "Last-mile delivery optimization using AI-powered route planning and a network of local delivery partners. Reducing delivery times by 60% in urban areas.",
    category: "Logistics",
    fundingGoal: 850000,
    fundingRaised: 510000,
    founderId: "4",
    founderName: "Zohaib Musharraf",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-05-22",
    investors: ["2", "5"],
  },
  {
    id: "7",
    title: "PetPal",
    description:
      "On-demand pet care marketplace connecting pet owners with verified sitters, walkers, and vets. Features live GPS tracking and real-time health monitoring.",
    category: "Marketplace",
    fundingGoal: 200000,
    fundingRaised: 200000,
    founderId: "1",
    founderName: "Ali Hassan",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop",
    status: "funded",
    createdAt: "2025-03-18",
    investors: ["2", "5"],
  },
  {
    id: "8",
    title: "CyberShield",
    description:
      "AI-driven cybersecurity platform for SMBs. Provides enterprise-grade threat detection, automated incident response, and compliance management at an affordable price.",
    category: "CyberSecurity",
    fundingGoal: 1000000,
    fundingRaised: 420000,
    founderId: "4",
    founderName: "Zohaib Musharraf",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
    status: "active",
    createdAt: "2025-10-01",
    investors: ["2"],
  },
];

const initialState = {
  projects: mockProjects,
  selectedProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject =
        state.projects.find((p) => p.id === action.payload) || null;
    },
    addProject: (state, action) => {
      const newProject = {
        ...action.payload,
        id: String(state.projects.length + 1),
        fundingRaised: 0,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        investors: [],
      };
      state.projects.push(newProject);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
        };
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    investInProject: (state, action) => {
      const { projectId, amount, investorId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.fundingRaised = Math.min(
          project.fundingRaised + amount,
          project.fundingGoal,
        );
        if (!project.investors.includes(investorId)) {
          project.investors.push(investorId);
        }
        if (project.fundingRaised >= project.fundingGoal) {
          project.status = "funded";
        }
      }
    },
  },
});

export const {
  setLoading,
  setSelectedProject,
  addProject,
  updateProject,
  deleteProject,
  investInProject,
} = projectSlice.actions;

export default projectSlice.reducer;
