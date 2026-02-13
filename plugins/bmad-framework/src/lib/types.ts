/**
 * BMAD-METHOD Plugin Types
 *
 * BMAD (Brainstorming, Architecture, Development, Testing) is an agile AI development
 * framework that provides structured phases and specialized agent personas.
 */

/**
 * The four BMAD methodology phases
 */
export type BMADPhase = 'brainstorming' | 'architecture' | 'development' | 'testing';

/**
 * BMAD agent personas with specialized roles and expertise
 */
export type BMADAgentRole = 'master' | 'sm' | 'dev' | 'qa' | 'architect';

/**
 * Feature complexity levels for BMAD phase estimation
 */
export type BMADComplexity = 'simple' | 'moderate' | 'complex' | 'very-complex';

/**
 * BMAD configuration options
 */
export interface BMADConfig {
  /** Whether BMAD framework is enabled */
  enabled: boolean;
  /** Default complexity for phase estimation */
  defaultComplexity: BMADComplexity;
  /** Whether to use BMAD personas during agent execution */
  usePersonas: boolean;
  /** Whether to track phase progress */
  trackPhases: boolean;
  /** Custom phase duration multipliers (in minutes) */
  phaseDurations: {
    brainstorming: number;
    architecture: number;
    development: number;
    testing: number;
  };
  /** Persona customization */
  personaConfig: {
    /** Whether to enable Master persona */
    masterEnabled: boolean;
    /** Whether to enable Scrum Master persona */
    smEnabled: boolean;
    /** Whether to enable DEV persona */
    devEnabled: boolean;
    /** Whether to enable QA persona */
    qaEnabled: boolean;
    /** Whether to enable Architect persona */
    architectEnabled: boolean;
  };
}

/**
 * BMAD phase information
 */
export interface BMADPhaseInfo {
  /** The phase identifier */
  phase: BMADPhase;
  /** Phase display name */
  name: string;
  /** Phase description */
  description: string;
  /** Estimated duration in minutes */
  estimatedDuration: number;
  /** Phase order (1-4) */
  order: number;
  /** Required agent roles for this phase */
  requiredRoles: BMADAgentRole[];
}

/**
 * BMAD agent persona definition
 */
export interface BMADPersona {
  /** The persona role identifier */
  role: BMADAgentRole;
  /** Persona display name */
  name: string;
  /** Persona description and expertise */
  description: string;
  /** System prompt for this persona */
  systemPrompt: string;
  /** Phases where this persona is active */
  activePhases: BMADPhase[];
}

/**
 * BMAD feature context - extends feature data with BMAD-specific information
 */
export interface BMADFeatureContext {
  /** Original feature ID */
  featureId: string;
  /** Current BMAD phase */
  currentPhase: BMADPhase;
  /** Feature complexity */
  complexity: BMADComplexity;
  /** Active persona for current phase */
  activePersona: BMADAgentRole;
  /** Phase progress tracking */
  phaseProgress: BMADPhaseProgress;
  /** Estimated completion time */
  estimatedCompletion?: string;
}

/**
 * BMAD phase progress tracking
 */
export interface BMADPhaseProgress {
  /** Phases completed */
  completedPhases: BMADPhase[];
  /** Current phase start time */
  phaseStartTime?: string;
  /** Total time spent in completed phases (minutes) */
  timeSpent: number;
  /** Percentage complete (0-100) */
  progressPercentage: number;
}

/**
 * Default BMAD configuration
 */
export const DEFAULT_BMAD_CONFIG: BMADConfig = {
  enabled: true,
  defaultComplexity: 'moderate',
  usePersonas: true,
  trackPhases: true,
  phaseDurations: {
    brainstorming: 15,
    architecture: 20,
    development: 45,
    testing: 20,
  },
  personaConfig: {
    masterEnabled: true,
    smEnabled: true,
    devEnabled: true,
    qaEnabled: true,
    architectEnabled: true,
  },
};

/**
 * BMAD phase definitions
 */
export const BMAD_PHASES: Record<BMADPhase, BMADPhaseInfo> = {
  brainstorming: {
    phase: 'brainstorming',
    name: 'Brainstorming',
    description: 'Generate and explore ideas, define requirements, and identify potential solutions',
    estimatedDuration: 15,
    order: 1,
    requiredRoles: ['master', 'sm'],
  },
  architecture: {
    phase: 'architecture',
    name: 'Architecture',
    description: 'Design system architecture, define components, and plan implementation strategy',
    estimatedDuration: 20,
    order: 2,
    requiredRoles: ['architect', 'master'],
  },
  development: {
    phase: 'development',
    name: 'Development',
    description: 'Implement the feature following architectural plans and coding standards',
    estimatedDuration: 45,
    order: 3,
    requiredRoles: ['dev', 'architect'],
  },
  testing: {
    phase: 'testing',
    name: 'Testing',
    description: 'Verify implementation, run tests, and ensure quality standards are met',
    estimatedDuration: 20,
    order: 4,
    requiredRoles: ['qa', 'dev'],
  },
};

/**
 * Complexity to duration multipliers
 */
export const COMPLEXITY_MULTIPLIERS: Record<BMADComplexity, number> = {
  simple: 0.5,
  moderate: 1,
  complex: 1.5,
  'very-complex': 2,
};
