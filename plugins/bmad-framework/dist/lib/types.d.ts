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
export declare const DEFAULT_BMAD_CONFIG: BMADConfig;
/**
 * BMAD phase definitions
 */
export declare const BMAD_PHASES: Record<BMADPhase, BMADPhaseInfo>;
/**
 * Complexity to duration multipliers
 */
export declare const COMPLEXITY_MULTIPLIERS: Record<BMADComplexity, number>;
//# sourceMappingURL=types.d.ts.map