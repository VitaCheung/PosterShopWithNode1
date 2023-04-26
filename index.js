// const { response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const { createConnection } = require("net");

//Mongo stuff
// const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const dbUrl = "mongodb+srv://testdbuser:Test123!!@cluster0.uahp1xm.mongodb.net/testdb?retryWrites=true&w=majority";

const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//setup public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extend: true}));
app.use(express.json());


var links=[
    {
        name: "Home",
        path:"/"
    },
    {
        name: "Posters",
        path: "/posters"
    },
    {
        name: "About",
        path: "/about"
    }
];

// var list=[
//     { }
// ];

//test Express app
app.get("/", async (request, response) => {
    //response.status(200).send("Test page again");
    response.render("index", { title: "Home", menu: links });
});

app.get("/posters", async (request, response) => {
    products = await getList();
    response.render("posters", { title: "Posters", menu: links, postersList: products });
});

app.get("/about", async (request, response) => {
    products = await getList();
    response.render("about", { title: "About", menu: links, postersList: products  });
});


//set up server listening
app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`);
});

//MONGO functions
async function connection(){
    await client.connect();
    db = client.db("testdb");
    return db;
}

async function getList() {
    await client.connect();
    db = client.db("testdb");
    var list = db.collection("posters").find({});
    return await list.toArray();
}


