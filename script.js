// Function to fetch data from API and create product cards
async function fetchProducts() {

// Create div for search container
const searchContainer = document.createElement('div');
searchContainer.id = 'searchContainer';
document.body.appendChild(searchContainer); 

// Create div for product container
const productContainer = document.createElement('div');
productContainer.id = 'product-container';
document.body.appendChild(productContainer); 

try{
    // Fetch data from API
    const response = await fetch('https://dummyjson.com/products?limit=15');
    const data = await response.json();

    // Get the product container element
    const productContainer = document.getElementById('product-container'); 

    // Clear previous products
    productContainer.innerHTML = '';

    // Set up grid layout
    productContainer.style.display = 'grid';
    productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';

    
// Iterate through each product and create a product card
data.products.forEach(product => {
    // Create a div for the product card
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.style.border = '1px solid #ccc';
    productCard.style.borderRadius = '5px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.width = '100%';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '2px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.marginTop = '20px';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '1 4px 8px rgba(0, 0, 0, 0.1)'; 
    productCard.style.fontFamily = 'Arial, sans-serif'; 
    productCard.style.backgroundColor = '#fff'; 

    // Hover effect
    productCard.addEventListener('mouseenter', function() {
        productCard.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; 
        productCard.style.transform = 'translateY(-2px)';
    });

    // Removing hover effect
    productCard.addEventListener('mouseleave', function() {
        productCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        productCard.style.transform = 'none';
    });

    // Create an image element for the main image (thumbnail)
    const mainImage = document.createElement('img');
    mainImage.src = product.thumbnail;
    mainImage.classList.add('main-image');
    mainImage.style.width = '100%'; 
    mainImage.style.height = '200px';

    productCard.appendChild(mainImage);

    // Create a div for the product title
    const title = document.createElement('div');
    title.classList.add('product-title');
    title.textContent = product.title;

    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.marginTop = '5px';
    title.style.textAlign = 'center'; 
    productCard.appendChild(title);

    // Create a div for the product price
    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = 'Rs. ' + product.price + "/-";
    price.style.marginBottom = '10px';
    price.style.color="grey";
    price.style.display = 'flex';
    price.style.justifyContent = 'center';
    price.style.textDecoration='line-through';
    productCard.appendChild(price);

    // Create a div for the discounted price
    const discountedPrice = document.createElement('div');
    const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);

    discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
    discountedPrice.style.display = 'flex';
    discountedPrice.style.justifyContent = 'center';
    discountedPrice.style.alignItems = 'center';
    discountedPrice.style.marginBottom = '10px';
    discountedPrice.style.fontWeight = 'bold';
    productCard.appendChild(discountedPrice);

    // Create a div for displaying the discount percentage
    const save = document.createElement('div');
    save.style.display = 'flex';
    save.style.justifyContent = 'center';
    save.style.alignItems = 'center';
    save.style.marginBottom = '10px';

    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Save ' + (product.discountPercentage) + '%';
    button.style.backgroundColor = "#FF9F00";
    button.style.fontSize='12px';
    button.style.color="white";
    button.style.padding="5px 10px";
    button.style.borderRadius="10%";

    // Append the button to the save div
    save.appendChild(button);

    // Append the save div to an existing element in the document
    productCard.appendChild(save);

    // Create a div for the image gallery
    const imageGallery = document.createElement('div');
    imageGallery.style.display = 'flex';
    imageGallery.style.flexWrap = 'wrap';
    imageGallery.classList.add('image-gallery');

    // Create image elements for the additional images
    product.images.forEach(imageUrl => {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.style.width = "50px";
        image.style.height = "80px";
        image.style.cursor = 'pointer';
        image.style.border = '1px solid #ccc';
        image.style.borderRadius = '5px';
        image.style.marginRight = '10px';
        image.style.objectFit = 'cover'; 
        imageGallery.appendChild(image);
    });
    imageGallery.style.marginBottom='10px';
    productCard.appendChild(imageGallery);

    // Create a div for the product rating
    const rating = document.createElement('div');
    rating.style.textAlign = 'center';
    if (product.rating >= 1 && product.rating <= 5) {
        for (let i = 0; i < product.rating; i++) {
            const star = document.createElement('span'); 
            star.textContent = "⭐";
            rating.appendChild(star);        
        }
    } 
    else {
        // Handle the case where the rating is out of range
        console.error('Invalid rating:', product.rating);
    }
    rating.style.marginBottom='10px';
    
    productCard.appendChild(rating);


// Create a button to show description
const showDescriptionBtn = document.createElement('button');
showDescriptionBtn.textContent = 'Show Description';
showDescriptionBtn.style.color = '#000';
showDescriptionBtn.style.border = '1px solid';
showDescriptionBtn.style.borderRadius = '4px';
showDescriptionBtn.style.width = '100%';
showDescriptionBtn.style.height = '5%';

// Add event listener to show description on button click
showDescriptionBtn.addEventListener('click', () => {
    // Toggle visibility of description
    description.style.display = 'block';
    showDescriptionBtn.style.display = 'none'; // Hide "Show Description" button
});
productCard.appendChild(showDescriptionBtn);

// Create a div for the product description
const description = document.createElement('div');
description.classList.add('description');
description.textContent = product.description;
description.style.display = 'none';
description.style.marginTop = '10px';
description.textAlign = 'center'; 
productCard.appendChild(description);

// Create a button to hide description
const lessDescriptionBtn = document.createElement('button');
lessDescriptionBtn.textContent = 'Less Description';
lessDescriptionBtn.style.color = '#000';
lessDescriptionBtn.style.border = '1px solid';
lessDescriptionBtn.style.borderRadius = '4px';
lessDescriptionBtn.style.padding = '10px 15px';
lessDescriptionBtn.style.marginTop = '20px';
lessDescriptionBtn.style.width = '70%';
lessDescriptionBtn.style.height = '7%';
lessDescriptionBtn.style.position = 'relative';
lessDescriptionBtn.style.left = '15%';

// Add event listener to hide description on button click
lessDescriptionBtn.addEventListener('click', () => {
    description.style.display = 'none';
    showDescriptionBtn.style.display = 'block'; 
});
description.appendChild(lessDescriptionBtn);

// Add to Cart Button
const addToCartButton = document.createElement("button");
addToCartButton.innerText = "Add to Cart";
addToCartButton.style.backgroundColor = "#007bff";
addToCartButton.style.color = "#fff";
addToCartButton.style.border = "none";
addToCartButton.style.borderRadius = "4px";
addToCartButton.style.marginTop = "20px";
addToCartButton.style.marginBottom = "20px";
addToCartButton.style.width = "100%";
addToCartButton.style.height = "5%";

// Add event listener for the add to cart button
addToCartButton.addEventListener('click', function () {
    console.log("Product added to cart: " + product.name);
});

productCard.appendChild(addToCartButton);
productContainer.appendChild(productCard);
});
} catch (error) {
    console.error('Error fetching products:', error);
}

}

