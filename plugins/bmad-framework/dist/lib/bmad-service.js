/**
 * BMAD Service
 *
 * Core service that integrates the BMAD-METHOD framework with agent execution.
 * Provides BMAD phase tracking, persona management, and enhanced context for features.
 */
import { DEFAULT_BMAD_CONFIG } from './types.js';
import { createBMADPhaseMapper } from './phase-mapper.js';
import { getPersonaPrompt, getPhaseInstructions, getPersonaName, getPersonaDescription, getPersonaActivePhases } from './persona-prompts.js';
/**
 * BMAD Service class
 *
 * Manages BMAD framework integration with features.
 */
export class BMADService {
    constructor(config) {
        this.config = { ...DEFAULT_BMAD_CONFIG, ...config };
    }
    /**
     * Get BMAD context for a feature execution
     */
    getFeatureContext(feature, agent) {
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
    enhanceAgentExecution(context) {
        if (!this.config.enabled) {
            return null;
        }
        if (!this.config.usePersonas) {
            return null;
        }
        const feature = {
            id: context.feature.id,
            description: context.feature.description,
            title: context.feature.title,
            category: context.feature.category,
        };
        const agent = {
            id: context.agent.id,
            name: context.agent.name,
            role: context.agent.role,
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
    startFeatureTracking(feature) {
        const phaseMapper = createBMADPhaseMapper();
        return phaseMapper.createFeatureContext(feature);
    }
    /**
     * Get the current BMAD phase for a feature
     */
    getFeaturePhase(feature) {
        const phaseMapper = createBMADPhaseMapper();
        const context = phaseMapper.createFeatureContext(feature);
        return context.currentPhase;
    }
    /**
     * Get the active persona for a feature
     */
    getFeaturePersona(feature) {
        const phaseMapper = createBMADPhaseMapper();
        const context = phaseMapper.createFeatureContext(feature);
        return context.activePersona;
    }
    /**
     * Get BMAD configuration
     */
    getConfiguration() {
        return { ...this.config };
    }
    /**
     * Update BMAD configuration
     */
    updateConfiguration(updates) {
        this.config = { ...this.config, ...updates };
    }
    /**
     * Get a persona by role
     */
    getPersona(role) {
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
    getAllPersonas() {
        const roles = ['master', 'sm', 'dev', 'qa', 'architect'];
        return roles.map((role) => this.getPersona(role));
    }
    /**
     * Build an enhanced system prompt combining persona with phase instructions
     */
    buildEnhancedPrompt(persona, phase) {
        const parts = [
            persona.systemPrompt,
            getPhaseInstructions(phase),
        ];
        return parts.filter(Boolean).join('\n\n');
    }
    /**
     * Check if a specific persona is enabled
     */
    isPersonaEnabled(role) {
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
export function createBMADService(config) {
    return new BMADService(config);
}
