import app from './app';

app.listen(process.env.APP_PORT, () => {
  console.log(`listening port ${process.env.APP_PORT}`);
});
