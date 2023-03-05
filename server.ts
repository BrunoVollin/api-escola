import app from './app';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// set hello world route
app.get('/', (req, res) => {

  res.send(`
  <!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
    <style>
      /* Add some basic styling */
      body {
        font-family: Arial, sans-serif;
        text-align: center;
      }
      h1 {
        color: blue;
      }
      p {
        color: gray;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is a beautiful HTML page!</p>
  </body>
</html>
  `);
})