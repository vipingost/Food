import { useNavigate, useParams } from 'react-router-dom';
import './Cat.css';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';

const Cat = () => {
  const { id } = useParams();
  const [Cat, setCat] = useState([]);
  const nav = useNavigate();

  const fetchCat = async () => {
    try {
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
        const result = await apiResponse.json();
        setCat(result.meals); 
    } catch (error) {
        console.log('Error fetching category:', error);
    }
};


  useEffect(() => {
    fetchCat();
  }, [id]);

  const MealDetails = (idMeal) => {
    nav(`/meal/${idMeal}`); 
  }
  
  

  return (
    <>
      <div className="container">
        <h3>Categories..</h3>
        <div className="btnn"><button onClick={()=>nav(-1)} >Go Back</button></div>

        {Cat.length ? (
          <div className="card">
            {Cat.map((item, id) => (
              <div key={item.idMeal} onClick={() => MealDetails(item.idMeal)} className="cardlist">
                <img src={item.strMealThumb} alt="" />
                <div className="title">
                  <h2>{item.strMeal}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
              <div className="cardlist">
                <Skeleton className="sklt" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cat;
