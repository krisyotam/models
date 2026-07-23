import { query } from '$app/server';
import { loadModelRows } from '$lib/models/load';

/**
 * Optional remote refresh path. Initial page data comes from +page.server.ts
 * so the table is not blocked on experimental remote SSR.
 */
export const getModelRows = query(async () => {
	return loadModelRows();
});
