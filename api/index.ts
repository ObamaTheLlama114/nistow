export const config = {
  runtime: 'edge',
};
 
export default (request: Request) => {
	console.log(process.env.TEST)
	return new Response(`Hello, from ${request.url} I'm now an Edge Function!`);
};