// Call the fetchProducts function to fetch and display products initially
fetchProducts();



// Create search input field and button
const searchContainer = document.getElementById('searchContainer');
searchContainer.style.backgroundColor = '#442C2E';
searchContainer.style.width = '100%';
searchContainer.style.height = '20%';

// Create search input field
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'searchInput');
searchInput.setAttribute('placeholder', 'Search...');
searchInput.style.marginRight = '10px';
searchInput.style.padding = '2px';
searchInput.style.border = '2px solid #fff';
searchInput.style.borderRadius = '5px';
searchInput.style.fontSize = '16px';
searchInput.style.height = '30%';
searchInput.style.backgroundColor ='#7C2689';
searchInput.style.color ='#fff';
searchInput.style.height ='45%';
searchInput.style.width ='20%';

// Create search button
const searchButton = document.createElement('button');
searchButton.setAttribute('id', 'searchButton');
searchButton.textContent = 'Search';
searchButton.style.padding = '2px 5px';
searchButton.style.border = 'none';
searchButton.style.borderRadius = '5px';
searchButton.style.backgroundColor = '#007bff';
searchButton.style.color = '#fff';
searchButton.style.fontSize = '20px';
searchButton.style.cursor = 'pointer';
searchButton.style.width = '10%';
searchButton.style.height = '20%';
searchButton.style.backgroundColor ='#7C2689';

