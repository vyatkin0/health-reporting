const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// backend URL
const backend = (isDevMode && process.env.REACT_APP_BACKEND) || 'https://backend-dot-health-reporting.ew.r.appspot.com';

export function formFetch(userId: string, data: FormData, apiPath: string) {
    return doFetch(backend + apiPath, userId, 'POST', data);
}

export function postFetch(userId: string, body: Record<string, unknown>, apiPath: string) {
    return doFetch(backend + apiPath, userId, 'POST', JSON.stringify(body), true);
}

export function putFetch(userId: string, body: Record<string, unknown>, apiPath: string) {
    return doFetch(backend + apiPath, userId, 'PUT', JSON.stringify(body), true);
}

export function getFetch(userId: string, apiPath: string) {
    return doFetch(backend + apiPath, userId, 'GET');
}

export function deleteFetch(userId: string, apiPath: string) {
    return doFetch(backend + apiPath, userId, 'DELETE');
}

async function doFetch(url: string, userId: string, method: string, body?: BodyInit | null, json?: boolean) {

    const headers: HeadersInit = json ? {
        'X-User': userId,
        'Content-Type': 'application/json',
    } : {
        'X-User': userId,
    }

    const request: RequestInit = {
        mode: backend ? 'cors' : 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        method,
        headers,
        body,
    };

    const response = await fetch(url, request);

    if (response.ok) {
        return response.json();
    } else {
        let error;
        if (response.status === 404) {
            try {
                error = await response.json();
            }
            catch {
            }
        }
        
        if(error)
        {
            throw new Error(error.error);
        }

        throw new Error(await response.text());
    }
}
