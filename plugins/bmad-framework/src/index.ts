/**
 * BMAD-METHOD Framework Plugin
 *
 * Main server entry point for the BMAD plugin that integrates the BMAD framework
 * with Automaker's feature development workflow using the agent:enhancement extension point.
 */

import type { Plugin, PluginContext, AgentEnhancer, AgentExecutionContext, AgentEnhancement } from '@automaker/plugin-types';
import type { BMADConfig, BMADPhase, BMADAgentRole } from './lib/types.js';
import { createBMADService } from './lib/bmad-service.js';

// Simple logger that falls back if console is not available
function log(message: string, ...args: unknown[]) {
  // Use process.stdout.write or globalThis.console if available
  if (typeof globalThis.console !== 'undefined') {
    globalThis.console.log(`[BMAD Framework] ${message}`, ...args);
  }
}

/**
 * BMAD plugin state
 */
interface BMADPluginState {
  service: ReturnType<typeof createBMADService>;
  enhancerId: string;
}

/**
 * Global plugin state
 */
let pluginState: BMADPluginState | null = null;

/**
 * Create the BMAD agent enhancer
 */
function createAgentEnhancer(pluginName: string): AgentEnhancer {
  return {
    id: `${pluginName}-enhancer`,
    name: 'BMAD Framework Enhancer',
    description: 'Enhances agent execution with BMAD phases and specialized personas',
    priority: 100,
    enhance: async (context: AgentExecutionContext): Promise<AgentEnhancement | null> => {
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
      const bmadPersona = enhancement.metadata?.bmadPersona as BMADAgentRole;
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
function loadBMADConfiguration(context: PluginContext): Partial<BMADConfig> {
  const config = context.configuration || {};

  return {
    enabled: config.enabled as boolean ?? true,
    defaultComplexity: config.defaultComplexity as any ?? 'moderate',
    usePersonas: config.usePersonas as boolean ?? true,
    trackPhases: config.trackPhases as boolean ?? true,
    phaseDurations: config.phaseDurations as any,
    personaConfig: {
      masterEnabled: config.masterEnabled as boolean ?? true,
      smEnabled: config.smEnabled as boolean ?? true,
      devEnabled: config.devEnabled as boolean ?? true,
      qaEnabled: config.qaEnabled as boolean ?? true,
      architectEnabled: config.architectEnabled as boolean ?? true,
    },
  };
}

/**
 * Plugin activation function
 */
export async function activate(context: PluginContext): Promise<void> {
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
  } else {
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
export async function deactivate(): Promise<void> {
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
export const plugin: Plugin = {
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
