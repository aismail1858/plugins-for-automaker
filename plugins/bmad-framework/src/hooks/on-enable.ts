/**
 * BMAD Plugin - On Enable Hook
 *
 * Called when the BMAD plugin is enabled by the user.
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
    features: {
      getAll(): Promise<Array<{ id: string; status: string }>>;
    };
    storage: {
      set(key: string, value: unknown): Promise<void>;
    };
  };
}

/**
 * On enable hook handler
 */
export async function onEnable(context: HookContext): Promise<HookResult> {
  log('Plugin enabled');

  // Initialize BMAD tracking for all active features
  const features = await context.api.features.getAll();
  let trackedCount = 0;

  for (const feature of features) {
    if (feature.status !== 'completed') {
      // Track feature in BMAD framework
      await context.api.storage.set(`bmad.feature.${feature.id}`, {
        phase: 'brainstorming',
        persona: 'master',
        startTime: new Date().toISOString(),
      });
      trackedCount++;
    }
  }

  log(`Started tracking ${trackedCount} features`);

  return {
    success: true,
    data: {
      trackedFeatures: trackedCount,
    },
  };
}
