/**
 * BMAD Service
 *
 * Core service that integrates the BMAD-METHOD framework with agent execution.
 * Provides BMAD phase tracking, persona management, and enhanced context for features.
 */

import type {
  BMADConfig,
  BMADPhase,
  BMADAgentRole,
  BMADFeatureContext,
} from './types.js';
import { DEFAULT_BMAD_CONFIG } from './types.js';
import { createBMADPhaseMapper } from './phase-mapper.js';
import { getPersonaPrompt, getPhaseInstructions, getPersonaName, getPersonaDescription, getPersonaActivePhases } from './persona-prompts.js';

/**
 * Feature interface
 */
interface Feature {
  id: string;
  status?: string;
  category?: string;
  description: string;
  title?: string;
  planSpec?: { status?: string };
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
export class BMADService {
  private config: BMADConfig;

  constructor(config?: Partial<BMADConfig>) {
    this.config = { ...DEFAULT_BMAD_CONFIG, ...config };
  }

  /**
   * Get BMAD context for a feature execution
   */
  getFeatureContext(feature: Feature, agent: AgentDefinition): {
    persona: BMADPersona;
    phase: BMADPhase;
    systemPrompt: string;
    phaseInstructions: string;
  } {
    const phaseMapper = createBMADPhaseMapper();
    const featureContext = phaseMapper.createFeatureContext(feature);
    const phase = featureContext.currentPhase;
    const personaRole = featureContext.activePersona;

    const persona = this.getPersona(personaRole);
    const systemPrompt = this.buildEnhancedPrompt(persona, phase);
    const phaseInstructions = getPhaseInstructions(phase);

    return {
      persona,
      phase,
      systemPrompt,
      phaseInstructions,
    };
  }

  /**
   * Enhance agent execution with BMAD persona and phase
   */
  enhanceAgentExecution(context: AgentExecutionContext): AgentEnhancement | null {
    if (!this.config.enabled) {
      return null;
    }

    if (!this.config.usePersonas) {
      return null;
    }

    const feature: Feature = {
      id: context.feature.id,
      description: context.feature.description,
      title: context.feature.title,
      category: context.feature.category,
    };

    const agent: AgentDefinition = {
      id: context.agent.id as string,
      name: context.agent.name as string,
      role: context.agent.role as string,
    };

    const bmadContext = this.getFeatureContext(feature, agent);

    return {
      systemPrompt: bmadContext.systemPrompt,
      instructions: bmadContext.phaseInstructions,
      metadata: {
        bmadPhase: bmadContext.phase,
        bmadPersona: bmadContext.persona.role,
        bmadPersonaName: bmadContext.persona.name,
      },
    };
  }

  /**
   * Start tracking a feature in BMAD framework
   */
  startFeatureTracking(feature: Feature): BMADFeatureContext {
    const phaseMapper = createBMADPhaseMapper();
    return phaseMapper.createFeatureContext(feature);
  }

  /**
   * Get the current BMAD phase for a feature
   */
  getFeaturePhase(feature: Feature): BMADPhase {
    const phaseMapper = createBMADPhaseMapper();
    const context = phaseMapper.createFeatureContext(feature);
    return context.currentPhase;
  }

  /**
   * Get the active persona for a feature
   */
  getFeaturePersona(feature: Feature): BMADAgentRole {
    const phaseMapper = createBMADPhaseMapper();
    const context = phaseMapper.createFeatureContext(feature);
    return context.activePersona;
  }

  /**
   * Get BMAD configuration
   */
  getConfiguration(): BMADConfig {
    return { ...this.config };
  }

  /**
   * Update BMAD configuration
   */
  updateConfiguration(updates: Partial<BMADConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Get a persona by role
   */
  getPersona(role: BMADAgentRole): BMADPersona {
    const systemPrompt = getPersonaPrompt(role);
    return {
      role,
      name: getPersonaName(role),
      description: getPersonaDescription(role),
      systemPrompt,
      activePhases: getPersonaActivePhases(role),
    };
  }

  /**
   * Get all available personas
   */
  getAllPersonas(): BMADPersona[] {
    const roles: BMADAgentRole[] = ['master', 'sm', 'dev', 'qa', 'architect'];
    return roles.map((role) => this.getPersona(role));
  }

  /**
   * Build an enhanced system prompt combining persona with phase instructions
   */
  private buildEnhancedPrompt(persona: BMADPersona, phase: BMADPhase): string {
    const parts = [
      persona.systemPrompt,
      getPhaseInstructions(phase),
    ];

    return parts.filter(Boolean).join('\n\n');
  }

  /**
   * Check if a specific persona is enabled
   */
  isPersonaEnabled(role: BMADAgentRole): boolean {
    switch (role) {
      case 'master':
        return this.config.personaConfig.masterEnabled;
      case 'sm':
        return this.config.personaConfig.smEnabled;
      case 'dev':
        return this.config.personaConfig.devEnabled;
      case 'qa':
        return this.config.personaConfig.qaEnabled;
      case 'architect':
        return this.config.personaConfig.architectEnabled;
      default:
        return true;
    }
  }
}

/**
 * Create a BMAD service instance
 */
export function createBMADService(config?: Partial<BMADConfig>): BMADService {
  return new BMADService(config);
}