// Create clear button
const clearButton = document.createElement('button');
clearButton.setAttribute('id', 'clearButton');
clearButton.textContent = 'Clear';
clearButton.style.padding = '2px 5px';
clearButton.style.margin = '8px';
clearButton.style.border = 'none';
clearButton.style.borderRadius = '5px';
clearButton.style.backgroundColor = '#7C2689';
clearButton.style.color = '#fff';
clearButton.style.fontSize = '20px';
clearButton.style.cursor = 'pointer';
clearButton.style.width = '10%';
clearButton.style.height = '20%';

// Add event listener to clear button
clearButton.addEventListener('click', () => {
searchInput.value = '';
fetchProducts(); 
});

// Create sorting dropdown
const sortSelect = document.createElement('select');
sortSelect.setAttribute('id', 'sortSelect');

sortSelect.innerHTML = `
<option value="priceLowToHigh">Price Low To High</option>
<option value="priceHighToLow">Price High To Low</option>
<option value="ratingHighToLow">Rating High To Low</option>
`;

// Style the sorting dropdown
sortSelect.style.marginRight = '10px';
sortSelect.style.marginTop = '15px';
sortSelect.style.padding = '2px';
sortSelect.style.border = '1px solid #ccc';
sortSelect.style.borderRadius = '5px';
sortSelect.style.fontSize = '16px';
sortSelect.style.float = 'right'; 
sortSelect.style.position = 'absolute'; 
sortSelect.style.top = '0'; 
sortSelect.style.right = '0'; 
sortSelect.style.backgroundColor ='#7C2689';
sortSelect.style.color = '#fff';


// Append search input field and button to search container
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
searchContainer.appendChild(clearButton);
searchContainer.appendChild(sortSelect);


// Add event listener to the search button
searchButton.addEventListener('click', async () => {
const searchTerm = searchInput.value.trim(); // Get the search term from the input field

if (searchTerm !== '') {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
        const searchData = await response.json();
        renderProducts(searchData.products); // Render the products based on the search results
    } catch (error) {
        console.error('Error searching products:', error);
    }
} else {
    // If the search term is empty, fetch all products
    fetchProducts();
}
});

// Function to render products based on the provided data
function renderProducts(products) {
const productContainer = document.getElementById('product-container');
productContainer.innerHTML = ''; // Clear previous products

// Render each product
products.forEach(product => {
    // Create product card
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
});
}

// Function to fetch products based on search query
async function searchProducts(query) {
    try {
        // Fetch data from API based on search query
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim(); 

    if (query !== '') {
        const products = await searchProducts(query); // Fetch products based on search query
        renderProducts(products); 
    } else {
        // If search query is empty, show all products
        fetchProducts();
    }
});

