/**
 * BMAD Plugin - On Install Hook
 *
 * Called when the BMAD plugin is first installed.
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
            set(key: string, value: unknown): Promise<void>;
        };
    };
}
/**
 * On install hook handler
 */
export declare function onInstall(context: HookContext): Promise<HookResult>;
export {};
//# sourceMappingURL=on-install.d.ts.map