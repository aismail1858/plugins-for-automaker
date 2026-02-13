/**
 * BMAD-METHOD Framework Plugin - Client Entry Point
 *
 * Client-side code for the BMAD plugin that provides UI components
 * for visualizing BMAD phases and personas.
 */
// Simple logger for client side
function log(message, ...args) {
    // Use process.stdout.write or globalThis.console if available
    if (typeof globalThis.console !== 'undefined') {
        globalThis.console.log(`[BMAD Framework] ${message}`, ...args);
    }
}
let clientState = {
    isTrackingPhases: true,
};
/**
 * Plugin client activation
 */
export async function activate(context) {
    log('Activating client...');
    // Register BMAD status component in the feature card
    if (context.components?.register) {
        context.components.register('feature-card-footer', {
            component: 'BMADPhaseIndicator',
            props: {
                phase: 'brainstorming',
                persona: 'master',
            },
        });
    }
    // Register BMAD settings panel
    if (context.settings?.registerPanel) {
        context.settings.registerPanel({
            id: 'bmad-settings',
            title: 'BMAD Framework',
            order: 100,
            component: 'BMADSettingsPanel',
        });
    }
    // Subscribe to feature status changes
    if (context.events?.subscribe) {
        context.events.subscribe('feature:status:changed', (payload) => {
            log('Feature status changed:', payload);
            updateBMADContext(payload);
        });
        // Subscribe to agent execution events
        context.events.subscribe('agent:execution:start', (payload) => {
            log('Agent execution started:', payload);
            trackAgentExecution(payload);
        });
    }
    log('Client activated successfully');
}
/**
 * Plugin client deactivation
 */
export async function deactivate() {
    log('Deactivating client...');
    clientState = {
        isTrackingPhases: true,
    };
    log('Client deactivated');
}
/**
 * Update BMAD context based on feature status
 */
function updateBMADContext(payload) {
    // Determine BMAD phase from status
    const phase = mapStatusToPhase(payload.status);
    clientState.currentPhase = phase;
    clientState.activePersona = getPersonaForPhase(phase);
}
/**
 * Map Automaker status to BMAD phase
 */
function mapStatusToPhase(status) {
    const statusLower = status.toLowerCase();
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
    return 'brainstorming';
}
/**
 * Get the primary persona for a phase
 */
function getPersonaForPhase(phase) {
    const phasePersonas = {
        brainstorming: 'master',
        architecture: 'architect',
        development: 'dev',
        testing: 'qa',
    };
    return phasePersonas[phase] || 'master';
}
/**
 * Track agent execution for BMAD context
 */
function trackAgentExecution(payload) {
    log(`Tracking execution for feature: ${payload.featureId}`);
    // Execution tracking logic would go here
}
/**
 * Export client plugin
 */
export const clientPlugin = {
    name: 'bmad-framework-client',
    version: '1.0.0',
    activate,
    deactivate,
};
// Export for plugin loader
export default {
    activate,
    deactivate,
};
