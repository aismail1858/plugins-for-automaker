/**
 * BMAD Plugin - On Install Hook
 *
 * Called when the BMAD plugin is first installed.
 */

// Simple logger
function log(message: string, ...args: unknown[]) {
  // Use process.stdout.write or globalThis.console if available
  if (typeof globalThis.console !== 'undefined') {
    globalThis.console.log(`[BMAD Framework] ${message}`, ...args);
  }
}

/**
 * Hook result type
 */
interface HookResult {
  success: boolean;
  data?: Record<string, unknown>;
}

/**
 * Hook context type
 */
interface HookContext {
  api: {
    storage: {
      set(key: string, value: unknown): Promise<void>;
    };
  };
}

/**
 * On install hook handler
 */
export async function onInstall(context: HookContext): Promise<HookResult> {
  log('Plugin installed');

  // Initialize default BMAD settings
  await context.api.storage.set('bmad.config', {
    enabled: true,
    defaultComplexity: 'moderate',
    usePersonas: true,
    trackPhases: true,
    personaConfig: {
      masterEnabled: true,
      smEnabled: true,
      devEnabled: true,
      qaEnabled: true,
      architectEnabled: true,
    },
  });

  // Initialize phase registry
  await context.api.storage.set('bmad.phases', {
    brainstorming: {
      name: 'Brainstorming',
      description: 'Generate and explore ideas, define requirements',
      order: 1,
      duration: 15,
    },
    architecture: {
      name: 'Architecture',
      description: 'Design system architecture and components',
      order: 2,
      duration: 20,
    },
    development: {
      name: 'Development',
      description: 'Implement the feature',
      order: 3,
      duration: 45,
    },
    testing: {
      name: 'Testing',
      description: 'Verify implementation and quality',
      order: 4,
      duration: 20,
    },
  });

  // Initialize persona registry
  await context.api.storage.set('bmad.personas', {
    master: {
      name: 'Master Agent',
      description: 'Orchestrates the overall development process',
      phases: ['brainstorming', 'architecture', 'development', 'testing'],
    },
    sm: {
      name: 'Scrum Master',
      description: 'Facilitates agile processes and removes blockers',
      phases: ['brainstorming', 'development'],
    },
    dev: {
      name: 'Developer',
      description: 'Implements features following coding standards',
      phases: ['development', 'testing'],
    },
    qa: {
      name: 'QA Engineer',
      description: 'Ensures quality through testing and validation',
      phases: ['testing', 'development'],
    },
    architect: {
      name: 'Software Architect',
      description: 'Designs system architecture and provides guidance',
      phases: ['brainstorming', 'architecture', 'development'],
    },
  });

  log('Initialized BMAD configuration and registries');

  return {
    success: true,
    data: {
      message: 'BMAD Framework plugin installed successfully',
    },
  };
}
