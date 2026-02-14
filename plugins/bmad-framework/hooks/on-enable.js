/**
 * BMAD Plugin - On Enable Hook
 *
 * Called when the BMAD plugin is enabled.
 */

async function onEnable(context) {
  console.log('[BMAD Plugin] Enabling BMAD framework...');

  // Register BMAD event listeners
  if (context.addEventListener) {
    // Listen for feature creation events
    context.addEventListener('feature.created', (feature) => {
      console.log(`[BMAD Plugin] Feature created: ${feature.id}`);
      // BMAD phase will be determined when feature execution starts
    });

    // Listen for feature start events
    context.addEventListener('feature.started', (feature) => {
      console.log(`[BMAD Plugin] Feature started: ${feature.id}`);
      // Initialize BMAD tracking for this feature
    });

    // Listen for phase transition events
    context.addEventListener('feature.phase_transition', (data) => {
      console.log(`[BMAD Plugin] Phase transition: ${data.fromPhase} -> ${data.toPhase}`);
    });
  }

  console.log('[BMAD Plugin] BMAD framework enabled');
}

module.exports = { onEnable };
