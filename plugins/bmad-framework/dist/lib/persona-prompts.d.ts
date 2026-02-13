/**
 * BMAD Persona Prompts
 *
 * Contains all persona-specific system prompts for the BMAD framework.
 */
import type { BMADAgentRole, BMADPhase } from './types.js';
/**
 * Get the persona prompt for a specific role
 */
export declare function getPersonaPrompt(role: BMADAgentRole): string;
/**
 * Get phase-specific instructions
 */
export declare function getPhaseInstructions(phase: BMADPhase): string;
/**
 * Get persona display name
 */
export declare function getPersonaName(role: BMADAgentRole): string;
/**
 * Get persona description
 */
export declare function getPersonaDescription(role: BMADAgentRole): string;
/**
 * Get phases where a persona is active
 */
export declare function getPersonaActivePhases(role: BMADAgentRole): BMADPhase[];
//# sourceMappingURL=persona-prompts.d.ts.map