(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');

    let searchedForText;

    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 0e35f9d9e1490d2e4b10103d1fd490ab8d05ce957093628a450f07a05ce251a0');
        unsplashRequest.send();

        const nyRequest = new XMLHttpRequest();
        nyRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4ef79e2539834804a123dd8fdd38a113`);
        nyRequest.onload = addArticle;
        nyRequest.send();

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

            if (data && data.results && data.results[0]) {
                const firstImage = data.results[0];
                htmlContent = `<figure>
                                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                                </figure>`;
            } else {
                htmlContent = 'No image available';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticle() {
            const ul = document.createElement('UL');
            const data = JSON.parse(this.responseText);
            // debugger;
            if (data && data.response.docs && data.response.docs[0]) {
                const docs = data.response.docs;

                docs.forEach(function(doc) {
                    const li = document.createElement('LI');
                    li.classList.add("article");
                    li.innerHTML = `<h2><a href="${doc.web_url}"> ${doc.headline.main}</a></h2>
                                      <p>${doc.snippet}</p>`;

                    ul.appendChild(li);
                });
                responseContainer.appendChild(ul);
            } else {
                responseContainer.insertAdjacentHTML('beforeend', 'No article available');
            }
        }
    });
})();
