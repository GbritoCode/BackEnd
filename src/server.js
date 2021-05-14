import app from './app';

app.listen(process.env.APP_PORT, () => console.log(process.env.MONGO_URL));
