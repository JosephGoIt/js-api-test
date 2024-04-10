// Import SimpleLightbox and its CSS
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Constants for API URL and Key
const BASE_URL = "https://api.themoviedb.org";
const API_KEY = "9d52264b8376313698d7d20c165a8537";
const TRENDING_MOVIES_ENDPOINT = "/3/trending/movie/day";
const IMAGE_PATH_W300 = "https://image.tmdb.org/t/p/w300";
const IMAGE_PATH_W780 = "https://image.tmdb.org/t/p/w780";

// Function to fetch trending movies
const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}${TRENDING_MOVIES_ENDPOINT}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
};

// Function to create gallery items from fetched data
const createGalleryItems = (data) => {
    const galleryItems = [];
    console.log(data);

    data.results.forEach(item => {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery__item');

        galleryItem.innerHTML = `
            <a class="gallery__link" href=${IMAGE_PATH_W780}${item.poster_path}>
                <img
                    class="gallery__image"
                    src="${IMAGE_PATH_W300}${item.backdrop_path}"
                    alt="${item.overview}"
                />
            </a>
        `;

        galleryItems.push(galleryItem);
    });

    return galleryItems;
};

// Function to render gallery
const renderGallery = (galleryItems) => {
    const gallery = document.querySelector('.gallery');
    galleryItems.forEach(item => {
        gallery.appendChild(item);
    });
};

// Initialize SimpleLightbox after rendering gallery
const initializeLightbox = () => {
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250
    });
};

// Main function to fetch movies, create gallery items, render gallery, and initialize lightbox
const main = async () => {
    const trendingMoviesData = await fetchTrendingMovies();
    const galleryItems = createGalleryItems(trendingMoviesData);
    renderGallery(galleryItems);
    console.log(galleryItems);
    initializeLightbox();
};

// Call main function
main();
