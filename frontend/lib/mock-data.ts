export type FaultSeverity = "HIGH" | "MEDIUM" | "LOW";

export type FaultAlert = {
  id: string;
  faultType: string;
  assetType: "Transformer" | "Feeder";
  assetId: string;
  village: string;
  severity: FaultSeverity;
  confidence: number;
  probableCause: string;
  affectedVillages: string[];
  recommendedAction: string;
};

export const gridStats = {
  activeFeeders: 24,
  transformers: 86,
  onlineTransformers: 84,
  activeFaults: 3,
  affectedVillages: 7,
};

export const faultAlerts: FaultAlert[] = [
  {
    id: "F-001",
    faultType: "Transformer Overload",
    assetType: "Transformer",
    assetId: "T-102",
    village: "Khed",
    severity: "HIGH",
    confidence: 92,
    probableCause: "Excessive load on transformer",
    affectedVillages: ["Khed", "Chakan"],
    recommendedAction: "Inspect transformer T-102 and check load distribution",
  },

  {
    id: "F-002",
    faultType: "Voltage Anomaly",
    assetType: "Feeder",
    assetId: "F-204",
    village: "Rajgurunagar",
    severity: "MEDIUM",
    confidence: 84,
    probableCause: "Possible conductor degradation",
    affectedVillages: ["Rajgurunagar", "Waki"],
    recommendedAction: "Inspect feeder section F-204",
  },

  {
    id: "F-003",
    faultType: "Current Surge",
    assetType: "Transformer",
    assetId: "T-118",
    village: "Manchar",
    severity: "MEDIUM",
    confidence: 79,
    probableCause: "Abnormal current flow",
    affectedVillages: ["Manchar"],
    recommendedAction: "Inspect transformer T-118 and downstream connections",
  },
];

export const villages = [
  {
    id: "V-001",
    name: "Khed",
    affected: true,
    population: 4200,
  },

  {
    id: "V-002",
    name: "Rajgurunagar",
    affected: true,
    population: 5100,
  },

  {
    id: "V-003",
    name: "Manchar",
    affected: true,
    population: 3800,
  },

  {
    id: "V-004",
    name: "Waki",
    affected: true,
    population: 2100,
  },

  {
    id: "V-005",
    name: "Chakan",
    affected: true,
    population: 6200,
  },
];

export const fieldCrews = [
  {
    id: "CREW-01",
    name: "Team Alpha",
    status: "Available",
    distance: "2.4 km",
  },

  {
    id: "CREW-02",
    name: "Team Bravo",
    status: "On Field",
    distance: "5.8 km",
  },

  {
    id: "CREW-03",
    name: "Team Charlie",
    status: "Available",
    distance: "7.2 km",
  },
];

export const restorationProgress = {
  affectedCustomers: 1240,
  restoredCustomers: 760,
  estimatedRestoration: "42 min",
  progress: 61,
};