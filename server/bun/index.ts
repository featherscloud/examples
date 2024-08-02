import { createVerifier } from '@featherscloud/auth';

const appId = '<your-app-id>';
const verifier = createVerifier({ appId });

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*'
};

const server = Bun.serve({
  port: 3030,
  async fetch(request) {
    // Handle CORS preflight request
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 200,
				headers
			});
		}
	
		try {
			const header = request.headers.get('Authorization');

			if (!header) {
				throw new Error('Invalid Authorization header');
			}

			// Verify the Authorization header and get the user information
			const { user } = await verifier.verifyHeader(header);

			if (!user) {
				throw new Error('Cloud auth user not found')
			}

			const body = {
				message: `Hello ${user.email} from BunJS!`
			};
	
			return Response.json(body, {
				status: 200,
				headers
			});
		} catch (error) {
			return Response.json({ error: (error as any).message }, {
				status: 400,
				headers
			});
		}
  },
});

console.log(`BunJS application ${appId} listening on http://localhost:${server.port}`);
