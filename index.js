// Link
//
// https://api.nytimes.com/svc/topstories/v2/home.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX

console.log("salem alem");
// const articlesFromApi = [
//   {
//     id: 1,
//     title:
//       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//   },
//   {
//     id: 2,
//     title: "qui est esse",
//     body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//   },
//   {
//     id: 3,
//     title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
//   },
// ];

// const articleExample = `
//     <div id="article" class="d-flex justify-content-around m-5">
//         <div class="me-5">

//             <p>Authors name</p>
//             <p id="title"></p>
//             <p id="body"></p>
//         </div>
//         <img src="/images/Img.png" alt="picture" />
//     </div>
// `;

// console.log(articles);

// articlesFromApi.forEach((element) => {
//   let newArticle = articleExample.replace(
//     'id="title">',
//     `id="title">${element.title}`
//   );

//   newArticle = articleExample.replace(
//     'id="body">',
//     `id="body">${element.body}`
//   );

//   articles.innerHTML += newArticle;
// });

// function loadArticles() {
//   const promiseArticle = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(articlesFromApi), 2000);
//   });

//   promiseArticle.then((result) => {
//     console.log(result);
//     result.forEach((element) => {
//       let newArticle = articleExample.replace(
//         'id="title">',
//         `id="title">${element.title}`
//       );

//       newArticle = articleExample.replace(
//         'id="body">',
//         `id="body">${element.body}`
//       );

//       articles.innerHTML += newArticle;
//     });
//   });
// }

// loadArticles();

const imgs = [];

const articleSample = `
    <div id="article" class="d-flex justify-content-between m-5">
        <div id="textPart" class="d-flex flex-column justify-content-between align-items-start pb-1">
          <div class="">
            <p id="authorsName"></p>
            <p>in</p>
            <p id="topicsName"></p>
            <p id="publishedDate"></p>
          </div>
          <h2 id="title"></h2>
          <p id="body"></p>
          <div id="details" class="d-flex w-50 justify-content-between">
            <p id=""></p>
            <p id=""></p>
            <p>Selected to you</p>
          </div>
        </div>
        <img src="" alt="picture" />
    </div>

`;

function createArticles(product) {
  return `
  <div id="article" class="d-flex justify-content-between mt-0 ms-5 border-bottom border-2 px-0" >
      <div id="textPart" class="d-flex flex-column justify-content-between g-5
      align-items-start pb-1">
        <div class="d-flex justify-content-around w-50 bg-primary">
          <p id="authorsName" class="">${product.byline}</p>
          <p class="text-secondary">in</p>
          <p id="topicsName">${product.section}</p>
          <p>·</p>
          <p id="publishedDate">${product.published_date}</p>
        </div>
        <div>
          <h4 id="title">${product.title}</h4>
          <p id="body">${product.abstract}</p>
        </div>       
        <div id="details" class="d-flex w-50 justify-content-between">
          <p id="">${product.source}</p>
          <p id=""></p>
          <p>Selected to you</p>
        </div>
      </div>
      <img class="img-thumbnail w-25 h-25" src="${product.media[0]["media-metadata"][1].url}" alt="picture" />
  </div>

`;
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  // container.innerHTML += createArticles()
  fetch(
    "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX"
  )
    .then((result) => {
      // if (!result.ok) {
      //   throw new Error("Ошибка загрузки");
      // }
      return result.json();
    })
    .then((data) => {
      data.results.splice(0, 3).forEach((element) => {
        console.log(element);
        container.innerHTML += createArticles(element);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});
