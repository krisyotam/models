import { query } from '$app/server';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { flattenModelsDev } from '$lib/models/flatten';
import type { ModelRow, ModelsDevApi } from '$lib/models/types';

let cachedRows: ModelRow[] | undefined;

function loadModelRows(): ModelRow[] {
	const filePath = resolve('static/api.json');
	const raw = readFileSync(filePath, 'utf-8');
	const api = JSON.parse(raw) as ModelsDevApi;
	return flattenModelsDev(api);
}

export const getModelRows = query(async () => {
	cachedRows ??= loadModelRows();
	return cachedRows;
});
