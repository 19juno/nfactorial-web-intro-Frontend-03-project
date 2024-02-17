// Link
//
// https://api.nytimes.com/svc/topstories/v2/home.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX
// https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX

function createArticles(product) {
  return `
  <div id="article" style='height: 310px' class="d-flex justify-content-between border-bottom border-2 mb-5" >
    <div id="textPart" style='width: 755px' class="d-flex flex-column justify-content-around
      ">
        <div style='font-size: 14px ' class="d-flex justify-content-between align-items-start w-75  mt-0">
          <img src="./images/Img.png" alt="Author's picture" />
          <p id="authorsName" class="">${product.byline}</p>
          <p class="text-secondary">in</p>
          <p id="topicsName">${product.section}</p>
          <p>·</p>
          <p id="publishedDate">${product.published_date}</p>
        </div>
        <a class='article-anchor text-dark' style='text-decoration: none' data-id='${product.id}'>
          <h4 id="title">${product.title}</h4>
          <p style='font-size: 16px' id='body'>${product.abstract}</p>
        </a>       
        <div id='details' class="d-flex justify-content-between align-items-baseline w-75">
          <div style='font-size: 14px; width: 400px' class="d-flex justify-content-between g-5 align-items-baseline"> 
            <button style='font-size: 14px' class="btn btn-secondary btn-lg rounded-pill" id="button">${product.source}</button>
            <p class='text-secondary'>12 min read</p>
            <p class='text-secondary'>Selected to you</p>
          </div>
          <div class='d-flex justify-content-between' style='width: 100px'>
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

function createPost(product) {
  return `
  <div class="article">
          <div class="navbar">
            <div class="leftPart">
              <img class="avatar"      
                src="./images/Img.png"
                alt="Ava"
              />
              <div class="detail">
                <p id="Authors_name" class >${product.byline}</p>
                <div class="date text-secondary d-flex">
                  <p id="date">${product.published_date}</p>
                  <p>12 min read</p>
                  <p>Member only</p>
                </div>
              </div>
            </div>
            <div class="rightPart">
              <img src="./images/LinkedIn.png" alt="LinkedIn" />
              <img src="./images/Facebook Circled.png" alt="Facebook" />
              <img src="./images/Twitter.png" alt="Twitter" />
            </div>
          </div>

          <div class="postContainer">
            <div class="">
              <div class="title">${product.title}</div>
              <div class="description">${product.abstract}</div>
            </div>
            <img class="postImage" src=${product.media[0]["media-metadata"][1].url} alt="" />
            <div class="">
              <p id="subtitle"></p>
              <p id="text"></p>
            </div>
          </div>
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
      data.results.splice(0, 4).forEach((element) => {
        console.log(element);
        const myUrl = new URLSearchParams(window.location.href);
        if (window.location.pathname == "/index.html") {
          container.innerHTML += createArticles(element);
          const anchors = document.querySelectorAll(".article-anchor");
          anchors.forEach((anchor) => {
            if (anchor) {
              anchor.addEventListener("click", function () {
                idd = this.dataset.id;
                window.location.href = `article.html?id=${idd}`;
              });
            }
          });
        } else {
          const urlParams = new URLSearchParams(window.location.search);
          const idddd = urlParams.get("id");

          fetch(
            "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=aqZsj43Ra16S7xvfVZ25GcAotMD9qFnX"
          )
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              const container2 = document.getElementById("container2");
              const neededPost = data.results.find((item) => item.id == idddd);
              console.log(neededPost);
              console.log(neededPost.title);
              container2.innerHTML += createPost(neededPost);
            });
        }
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});
