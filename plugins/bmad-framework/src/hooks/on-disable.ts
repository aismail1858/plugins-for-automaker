/**
 * BMAD Plugin - On Disable Hook
 *
 * Called when the BMAD plugin is disabled by the user.
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
      keys(pattern: string): Promise<string[]>;
      delete(key: string): Promise<void>;
    };
  };
}

/**
 * On disable hook handler
 */
export async function onDisable(context: HookContext): Promise<HookResult> {
  log('Plugin disabled');

  // Clean up BMAD tracking data
  const keys = await context.api.storage.keys('bmad.feature.*');

  for (const key of keys) {
    await context.api.storage.delete(key);
  }

  log(`Cleaned up ${keys.length} feature tracking entries`);

  return {
    success: true,
    data: {
      cleanedEntries: keys.length,
    },
  };
}
