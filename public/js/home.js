//hämta blogSection elementet med hjälp av DOM.
const blogSection = document.querySelector(".blogs-section");

//hämtar våra blogginlägg från vår databas som heter blogs, asynchronous call för att det kan ta tid att hämta inläggen så man fortfarande kan använda sidan. foreEach loop - för varje blogg i databasen skapa en blogg.
db.collection("blogs")
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      createBlog(blog);
    });
  });

//får ut datan av varje element
const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100)}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + "..."}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
};
