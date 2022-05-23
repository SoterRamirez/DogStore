//The Dog API
const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=4";
const API_URL_FAVORITE = "https://api.thedogapi.com/v1/favourites";
const API_URL_FAVORITE_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=`;
const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";
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
    const response = await fetch(API_URL_FAVORITE, {
        method: "GET",
        headers: {
            'X-API-KEY': 'ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2',
        },
    });
    const data = await response.json();
    console.log("Load Favorite Dog");
    console.log(data);
    if (response.status !== 200) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
    } else {
        const article = document.getElementById("favoritesDogos")
        article.innerHTML = "";
        data.forEach(dogo => {
            //Getting the image from the html file.
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
            //Setting the source of the image to the url of the image.
            a.appendChild(div);
            div.appendChild(strong);
            strong.appendChild(strongText);
            a.appendChild(img);
            a.appendChild(h5);
            h5.appendChild(h5Text);
            article.appendChild(a);
            img.src = dogo.image.url;
            a.onclick = () => deleteFavoriteDog(dogo.id);
        });
    }
}
//Save Favorite Dog Image
async function saveFavoriteDog(id) {
    const response = await fetch(API_URL_FAVORITE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': 'ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2',
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
    }else{
        console.log("Guardado");
        loadFavoriteDog();
    }
}
//Delete Favorite Dog Image
async function deleteFavoriteDog(id) {
    const response = await fetch(API_URL_FAVORITE_DELETE(id), {
        method: "DELETE",
        headers: {
            'X-API-KEY': 'ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2',
        },
    });
    const data = await response.json();
    if (response.status !== 200) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
    }else{
        console.log("Eliminado");
        loadFavoriteDog();
    }
}
//Upload Image Dog API
async function uploadDogPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)
    console.log(formData.get("file"))
    const response = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            'X-API-KEY': 'ae4e08e8-4f4c-4f0b-8159-98b33b9d46f2',
        },
        body: formData,
    })
    const data = await response.json();
    if (response.status !== 201) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
        console.log('Error')
        console.log({data})
    }else {
        console.log('Foto de Perrito subida')
        console.log({ data })
        console.log(data.url)
        saveFavoriteDog(data.id)
        console.log('Fin de la función')
    }
}
//Preview image
document.getElementById("file").onchange = function (e) {
  // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
  // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
        let preview = document.getElementById("preview"),
        image = document.createElement("img");
        image.classList.add("w-20", "h-20", "rounded-full", "shadow-sm");
        image.src = reader.result;
        preview.innerHTML = "";
        preview.append(image);
    };
};

loadRandomDog();
loadFavoriteDog();