import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MealsDetails.css';

const MealsDetails = () => {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);

  const navigate = useNavigate();

  const fetchMealDetails = async () => {
    try {
      const apiResponse = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      setMeal(apiResponse.data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  useEffect(() => {
    fetchMealDetails();
  }, [idMeal]);

  const goBack = () => {
    navigate(-1);
  };

  if (!meal) {
    return <div className="meal-details">No meal details available.</div>;
  }
  const numbers = [];
  for (let i = 1; i <= 20; i++) {
    numbers.push(i);
  }
  return (
    <div className="meal-details">
      <button onClick={goBack} className="back-button">
        Go Back
      </button>
      <div className="meal-header">
        <img src={meal.strMealThumb} alt="" className="meal-image" />
        <div className="meal-info">
          <h1>{meal.strMeal}</h1>
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          <p>
            <strong>Tags:</strong> {meal.strTags}
          </p>
        </div>
      </div>
      <div className="meal-instructions">
        <h2>Instructions</h2>
        <p>{meal.strInstructions}</p>
      </div>
      <div className="meal-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {numbers.map(index => {
            const ingredient = meal[`strIngredient${index}`];
            const measure = meal[`strMeasure${index}`];
            return <>
              <li key={index}>{`${measure} ${ingredient}`}</li>
            </>
            
          })}
        </ul>
      </div>
    </div>
  );
};

export default MealsDetails;
