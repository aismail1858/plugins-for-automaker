/**
 * BMAD-METHOD Plugin Types
 *
 * BMAD (Brainstorming, Architecture, Development, Testing) is an agile AI development
 * framework that provides structured phases and specialized agent personas.
 */
/**
 * Default BMAD configuration
 */
export const DEFAULT_BMAD_CONFIG = {
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
export const BMAD_PHASES = {
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
export const COMPLEXITY_MULTIPLIERS = {
    simple: 0.5,
    moderate: 1,
    complex: 1.5,
    'very-complex': 2,
};
