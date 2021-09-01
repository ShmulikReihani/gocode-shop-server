import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  Tooltip,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartCtx } from "../../../Context/CartContext/CartContext";
import "./Product.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: "0 10px 0 10px",
  },
  media: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },
}));

const Product = ({ title, image, price, id }) => {
  const [list, setList, , addTotalPrice, reduceTotalPrice] =
    useContext(CartCtx);
  const [isAdd, setIsAdd] = useState(true);

  const classes = useStyles();

  function listHandler(product) {
    const item = list.findIndex((l) => l.id === product.id);
    if (isAdd) {
      setIsAdd(false);
      addTotalPrice(product.price);
      setList([...list, product]);
    } else {
      setIsAdd(true);
      reduceTotalPrice(Number(product.price) * list[item].qnt);
      setList((prev) => prev.filter((item) => item.id !== product.id));
    }
  }

  useEffect(() => {
    const item = list.find((l) => l.id === id);
    if (item && item.qnt > 0) {
      setIsAdd(false);
    } else {
      setIsAdd(true);
    }
  }, [list]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <Link to={`/products/${id}`}>
            <CardMedia
              className={classes.media}
              component="img"
              alt={title}
              image={image}
              title={title}
            />
          </Link>
        </CardActionArea>
        <CardHeader
          action={
            isAdd ? (
              <Tooltip title="Add">
                <AddShoppingCartIcon
                  color="primary"
                  onClick={() =>
                    listHandler({
                      id,
                      title,
                      image,
                      price,
                      qnt: 1,
                    })
                  }
                />
              </Tooltip>
            ) : (
              <Tooltip title="Remove">
                <RemoveShoppingCartIcon
                  color="primary"
                  onClick={() =>
                    listHandler({
                      id,
                      title,
                      image,
                      price,
                    })
                  }
                />
              </Tooltip>
            )
          }
          title={title}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`$${price}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
