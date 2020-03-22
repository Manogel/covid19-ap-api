import app from './app';
const cors = require('cors')

app.use(cors())
app.listen(process.env.PORT);
