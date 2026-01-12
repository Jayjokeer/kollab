import express from 'express';
import ideasRoutes from './routes/ideas.routes';
import kollabsRoutes from './routes/kollab.routes';

const app = express();

app.use(express.json());
app.use('/ideas', ideasRoutes);
app.use('/kollabs', kollabsRoutes);

export default app;