// Function to render products based on the provided data
function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; 

    // Render each product
    products.forEach(product => {
        // Create product card
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);

// Function to create product card
function createProductCard(product) {
    // Create a div for the product card
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.style.border = '1px solid #ccc';
    productCard.style.borderRadius = '5px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.width = '100%';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '2px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.width = '100%';
    productCard.style.marginTop = '20px';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '1 4px 8px rgba(0, 0, 0, 0.1)'; 
    productCard.style.fontFamily = 'Arial, sans-serif'; 
    productCard.style.backgroundColor = '#fff'; 

    // Hover effect
    productCard.addEventListener('mouseenter', function() {
        productCard.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; 
        productCard.style.transform = 'translateY(-2px)';
    });

    // Removing hover effect
    productCard.addEventListener('mouseleave', function() {
        productCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        productCard.style.transform = 'none';
    });

    // Create an image element for the main image (thumbnail)
    const mainImage = document.createElement('img');
    mainImage.src = product.thumbnail;
    mainImage.classList.add('main-image');
    mainImage.style.width = '100%';
    mainImage.style.height = '200px';
    productCard.appendChild(mainImage);

    // Create a div for the product title
    const title = document.createElement('div');
    title.classList.add('product-title');
    title.textContent = product.title;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.marginTop = '5px';
    title.style.textAlign = 'center';
    productCard.appendChild(title);

    // Create a div for the product price
    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = 'Rs. ' + product.price + "/-";
    price.style.marginBottom = '10px';
    price.style.color = "grey";
    price.style.display = 'flex';
    price.style.justifyContent = 'center';
    price.style.textDecoration = 'line-through';
    productCard.appendChild(price);

    // Create a div for the discounted price
    const discountedPrice = document.createElement('div');
    const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
    discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
    discountedPrice.style.display = 'flex';
    discountedPrice.style.justifyContent = 'center';
    discountedPrice.style.alignItems = 'center';
    discountedPrice.style.marginBottom = '10px';
    discountedPrice.style.fontWeight = 'bold';
    productCard.appendChild(discountedPrice);

    // Create a div for displaying the discount percentage
    const save = document.createElement('div');
    save.style.display = 'flex';
    save.style.justifyContent = 'center';
    save.style.alignItems = 'center';
    save.style.marginBottom = '10px';

    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Save ' + (product.discountPercentage) + '%';
    button.style.backgroundColor = "#FF9F00";
    button.style.fontSize = '12px';
    button.style.color = "white";
    button.style.padding = "5px 10px";
    button.style.borderRadius = "10%";

    // Append the button to the save div
    save.appendChild(button);

    // Append the save div to an existing element in the document
    productCard.appendChild(save);

    // Create a div for the product rating
    const rating = document.createElement('div');
    rating.style.textAlign = 'center';
    
    if (product.rating >= 1 && product.rating <= 5) {
        for (let i = 0; i < product.rating; i++) {
            const star = document.createElement('span'); 
            star.textContent = "⭐";
            rating.appendChild(star);        
        }
    } 
    else {
        // Handle the case where the rating is out of range
        console.error('Invalid rating:', product.rating);
    }
    rating.style.marginBottom='10px';
    
    productCard.appendChild(rating);


    // Create a div for the product description
    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = product.description;
    description.style.display = 'none'; 
    description.style.marginTop = '10px';
    description.style.textAlign = 'center';
    productCard.appendChild(description);

// Create a button to show description
const showDescriptionBtn = document.createElement('button');
showDescriptionBtn.textContent = 'Show Description';
showDescriptionBtn.style.color = '#000';
showDescriptionBtn.style.border = '1px solid';
showDescriptionBtn.style.borderRadius = '4px';
showDescriptionBtn.style.width = '100%';
showDescriptionBtn.style.height = '5%';

    showDescriptionBtn.addEventListener('click', () => {
        description.style.display = 'block';
        showDescriptionBtn.style.display = 'none'; 
        lessDescriptionBtn.style.display = 'block';
    });
    productCard.appendChild(showDescriptionBtn);

    // Create a button to hide description
    const lessDescriptionBtn = document.createElement('button');
    lessDescriptionBtn.textContent = 'Less Description';
    lessDescriptionBtn.style.marginTop = '20px';
    lessDescriptionBtn.style.width = '70%';
    lessDescriptionBtn.style.height = '7%';
    lessDescriptionBtn.style.position = 'relative';
    lessDescriptionBtn.style.left = '15%';
    lessDescriptionBtn.style.display = 'none'; 
    lessDescriptionBtn.addEventListener('click', () => {
    description.style.display = 'none';
    lessDescriptionBtn.style.display = 'none'; 
    showDescriptionBtn.style.display = 'block'; 
    });
    productCard.appendChild(lessDescriptionBtn);

    // Create add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.style.backgroundColor = "#007bff";
    addToCartButton.style.color = "#fff";
    addToCartButton.style.border = "none";
    addToCartButton.style.borderRadius = "4px";
    addToCartButton.style.marginTop = "20px";
    addToCartButton.style.marginBottom = "20px";
    addToCartButton.style.width = "100%";
    addToCartButton.style.height = "5%";

    addToCartButton.addEventListener('click', function () {
        console.log("Product added to cart: " + product.name);
    });
    productCard.appendChild(addToCartButton); 

    return productCard;
}
    });
}


