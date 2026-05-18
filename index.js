const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;

let unpatch;

module.exports = {
    onLoad() {
        try {
            const AccessibilityStore = findByProps(
                "setZoom",
                "updateFontScale"
            );

            if (!AccessibilityStore) {
                console.log("[UltraZoomOut] Failed to find zoom module");
                return;
            }

            unpatch = after(
                AccessibilityStore,
                "setZoom",
                (args) => {
                    const zoom = args[0];

                    if (zoom < 0.75) {
                        args[0] = 0.5;
                    }
                }
            );

            console.log("[UltraZoomOut] Loaded");
        } catch (e) {
            console.error("[UltraZoomOut]", e);
        }
    },

    onUnload() {
        if (unpatch) unpatch();

        console.log("[UltraZoomOut] Unloaded");
    }
};
