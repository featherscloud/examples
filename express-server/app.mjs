import express from 'express';
import cors from 'cors';
import { createVerifier } from '@featherscloud/auth';

const verifier = createVerifier({
  appId: '<app-did>'
});

const app = express();

app.use(cors());
app.get('/', async (req, res) => {
  try {
    const header = req.get('Authorization');
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

app.listen(3030, '127.0.0.1', () =>
  console.log('Server running on http://localhost:3030')
);
