import { useState } from 'react';
import { 
  TextInput, 
  Textarea, 
  NumberInput, 
  Select, 
  Button, 
  FileInput 
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const INITIAL_FORM_STATE = {
  title: '',
  ingredients: '',
  instructions: '',
  time: 0,
  difficulty: '',
  servings: 0,
  image: null,
};

const RecipeForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormValues(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formValues);
      showNotification({
        title: 'Recipe Submitted',
        message: 'Your recipe has been successfully submitted!',
        color: 'green',
      });
    } else {
      showNotification({
        title: 'Form Error',
        message: 'Please fill out all fields correctly.',
        color: 'red',
      });
    }
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
        error={errors.title}
      />
      <Textarea
        label="Ingredients"
        placeholder="List all ingredients"
        name="ingredients"
        value={formValues.ingredients}
        onChange={handleChange}
        required
        error={errors.ingredients}
      />
      <Textarea
        label="Instructions"
        placeholder="Provide step-by-step instructions"
        name="instructions"
        value={formValues.instructions}
        onChange={handleChange}
        required
        error={errors.instructions}
      />
      <NumberInput
        label="Time (in minutes)"
        placeholder="Enter preparation time"
        name="time"
        value={formValues.time}
        onChange={(value) => handleNumberChange('time', value)}
        required
        error={errors.time}
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
        error={errors.difficulty}
      />
      <NumberInput
        label="Servings"
        placeholder="Enter number of servings"
        name="servings"
        value={formValues.servings}
        onChange={(value) => handleNumberChange('servings', value)}
        required
        error={errors.servings}
      />
      <FileInput
        label="Recipe Image"
        placeholder="Upload an image"
        name="image"
        onChange={handleImageChange}
        required
        error={errors.image}
      />
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="Preview" 
          style={{ marginTop: '10px', maxHeight: '200px' }} 
        />
      )}
      <Button type="submit" mt="md">Submit Recipe</Button>
    </form>
  );
};

export default RecipeForm;