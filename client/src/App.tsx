import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import { Watch } from "pages/Watch";
import React from "react";
import useUserAuth from "utils/useUserAuth";
import { UserContext } from "utils/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { user, setUser } = useUserAuth();
  console.log({ appuser: user });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user?.accessToken ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/login"
            element={
              !user?.accessToken ? (
                <Login setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={!user?.accessToken ? <Register /> : <Navigate to="/" />}
          />
          {user && (
            <>
              <Route path="/movies" element={<Home type="movie" />} />
              <Route path="/series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
