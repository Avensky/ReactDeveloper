const app = require('./app')

const keys = require('./config/keys');
// db
const mongoose = require('mongoose');
require('./models/User');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(connect => console.log('connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}


let db = mongoose.connection;
db.on('error', ()=>{
    console.error('Unable to connect MongoDB!')
});
db.once('open', ()=> {
    console.log('Connected to mongoDB!');
});

require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/accountRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>{
    if(!err)
        console.log('server started running on:' + PORT);
    else
        console.log('unable to start server');
});