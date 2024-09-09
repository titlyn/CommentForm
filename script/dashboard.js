function showForm() {
    document.getElementById('content').innerHTML = `
        <h2>Remplir le formulaire</h2>
        <form id="form">
            <label for="name">Nom : </label>
            <input type="text" name="name" id="name" required>
            <label for="rating">Note : </label>
            <select name="rating" id="rating" required>
                <option value="" disabled selected>Choisir une note</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <label for="comment">Commentaire : </label>
            <textarea type="text" name="comment" id="comment"></textarea>
            <div class="button-container">
                <button class="submit" type="submit" onclick="saveForm()">Envoyer</button>
                <button class="submit" type="button" onclick="clearForm()">Effacer</button>
            </div>
        </form>
    `;
}

function saveForm() {
    const name = document.getElementById('name').value.trim();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value.trim();

    if (!name || !rating || !comment) {
        alert("Veuillez remplir tous les champs avant d'envoyer le formulaire.");
        return; // Arrête l'exécution de la fonction si les champs sont vides
    }

    let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

    const newEntry = {
        id: formEntries.length + 1,
        name : name,
        rating : rating,
        comment : comment
    };

    formEntries.push(newEntry);
    localStorage.setItem('formEntries', JSON.stringify(formEntries));

    alert("Formulaire sauvegardé avec succès !");
    showForm();
}

function showList() {
    const formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

    let content = '<h2>Liste des formulaires</h2>';
    content += '<div class="card-container">';
    formEntries.forEach(entry => {
        // Créer la chaîne d'étoiles en fonction de la note
        let stars = '';
        for (let i = 1; i <= 10; i++) {
            if (i <= entry.rating) {
                stars += '★'; // Étoile remplie
            } else {
                stars += '☆'; // Étoile vide
            }
        }

        content += `
            <div class="card" onclick="showDetails(${entry.id})">
                <div class="top">
                    <h3>${entry.name}</h3>
                </div>
                <div class="bottom">    
                    <p><strong>Note :</strong> <span class="star-rating">${stars}</span></p>
                    <p><strong>Commentaire : </strong><span class="comment-preview">${entry.comment}</span></p>
                </div>
            </div>        
        `;
    });
    content += '</div>';
    document.getElementById('content').innerHTML = content;
}


function showDetails(id) {
    const formEntries = JSON.parse(localStorage.getItem('formEntries'));
    const entry = formEntries.find(e => e.id === id);

    if (entry) {
        document.getElementById('content').innerHTML = `
                <h2>Details du formulaire #${entry.id}</h2>
                <p><strong>Nom : </strong> ${entry.name}</p>
                <p><strong>Note : </strong> ${entry.rating}</p>
                <p><strong>Commentaire : </strong> ${entry.comment}</p>
                <button onclick="showList()">Retour</button>
        `
    }
    console.log(entry);
    
}

document.addEventListener('DOMContentLoaded', ()=> {
    const items = document.querySelectorAll('.button');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(el => el.classList.remove('active'));

            item.classList.add('active');
        })
    })
})

function clearForm() {
    document.getElementById('form').reset();
}