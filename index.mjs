import path from 'path';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import home from './routes/home.get.mjs';

// Read .env
dotenv.config();

// Define error paths
const notFoundPath = path.join(path.resolve(''), 'public/404.html');

// Setup express app & middlewares
const app = express();
app.enable('trust proxy');

// Lib middlewares
app.use([
  // Helmet (Http Headers middleware)
  helmet(),
  // Morgan (Logging middleware)
  morgan('common'),
  // Parse and send url-encoded params/responses
  express.urlencoded({
    extended: true,
  }),
  // Parse and send JSON params/responses
  express.json(),
]);

// Declare routes

// GET
app.get('/', home);

// Static assets
app.get('/style.css', (_, res) => {
    const filepath = path.join(path.resolve(''), `public/style.css`);
    if (fs.existsSync(filepath)) {
        return res.setHeader("Content-Type", "text/css").sendFile(filepath);
    }
    return res.status(404).sendFile(notFoundPath);
});

// Files handler for direct downloads
app.get('/favicon.ico', (_, res) => {
    const filepath = path.join(path.resolve(''), `public/favicon.ico`);
    if (fs.existsSync(filepath)) {
        return res.sendFile(filepath);
    }
    return res.status(404).sendFile(notFoundPath);
});

// 404 Handler
app.use((_, res, _next) => {
    res.status(404).redirect("/")
})


// Start server
const port = process.env.PORT || 8889;
const host = process.env.HOST || '127.0.0.1';
app.listen(port, host, () =>
  console.log(`Listening at https://${host}:${port}`)
);
