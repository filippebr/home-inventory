import app from './app';

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

export default app;
