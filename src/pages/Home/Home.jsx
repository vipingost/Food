import './home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const apiRespose = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      toast.success('API CALL SUCCESFULL');
      setProduct(apiRespose.data.categories);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
    const onCardClick=(id)=>{
      navigate(`/categories/${id}`)

    }
  return (
    <>
      <div className="container">
        <h3>Home....</h3>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {product.length ? (
          <div className="card">
            {product.map((item, id) => (
              <div onClick={() => onCardClick(item.strCategory)} className="cardlist">
                <img src={item.strCategoryThumb} alt="" />
                <div className="title">
                  <h2>{item.strCategory}</h2>
                </div>
                <p className="para">{item.strCategoryDescription}</p>
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

export default Home;
