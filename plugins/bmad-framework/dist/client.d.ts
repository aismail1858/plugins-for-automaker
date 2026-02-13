/**
 * BMAD-METHOD Framework Plugin - Client Entry Point
 *
 * Client-side code for the BMAD plugin that provides UI components
 * for visualizing BMAD phases and personas.
 */
/**
 * Plugin client activation
 */
export declare function activate(context: any): Promise<void>;
/**
 * Plugin client deactivation
 */
export declare function deactivate(): Promise<void>;
/**
 * Export client plugin
 */
export declare const clientPlugin: {
    name: string;
    version: string;
    activate: typeof activate;
    deactivate: typeof deactivate;
};
declare const _default: {
    activate: typeof activate;
    deactivate: typeof deactivate;
};
export default _default;
//# sourceMappingURL=client.d.ts.map