const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config( { path: './config.env' } );


 //setting express app
const app = express();

//connect to mongodb
const dbURI = process.env.dbURI;
console.log(dbURI)
mongoose.connect(dbURI,{useNewUrlParser: true , useUnifiedTopology: true})
.then((result)=>{
    console.log('connected to db')
    //listen for requests in 3000 port 
    console.log(process.env.PORT)
    app.listen(process.env.PORT||3000);
})
.catch((err)=>{
    console.log(err)
})
//register viwe engine

app.set('view engine','ejs')
// app.set('views','myviews')

// middle ware for static files
 
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//to console log the type
app.use(morgan('dev'));

//mongoode and mongo sandbox routes
// app.get('/add-blog',(req,res)=> {
//     const blog = new Blog({
//         title:'New Blog 2',
//         snippet:'trying to create a blog from models',
//         body:'rfvdfghixcbbckjsbckascblkascbasjhvcashcvascascknkkln'
//     });
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById("63d263cd054bed6b582ac208")
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })


//routes

app.get('/',(req,res)=>{
    res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    // res.send('<p>About Page</p>');  
    res.render('about',{title:'About'});
});

//blog routes

// app.get('/blogs',(req,res)=>{
//     Blog.find().sort({createdAt:-1})
//     .then((result)=>{
//         res.render('index',{title:'All Blogs',blogs:result})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.post('/blogs',(req,res)=>{
//     const blog =  new Blog(req.body)
//     blog.save()
//     .then((result)=>{
//         res.redirect('/blogs')
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })
// app.get('/blogs/create',(req,res)=>{
//     res.render('create',{title:'Create'})
// })

// app.get('/blogs/:id',(req,res)=>{
//     const id = req.params.id
//     console.log(id)
//     Blog.findById(id)
//     .then((result)=>{
//         res.render('details',{blog:result,title:'Blog details'})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.delete('/blogs/:id',(req,res)=>{
//     const id =req.params.id;
//     Blog.findByIdAndDelete(id)
//     .then((result)=>{
//         res.json({redirect :'/blogs'})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

//blog routes
app.use('/blogs',blogRoutes);
// app.use(multer({
//     dest: blogRoutes
//   }));
  
//404 error

app.use((req,res)=>{
    res.status(404).render('404' , {title:"404"});
})