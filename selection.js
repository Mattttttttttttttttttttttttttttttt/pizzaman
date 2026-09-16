const PREFIX = 'fto.';

// Restores the saved selection, dropping stale ids. Defaults to everything selected.
export function loadSelection(mode, allIds) {
    try {
        const raw = localStorage.getItem(PREFIX + mode);
        if (raw) {
            const saved = new Set(JSON.parse(raw));
            return new Set(allIds.filter(id => saved.has(id)));
        }
    } catch {
        // Corrupt or unavailable storage: fall back to the default below.
    }
    return new Set(allIds);
}

export function saveSelection(mode, selected) {
    try {
        localStorage.setItem(PREFIX + mode, JSON.stringify([...selected]));
    } catch {
        // Storage unavailable; selection stays in memory for this session only.
    }
}
