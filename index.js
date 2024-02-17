// Link
//
// https://api.nytimes.com/svc/topstories/v2/home.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX

console.log("salem alem");

// const articleSample = `
//     <div id="article" class="d-flex justify-content-between m-5">
//         <div id="textPart" class="d-flex flex-column justify-content-between align-items-start pb-1">
//           <div class="">
//             <p id="authorsName"></p>
//             <p>in</p>
//             <p id="topicsName"></p>
//             <p id="publishedDate"></p>
//           </div>
//           <h2 id="title"></h2>
//           <p id="body"></p>
//           <div id="details" class="d-flex w-50 justify-content-between">
//             <p id=""></p>
//             <p id=""></p>
//             <p>Selected to you</p>
//           </div>
//         </div>
//         <img src="" alt="picture" />
//     </div>

// `;

function createArticles(product) {
  return `
  <div id="article" style='height: 310px' class="d-flex justify-content-between border-bottom border-2 mb-5" >
    <div id="textPart" style='width: 755px' class="d-flex flex-column justify-content-around
      ">
        <div style='font-size: 14px' class="d-flex justify-content-around align-items-start w-75  mt-0">
          <img src="./images/Img.png" alt="Author's picture" />
          <p id="authorsName" class="">${product.byline}</p>
          <p class="text-secondary">in</p>
          <p id="topicsName">${product.section}</p>
          <p>·</p>
          <p id="publishedDate">${product.published_date}</p>
        </div>
        <a class='article-anchor' data-id='${product.id}'>
          <h4 id="title">${product.title}</h4>
          <p style='font-size: 16px' id='body'>${product.abstract}</p>
        </a>       
        <div id='details' class="d-flex justify-content-between align-items-baseline   w-75">
          <div style='font-size: 14px; width: 400px' class="d-flex justify-content-between g-5 align-items-baseline"> 
            <button style='font-size: 14px' class="btn btn-secondary btn-lg rounded-pill" id="button">${product.source}</button>
            <p id="">12 min read</p>
            <p>Selected to you</p>
          </div>
          <div>
            <img src="./images/Icon.png" alt="Square" />
            <img src="./images/Icon.png" alt="Square" />
            <img src="./images/Icon.png" alt="Square" />
          </div>
        </div>
      </div>
      <img class="" style=' height: 265px; border-radius: 4px' src="${product.media[0]["media-metadata"][1].url}" alt="picture" />
    </div>
  
`;
}
let idd = null;
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");

  fetch(
    "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX"
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      data.results.splice(3, 5).forEach((element) => {
        console.log(element);
        //console.log(index);
        container.innerHTML += createArticles(element);
        // document.getElementById("button").onclick = function () {   // здесь у меня переходило на другую страницу, но почему то выходило предупреждение
        //   window.location.href = "https://www.nytimes.com/";   // почему?
        // };
        const anchors = document.querySelectorAll(".article-anchor");
        console.log(anchors);
        anchors.forEach((anchor) => {
          anchor.addEventListener("click", function () {
            idd = this.dataset.id;
            alert("yes this is idd:" + idd);
            window.location.href = "article.html?id=" + idd;
            if (window.location.pathname === `/article.html?id=${idd}`) {
              console.log("this is the 2nd");
            }
          });
        });
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});
