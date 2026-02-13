/**
 * BMAD Plugin - On Enable Hook
 *
 * Called when the BMAD plugin is enabled by the user.
 */
// Simple logger
function log(message, ...args) {
    // Use process.stdout.write or globalThis.console if available
    if (typeof globalThis.console !== 'undefined') {
        globalThis.console.log(`[BMAD Framework] ${message}`, ...args);
    }
}
/**
 * On enable hook handler
 */
export async function onEnable(context) {
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
