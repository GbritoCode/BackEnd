import app from './app';

app.listen(process.env.APP_PORT, '0.0.0.0', () => {
  console.log(`listening port ${process.env.APP_PORT}`);
});
