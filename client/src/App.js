import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


// components
import TopBar from "./components/TopBar/TopBar";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Settings from './pages/settings/Settings';
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";


function App() {

  const {user} = useContext(Context);
  return (
   

    <BrowserRouter>
      <TopBar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          
          <Route path="/contact" element={<div style={{
            padding: "70px 0",
            textAlign: "center"
          }}>
            <h1>Contact Page</h1>
            </div>} />
          <Route path="/login" element={user ? <Home/> : <Login/>} />
          <Route path="/register" element={user ? <Home/>: <Register/>} />
          <Route path="/about" element={user? <Settings/> : <Login/>} />
          <Route path="/write" element={user ? <Write/> : <Login/> } /> 
         

          <Route path="/post/:postId" element={<Single/>} />
         
          <Route path="*" element={<div style={{
            padding: "70px 0",
            textAlign: "center"
          }}>
            <h1>No data found</h1>
            </div>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
