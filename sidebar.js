import { ICONS } from './icons.js';
import { newScramble } from './app.js';

export function caseId(c)    { return typeof c === 'string' ? c : (c.id    ?? c.label ?? c.name); }
export function caseLabel(c) { return typeof c === 'string' ? c : (c.label ?? c.name  ?? c.id);   }

const DEFAULTS = {
    title: 'Select cases',

    // (caseItem, lowercasedQuery) -> boolean
    search: (c, query) => caseLabel(c).toLowerCase().includes(query),

    // (a, b, lowercasedQuery) -> number. Prefix matches float to the top.
    sort: (a, b, query) => {
        const la = caseLabel(a).toLowerCase();
        const lb = caseLabel(b).toLowerCase();
        if (query) {
            const rank = (l) => (l.startsWith(query) ? 0 : 1);
            if (rank(la) !== rank(lb)) return rank(la) - rank(lb);
            return la.localeCompare(lb, undefined, { numeric: true });
        }
        return 0; // preserve order if no query
    },
};

function toggleCaseSelection(id, selected, select) {
    if (selected.has(id) && select !== true) {
        selected.delete(id);
        if (selected.size === 0) newScramble();
    }
    else if (select !== false) {
        selected.add(id);
        if (selected.size === 1) newScramble();
    }
    // if e.g. case is not selected, but we wanted to deselect, then do nothing.
}

// Renders the case-selection UI into `root`.
// config: { cases, title?, click?, search?, sort?, selected?, onChange?, onCollapse? }
export function fillSidebar(root, config) {
    const x        = { ...DEFAULTS, ...config };
    const cases    = x.cases ?? [];
    const selected = x.selected ?? new Set();
    let query      = '';

    root.innerHTML = `
        <div class="sidebar-inner">
            <header class="sidebar-head">
                <h2 class="sidebar-title"></h2>
                <button class="icon-btn sidebar-collapse" aria-label="Collapse sidebar">${ICONS.collapse}</button>
            </header>
            <div class="search-field">
                ${ICONS.search}
                <input type="text" id="case-search" placeholder="Search" autocomplete="off" spellcheck="false">
            </div>
            <div class="bulk-actions">
                <button class="bulk-btn" data-act="select"></button>
                <button class="bulk-btn" data-act="deselect"></button>
            </div>
            <div class="case-grid" id="case-grid"></div>
            <footer class="sidebar-foot"><span id="case-count"></span></footer>
        </div>`;

    const titleEl  = root.querySelector('.sidebar-title');
    const searchEl = root.querySelector('#case-search');
    const gridEl   = root.querySelector('#case-grid');
    const countEl  = root.querySelector('#case-count');
    const bulkBtns = root.querySelectorAll('.bulk-btn');

    titleEl.textContent = x.title;

    // Cases matching the current query, in display order.
    const visible = () => cases
        .filter(c => (query ? x.search(c, query) : true))
        .sort((a, b) => x.sort(a, b, query));

    const commit = () => {
        x.onChange?.(selected);
        render();
    };

    function render() {
        const shown = visible();

        gridEl.innerHTML = '';
        for (const c of shown) {
            const id  = caseId(c);
            const el  = document.createElement('button');
            el.className = 'case-tile' + (selected.has(id) ? ' selected' : '');
            el.dataset.id = id;
            el.innerHTML = `<span class="case-check">${ICONS.check}</span><span class="case-label"></span>`;
            el.querySelector('.case-label').textContent = caseLabel(c);
            gridEl.appendChild(el);
        }

        // Bulk actions narrow their scope to the visible subset while searching.
        bulkBtns[0].textContent = query ? 'Select these' : 'Select all';
        bulkBtns[1].textContent = query ? 'Deselect these' : 'Deselect all';

        countEl.textContent = `${selected.size} of ${cases.length} selected`;
    }

    gridEl.addEventListener('click', (e) => {
        const tile = e.target.closest('.case-tile');
        if (!tile) return;
        const c = cases.find(item => caseId(item) === tile.dataset.id);
        if (!c) return;

        if (x.click) {
            x.click(c, selected);
        } else {
            const id = caseId(c);
            toggleCaseSelection(id, selected);
        }
        commit();
    });

    root.querySelector('.bulk-actions').addEventListener('click', (e) => {
        const btn = e.target.closest('.bulk-btn');
        if (!btn) return;
        const scope = visible().map(caseId);
        scope.forEach(id => toggleCaseSelection(id, selected, btn.dataset.act === 'select'));
        commit();
    });

    searchEl.addEventListener('input', () => {
        query = searchEl.value.trim().toLowerCase();
        render();
    });

    root.querySelector('.sidebar-collapse').addEventListener('click', () => x.onCollapse?.());

    render();
}
