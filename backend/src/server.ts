import app from './app';

const port: Number = parseInt(<string>process.env.PORT, 10) || 3333;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

export default app;
