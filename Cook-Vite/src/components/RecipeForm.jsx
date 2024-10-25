import { useState } from 'react';
import { TextInput, Textarea, NumberInput, Select, Button, FileInput } from '@mantine/core';

const RecipeForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: 0,
    difficulty: '',
    servings: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here, like sending the form data to an API
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Recipe Title"
        placeholder="Enter the recipe title"
        name="title"
        value={formValues.title}
        onChange={handleChange}
        required
      />

      <Textarea
        label="Ingredients"
        placeholder="List all ingredients"
        name="ingredients"
        value={formValues.ingredients}
        onChange={handleChange}
        required
      />

      <Textarea
        label="Instructions"
        placeholder="Provide step-by-step instructions"
        name="instructions"
        value={formValues.instructions}
        onChange={handleChange}
        required
      />

      <NumberInput
        label="Time (in minutes)"
        placeholder="Enter preparation time"
        name="time"
        value={formValues.time}
        onChange={(value) => handleNumberChange('time', value)}
        required
      />

      <Select
        label="Difficulty"
        placeholder="Select difficulty"
        name="difficulty"
        value={formValues.difficulty}
        onChange={(value) => handleNumberChange('difficulty', value)}
        data={[
          { value: 'easy', label: 'Easy' },
          { value: 'medium', label: 'Medium' },
          { value: 'hard', label: 'Hard' },
        ]}
        required
      />

      <NumberInput
        label="Servings"
        placeholder="Enter number of servings"
        name="servings"
        value={formValues.servings}
        onChange={(value) => handleNumberChange('servings', value)}
        required
      />

      <FileInput
        label="Recipe Image"
        placeholder="Upload an image"
        name="image"
        onChange={(file) => setFormValues({ ...formValues, image: file })}
        required
      />

      <Button type="submit" mt="md">
        Submit Recipe
      </Button>
    </form>
  );
};

export default RecipeForm;