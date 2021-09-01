import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <section>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Product
            key={product._id}
            id={product._id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Products;
