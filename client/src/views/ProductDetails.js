import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../components/UI/Spinner/Spinner";
import axios from "axios";
import { UserCtx } from "../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 300,
    width: "100%",
    objectFit: "contain",
  },
}));

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [lodding, setLodding] = useState(false);
  const classes = useStyles();
  const [user] = useContext(UserCtx);
  const history = useHistory();

  useEffect(() => {
    setLodding((prev) => !prev);
    const url = `/api/products/${params.id}`;
    axios
      .get(url)
      .then((res) => {
        let data = res.data;
        setProduct(data);
        setLodding((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlerDelete() {
    const url = `/api/products/${params.id}`;
    axios
      .delete(url)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {lodding ? (
        <Spinner />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Card className={classes.root}>
            <CardHeader title={product.title} subheader={product.category} />
            <CardMedia
              className={classes.media}
              image={product.image}
              component="img"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: "15px" }}
              >
                <Grid item>
                  <Typography color="black" component="p">
                    {`$${product.price}`}
                  </Typography>
                </Grid>
                {user && user.admin ? (
                  <Grid item>
                    {/* <UpdateIcon
                      style={{ marginRight: "5px", cursor: "pointer" }}
                    /> */}
                    <DeleteIcon
                      style={{ marginRight: "5px", cursor: "pointer" }}
                      onClick={() => handlerDelete()}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
