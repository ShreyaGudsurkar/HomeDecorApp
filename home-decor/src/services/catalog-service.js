const API_BASE = 'http://localhost:8080/api/catalog';

export function fetchCatalog() {
    return fetch(`${API_BASE}`).then((res) => res.json());
}

export function fetchByMain(main) {
    return fetch(`${API_BASE}/main?main=${main}`).then((res) => res.json());
}

export function fetchBySub(sub) {
    return fetch(`${API_BASE}/sub?sub=${sub}`).then((res) => res.json());
}

export function fetchByType(type) {
    return fetch(`${API_BASE}/type?type=${type}`).then((res) => res.json());
}

export function fetchByMainAndSub(main, sub) {
    return fetch(`${API_BASE}/combo?main=${main}&sub=${sub}`).then((res) => res.json());
}

export function fetchMainCategories() {
    return fetch(`${API_BASE}/distinct/main`).then((res) => res.json());
}

export function fetchSubCategories() {
    return fetch(`${API_BASE}/distinct/sub`).then((res) => res.json());
}

export function fetchTypes() {
    return fetch(`${API_BASE}/distinct/type`).then((res) => res.json());
}
