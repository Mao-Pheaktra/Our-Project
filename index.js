let cart = []

const Cardproduct=(pro=cart)=>{
    let show=``
    pro.forEach(item=>{
        show+=`
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card pb-4 shadow-sm rounded-3">
          <img class="card-img-top object-fit-cover position-relative" style="height:200px;" src="${item.image}" alt="${item.description}">
          <h4 class="position-absolute p-2 fs-6 text-white bg-warning rounded-5 mt-1">${item.type}</h4>
          <i style="color: #ffff3f;margin-top: 15%;" class="fa-solid fa-heart position-absolute"></i>
          
            <div class="mb-2">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
            </div>
            <h5 class="card-title fs-6 fw-bold">${item.description}</h5>
            <p class="card-text fw-bold text-dark-emphasis"> <i class="fa-solid fa-location-dot "></i>${item.street}/${item.city}</p>
           <div class="d-flex gap-3">
            <p class="fw-bold text-dark-emphasis"><i class="fa-solid fa-bed-pulse"></i>${item.beds} Bed</p>
            <p class="fw-bold text-dark-emphasis"><i class="fa-solid fa-bath"></i>${item.baths} Bath</p>
            <p class="fw-bold text-dark-emphasis"><i class="fa-solid fa-car"></i>${item.garage} Garage</p>
            <p class="fw-bold text-dark-emphasis"><i class="fa-solid fa-water-ladder"></i>${item.swimmingPool} Pool</p>
           </div>
           <div class="d-flex gap-5">
            <img class="w-25 h-25 rounded-2 position-relative" src="https://t3.ftcdn.net/jpg/13/11/22/86/360_F_1311228699_YoiLc5aJ3RWz3uRfdEtlV0UYSQjqf7RW.jpg" alt="">
            <p  class="fw-bold text-dark-emphasis position-absolute mt-4 px-1 py-4">${item.owner}</p>
            <div class="d-grid">
            <p  class="fw-bold text-dark-emphasis p-1">$${item.rent}/month</p>
            <button style="background-color: #8338ec;" type="button" class=" btn book-btn text-white fw-bold " data-id="${item.id}">Rent</button>
            </div>
           </div>
          </div>
        </div>
        `;
    });
    document.getElementById('show-product').innerHTML=show
};
fetch("https://mao-pheaktra.github.io/house-api/flutter.json")
  .then(res => res.json())
  .then(data => {
    cart = data;
    Cardproduct();
     const radios = document.querySelectorAll('input[name="btnradio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                const value = radio.value;
                if (value === 'all') {
                    Cardproduct(cart);
                } else {
                    const filtered = cart.filter(item => item.type.toLowerCase() === value.toLowerCase());
                    Cardproduct(filtered);
                }
            });
        });
  })
  .catch(err => console.log(err));

// Handle Book button click (dynamic elements)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("book-btn")) {

        const id = e.target.getAttribute("data-id");
        const item = cart.find(h => h.id == id);

        if (!item) return;

        // Fill modal body
        document.getElementById("modal-body-content").innerHTML = `
            <div class="card mb-3">
                <img style="height: 400px;" src="${item.image}" class="card-img-top object-fit-cover" >
                <div class="card-body">
                    <h5 class="card-title">${item.description}</h5>
                    <p  class="card-text fw-bold"><strong>Location:</strong> ${item.street}/ ${item.city}</p>
                    <p><strong>Price:</strong> $${item.rent}/month</p>
                    <p><strong>Owner:</strong> ${item.owner}</p>
                </div>
            </div>
        `;

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById("bookModal"));
        modal.show();
    }
});




