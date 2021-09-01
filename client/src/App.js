import Header from "./components/Header/Header";
import { CartContext } from "./Context/CartContext/CartContext";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import { UserContext, UserCtx } from "./Context/UserContext/UserContext";
import Logout from "./views/Logout";

function App() {
  return (
    <UserContext>
      <CartContext>
        <Header />
        <Container fixed>
          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </CartContext>
    </UserContext>
  );
}

export default App;
