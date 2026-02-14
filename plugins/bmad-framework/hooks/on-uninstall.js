/**
 * BMAD Plugin - On Uninstall Hook
 *
 * Called when BMAD plugin is uninstalled.
 */

async function onUninstall(context) {
  console.log('[BMAD Plugin] Running uninstall hook...');

  // Clean up BMAD configuration
  if (context.removePluginConfig) {
    await context.removePluginConfig('bmad-framework');
  }

  // Clean up any BMAD-specific data
  if (context.storage) {
    try {
      await context.storage.clear();
      console.log('[BMAD Plugin] Cleared plugin storage');
    } catch (error) {
      console.warn('[BMAD Plugin] Failed to clear storage:', error);
    }
  }

  console.log('[BMAD Plugin] Uninstallation complete');
}

module.exports = { onUninstall };
