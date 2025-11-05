const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(methodOverride('_method'));

// I used array as in-memory Storage

let posts = [
    {
        id: uuidv4(),
        title: "Welcome to SASTRA Connect!",
        content: "Hey everyone! This is the official space to share notes, ask questions, and collaborate. Feel free to introduce yourself and start discussions!",
        author: "Admin",
        subject: "General",
        comments: [
            { id: uuidv4(), content: "Excited to use this platform! 😄" },
            { id: uuidv4(), content: "Finally a place to share my notes!" }
        ]
    },
    {
        id: uuidv4(),
        title: "Node.js Routing Confusion",
        content: "Hi all, I’m struggling to understand RESTful routes in Node.js with Express. Can someone give a simple example of CRUD routes?",
        author: "Arshad",
        subject: "CS",
        comments: [
            { id: uuidv4(), content: "Sure! GET, POST, PUT, DELETE correspond to read, create, update, delete. Docs have examples too." },
            { id: uuidv4(), content: "You can check my GitHub repo, I have a small project showing this." }
        ]
    },
    {
        id: uuidv4(),
        title: "EEE Lab Circuit Simulation",
        content: "Hey guys, I need tips for simulating circuits for our lab assignments. What software do you recommend for accurate results?",
        author: "Priya",
        subject: "EEE",
        comments: [
            { id: uuidv4(), content: "Proteus is good for beginners." },
            { id: uuidv4(), content: "I always use Multisim, it makes debugging circuits easier." },
            { id: uuidv4(), content: "LTSpice is free and powerful if you’re okay with a learning curve." }
        ]
    },
    {
        id: uuidv4(),
        title: "Thermodynamics Notes Needed",
        content: "Hey everyone, can someone share notes or summaries for Thermodynamics chapters 3 and 4? Exams are coming up 😅",
        author: "Rahul",
        subject: "Mechanical",
        comments: [
            { id: uuidv4(), content: "I have a PDF, I can send it over." },
            { id: uuidv4(), content: "Check the lecture slides, they cover most of it." }
        ]
    },
    {
        id: uuidv4(),
        title: "Calculus 2: Definite Integrals",
        content: "I keep getting stuck on definite integrals in Calculus 2. Any tips on approaching them systematically?",
        author: "Sneha",
        subject: "Maths",
        comments: [
            { id: uuidv4(), content: "Break it into parts and use substitution method." },
            { id: uuidv4(), content: "Make sure to check limits after substitution!" },
            { id: uuidv4(), content: "Practice a few problems daily, it helps a lot." }
        ]
    },
    {
        id: uuidv4(),
        title: "CSE Project Idea Brainstorm",
        content: "Looking for project ideas for our final year. Preferably something related to web development or AI. Any suggestions?",
        author: "Vikram",
        subject: "CS",
        comments: [
            { id: uuidv4(), content: "You could make a note-sharing platform like this!" },
            { id: uuidv4(), content: "AI-based attendance tracker using face recognition is trending." }
        ]
    }
];


app.listen(port, (req, res) => {
    console.log(`The app is listening on port ${port}`)
});

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.delete("/posts/:id", (req, res) => {
        let { id } = req.params;
        posts = posts.filter((p) => {
            return p.id !== id;
        });
        res.redirect("/posts");
});

app.post("/posts/:id/comments", (req, res) => {
        let { id } = req.params;
        let post = posts.find((p) => {
            return p.id === id;
        });
        let newComment = req.body;
        console.log(newComment);
        newComment.id = uuidv4();
        console.log(newComment);
        post.comments.push(newComment);
        res.redirect(`/posts/${id}`);
})

app.post("/posts", (req, res) => {
    let { author, subject, title, content } = req.body;
    let newId = uuidv4();
    let newPost = {
        id: newId,
        title: title,
        content: content,
        author: author,
        subject: subject,
        comments: []
    }
    posts.push(newPost);
    res.redirect("posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => {
        return p.id === id;
    });

    res.render("show", { post });

});

app.get("/posts/:id/edit", (req, res) => {

    let { id } = req.params;
    let post = posts.find((p) => {
        return p.id === id;
    });
    res.render("edit", { post });
        
});

app.put("/posts/:id", (req, res) => {
    let newData = req.body;
    let { id } = req.params;
    let post = posts.find((p) => {
        return p.id === id;
    });
    post.author = newData.author;
    post.title = newData.title;
    post.content = newData.content;
    post.subject = newData.subject;
    res.redirect(`/posts/${id}`);
});

app.use((req, res) => {
    res.send("Page Not Found!");
});