//Code for sorting products
function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; 

    // Render each product
    products.forEach(product => {
        // Create product card
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);

// Function to create product card
function createProductCard(product) {
    // Create a div for the product card
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.style.border = '1px solid #ccc';
    productCard.style.borderRadius = '5px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.width = '100%';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '2px';
    productCard.style.padding = '20px';
    productCard.style.marginBottom = '20px';
    productCard.style.maxWidth = '300px';
    productCard.style.width = '100%';
    productCard.style.marginTop = '20px';
    productCard.style.boxSizing = 'border-box';
    productCard.style.boxShadow = '1 4px 8px rgba(0, 0, 0, 0.1)'; 
    productCard.style.fontFamily = 'Arial, sans-serif'; 
    productCard.style.backgroundColor = '#fff'; 

    // Hover effect
    productCard.addEventListener('mouseenter', function() {
        productCard.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; 
        productCard.style.transform = 'translateY(-2px)';
    });

    // Removing hover effect
    productCard.addEventListener('mouseleave', function() {
        productCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        productCard.style.transform = 'none';
    });

    // Create an image element for the main image (thumbnail)
    const mainImage = document.createElement('img');
    mainImage.src = product.thumbnail;
    mainImage.classList.add('main-image');
    mainImage.style.width = '100%';
    mainImage.style.height = '200px';
    productCard.appendChild(mainImage);

    // Create a div for the product title
    const title = document.createElement('div');
    title.classList.add('product-title');
    title.textContent = product.title;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.marginTop = '5px';
    title.style.textAlign = 'center';
    productCard.appendChild(title);

    // Create a div for the product price
    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = 'Rs. ' + product.price + "/-";
    price.style.marginBottom = '10px';
    price.style.color = "grey";
    price.style.display = 'flex';
    price.style.justifyContent = 'center';
    price.style.textDecoration = 'line-through';
    productCard.appendChild(price);

    // Create a div for the discounted price
    const discountedPrice = document.createElement('div');
    const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
    discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
    discountedPrice.style.display = 'flex';
    discountedPrice.style.justifyContent = 'center';
    discountedPrice.style.alignItems = 'center';
    discountedPrice.style.marginBottom = '10px';
    discountedPrice.style.fontWeight = 'bold';
    productCard.appendChild(discountedPrice);

    // Create a div for displaying the discount percentage
    const save = document.createElement('div');
    save.style.display = 'flex';
    save.style.justifyContent = 'center';
    save.style.alignItems = 'center';
    save.style.marginBottom = '10px';

    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Save ' + (product.discountPercentage) + '%';
    button.style.backgroundColor = "#FF9F00";
    button.style.fontSize = '12px';
    button.style.color = "white";
    button.style.padding = "5px 10px";
    button.style.borderRadius = "10%";

    // Append the button to the save div
    save.appendChild(button);

    // Append the save div to an existing element in the document
    productCard.appendChild(save);

    // Create a div for the image gallery
    const imageGallery = document.createElement('div');
    imageGallery.style.display = 'flex';
    imageGallery.style.flexWrap = 'wrap';
    imageGallery.classList.add('image-gallery');

    // Create image elements for the additional images
    product.images.forEach(imageUrl => {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.style.width = "50px";
        image.style.height = "80px";
        image.style.cursor = 'pointer';
        image.style.border = '1px solid #ccc';
        image.style.borderRadius = '5px';
        image.style.marginRight = '10px';
        image.style.objectFit = 'cover'; 
        imageGallery.appendChild(image);
    });
    imageGallery.style.marginBottom='10px';
    productCard.appendChild(imageGallery);

    // Create a div for the product rating
    const rating = document.createElement('div');
    rating.style.textAlign = 'center';

    if (product.rating >= 1 && product.rating <= 5) {
        for (let i = 0; i < product.rating; i++) {
            const star = document.createElement('span'); 
            star.textContent = "⭐";
            rating.appendChild(star);        
        }
    } 
    else {
        // Handle the case where the rating is out of range
        console.error('Invalid rating:', product.rating);
    }
    rating.style.marginBottom='10px';
    
    productCard.appendChild(rating);

    // Create a div for the product description
    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = product.description;
    description.style.display = 'none'; 
    description.style.marginTop = '10px';
    description.style.textAlign = 'center';
    productCard.appendChild(description);

    // Create a button to show description
    const showDescriptionBtn = document.createElement('button');
    showDescriptionBtn.textContent = 'Show Description';
    showDescriptionBtn.style.color = '#000';
    showDescriptionBtn.style.border = '1px solid';
    showDescriptionBtn.style.borderRadius = '4px';
    showDescriptionBtn.style.width = '100%';
    showDescriptionBtn.style.height = '5%';

    showDescriptionBtn.addEventListener('click', () => {
        description.style.display = 'block';
        showDescriptionBtn.style.display = 'none'; 
        lessDescriptionBtn.style.display = 'block';
    });
    productCard.appendChild(showDescriptionBtn);

    // Create a button to hide description
    const lessDescriptionBtn = document.createElement('button');
    lessDescriptionBtn.textContent = 'Less Description';
    lessDescriptionBtn.style.marginTop = '20px';
    lessDescriptionBtn.style.width = '70%';
    lessDescriptionBtn.style.height = '7%';
    lessDescriptionBtn.style.position = 'relative';
    lessDescriptionBtn.style.left = '15%';
    lessDescriptionBtn.style.display = 'none'; 
    lessDescriptionBtn.addEventListener('click', () => {
    description.style.display = 'none';
    lessDescriptionBtn.style.display = 'none'; 
    showDescriptionBtn.style.display = 'block'; 
    });
    productCard.appendChild(lessDescriptionBtn);

    // Create add to cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to Cart";
    addToCartButton.style.backgroundColor = "#007bff";
    addToCartButton.style.color = "#fff";
    addToCartButton.style.border = "none";
    addToCartButton.style.borderRadius = "4px";
    addToCartButton.style.marginTop = "20px";
    addToCartButton.style.marginBottom = "20px";
    addToCartButton.style.width = "100%";
    addToCartButton.style.height = "5%";
    
    addToCartButton.addEventListener('click', function () {
        console.log("Product added to cart: " + product.name);
    });
    productCard.appendChild(addToCartButton); 

    return productCard;
}
    });
}

