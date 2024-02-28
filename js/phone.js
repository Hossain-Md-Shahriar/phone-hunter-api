const phoneContainer = document.getElementById('phone-container');




const loadData = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
    // console.log(phones);
}

const displayPhones = (phones, isShowAll) => {
    
    // display show all button if there are more than 12 phones
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }
    
    // display only first 12 phones if not show all
    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }
    
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-5 pt-5">
        <img src=${phone.image} alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
        <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
        </div>`;
        phoneContainer.appendChild(phoneCard);
    });
    
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle Search Button
const handleSearch = (isShowAll) => {
    // clear previous result before loading new phones
    phoneContainer.textContent = '';
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadData(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// handle show detail
const handleShowDetail = async (id) => {
    // console.log('click hoise', id);

    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="">
        <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">Release Date: </span>${phone?.releaseDate}</p>
        <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
    `

    // show the modal
    show_details_modal.showModal();
}

// loadData();