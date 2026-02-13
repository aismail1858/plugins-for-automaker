/**
 * BMAD-METHOD Framework Plugin
 *
 * Main server entry point for the BMAD plugin that integrates the BMAD framework
 * with Automaker's feature development workflow using the agent:enhancement extension point.
 */
import { createBMADService } from './lib/bmad-service.js';
// Simple logger that falls back if console is not available
function log(message, ...args) {
    // Use process.stdout.write or globalThis.console if available
    if (typeof globalThis.console !== 'undefined') {
        globalThis.console.log(`[BMAD Framework] ${message}`, ...args);
    }
}
/**
 * Global plugin state
 */
let pluginState = null;
/**
 * Create the BMAD agent enhancer
 */
function createAgentEnhancer(pluginName) {
    return {
        id: `${pluginName}-enhancer`,
        name: 'BMAD Framework Enhancer',
        description: 'Enhances agent execution with BMAD phases and specialized personas',
        priority: 100,
        enhance: async (context) => {
            if (!pluginState) {
                return null;
            }
            // Check if BMAD is enabled
            const config = pluginState.service.getConfiguration();
            if (!config.enabled) {
                return null;
            }
            // Check if personas are enabled
            if (!config.usePersonas) {
                return null;
            }
            // Apply BMAD enhancement
            const enhancement = pluginState.service.enhanceAgentExecution(context);
            if (!enhancement) {
                return null;
            }
            // Check if the specific persona is enabled
            const bmadPersona = enhancement.metadata?.bmadPersona;
            if (bmadPersona && !pluginState.service.isPersonaEnabled(bmadPersona)) {
                return null;
            }
            return enhancement;
        },
    };
}
/**
 * Load BMAD configuration from plugin context
 */
function loadBMADConfiguration(context) {
    const config = context.configuration || {};
    return {
        enabled: config.enabled ?? true,
        defaultComplexity: config.defaultComplexity ?? 'moderate',
        usePersonas: config.usePersonas ?? true,
        trackPhases: config.trackPhases ?? true,
        phaseDurations: config.phaseDurations,
        personaConfig: {
            masterEnabled: config.masterEnabled ?? true,
            smEnabled: config.smEnabled ?? true,
            devEnabled: config.devEnabled ?? true,
            qaEnabled: config.qaEnabled ?? true,
            architectEnabled: config.architectEnabled ?? true,
        },
    };
}
/**
 * Plugin activation function
 */
export async function activate(context) {
    context.logger.info('Activating BMAD-METHOD Framework plugin...');
    // Load configuration
    const config = loadBMADConfiguration(context);
    // Create BMAD service
    const service = createBMADService(config);
    // Create and register agent enhancer
    const enhancer = createAgentEnhancer(context.manifest.name);
    // Register with the agent:enhancement extension point
    const extensionPoint = context.server.getExtensionPoint('agent:enhancement');
    if (extensionPoint) {
        extensionPoint.register(enhancer);
        context.logger.info('BMAD agent enhancer registered successfully');
    }
    else {
        context.logger.warn('agent:enhancement extension point not available');
    }
    // Store plugin state
    pluginState = {
        service,
        enhancerId: enhancer.id,
    };
    // Log configuration
    context.logger.info('BMAD configuration:', {
        enabled: config.enabled,
        usePersonas: config.usePersonas,
        trackPhases: config.trackPhases,
    });
    context.logger.info('BMAD-METHOD Framework plugin activated successfully');
}
/**
 * Plugin deactivation function
 */
export async function deactivate() {
    if (!pluginState) {
        return;
    }
    // Unregister agent enhancer
    // Note: The extension point cleanup is handled by the plugin runtime
    pluginState = null;
    log('BMAD-METHOD Framework plugin deactivated');
}
/**
 * Plugin export
 */
export const plugin = {
    manifest: {
        name: 'bmad-framework',
        version: '1.0.0',
        description: 'BMAD-METHOD Framework - Agile AI development framework with structured phases and specialized agent personas',
        main: 'dist/index.js',
        clientMain: 'dist/client.js',
        automakerVersion: '>=0.14.0',
        homepage: 'https://github.com/automaker/automaker',
        license: 'MIT',
        keywords: ['bmad', 'agile', 'framework', 'phases', 'personas', 'development'],
    },
    path: '',
    activate,
    deactivate,
};
