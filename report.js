const formEle = document.getElementById('item-form');
const imgEle = document.getElementById('image');

let savedItems = JSON.parse(localStorage.getItem('lf-items')) || [];

function saveAndRedirect(itemData) {
    savedItems.unshift(itemData); 
    localStorage.setItem('lf-items', JSON.stringify(savedItems));
    
    window.location.href = 'index.html'; 
}

formEle.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const newItem = {
        id: Date.now(),
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        contact: document.getElementById('contact').value,
        image: null
    };

    const selectedPhoto = imgEle.files[0];
    
    if (selectedPhoto) {
        const fileReader = new FileReader();
        fileReader.onload = function(loadEvent) {
            newItem.image = loadEvent.target.result;
            saveAndRedirect(newItem);
        };
        fileReader.readAsDataURL(selectedPhoto);
    } else {
        saveAndRedirect(newItem);
    }
});