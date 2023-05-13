import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead, server$ } from '@builder.io/qwik-city';
import kv from '../scripts/kv';

export default component$(() => {
	const key = useSignal("");
	const value = useSignal("");
	const didKeyChange = useSignal(false);

	useTask$(async ({ track }) => {
		track(() => key.value);
		console.log(key.value);
		value.value = await server$(async () => await kv.get(key.value))();
		didKeyChange.value = true;
	})

	useTask$(async ({ track }) => {
		track(() => value.value);
		console.log(value.value);
		if (didKeyChange.value) {
			didKeyChange.value = false;
		} else {
			await server$(async() => await kv.set(key.value, value.value))();
		}
	})

	return (
		<>
			<input type="text" bind:value={key} class="border-black border-2" />
			<br/>
			<input type="text" bind:value={value} class="border-black border-2" />
			<br/>
			<button type="button" onclick$={server$(() => {console.log(process.env.TEST)})}>log</button>
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
