const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./src/auth/routes.js')
app.use(cors());
app.use(express.json())
app.use(routes);

module.exports = {
    app: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Listining on port ${PORT}`))
    }
}