const mongoose = require("mongoose");
const app = require('./server.js')
const port = process.env.PORT || 80000; 

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(port, () => {
        console.log(`Server is running on port https://localhost:${port}/api`);
    }));

