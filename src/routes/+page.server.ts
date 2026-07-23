import type { Config } from '@sveltejs/adapter-vercel';
import { loadModelRows } from '$lib/models/load';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 30 * 60,
		allowQuery: ['search', 'provider', 'sort', 'order']
	}
} satisfies Config;

export const load: PageServerLoad = async () => {
	const rows = loadModelRows();
	return { rows };
};
