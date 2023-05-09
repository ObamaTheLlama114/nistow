import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead, server$ } from '@builder.io/qwik-city';
import kv from '@vercel/kv';

export default component$(() => {
	const key = useSignal("");
	const value = useSignal("");

	const getValue = server$(async (key: string): Promise<string> => {
		return await kv.get(key) || "";
	})

	//const setValue = server$(async (key: string, value: string) => {
	//	if (value === "") {
	//		await kv.del(key);
	//	} else {
	//		await kv.set(key, value);
	//	}
	//})

	useTask$(async ({ track }) => {
		track(() => key.value);
		value.value = await getValue(key.value);
	});

	//useTask$(async ({ track }) => {
	//	track(() => value.value);
	//	setValue(key.value, value.value);
	//});

	return (
		<>
			<input type="text" bind:value={key} />
			<br/>
			<input type="text" bind:value={value} />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
