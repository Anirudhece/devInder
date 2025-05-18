import express from 'express';
const app = express();

app.use('/new', (req, res) =>
    res.status(200).send({ msg: 'hellow from server' })
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});