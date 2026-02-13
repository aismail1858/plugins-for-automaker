/**
 * BMAD Plugin - On Disable Hook
 *
 * Called when the BMAD plugin is disabled by the user.
 */
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
export declare function onDisable(context: HookContext): Promise<HookResult>;
export {};
//# sourceMappingURL=on-disable.d.ts.map