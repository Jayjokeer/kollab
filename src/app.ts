import express from 'express';
import ideasRoutes from './routes/ideas.routes';
import kollabsRoutes from './routes/kollab.routes';
import globalErrorHandler from './errors/error-handler';

const app = express();

app.use(express.json());
app.use('/ideas', ideasRoutes);
app.use('/kollabs', kollabsRoutes);
app.use(globalErrorHandler);

export default app;
