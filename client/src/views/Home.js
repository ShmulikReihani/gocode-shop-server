import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";
import Spinner from "../components/UI/Spinner/Spinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  function handlerFilter(filterName, price) {
    if (filterName === "" || filterName === "all") {
      setFilterProducts(
        products.filter((product) => {
          return product.price > price[0] && product.price < price[1];
        })
      );
    } else {
      setFilterProducts(
        products.filter((product) => {
          return (
            product.price > price[0] &&
            product.price < price[1] &&
            product.category === filterName
          );
        })
      );
    }
  }

  useEffect(() => {
    setSpinner((prev) => !prev);
    const url = "/api/products";
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        setProducts(data);
        setFilterProducts(data);
        setSpinner((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCategories([
      "all",
      ...products
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index),
    ]);
    setMaxPrice(
      Math.max.apply(
        Math,
        products.map((p) => p.price)
      )
    );
    setMinPrice(
      Math.min.apply(
        Math,
        products.map((p) => p.price)
      )
    );
  }, [products]);
  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <Filter
            categories={categories}
            handlerFilter={handlerFilter}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
          <Products products={filterProducts} />
        </>
      )}
    </>
  );
};

export default Home;
