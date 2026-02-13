/**
 * BMAD Plugin - On Enable Hook
 *
 * Called when the BMAD plugin is enabled by the user.
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
        features: {
            getAll(): Promise<Array<{
                id: string;
                status: string;
            }>>;
        };
        storage: {
            set(key: string, value: unknown): Promise<void>;
        };
    };
}
/**
 * On enable hook handler
 */
export declare function onEnable(context: HookContext): Promise<HookResult>;
export {};
//# sourceMappingURL=on-enable.d.ts.map