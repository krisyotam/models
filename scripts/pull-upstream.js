#!/usr/bin/env node

/**
 * Pulls fresh data from models.dev, then merges in custom models
 * defined in scripts/custom-models.json.
 *
 * Usage: node scripts/pull-upstream.js
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outPath = resolve(root, 'static/api.json');
const customPath = resolve(__dirname, 'custom-models.json');

async function main() {
	console.log('Fetching models.dev/api.json ...');
	const res = await fetch('https://models.dev/api.json');
	if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
	const api = await res.json();

	let customCount = 0;
	try {
		const custom = JSON.parse(readFileSync(customPath, 'utf-8'));
		for (const [providerId, entry] of Object.entries(custom)) {
			if (!api[providerId]) {
				console.warn(`  Provider "${providerId}" not in upstream, skipping`);
				continue;
			}
			for (const [modelId, model] of Object.entries(entry)) {
				api[providerId].models[modelId] = model;
				customCount++;
			}
		}
	} catch (e) {
		if (e.code !== 'ENOENT') throw e;
		console.log('  No custom-models.json found, using upstream only');
	}

	writeFileSync(outPath, JSON.stringify(api));

	const providers = Object.keys(api).length;
	let models = 0;
	for (const p of Object.values(api)) models += Object.keys(p.models).length;

	console.log(`Done: ${providers} providers, ${models} models (${customCount} custom)`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
