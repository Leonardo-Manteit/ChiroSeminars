function loadToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    } else if (isExpired(token)) {
        return null;
    } else {
        return token;
    }
}

function isExpired(token) {
    const payload = extractPayload(token);
    return payload.exp < (Date.now() / 1000);
}

export function getUserFromLocalStorage() {
    const token = loadToken();
    if (token) {
        return extractPayload(token);
    } else {
        return null;
    }
}

// Function to extract and decode the payload from the JWT
function extractPayload(token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(window.atob(payload));
    return decodedPayload;
}


import { getNewToken } from "./auth_api";
// Function to update the token in localStorage

export async function updateToken(user) {
    try {
        let token = await getNewToken(user)
        localStorage.setItem('token', token)
        console.log('token update:', token)
    } catch (err) {
        console.log('undable to update:',err)
    }
}
