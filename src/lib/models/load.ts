import { flattenModelsDev } from './flatten';
import type { ModelRow, ModelsDevApi } from './types';
// Bundled into the server build — reliable on Vercel (static/ is not on the lambda disk)
import api from '$lib/data/api.json';

let cached: ModelRow[] | undefined;

/** Flatten + cache the models.dev catalog for server loaders. */
export function loadModelRows(): ModelRow[] {
	cached ??= flattenModelsDev(api as ModelsDevApi);
	return cached;
}
