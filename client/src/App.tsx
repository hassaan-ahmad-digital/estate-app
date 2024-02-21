import { BrowserRouter, Route, Routes } from "react-router-dom"
import { About, Home, Profile, SignIn, SignOut, SignUp } from "./pages"
import { Header, PrivateRoute, PublicRoute } from "./components"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/about" element={<About />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
