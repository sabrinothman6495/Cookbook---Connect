// Function to format recipoes
const formatRecipes = (recipes) => {
    return recipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        reviews: recipe.reviews,
        comments: recipe.comments,
        user: recipe.user,
    }));
}

// Function to format users
const formatUsers = (users) => {
    return users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        recipes: user.recipes,
        reviews: user.reviews,
        comments: user.comments,
    }));
}


function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toDateString();
}

function formatIngredients(ingredients) {
    return ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
    }));
}
function formatInstructions(instructions) {
    return instructions.map((instruction) => ({
        id: instruction.id,
        step: instruction.step,
        description: instruction.description,
    }));
}
function formatReviews(reviews) {
    return reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: review.user,
    }));
}
function formatComments(comments) {
    return comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        user: comment.user,
    }));
}

// Export the functions
export default {
 formatDate,
 formatRecipes,
 formatUsers, 
    formatIngredients,
    formatInstructions,
    formatReviews,
    formatComments,
}
