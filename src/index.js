
import express from 'express';
import cors from 'cors';
import routes from './api/routes';

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const app = express();

app.use(routes);
app.use(cors());
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});