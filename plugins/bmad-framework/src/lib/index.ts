/**
 * BMAD Library Index
 *
 * Exports all BMAD types, services, and utilities for external use.
 */

// Types
export type {
  BMADPhase,
  BMADAgentRole,
  BMADComplexity,
  BMADConfig,
  BMADPhaseInfo,
  BMADPersona,
  BMADFeatureContext,
  BMADPhaseProgress,
} from './types.js';

// Constants
export {
  DEFAULT_BMAD_CONFIG,
  BMAD_PHASES,
  COMPLEXITY_MULTIPLIERS,
} from './types.js';

// Services
export {
  createBMADService,
  BMADService,
} from './bmad-service.js';

export type {
  AgentExecutionContext,
  AgentEnhancement,
} from './bmad-service.js';

// Phase Mapper
export {
  createBMADPhaseMapper,
  BMADPhaseMapper,
} from './phase-mapper.js';

export type {
  PhaseMappingResult,
} from './phase-mapper.js';

// Persona Prompts
export {
  getPersonaPrompt,
  getPhaseInstructions,
  getPersonaName,
  getPersonaDescription,
  getPersonaActivePhases,
} from './persona-prompts.js';
