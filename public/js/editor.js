//med querySelector kan man hitta html element, man kan referera till html element i javascript koden
const blogTitleField = document.querySelector(".title");
const articleFeild = document.querySelector(".article");

// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");

/* const uploadInput = document.querySelector("#image-upload"); */

//.addEventListner funktionen kommer bli kallad när det särskilda eventet change händer bannerimage.

//change sker by slecting a file in the file picker for <input type="file"> target(bannerImage).addEventListner(type, listener). När change sker så utförs funktionen uploadImage
bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});

/* uploadInput.addEventListener("change", () => {
  uploadImage(uploadInput, "image");
}); */

//File API får tillgång till den valda filen med DOM selector. för att kunna ladda upp en bild måste det finnas en filen och typen av filen måste inkluderar stringen image

//an array containing one object, [0], destruct the array så vi får ut objektet.

//files is a filelist of the file(s) selected by the user in the input. ger namnet på filen utan väg information och kan användas för att få tillgång till filerna.
const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formdata = new FormData();
    formdata.append("image", file);

    //fetch returns an object as promise, that contains information

    //When the request completes, the promises is resolved with the .then method
    fetch("/upload", {
      method: "post",
      body: formdata,
    })
      //.then also returns a promise, a promise represents an operation that hasn't completed yet.
      //om upload svarar så svarar den med json data av bilden. Om datan finns så kontrollerars den att den är av typen banner. .then väntar på att fetch requesten och på svar ska bli lyckad.
      // returns the body as promise with json content
      //Because the .then keyword is present, the asynchronous function is paused å körs i bakgrunden until the request completes.
      //response.json() returns a promise resolved to a JSON object

      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "banner") {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url("${bannerPath}")`;
        }
      });
    //om något annat än en bild laddas upp visas det här
  } else {
    alert("upload Image only");
  }
};

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

publishBtn.addEventListener("click", () => {
  //om någon har skrivit något i artikel och även i titlen så utförs publiceringen. Om fälten har någon längd
  //value är till för att få inputen från användaren
  if (articleFeild.value.length && blogTitleField.value.length) {
    // skapar ett id för varje blogsida
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let blogTitle = blogTitleField.value.split(" ").join("-");
    //split delar upp titeln i en array(ord för ord) och sedan joinar den med - emellan orden
    let id = "";
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    // setting up docName
    let docName = `${blogTitle}-${id}`;
    let date = new Date(); // for published at info

    //access firstore with db variable; Här skapar vi vår databas blogs. .set skapar ett nytt dokument i firestore(databasen)
    db.collection("blogs")
      .doc(docName)
      .set({
        title: blogTitleField.value,
        article: articleFeild.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      //skickar tillbaka ett löfte och utför följande beroende på om löftet höll eller inte
      .then(() => {
        //fulfillment, href property sets the entire URl of the current page.
        location.href = `/${docName}`;
      })
      //rejection
      .catch((err) => {
        console.error(err);
      });
  }
});
