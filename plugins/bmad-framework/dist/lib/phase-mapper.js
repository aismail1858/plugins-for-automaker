/**
 * BMAD Phase Mapper
 *
 * Maps feature states and types to BMAD phases for structured workflow.
 */
import { BMAD_PHASES, COMPLEXITY_MULTIPLIERS } from './types.js';
/**
 * BMAD Phase Mapper class
 *
 * Analyzes features and determines the appropriate BMAD phase
 * based on feature status, category, and other attributes.
 */
export class BMADPhaseMapper {
    /**
     * Map a feature to its current BMAD phase
     */
    mapFeatureToPhase(feature) {
        const status = this.extractFeatureStatus(feature);
        const phase = this.statusToPhase(status);
        const phaseInfo = BMAD_PHASES[phase];
        const complexity = this.assessComplexity(feature);
        const estimatedDuration = this.estimateDuration(phase, complexity);
        const confidence = this.calculateMappingConfidence(feature, phase);
        return {
            phase,
            phaseInfo,
            estimatedDuration,
            confidence,
        };
    }
    /**
     * Create a BMAD feature context from a feature
     */
    createFeatureContext(feature) {
        const mapping = this.mapFeatureToPhase(feature);
        const complexity = this.assessComplexity(feature);
        // Determine active persona based on phase
        const activePersona = this.getPersonaForPhase(mapping.phase);
        // Calculate phase progress
        const phaseProgress = this.calculatePhaseProgress(feature, mapping.phase);
        return {
            featureId: feature.id,
            currentPhase: mapping.phase,
            complexity,
            activePersona,
            phaseProgress,
            estimatedCompletion: this.estimateCompletion(feature, mapping),
        };
    }
    /**
     * Get the next phase in the BMAD workflow
     */
    getNextPhase(currentPhase) {
        const phases = ['brainstorming', 'architecture', 'development', 'testing'];
        const currentIndex = phases.indexOf(currentPhase);
        if (currentIndex === -1 || currentIndex === phases.length - 1) {
            return null;
        }
        return phases[currentIndex + 1];
    }
    /**
     * Get the previous phase in the BMAD workflow
     */
    getPreviousPhase(currentPhase) {
        const phases = ['brainstorming', 'architecture', 'development', 'testing'];
        const currentIndex = phases.indexOf(currentPhase);
        if (currentIndex <= 0) {
            return null;
        }
        return phases[currentIndex - 1];
    }
    /**
     * Check if a phase transition is valid
     */
    isValidTransition(fromPhase, toPhase) {
        const phases = ['brainstorming', 'architecture', 'development', 'testing'];
        const fromIndex = phases.indexOf(fromPhase);
        const toIndex = phases.indexOf(toPhase);
        // Allow forward movement
        if (toIndex === fromIndex + 1) {
            return true;
        }
        // Allow revisiting earlier phases for iteration
        if (toIndex < fromIndex) {
            return true;
        }
        return false;
    }
    /**
     * Extract feature status from feature
     */
    extractFeatureStatus(feature) {
        return feature.status || 'pending';
    }
    /**
     * Map feature status to BMAD phase
     */
    statusToPhase(status) {
        const statusLower = status.toLowerCase();
        // Map statuses to BMAD phases
        if (statusLower === 'pending' || statusLower === 'queued') {
            return 'brainstorming';
        }
        if (statusLower === 'planning' || statusLower === 'architecting') {
            return 'architecture';
        }
        if (statusLower === 'running' || statusLower === 'in-progress') {
            return 'development';
        }
        if (statusLower === 'testing' || statusLower === 'verifying') {
            return 'testing';
        }
        // Default to brainstorming for unknown statuses
        return 'brainstorming';
    }
    /**
     * Assess feature complexity based on attributes
     */
    assessComplexity(feature) {
        // Check for explicit complexity markers
        const description = feature.description.toLowerCase();
        // Simple indicators
        if (description.includes('simple') ||
            description.includes('basic') ||
            description.includes('minor') ||
            description.includes('small')) {
            return 'simple';
        }
        // Complex indicators
        if (description.includes('complex') ||
            description.includes('integrate') ||
            description.includes('refactor') ||
            description.includes('architecture')) {
            return 'complex';
        }
        // Very complex indicators
        if (description.includes('very complex') ||
            description.includes('major refactor') ||
            description.includes('complete rewrite') ||
            description.includes('system redesign')) {
            return 'very-complex';
        }
        // Assess based on dependencies
        const dependencyCount = feature.dependencies?.length || 0;
        if (dependencyCount > 5) {
            return 'very-complex';
        }
        if (dependencyCount > 3) {
            return 'complex';
        }
        // Assess based on category
        const complexCategories = ['backend', 'infrastructure', 'database', 'security'];
        if (feature.category && complexCategories.includes(feature.category.toLowerCase())) {
            return 'complex';
        }
        return 'moderate';
    }
    /**
     * Estimate phase duration based on phase and complexity
     */
    estimateDuration(phase, complexity) {
        const baseDuration = BMAD_PHASES[phase].estimatedDuration;
        const multiplier = COMPLEXITY_MULTIPLIERS[complexity];
        return Math.round(baseDuration * multiplier);
    }
    /**
     * Calculate confidence in phase mapping (0-1)
     */
    calculateMappingConfidence(feature, phase) {
        let confidence = 0.5; // Base confidence
        // Increase confidence if we have explicit status
        if (feature.status) {
            confidence += 0.2;
        }
        // Increase confidence if category is known
        if (feature.category) {
            confidence += 0.1;
        }
        // Increase confidence if we have plan spec
        if (feature.planSpec) {
            confidence += 0.2;
        }
        return Math.min(confidence, 1.0);
    }
    /**
     * Get the primary persona for a phase
     */
    getPersonaForPhase(phase) {
        const phaseInfo = BMAD_PHASES[phase];
        // Return the first required role (primary)
        return phaseInfo.requiredRoles[0];
    }
    /**
     * Calculate phase progress for a feature
     */
    calculatePhaseProgress(feature, currentPhase) {
        const phases = ['brainstorming', 'architecture', 'development', 'testing'];
        const currentIndex = phases.indexOf(currentPhase);
        const completedPhases = phases.slice(0, currentIndex);
        // Calculate progress percentage
        const progressPercentage = (currentIndex / phases.length) * 100;
        return {
            completedPhases,
            phaseStartTime: feature.startedAt,
            timeSpent: 0, // Will be calculated from actual timestamps
            progressPercentage,
        };
    }
    /**
     * Estimate completion time for a feature
     */
    estimateCompletion(feature, mapping) {
        const now = new Date();
        const durationMs = mapping.estimatedDuration * 60 * 1000;
        const completionTime = new Date(now.getTime() + durationMs);
        return completionTime.toISOString();
    }
    /**
     * Get all phases in order
     */
    getAllPhases() {
        return ['brainstorming', 'architecture', 'development', 'testing'];
    }
    /**
     * Get phase by order number (1-4)
     */
    getPhaseByOrder(order) {
        const phases = ['brainstorming', 'architecture', 'development', 'testing'];
        return phases[order - 1] || null;
    }
}
/**
 * Create a BMAD phase mapper instance
 */
export function createBMADPhaseMapper() {
    return new BMADPhaseMapper();
}
