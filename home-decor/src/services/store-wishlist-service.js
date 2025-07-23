const BASE_URL = 'http://localhost:8080/api/store-wishlist';

export async function addToStoreWishlist(item) {
    const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to add to wishlist');
    return res.json();
}

export async function removeFromStoreWishlist(username, productId) {
    const res = await fetch(`${BASE_URL}/remove?username=${username}&productId=${productId}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to remove from wishlist');
}

export async function getStoreWishlist(username) {
    const res = await fetch(`${BASE_URL}/${username}`, {
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
}
