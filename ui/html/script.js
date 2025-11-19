// Character Creator Script
let currentScreen = 'character-selection';
let currentCharacter = null;
let characters = [];
let zoomLevel = 1.0;
let characterRotation = 0;

// DOM Elements
const screens = {
    'character-selection': document.getElementById('character-selection'),
    'character-creation': document.getElementById('character-creation'),
    'character-info': document.getElementById('character-info')
};

const panels = {
    'appearance': document.getElementById('appearance-panel'),
    'clothing': document.getElementById('clothing-panel'),
    'tattoos': document.getElementById('tattoos-panel')
};

// Initialize the character creator
function initCharacterCreator() {
    // Load saved characters
    loadCharacters();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show the character selection screen
    showScreen('character-selection');
    
    // Notify the game that the UI is ready
    if ('alt' in window) {
        alt.emit('characterCreator:ready');
    }
}

// Load saved characters
function loadCharacters() {
    // In a real implementation, this would fetch characters from the server
    // For now, we'll use mock data
    fetch(`https://${GetParentResourceName()}/getCharacters`)
        .then(resp => resp.json())
        .then(data => {
            characters = data.characters || [];
            renderCharacterSlots();
        });
}

// Set up event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('back-button').addEventListener('click', () => {
        // Handle back button click
        if ('alt' in window) {
            alt.emit('characterCreator:exit');
        }
    });
    
    document.getElementById('select-character').addEventListener('click', () => {
        if (currentCharacter) {
            // Select the current character
            if ('alt' in window) {
                alt.emit('characterCreator:selectCharacter', currentCharacter.id);
            }
        }
    });
    
    // Character creation
    document.querySelectorAll('.character-slot.empty').forEach(slot => {
        slot.addEventListener('click', () => {
            startCharacterCreation();
        });
    });
    
    // Tab navigation
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            switchTab(tab);
        });
    });
    
    // Character rotation
    document.getElementById('rotate-left').addEventListener('click', () => {
        characterRotation -= 15;
        updateCharacterRotation();
    });
    
    document.getElementById('rotate-right').addEventListener('click', () => {
        characterRotation += 15;
        updateCharacterRotation();
    });
    
    // Zoom controls
    const zoomSlider = document.getElementById('zoom-slider');
    zoomSlider.addEventListener('input', (e) => {
        zoomLevel = parseFloat(e.target.value);
        updateCharacterZoom();
    });
    
    document.getElementById('zoom-in').addEventListener('click', () => {
        zoomLevel = Math.min(zoomLevel + 0.1, 2.0);
        zoomSlider.value = zoomLevel;
        updateCharacterZoom();
    });
    
    document.getElementById('zoom-out').addEventListener('click', () => {
        zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
        zoomSlider.value = zoomLevel;
        updateCharacterZoom();
    });
    
    // Back to selection
    document.getElementById('back-to-selection').addEventListener('click', () => {
        showScreen('character-selection');
        if ('alt' in window) {
            alt.emit('characterCreator:cancelCreation');
        }
    });
    
    // Randomize character
    document.getElementById('randomize').addEventListener('click', () => {
        if ('alt' in window) {
            alt.emit('characterCreator:randomizeCharacter');
        }
    });
    
    // Save character
    document.getElementById('save-character').addEventListener('click', () => {
        showScreen('character-info');
    });
    
    // Back to customization
    document.getElementById('back-to-customization').addEventListener('click', () => {
        showScreen('character-creation');
    });
    
    // Confirm character
    document.getElementById('confirm-character').addEventListener('click', () => {
        const characterData = {
            name: document.getElementById('character-name').value,
            surname: document.getElementById('character-surname').value,
            birthdate: document.getElementById('character-birthdate').value,
            bio: document.getElementById('character-bio').value
        };
        
        if (!characterData.name || !characterData.surname) {
            showNotification('error', 'Error', 'Por favor, completa el nombre y apellido del personaje.');
            return;
        }
        
        if ('alt' in window) {
            alt.emit('characterCreator:saveCharacter', characterData);
        }
    });
    
    // Appearance category change
    document.getElementById('appearance-category').addEventListener('change', (e) => {
        loadAppearanceOptions(e.target.value);
    });
    
    // Clothing category change
    document.getElementById('clothing-category').addEventListener('change', (e) => {
        loadClothingOptions(e.target.value);
    });
    
    // Tattoos zone change
    document.getElementById('tattoos-zone').addEventListener('change', () => {
        loadTattooOptions();
    });
    
    // Tattoos collection change
    document.getElementById('tattoos-collection').addEventListener('change', () => {
        loadTattooOptions();
    });
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    if (screens[screenId]) {
        screens[screenId].classList.add('active');
        currentScreen = screenId;
        
        // Notify the game about the screen change
        if ('alt' in window) {
            alt.emit('characterCreator:screenChanged', screenId);
        }
    }
}

