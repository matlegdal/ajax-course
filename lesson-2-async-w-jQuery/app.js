/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 0e35f9d9e1490d2e4b10103d1fd490ab8d05ce957093628a450f07a05ce251a0'
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4ef79e2539834804a123dd8fdd38a113`
        }).done(addArticle);

        function addImage(images) {
            const firstImage = images.results[0];
            const htmlContent = `<figure>
                                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                                </figure>`;
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)
        }

        function addArticle(articles) {
            const ul = document.createElement('UL');
            const docs = articles.response.docs;

            docs.forEach(function(doc) {
                const li = document.createElement('LI');
                li.classList.add("article");
                li.innerHTML = `<h2><a href="${doc.web_url}"> ${doc.headline.main}</a></h2>
                                <p>${doc.snippet}</p>`;
                ul.appendChild(li);
            });
            responseContainer.appendChild(ul);
        }
    });
})();
