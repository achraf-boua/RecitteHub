document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const ingredients = document.getElementById("ingredients");
    const recipesContainer = document.getElementById("recipes");

    function searchRecipes() {
        const ingredient1 = document.getElementById("ingredient1").value;
        const ingredient2 = document.getElementById("ingredient2").value;
        const ingredient3 = document.getElementById("ingredient3").value;

        if (ingredient1 && ingredient2 && ingredient3) {
            recipesContainer.innerHTML = "<p>Recherche des recettes...</p>";
            
            // Remplacez par votre propre clé API
            const apiKey = "78714e21c5a546948b11ca94b37950d9";

            const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient1},${ingredient2},${ingredient3}&apiKey=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(recipes => {
                    if (recipes.length > 0) {
                        const recipesHtml = recipes.map(recipe => `
                            <div class="recipe-card">
                                <a href="recipe-details/recipe-details.html?id=${recipe.id}">
                                    <img src="${recipe.image}" alt="${recipe.title}">
                                </a>
                                <h4>${recipe.title}</h4>
                            </div>
                        `).join("");
                        recipesContainer.innerHTML = recipesHtml;
                    } else {
                        recipesContainer.innerHTML = "<p>Aucune recette trouvée. Essayez avec d'autres ingrédients.</p>";
                    }
                })
                .catch(error => {
                    console.error("Error fetching recipes:", error);
                    recipesContainer.innerHTML = "<p>Erreur lors de la recherche des recettes.</p>";
                });
        } else {
            recipesContainer.innerHTML = "<p>Veuillez entrer trois ingrédients pour effectuer la recherche.</p>";
        }
    }

    window.searchRecipes = searchRecipes;
});
