import express from 'express';
import path from 'path';
import compression from 'compression';

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../frontend', 'public')));

app.get('/api/test', (req, res) => {
	res.json({test: 'test2'});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend', 'public', 'index.html'));
});

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
