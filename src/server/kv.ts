import { server$ } from '@builder.io/qwik-city';

export const getValue = server$(async (key: string): Promise<string> => {
	const kv = require('@vercel/kv');
	console.log(process.env);
	return await kv.get(key) || "";
})

export const setValue = server$(async (key: string, value: string) => {
	const kv = require('@vercel/kv');
	if (value === "") {
		await kv.del(key);
	} else {
		await kv.set(key, value);
	}
})
