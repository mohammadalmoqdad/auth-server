const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv');
const routes = require('./src/auth/routes.js')
const extra_routes = require('./extra-route.js');

app.use(cors());
app.use(express.static('./public'));
app.use(express.json())
app.use(routes);
app.use(extra_routes);

module.exports = {
    app: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Listining on port ${PORT}`))
    }
}