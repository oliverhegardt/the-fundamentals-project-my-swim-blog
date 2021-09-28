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

  //tt.i= tt.i + d.t DOM
  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  //p.i = p.i + d.p
  publish.innerHTML += data.publishedAt;

  article.innerHTML = data.article;

  /* addArticle(article, data.article); */
};

//article.innerHTML = data.article;

/* 
const addArticle = (ele, data) => {
  data = data.split("\n").filter((item) => item.length);
  // console.log(data); */

/* data.forEach((item) => {
    // check for heading
    if (item[0] == "#") {
      let hCount = 0;
      let i = 0;
      while (item[i] == "#") {
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
    }
    //checking for image format
    else if (item[0] == "!" && item[1] == "[") {
      let seperator;

      for (let i = 0; i <= item.length; i++) {
        if (
          item[i] == "]" &&
          item[i + 1] == "(" &&
          item[item.length - 1] == ")"
        ) {
          seperator = i;
        }
      }

      let alt = item.slice(2, seperator);
      let src = item.slice(seperator + 2, item.length - 1);
      ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
    } else {
      ele.innerHTML += `<p>${item}</p>`;
    }
  });
}; */
