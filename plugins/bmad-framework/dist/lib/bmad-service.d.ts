/**
 * BMAD Service
 *
 * Core service that integrates the BMAD-METHOD framework with agent execution.
 * Provides BMAD phase tracking, persona management, and enhanced context for features.
 */
import type { BMADConfig, BMADPhase, BMADAgentRole, BMADFeatureContext } from './types.js';
/**
 * Feature interface
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
 * Agent definition interface
 */
interface AgentDefinition {
    id?: string;
    name?: string;
    role?: string;
    description?: string;
}
/**
 * Agent execution context (from plugin types)
 */
export interface AgentExecutionContext {
    feature: {
        id: string;
        title?: string;
        description: string;
        category: string;
        [key: string]: unknown;
    };
    agent: {
        id?: string;
        name?: string;
        role?: string;
        [key: string]: unknown;
    };
    workingDirectory: string;
    sessionId: string;
    metadata?: Record<string, unknown>;
}
/**
 * Agent enhancement result (matching @automaker/plugin-types)
 */
export interface AgentEnhancement {
    systemPrompt?: string;
    instructions?: string;
    metadata?: Record<string, unknown>;
    priority?: number;
}
/**
 * BMAD Persona definition
 */
export interface BMADPersona {
    role: BMADAgentRole;
    name: string;
    description: string;
    systemPrompt: string;
    activePhases: BMADPhase[];
}
/**
 * BMAD Service class
 *
 * Manages BMAD framework integration with features.
 */
export declare class BMADService {
    private config;
    constructor(config?: Partial<BMADConfig>);
    /**
     * Get BMAD context for a feature execution
     */
    getFeatureContext(feature: Feature, agent: AgentDefinition): {
        persona: BMADPersona;
        phase: BMADPhase;
        systemPrompt: string;
        phaseInstructions: string;
    };
    /**
     * Enhance agent execution with BMAD persona and phase
     */
    enhanceAgentExecution(context: AgentExecutionContext): AgentEnhancement | null;
    /**
     * Start tracking a feature in BMAD framework
     */
    startFeatureTracking(feature: Feature): BMADFeatureContext;
    /**
     * Get the current BMAD phase for a feature
     */
    getFeaturePhase(feature: Feature): BMADPhase;
    /**
     * Get the active persona for a feature
     */
    getFeaturePersona(feature: Feature): BMADAgentRole;
    /**
     * Get BMAD configuration
     */
    getConfiguration(): BMADConfig;
    /**
     * Update BMAD configuration
     */
    updateConfiguration(updates: Partial<BMADConfig>): void;
    /**
     * Get a persona by role
     */
    getPersona(role: BMADAgentRole): BMADPersona;
    /**
     * Get all available personas
     */
    getAllPersonas(): BMADPersona[];
    /**
     * Build an enhanced system prompt combining persona with phase instructions
     */
    private buildEnhancedPrompt;
    /**
     * Check if a specific persona is enabled
     */
    isPersonaEnabled(role: BMADAgentRole): boolean;
}
/**
 * Create a BMAD service instance
 */
export declare function createBMADService(config?: Partial<BMADConfig>): BMADService;
export {};
//# sourceMappingURL=bmad-service.d.ts.map