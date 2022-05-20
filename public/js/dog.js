//The Dog API
const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=4&api_key=ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2";
const API_URL_FAVORITE = "https://api.thedogapi.com/v1/favourites?api_key=ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2";
const spanError = document.getElementById("Error");
//Load Random Dog Image
async function loadRandomDog() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log("Load Random Dog");
    console.log(data);
    /*Status Code:*/
    if (response.status !== 200) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
    } else {
        /* Getting the image from the html file. */
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const img3 = document.getElementById("img3");
        const img4 = document.getElementById("img4");
        /* Saving button the image from the API. */
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");
        const btn4 = document.getElementById("btn4");
        /* Setting the source of the image to the url of the image. */
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        /* Saving the favorite dog image. */
        btn1.onclick = () => saveFavoriteDog(data[0].id);
        btn2.onclick = () => saveFavoriteDog(data[1].id);
        btn3.onclick = () => saveFavoriteDog(data[2].id);
        btn4.onclick = () => saveFavoriteDog(data[3].id);
    }
}
//Load Favorite Dog Image
async function loadFavoriteDog() {
    const response = await fetch(API_URL_FAVORITE);
    const data = await response.json();
    console.log("Load Favorite Dog");
    console.log(data);
    if (response.status !== 200) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
    } else {
        data.forEach(dogo => {
            const article = document.getElementById("favoritesDogos");
            const a = document.createElement("a");
            a.classList.add("block");
            const div = document.createElement("div");
            div.classList.add("flex","justify-center");
            const strong = document.createElement("strong");
            strong.classList.add("relative", "h-6", "px-4", "text-xs", "leading-6", "text-white", "uppercase", "bg-black");
            const strongText = document.createTextNode("Eliminar");
            const img = document.createElement("img");
            img.classList.add("object-cover", "w-full", "-mt-3", "h-96");
            const h5 = document.createElement("h5");
            h5.classList.add("mt-4", "text-sm", "text-black/90", "text-center");
            const h5Text = document.createTextNode("Adoptado");

            a.appendChild(div);
            div.appendChild(strong);
            strong.appendChild(strongText);
            a.appendChild(img);
            a.appendChild(h5);
            h5.appendChild(h5Text);
            article.appendChild(a);
            img.src = dogo.image.url;
        });
    }
}
//Save Favorite Dog Image
async function saveFavoriteDog(id) {
    const response = await fetch(API_URL_FAVORITE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    const data = await response.json();
    console.log("Save Favorite Dog");
    console.log(data);
    if (response.status !== 200) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
    }
}


loadRandomDog();
loadFavoriteDog();