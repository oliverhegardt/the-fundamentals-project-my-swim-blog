//importera alla paket
//importera express bibloteket, express är för servern
const express = require("express");
//gör så att vi kan jobba med filer och directory vägar
const path = require("path");
//importerar fileupload paketet
const fileupload = require("express-fileupload");

//skapar ett nytt directory(katalogväg) och namnet på den nya directoryn är public
let initial_path = path.join(__dirname, "public");

//ställa in servern, genom att ropa på express funktionen, skapar vi en applikation som gör det möjligt att starta vår server. express (); startar servern. vi skapar en express application
const app = express();

//här säger vi att node.js ska peka till public directory(filmappen) som innehåller statiska filer
app.use(express.static(initial_path));
app.use(fileupload());

//skapar rut till home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "home.html"));
});

//skapar ny rut  at localhost:3000/editor
//(request, respond) är webbläsaren och servern som pratar med varandra
app.get("/editor", (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
});

//upload link, rut för uppladdningar så de lägg i mappen upploads
// date object, so we can name upploaded images with timestamps. post sends data to the server
//addressen var jag vill få posten
app.post("/upload", (req, res) => {
  //kräver att det är bilder av typen img
  //image samm som i editor.js
  let file = req.files.image;
  //skaper ett date object så vi kan namnge uppladdade blider med tidstämpel
  let date = new Date();
  // image name
  let imagename = date.getDate() + date.getTime() + file.name;
  // makes upploaded image name unique, image uppload path
  //först läggs bilder här
  let path = "public/uploads/" + imagename;

  // skapa uppladdning, file api
  //file.mv a function to move the elsewhere on the server

  file.mv(path, (err, result) => {
    if (err) {
      throw err;
    } else {
      // our image upload path, in response send upploaded image path
      res.json(`uploads/${imagename}`);
    }
  });
});

app.get("/:blog", (req, res) => {
  res.sendFile(path.join(initial_path, "blog.html"));
});

app.use((req, res) => {
  res.json("404");
});

//för att få vår server att fungera/köra, vår app(server) lyssnar på port 3000 efter massa begäran(uppgifter) som den ska göra

app.listen("3000", () => {
  console.log("listening......");
});
