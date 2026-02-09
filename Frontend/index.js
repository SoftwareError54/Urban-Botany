const app = require('express')();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Backend running');
// });


app.get('/', (req, res) =>
    res.json({ message: 'Welcome to Urban Botany!' })
);

const port = process.env.PORT || 5173;

app.listen(port, () => console.log(`Listening on port ${port}`));
