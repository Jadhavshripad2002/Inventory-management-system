
// // import React from "react";
// // import { Routes, Route } from "react-router-dom";
// // import Home from "./pages/home/homePage.jsx";
// // import Login from "./pages/loginRegister/Login.jsx";
// // import Signup from "./pages/loginRegister/Signup.jsx";

// // import Dashboard from "./pages/dashboard/DashBoard.jsx";

// // function App() {
// //   return (
    
// //     <Routes>
// //       <Route path="/" element={<Home />} />
      
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/signup" element={<Signup />} />

// //       <route path="/dashboard" element={<Dashboard/>}/>
     
// //     </Routes>
    
// //   );
// // }

// // export default App;   


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/homePage.jsx";
// import Login from "./pages/loginRegister/Login.jsx";
// import Signup from "./pages/loginRegister/Signup.jsx";
// import Dashboard from "./pages/dashboard/DashBoard";
// import Products from "./pages/dashboard/product.jsx";
// import Customers from "./pages/dashboard/customer.jsx";
// import Suppliers from "./pages/dashboard/supplier.jsx";
// import Category from "./pages/dashboard/category.jsx";


// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/dashboard" element={<Dashboard />} />
      

//       <Route path="/products" element={<Products />} />
      
//       <Route path="/customers" element={<Customers />} />

//       <Route path="/suppliers" element={<Suppliers />} />
//      <Route path="/category" element={<Category />} />
      

//     </Routes>
//   );
// }

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/homePage.jsx";
import Login from "./pages/loginRegister/Login.jsx";
import Signup from "./pages/loginRegister/Signup.jsx";
import Dashboard from "./pages/dashboard/DashBoard";
import Products from "./pages/dashboard/product.jsx";
import Customers from "./pages/dashboard/customer.jsx";
import Suppliers from "./pages/dashboard/supplier.jsx";
 import Category from "./pages/dashboard/category.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/categories" element={<Category />} /> 
    </Routes>
  );
}

export default App;
