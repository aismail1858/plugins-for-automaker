/**
 * BMAD Phase Mapper
 *
 * Maps feature states and types to BMAD phases for structured workflow.
 */
import type { BMADPhase, BMADPhaseInfo, BMADFeatureContext } from './types.js';
/**
 * Feature interface for phase mapping
 */
interface Feature {
    id: string;
    status?: string;
    category?: string;
    description: string;
    title?: string;
    planSpec?: {
        status?: string;
    };
    dependencies?: string[];
    startedAt?: string;
}
/**
 * Phase mapping result
 */
export interface PhaseMappingResult {
    /** The mapped BMAD phase */
    phase: BMADPhase;
    /** Phase information */
    phaseInfo: BMADPhaseInfo;
    /** Estimated duration in minutes */
    estimatedDuration: number;
    /** Confidence in this mapping (0-1) */
    confidence: number;
}
/**
 * BMAD Phase Mapper class
 *
 * Analyzes features and determines the appropriate BMAD phase
 * based on feature status, category, and other attributes.
 */
export declare class BMADPhaseMapper {
    /**
     * Map a feature to its current BMAD phase
     */
    mapFeatureToPhase(feature: Feature): PhaseMappingResult;
    /**
     * Create a BMAD feature context from a feature
     */
    createFeatureContext(feature: Feature): BMADFeatureContext;
    /**
     * Get the next phase in the BMAD workflow
     */
    getNextPhase(currentPhase: BMADPhase): BMADPhase | null;
    /**
     * Get the previous phase in the BMAD workflow
     */
    getPreviousPhase(currentPhase: BMADPhase): BMADPhase | null;
    /**
     * Check if a phase transition is valid
     */
    isValidTransition(fromPhase: BMADPhase, toPhase: BMADPhase): boolean;
    /**
     * Extract feature status from feature
     */
    private extractFeatureStatus;
    /**
     * Map feature status to BMAD phase
     */
    private statusToPhase;
    /**
     * Assess feature complexity based on attributes
     */
    private assessComplexity;
    /**
     * Estimate phase duration based on phase and complexity
     */
    private estimateDuration;
    /**
     * Calculate confidence in phase mapping (0-1)
     */
    private calculateMappingConfidence;
    /**
     * Get the primary persona for a phase
     */
    private getPersonaForPhase;
    /**
     * Calculate phase progress for a feature
     */
    private calculatePhaseProgress;
    /**
     * Estimate completion time for a feature
     */
    private estimateCompletion;
    /**
     * Get all phases in order
     */
    getAllPhases(): BMADPhase[];
    /**
     * Get phase by order number (1-4)
     */
    getPhaseByOrder(order: number): BMADPhase | null;
}
/**
 * Create a BMAD phase mapper instance
 */
export declare function createBMADPhaseMapper(): BMADPhaseMapper;
export {};
//# sourceMappingURL=phase-mapper.d.ts.map