const get = async (key: string) => {
	const response = await fetch(`${process.env.KV_REST_API_URL}/pipeline`, {
		headers: {
			Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
		},
		body: `[["GET", "${key}"]]`,
		method: 'POST',
	});
	const data = await response.json();
	return data[0].result;
}

const set = async (key: string, value: string | number | boolean | object , expire: number = 0 ) => {
	// put "" around value if it is a string
	if (typeof value === "string") {
		value = `"${ value }"`
	}

	// request to the vercel kv http api
	await fetch(`${process.env.KV_REST_API_URL}/pipeline`, {
		headers: {
			Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
		},
		body: `[["SET", "${key}", ${ value }${ expire !== 0 ? `, "EX", ${expire}` : "" }]]`,
		method: 'POST',
	});
}

const del = async (key: string) => {
	await fetch(`${process.env.KV_REST_API_URL}/pipeline`, {
		headers: {
			Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
		},
		body: `[["DEL", "${key}"]]`,
		method: 'POST',
	});
}


export default {
	get,
	set,
	del,
}

