/**
 * BMAD Plugin - On Install Hook
 *
 * Called when the BMAD plugin is installed.
 */

async function onInstall(context) {
  console.log('[BMAD Plugin] Running installation hook...');

  // Initialize default BMAD configuration
  const defaultConfig = {
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

  // Save default configuration if it doesn't exist
  if (context.savePluginConfig) {
    await context.savePluginConfig('bmad-framework', defaultConfig);
  }

  console.log('[BMAD Plugin] Installation complete');
}

module.exports = { onInstall };
