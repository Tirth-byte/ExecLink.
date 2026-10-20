import { ExecutionDiscipline, EventSource } from "./live-execution";

export type MatchCandidate = {
  id: string;
  name: string;
  discipline: ExecutionDiscipline;
  wbs: string;
  confidence: number;
  confidenceTier: "High" | "Review" | "Weak";
  baselineStart: string;
  baselineFinish: string;
  currentProgress: number;
  proposedProgress: number;
  deltaProgress: number;
  totalFloat: string;
  scheduleStatus: string;
  isProgressCompatible: boolean;
  incompatibilityReason?: string;
  signals: {
    semantic: number;
    assetTag: number;
    wbsContext: number;
    discipline: number;
    temporal: number;
    location: number;
  };
  reasoning: string;
};

export type MatchReviewItem = {
  id: string;
  eventId: string;
  priority: "High" | "Medium" | "Low";
  category: "All" | "High Priority" | "Low Confidence" | "Ambiguous" | "Unmatched";
  status: "Needs Review" | "Verified" | "Rejected" | "Flagged New Activity";
  time: string;
  date: string;
  timestamp: string;
  discipline: ExecutionDiscipline;
  eventTitle: string;
  rawFieldUpdate: string;
  structuredExtraction: {
    eventType: string;
    discipline: ExecutionDiscipline;
    assetTag: string;
    location: string;
    reportedProgress: string;
    source: EventSource;
    reportedBy: string;
    role: string;
    received: string;
  };
  evidence: {
    type: "photo" | "video" | "document" | "transcript" | "sheet";
    count: string;
    reference: string;
    reporter: string;
    timestamp: string;
    summary: string;
    imageUrl?: string;
    videoUrl?: string;
    duration?: string;
    aiObservation?: string;
    isSyntheticDemo?: boolean;
    attachments?: Array<{
      id: string;
      type: string;
      mimeType?: string;
      fileName: string;
      fileSize?: number;
      mediaUrl: string;
    }>;
  };
  recommendedCandidate: MatchCandidate;
  alternativeCandidates: MatchCandidate[];
  routing: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  plannerNote?: string;
};

export const matchReviewQueue: MatchReviewItem[] = [
  {
    id: "REV-001",
    eventId: "EVT-0147",
    priority: "High",
    category: "High Priority",
    status: "Needs Review",
    time: "09:42",
    date: "26 Sep 2026",
    timestamp: "26 Sep 2026 · 09:42",
    discipline: "Piping",
    eventTitle: "P-110 erection progress updated to 78%",
    rawFieldUpdate: "“P-110 structural erection and pump alignment completed to approximately 78% in Process Area / Row B.”",
    structuredExtraction: {
      eventType: "Progress Update",
      discipline: "Piping",
      assetTag: "P-110",
      location: "Process Area / Row B",
      reportedProgress: "78%",
      source: "Field Update",
      reportedBy: "R. Sharma",
      role: "Piping Supervisor",
      received: "26 Sep 2026 · 09:42",
    },
    evidence: {
      type: "photo",
      count: "1 attachment",
      reference: "IMG-EL-P110-0926-04.jpg",
      reporter: "R. Sharma · Piping Supervisor",
      timestamp: "26 Sep 2026 · 09:41",
      summary: "Pump base seated on soleplates with dial indicator alignment rig mounted.",
      imageUrl: "/evidence/p110-alignment-evidence.jpg",
      aiObservation: "Pump base and alignment dial indicators are clearly visible on coupling shaft. Evidence is consistent with pump erection / alignment scope, but final verification remains a planner decision.",
      isSyntheticDemo: true,
      attachments: [
        {
          id: "EVD-P110-DEMO",
          type: "photo",
          fileName: "IMG-EL-P110-0926-04.jpg",
          mediaUrl: "/evidence/p110-alignment-evidence.jpg",
        },
      ],
    },
    recommendedCandidate: {
      id: "ACT-P110",
      name: "P-110 Erection & Alignment",
      discipline: "Piping",
      wbs: "Process Area → Mechanical Works → Piping → P-110 Installation",
      confidence: 97,
      confidenceTier: "High",
      baselineStart: "18 Sep 2026",
      baselineFinish: "28 Sep 2026",
      currentProgress: 64,
      proposedProgress: 78,
      deltaProgress: 14,
      totalFloat: "0d",
      scheduleStatus: "In Progress",
      isProgressCompatible: true,
      signals: {
        semantic: 96,
        assetTag: 100,
        wbsContext: 92,
        discipline: 100,
        temporal: 88,
        location: 84,
      },
      reasoning: "Asset P-110 is explicitly referenced in the field update. The erection and alignment terminology, piping discipline, Process Area location and execution timing strongly align with ACT-P110.",
    },
    alternativeCandidates: [
      {
        id: "ACT-P125",
        name: "P-110 Hydrotest",
        discipline: "Piping",
        wbs: "Process Area → Mechanical Works → Piping → Testing",
        confidence: 71,
        confidenceTier: "Review",
        baselineStart: "29 Sep 2026",
        baselineFinish: "04 Oct 2026",
        currentProgress: 0,
        proposedProgress: 0,
        deltaProgress: 0,
        totalFloat: "2d",
        scheduleStatus: "Not Started",
        isProgressCompatible: false,
        incompatibilityReason: "The reported 78% progress refers to erection work and cannot be safely applied to the selected Hydrotest activity.",
        signals: {
          semantic: 68,
          assetTag: 100,
          wbsContext: 85,
          discipline: 100,
          temporal: 52,
          location: 84,
        },
        reasoning: "Asset P-110 and the piping context match this activity, but the reported work describes erection and alignment rather than hydrotesting. ACT-P125 is therefore a plausible asset match but a weaker execution-stage match.",
      },
      {
        id: "ACT-P140",
        name: "Area 4 Secondary Piping Spool Fitup",
        discipline: "Piping",
        wbs: "Process Area → Piping → Spools",
        confidence: 43,
        confidenceTier: "Weak",
        baselineStart: "22 Sep 2026",
        baselineFinish: "01 Oct 2026",
        currentProgress: 35,
        proposedProgress: 35,
        deltaProgress: 0,
        totalFloat: "5d",
        scheduleStatus: "In Progress",
        isProgressCompatible: false,
        incompatibilityReason: "The reported 78% erection progress refers to equipment installation and cannot be safely applied to secondary piping spool fitup.",
        signals: {
          semantic: 45,
          assetTag: 20,
          wbsContext: 60,
          discipline: 100,
          temporal: 65,
          location: 50,
        },
        reasoning: "Piping discipline and general timeframe overlap, but asset tag P-110 does not match spool fitup scope in Area 4.",
      },
    ],
    routing: "Human verification required",
  },
];
