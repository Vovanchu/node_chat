import client from './src/db/db.js';
import './src/model/User.model.js';
import './src/model/Message.model.js';
import './src/model/Room.model.js';

await client.sync({ force: true });

// eslint-disable-next-line no-console
console.log('Database synced');
process.exit(0);
