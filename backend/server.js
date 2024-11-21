const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

const authRouter = require('./routes/auth_router');
const seminarRouter = require('./routes/seminar_router');
const userRouter = require('./routes/user_router');
const errorHandler = require('./middlewares/error_hander');
const expressListRoutes = require('express-list-routes');
const cors = require('cors'); 

app.use(cors());

app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');  // CORP header
  res.setHeader('Access-Control-Allow-Origin', '*');              // CORS header

  // Detect file extension and set appropriate content type
  const extension = path.extname(req.url).toLowerCase();
  if (extension === '.png') {
      res.setHeader('Content-Type', 'image/png');
  } else if (extension === '.jpg' || extension === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
  }
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));
app.use('/', express.static('./public/dist'));
app.use(express.json());

app.use(authRouter);
app.use(seminarRouter);
app.use(userRouter);
app.use(errorHandler);
expressListRoutes(app);

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/dist', 'index.html'));
});


const cron = require('node-cron'); // Ensure the correct module is imported
const { checkAndSendReminders } = require('./utils/getUpdated');
cron.schedule('0 12 * * *', () => {
  console.log("Running the reminder check...");
  checkAndSendReminders()
});

app.listen(port, () => {
  console.log('server listening on port', port);
});
