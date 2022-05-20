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
        /* Setting the source of the image to the url of the image. */
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
    }
}
//Load Favorite Dog Image
async function loadFavoriteDog() {
    const response = await fetch(API_URL_FAVORITE);
    const data = await response.json();
    console.log("Load Favorite Dog");
    console.log(data);
    /* Getting the image from the html file. */

}

loadRandomDog();
loadFavoriteDog();