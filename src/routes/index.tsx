import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { getValue } from '../server/kv';

export default component$(() => {
	const key = useSignal("");
	const value = useSignal("");

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
