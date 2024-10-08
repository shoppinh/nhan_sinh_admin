import { ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import React, { Suspense } from "react";
import { createTheme } from "@material-ui/core/styles";
import spinner from "./assets/images/Iphone-spinner-2.gif";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const MainPage = React.lazy(() => import("./features/Home/pages/MainPage"));
const SignIn = React.lazy(() => import("./features/Auth/pages/SignIn"));
const Users = React.lazy(() => import("./features/Home/pages/UsersPage"));
const DirectMeeting = React.lazy(() =>
  import("./features/Home/pages/DirectMeeting")
);
const ListSearchFree = React.lazy(() =>
  import("./features/Home/pages/ListSearchFree")
);
const Services = React.lazy(() => import("./features/Home/pages/Services"));
const Coachers = React.lazy(() => import("./features/Home/pages/Coachers"));
const NumberMeaning = React.lazy(() =>
  import("./features/Home/pages/NumberMeaning")
);
const Benefit = React.lazy(() => import("./features/Home/pages/Benefit"));
const Payment = React.lazy(() => import("./features/Home/pages/Payment"));
const SuccessStories = React.lazy(() =>
  import("./features/Home/pages/SuccessStories")
);
const Welcome = React.lazy(() => import("./features/Home/pages/Welcome"));
const Banner = React.lazy(() => import("./features/Home/pages/Banner/Banner"));
const Blog = React.lazy(() => import("./features/Home/pages/Blog"));
const AddingBlog = React.lazy(() =>
  import("./features/Home/pages/Blog/AddingBlog")
);
const EditingBlog = React.lazy(() =>
  import("./features/Home/pages/Blog/EditingBlog")
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#34495e",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  // viet 1 ham de auth state and set the local state
  // nhan 1 user, kiem tra xem co user hay ko, neu	 ko thi redirect sang trang login form

  // check neu nhu co user -> hanlde something here

  // -> la 1 useEffect de lang nghe xem nguoi dung da dang nhap hay chua
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={spinner} style={{ height: "100px" }} />
        </div>
      }
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Layout>
              <PrivateRoute exact path="/" component={MainPage} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute
                exact
                path="/list-search-free"
                component={ListSearchFree}
              />
              <PrivateRoute exact path="/services" component={Services} />
              <PrivateRoute exact path="/coachers" component={Coachers} />
              <PrivateRoute
                exact
                path="/direct-meeting"
                component={DirectMeeting}
              />
              <PrivateRoute
                exact
                path="/number-meaning"
                component={NumberMeaning}
              />
              <PrivateRoute exact path="/benefit" component={Benefit} />
              <PrivateRoute exact path="/payment" component={Payment} />
              <PrivateRoute
                exact
                path="/success-stories"
                component={SuccessStories}
              />
              <PrivateRoute exact path="/welcome" component={Welcome} />
              <PrivateRoute exact path="/banner" component={Banner} />
              <PrivateRoute exact path="/blog" component={Blog} />
              <PrivateRoute
                exact
                path="/blog/adding-blog"
                component={AddingBlog}
              />
              <PrivateRoute
                exact
                path="/blog/editing-blog/:blogID"
                component={EditingBlog}
              />
            </Layout>
            {/* <PrivateRoute path='*' component={NotFound} /> */}
            <Redirect from="/" to="/sign-in" />
          </Switch>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
