function errorHandler (err) {
  console.error(err)
  res.status(500).send('An error occurred')
}
app.use(errorHandler);


function errorHandler(err) {
    console.error(err);
    res.status(500).send('recipe not found');
}
app.use(errorHandler);