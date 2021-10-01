//få tillgång till blog ID från URL. .split("/") bildar en array så vi får bort / med en pop().
let blogId = decodeURI(location.pathname.split("/").pop());

//output exempel My-first-blog-post-wfuk

//skapar en väg till specifika dokument i firestore
let docRef = db.collection("blogs").doc(blogId);

//jQuery get(), docRef.get() är ett löfte, the get method loads data from the database. The then() method returns a promise
docRef.get().then((doc) => {
  if (doc.exists) {
    setupBlog(doc.data());
  } else {
    location.replace("/");
  }
});

//om dokumentet inte finns så skickas användaren tillbaka till framsidan

const setupBlog = (data) => {
  const banner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".title");
  const titleTag = document.querySelector("title");
  const publish = document.querySelector(".published");
  const article = document.querySelector(".article");

  //ändrar bannerns bakgrund till input bild

  banner.style.backgroundImage = `url(${data.bannerImage})`;

  //tt.i= tt.i + bt.i bt.i = d.t DOM exempel Blog: Streamline tt.i behöver vi inte hämta från databasen eftersom det står i html
  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  //p.i = p.i + d.p
  publish.innerHTML += data.publishedAt;

  article.innerHTML = data.article;
};
