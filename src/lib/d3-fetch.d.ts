declare module 'd3-fetch' {
	export function csv<T extends object>(
		url: string,
		init?: RequestInit,
	): Promise<T[]>;
}
