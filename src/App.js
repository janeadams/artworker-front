import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import NavBar from "./components/nav-bar";
import store from "./redux/store";
import { Provider } from "react-redux";
import Home from "./screens/home";
import LoginScreen from "./screens/login-screen";
import ProfileScreen from "./screens/profile-screen";
import AdminScreen from "./screens/admin-screen";
import RegisterScreen from "./screens/register-screen";
import ArtScreen from "./art";
import ArtSearchScreen from "./art/search";
import ArtDetailsScreen from "./art/art";
import CurrentUserContext from "./components/current-user-context";
import CreateScreen from "./screens/create-screen";
function App() {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <div className="container-fluid">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/artworks/:id" element={<ArtDetailsScreen />} />
              <Route path="/art/search" element={<ArtSearchScreen />} />
              <Route path="/art/search/:searchTerm" element={<ArtSearchScreen />}/>
              <Route path="/art" element={<ArtScreen />} />
              <Route path="/create" element={<CreateScreen />} />
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/profile/:userId" element={<ProfileScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CurrentUserContext>
    </Provider>
  );
}

export default App;