// Add event listener to sortSelect
sortSelect.addEventListener('change', () => {
    const selectedOption = sortSelect.value;
    let sortedProducts;

    // Fetch products and sort based on the selected option
    fetch('https://dummyjson.com/products?limit=15')
        .then(response => response.json())
        .then(data => {
            switch (selectedOption) {
                case 'priceLowToHigh':
                    sortedProducts = data.products.slice().sort((a, b) => {
                        const discountedPriceA = calculateDiscountedPrice(a.price, a.discountPercentage);
                        const discountedPriceB = calculateDiscountedPrice(b.price, b.discountPercentage);
                        return discountedPriceA - discountedPriceB;
                    });
                    break;
                case 'priceHighToLow':
                    sortedProducts = data.products.slice().sort((a, b) => {
                        const discountedPriceA = calculateDiscountedPrice(a.price, a.discountPercentage);
                        const discountedPriceB = calculateDiscountedPrice(b.price, b.discountPercentage);
                        return discountedPriceB - discountedPriceA;
                    });
                    break;
                case 'ratingHighToLow':
                    sortedProducts = data.products.slice().sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    sortedProducts = data.products;
            }
            // Render product cards with sorted data
            renderProducts(sortedProducts);
        })
        .catch(error => console.error('Error fetching and sorting products:', error));
});

// Function to calculate discounted price
function calculateDiscountedPrice(price, discountPercentage) {
    return price - (price * (discountPercentage / 100));
}