// Switch between customization tabs
function switchTab(tabId) {
    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-tab') === tabId);
    });
    
    // Show the selected panel
    Object.keys(panels).forEach(panelId => {
        const isActive = panelId === tabId;
        panels[panelId].classList.toggle('active', isActive);
    });
    
    // Load the appropriate options
    switch (tabId) {
        case 'appearance':
            loadAppearanceOptions(document.getElementById('appearance-category').value);
            break;
        case 'clothing':
            loadClothingOptions(document.getElementById('clothing-category').value);
            break;
        case 'tattoos':
            loadTattooOptions();
            break;
    }
}

// Load appearance options based on category
function loadAppearanceOptions(category) {
    const container = document.getElementById('appearance-options');
    container.innerHTML = ''; // Clear current options
    
    // In a real implementation, this would fetch options from the game
    // For now, we'll use placeholder data
    const options = [];
    
    switch (category) {
        case 'sex':
            options.push(
                { id: 'male', label: 'Masculino', icon: '♂' },
                { id: 'female', label: 'Femenino', icon: '♀' }
            );
            break;
        case 'parents':
            // Parent options would be loaded here
            break;
        case 'features':
            // Face feature sliders would be added here
            break;
        case 'appearance':
            // Appearance options would be loaded here
            break;
    }
    
    // Render the options
    options.forEach(option => {
        const element = document.createElement('div');
        element.className = 'option-item';
        element.innerHTML = `
            <div class="option-icon">${option.icon || '👤'}</div>
            <div class="option-label">${option.label}</div>
        `;
        element.addEventListener('click', () => {
            selectAppearanceOption(category, option.id);
        });
        container.appendChild(element);
    });
}

