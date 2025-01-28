const BASE_URL = 'http://localhost:3333';

export const fetcher = (url: string, init?: RequestInit) =>
	fetch(new URL(url, BASE_URL), init).then((res) => res.json());
