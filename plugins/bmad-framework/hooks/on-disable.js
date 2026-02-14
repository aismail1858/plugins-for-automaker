/**
 * BMAD Plugin - On Disable Hook
 *
 * Called when the BMAD plugin is disabled.
 */

async function onDisable(context) {
  console.log('[BMAD Plugin] Disabling BMAD framework...');

  // Unregister BMAD event listeners
  if (context.removeEventListener) {
    context.removeEventListener('feature.created');
    context.removeEventListener('feature.started');
    context.removeEventListener('feature.phase_transition');
  }

  console.log('[BMAD Plugin] BMAD framework disabled');
}

module.exports = { onDisable };
