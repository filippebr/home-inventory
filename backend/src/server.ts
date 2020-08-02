import routes from './routes';

const port = process.env.PORT || 3333;

routes.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});