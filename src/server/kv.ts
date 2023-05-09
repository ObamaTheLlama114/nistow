import { server$ } from '@builder.io/qwik-city';
import kv from '@vercel/kv';

export const getValue = server$(async (key: string): Promise<string> => {
	console.log(process.env.TEST);
	return await kv.get(key) || "";
})

export const setValue = server$(async (key: string, value: string) => {
	if (value === "") {
		await kv.del(key);
	} else {
		await kv.set(key, value);
	}
})
