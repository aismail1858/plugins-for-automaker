/**
 * BMAD-METHOD Framework Plugin
 *
 * Main server entry point for the BMAD plugin that integrates the BMAD framework
 * with Automaker's feature development workflow using the agent:enhancement extension point.
 */
import type { Plugin, PluginContext } from '@automaker/plugin-types';
/**
 * Plugin activation function
 */
export declare function activate(context: PluginContext): Promise<void>;
/**
 * Plugin deactivation function
 */
export declare function deactivate(): Promise<void>;
/**
 * Plugin export
 */
export declare const plugin: Plugin;
//# sourceMappingURL=index.d.ts.map