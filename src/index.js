require('dotenv').config()


// Require Libraries
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')



const visitsRouter = require('./routers/visits.router')
const { srcDir, rootDir } = require('./utils/path-helper')
const PORT = 3000


const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))

app.use(express.static(srcDir, 'public'))
app.set('view engine', 'ejs')
app.set('views', path.join(srcDir, 'views'))


/////////////
// Routes
/////////////

// Index Route
app.get('/', (req, res) => {
    console.log(req.body);
    res.render('index.ejs');
})

// Implement Visits Router
app.use('/visits', visitsRouter)


// catch route middlewares
app.use((req, res, next) => {
    res.status(400).render('404')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})