require('dotenv').config()


// Require Libraries
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const bcrypt = require('bcrypt')



const { srcDir, rootDir } = require('./src/utils/path-helper')
const PORT = 3000


const app = express()
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))

// Creating a db store
const store = new MongoDBStore({
    uri: 'mongodb+srv://neo:neo1414@visits.uead1xj.mongodb.net/?retryWrites=true&w=majority',
    collection: 'users'
})

app.set('view engine', 'ejs')
app.set('views', path.join('./src/views'))

// Using the session
app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    store: store
}))


/////////////
// Routes
/////////////
const authRouter = require('./src/routers/auth.router')
const visitsRouter = require('./src/routers/visits.router')
const usersRouter = require('./src/routers/users.router')

// Index Route
app.get('/', (req, res) => {
    const session = req.session.isLoggedIn
    if(session){
        res.render('index.ejs', {session: session});
    }else{
        res.render('login', {session: session})
    }
})

// Implement Authentication Router
app.use('/auth', authRouter)

// Implement Visits Router
app.use('/visits', visitsRouter)

// Implement Users Router
app.use('/users', usersRouter)


// catch route middlewares
app.use((req, res, next) => {
    const session = req.session.isLoggedIn
    res.status(400).render('404', {session: session})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})