// Load clothing options based on category
function loadClothingOptions(category) {
    const container = document.getElementById('clothing-options');
    container.innerHTML = ''; // Clear current options
    
    // In a real implementation, this would fetch clothing items from the game
    // For now, we'll use placeholder data
    const items = Array(12).fill(0).map((_, i) => ({
        id: i,
        label: `Item ${i + 1}`,
        // In a real implementation, this would be a path to a thumbnail
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiM0NDQiIC8+CiAgPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsb3RoaW5nPC90ZXh0PgogIDx0ZXh0IHg9IjUwIiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZpbGw9IiNGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkl0ZW0gJHtpKzF9PC90ZXh0Pgo8L3N2Zz4='
    }));
    
    // Render the clothing items
    items.forEach(item => {
        const element = document.createElement('div');
        element.className = 'option-item';
        element.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.label}">
            <div class="option-label">${item.label}</div>
        `;
        element.addEventListener('click', () => {
            selectClothingItem(category, item.id);
        });
        container.appendChild(element);
    });
}

// Load tattoo options
function loadTattooOptions() {
    const container = document.getElementById('tattoos-options');
    container.innerHTML = ''; // Clear current options
    
    // In a real implementation, this would fetch tattoo options from the game
    // For now, we'll use placeholder data
    const tattoos = Array(12).fill(0).map((_, i) => ({
        id: `tattoo_${i}`,
        label: `Tatuaje ${i + 1}`,
        collection: 'Colección ' + (i % 3 + 1),
        // In a real implementation, this would be a path to a thumbnail
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMiIC8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDxwYXRoIGQ9Ik0zNSw1MCBRNTAsMzAgNjUsNTAgTTUwLDM1IFY2NSBNNDAsNDUgSDYwIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgLz4KPC9zdmc+'
    }));
    
    // Filter tattoos by selected zone and collection
    const selectedZone = document.getElementById('tattoos-zone').value;
    const selectedCollection = document.getElementById('tattoos-collection').value;
    
    const filteredTattoos = tattoos.filter(tattoo => {
        const matchesZone = true; // In a real implementation, this would check the tattoo zone
        const matchesCollection = selectedCollection === 'all' || tattoo.collection === selectedCollection;
        return matchesZone && matchesCollection;
    });
    
    // Update collections dropdown
    updateTattooCollections(tattoos);
    
    // Render the tattoo options
    if (filteredTattoos.length === 0) {
        container.innerHTML = '<div class="no-tattoos">No hay tatuajes disponibles en esta categoría.</div>';
    } else {
        filteredTattoos.forEach(tattoo => {
            const element = document.createElement('div');
            element.className = 'option-item';
            element.innerHTML = `
                <img src="${tattoo.thumbnail}" alt="${tattoo.label}">
                <div class="option-label">${tattoo.label}</div>
            `;
            element.addEventListener('click', () => {
                selectTattoo(tattoo.id);
            });
            container.appendChild(element);
        });
    }
}

// Update tattoo collections dropdown
function updateTattooCollections(tattoos) {
    const collectionSelect = document.getElementById('tattoos-collection');
    const currentValue = collectionSelect.value;
    
    // Get unique collections
    const collections = ['all'];
    tattoos.forEach(tattoo => {
        if (!collections.includes(tattoo.collection)) {
            collections.push(tattoo.collection);
        }
    });
    
    // Update the dropdown
    collectionSelect.innerHTML = '';
    collections.forEach(collection => {
        const option = document.createElement('option');
        option.value = collection === 'all' ? 'all' : collection;
        option.textContent = collection === 'all' ? 'Todas las colecciones' : collection;
        collectionSelect.appendChild(option);
    });
    
    // Restore the selected value if it still exists
    if (collections.includes(currentValue) || currentValue === 'all') {
        collectionSelect.value = currentValue;
    }
}

// Select an appearance option
function selectAppearanceOption(category, optionId) {
    if ('alt' in window) {
        alt.emit('characterCreator:updateAppearance', { category, optionId });
    }
    
    // Update UI to show the selected option
    const options = document.querySelectorAll('#appearance-options .option-item');
    options.forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-id') === optionId);
    });
}

// Select a clothing item
function selectClothingItem(category, itemId) {
    if ('alt' in window) {
        alt.emit('characterCreator:updateClothing', { category, itemId });
    }
    
    // Update UI to show the selected item
    const items = document.querySelectorAll('#clothing-options .option-item');
    items.forEach(item => {
        item.classList.toggle('active', parseInt(item.getAttribute('data-id')) === itemId);
    });
}

// Select a tattoo
function selectTattoo(tattooId) {
    if ('alt' in window) {
        alt.emit('characterCreator:selectTattoo', tattooId);
    }
    
    // Update UI to show the selected tattoo
    const tattoos = document.querySelectorAll('#tattoos-options .option-item');
    tattoos.forEach(tattoo => {
        tattoo.classList.toggle('active', tattoo.getAttribute('data-id') === tattooId);
    });
}

// Update character rotation
function updateCharacterRotation() {
    if ('alt' in window) {
        alt.emit('characterCreator:rotateCharacter', characterRotation);
    }
}

// Update character zoom
function updateCharacterZoom() {
    if ('alt' in window) {
        alt.emit('characterCreator:zoomCharacter', zoomLevel);
    }
}

// Start character creation
function startCharacterCreation() {
    showScreen('character-creation');
    
    // Reset zoom and rotation
    zoomLevel = 1.0;
    characterRotation = 0;
    document.getElementById('zoom-slider').value = zoomLevel;
    
    // Notify the game to start character creation
    if ('alt' in window) {
        alt.emit('characterCreator:startCreation');
    }
    
    // Switch to the appearance tab
    switchTab('appearance');
}

// Render character slots
function renderCharacterSlots() {
    const container = document.querySelector('.character-slots');
    container.innerHTML = ''; // Clear existing slots
    
    // Add existing characters
    characters.forEach((character, index) => {
        const slot = document.createElement('div');
        slot.className = 'character-slot';
        slot.setAttribute('data-character-id', character.id);
        
        slot.innerHTML = `
            <div class="character-preview">
                <div class="character-name">${character.firstName} ${character.lastName}</div>
                <div class="character-level">Nivel ${character.level || 1}</div>
            </div>
            <div class="character-actions">
                <button class="btn-select-character">Seleccionar</button>
                ${Config.EnableDeleteButton ? '<button class="btn-delete-character">Eliminar</button>' : ''}
            </div>
        `;
        
        // Add event listeners
        slot.querySelector('.btn-select-character').addEventListener('click', (e) => {
            e.stopPropagation();
            selectCharacter(character.id);
        });
        
        if (Config.EnableDeleteButton) {
            slot.querySelector('.btn-delete-character').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCharacter(character.id);
            });
        }
        
        container.appendChild(slot);
    });
    
    // Add empty slot if there's room for more characters
    if (characters.length < Config.MaxCharacters) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'character-slot empty';
        emptySlot.innerHTML = `
            <div class="add-character">
                <i class="fas fa-plus"></i>
                <span>Nuevo Personaje</span>
            </div>
        `;
        emptySlot.addEventListener('click', startCharacterCreation);
        container.appendChild(emptySlot);
    }
}

// Select a character
function selectCharacter(characterId) {
    currentCharacter = characters.find(c => c.id === characterId);
    
    // Update UI to show the selected character
    document.querySelectorAll('.character-slot').forEach(slot => {
        slot.classList.toggle('selected', slot.getAttribute('data-character-id') === characterId);
    });
    
    // Enable the select button
    document.getElementById('select-character').disabled = false;
    
    // Notify the game to preview the character
    if ('alt' in window) {
        alt.emit('characterCreator:previewCharacter', characterId);
    }
}

// Delete a character
function deleteCharacter(characterId) {
    if (confirm('¿Estás seguro de que quieres eliminar este personaje? Esta acción no se puede deshacer.')) {
        if ('alt' in window) {
            alt.emit('characterCreator:deleteCharacter', characterId);
        }
    }
}

// Show a notification
function showNotification(type, title, message, duration = 5000) {
    // In a real implementation, this would show a notification in the UI
    console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    
    // Notify the game to show a notification
    if ('alt' in window) {
        alt.emit('characterCreator:showNotification', { type, title, message, duration });
    }
}

// Initialize the character creator when the DOM is loaded
document.addEventListener('DOMContentLoaded', initCharacterCreator);

// Handle messages from the game
if ('alt' in window) {
    alt.on('characterCreator:updateCharacter', (character) => {
        // Update the current character data
        currentCharacter = character;
        
        // Update the UI to reflect the changes
        // (e.g., update sliders, checkboxes, etc.)
    });
    
    alt.on('characterCreator:characterCreated', (character) => {
        // Add the new character to the list
        characters.push(character);
        
        // Update the character slots
        renderCharacterSlots();
        
        // Go back to the character selection screen
        showScreen('character-selection');
        
        // Show a success message
        showNotification('success', 'Personaje creado', `¡${character.firstName} ${character.lastName} ha sido creado con éxito!`);
    });
    
    alt.on('characterCreator:characterDeleted', (characterId) => {
        // Remove the character from the list
        characters = characters.filter(c => c.id !== characterId);
        
        // Update the character slots
        renderCharacterSlots();
        
        // Clear the current character if it was deleted
        if (currentCharacter && currentCharacter.id === characterId) {
            currentCharacter = null;
            document.getElementById('select-character').disabled = true;
        }
        
        // Show a success message
        showNotification('success', 'Personaje eliminado', 'El personaje ha sido eliminado correctamente.');
    });
    
    alt.on('characterCreator:error', (data) => {
        // Show an error message
        showNotification('error', 'Error', data.message || 'Ha ocurrido un error inesperado.');
    });
}
