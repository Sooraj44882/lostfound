const formEle = document.getElementById('item-form');
const boardEle = document.getElementById('items-board');
const imgEle = document.getElementById('image');

let savedItems = JSON.parse(localStorage.getItem('lf-items')) || [];

function refreshBoard() {
    if (!boardEle) return; 

    boardEle.innerHTML = ''; 
    
    if (savedItems.length === 0) {
        boardEle.innerHTML = '<p style="color: #7f8c8d;" >No active listings found.</p>';
        return;
    }

    savedItems.forEach(item => {
        const statusColor = item.type === 'Lost' ? '#e74c3c' : '#2ecc71'; 
        
        const photoHTML = item.image ? 
        `<img src="${item.image}" style="width: 100%; max-height: 250px; object-fit: cover; margin-top: 1rem; border-radius: 4px;">` 
            : '';

        const itemCard = `
            <section style="border-color: ${statusColor};">
                <span style="font-weight: bold; color: ${statusColor};">${item.type}</span>
                <h3 style="margin: 0.5rem 0;">${item.title}</h3>
                <p style="margin: 0; color: #7f8c8d; font-size: 0.9rem;">Contact: ${item.contact}</p>
                
                ${photoHTML}
                
                <button onclick="removeItem(${item.id})" style="background: #e74c3c; margin-top: 1.5rem;">Remove Listing</button>
            </section>
        `;
        
        boardEle.innerHTML += itemCard;
    });
}

window.removeItem = function(itemId) {
    if(confirm("Are you sure you want to delete this listing?")) {
        savedItems = savedItems.filter(item => item.id !== itemId);
        localStorage.setItem('lf-items', JSON.stringify(savedItems));
        refreshBoard(); 
    }
};

if (formEle) {
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
}

function saveAndRedirect(itemData) {
    savedItems.unshift(itemData); 
    localStorage.setItem('lf-items', JSON.stringify(savedItems));
    
    window.location.href = 'index.html'; 
}

refreshBoard();