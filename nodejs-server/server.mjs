import { createServer } from 'node:http';
import { createVerifier } from '@featherscloud/auth';

const verifier = createVerifier({
  appId: '<app-did>'
});

const server = createServer(async (req, res) => {
  try {
    const header = req.headers['Authorization'];
    // Verify the Authorization header and get the user information
    const { user } = await verifier.verifyHeader(header);
    const response = {
      message: `Hello ${user.email}!`
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } catch (error) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

// Listen locally on port 3333
server.listen(3333, '127.0.0.1', () => {
  console.log('Listening on http://localhost:3333');
});
