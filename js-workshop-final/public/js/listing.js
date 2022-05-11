console.groupEnd();
console.group('products listing page');

/**
 * set the html block for the listing
 * @param {[Product]} data list of products
 * @param {string} elementId id of the html container
 */
const setContent = (data, elementId) => {
  const carouselContent = data.map(prod => {
    return `
      <div class="col-md-3 col-12 mb-4"> 
        <div class="card h-100">
          <img class="card-img-top" src="images/products/${prod.img}" alt="${prod.name}">
          <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <a href="/product?id=${prod.id}" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById(elementId).innerHTML = carouselContent;
};

/**
 *
 * @param {string} key key of property to sort by
 */
const sortAscByProp = key => {
  return (item1, item2) => {
    if (item1[key] < item2[key]) {
      return -1;
    }
    if (item1[key] > item2[key]) {
      return 1;
    }
    return 0;
  };
};

fetch('/api/products')
  .then(response => response.text())
  .then(response => {
    const parsedResponse = JSON.parse(response);
    if (parsedResponse.success) {
      const orderedList = parsedResponse.data.sort(sortAscByProp('id'));
      setContent(orderedList, 'products-list');
    } else {
      console.warn('error');
    }
  })
  .catch(console.warn);


//fetch the data from api for category
const getByCategory = async (query) => {
  const res = await fetch('/api/products/categories?category=' + query);
  const json = await res.json();
  return json;
};
const handleSubmit1 = async (e) => {
  e.preventDefault();
  const category = document.getElementById('category');


  try {
    const result = await getByCategory(category.value);
    setContent(result.data, 'products-list');
  } catch (error) {
    console.log('error', error);
  }
};


//fetch the data from api for sorting
const getBySort = async (query) => {
  const res = await fetch('/api/products/sort?sortType=' + query);
  const json = await res.json();
  return json;
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const sortType = document.getElementById('sort');


  try {
    const result = await getBySort(sortType.value);
    setContent(result.data, 'products-list');
  } catch (error) {
    console.log('error', error);
  }
};
const btn2 = document.getElementById('button1');
btn2.addEventListener('click', handleSubmit1);

const btn = document.getElementById('button');
btn.addEventListener('click', handleSubmit);
