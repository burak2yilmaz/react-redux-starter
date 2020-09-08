export function resizeDetector(func) {
    const consoleDetector = () => {
        if (window.console)
            func();
    };

    window.addEventListener('resize', func);
    window.addEventListener('load', func);
    window.addEventListener('load', consoleDetector);

    return () => {
        window.removeEventListener('resize', func);
        window.removeEventListener('load', func);
        window.removeEventListener('load', consoleDetector);
    }
}