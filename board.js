const boardEle = document.getElementById('items-board');
const searchInput = document.getElementById('search-bar');
const filterSelect = document.getElementById('filter-status');

const starterData = [
    { 
        id: 101, 
        title: 'Black Jacket', 
        type: 'Lost', 
        contact: 'alex@school.edu', 
        image: null 
    },
    { 
        id: 102, 
        title: 'TI Graphing Calculator', 
        type: 'Found', 
        contact: 'library@school.edu', 
        image: null 
    },
    { 
        id: 103, 
        title: 'AirPods Pro (Left Ear only)', 
        type: 'Lost', 
        contact: 'sarah@school.edu', 
        image: null 
    },
    { 
        id: 104, 
        title: 'Umbrella', 
        type: 'Found', 
        contact: 'Ali@school.edu', 
        image: null 
    }
];

let savedItems = JSON.parse(localStorage.getItem('lf-items')) || [];

if (!savedItems || savedItems.length === 0) {
    savedItems = starterData;
    localStorage.setItem('lf-items', JSON.stringify(savedItems));
}

function refreshBoard() {
    if (!boardEle) return; 

    boardEle.innerHTML = ''; 
    
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filteredItems = savedItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.contact.toLowerCase().includes(searchTerm);
        const matchesType = filterValue === 'All' || item.type === filterValue;
        
        return matchesSearch && matchesType;
    });
    
    if (filteredItems.length === 0) {
        boardEle.innerHTML = '<p style="color: #fff; font-weight: bold; font-size: 1.2rem;">No items match your search.</p>';
        return;
    }

    filteredItems.forEach(item => {
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
                
                <button 
                onclick="removeItem(${item.id})" style="background: #e74c3c; margin-top: 1.5rem;"
                >Remove Listing</button>
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

if (searchInput) searchInput.addEventListener('input', refreshBoard);
if (filterSelect) filterSelect.addEventListener('change', refreshBoard);

refreshBoard();