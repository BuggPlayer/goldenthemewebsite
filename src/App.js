import { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa lo stile di Bootstrap
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Per la gestione delle rotte
import NavBar from "./components/Navbar/Navbar"; // Importa il componente della barra di navigazione
import Footer from "./components/Footer/Footer"; // Importa il componente del footer
import Loader from "./components/Loader/Loader"; // Importa il loader per la suspense
import { ToastContainer } from "react-toastify"; // Importa il contenitore per le notifiche
import "react-toastify/dist/ReactToastify.css"; // Importa gli stili di react-toastify
import Signup from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoolgeLogin from "./components/GoogleWrapper/GoogleWrapper";
// import RefrshHandler from "./hooks/RefreshHandler";
// import OrderPage from "./pages/OrderPage";
import RefrshHandler from "./hooks/RefreshHandler";
import OrderPage from "./pages/OrderPage";

// Importazione lazy dei componenti delle pagine per il caricamento dinamico
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));


function App() {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
const GoogleWrapper = ()=>(
  
  <GoogleOAuthProvider clientId="347410691860-i1gudm0eg5hcq1visjsianmabh5d4otc.apps.googleusercontent.com" >
    <GoolgeLogin ></GoolgeLogin>
  </GoogleOAuthProvider>
)
const PrivateRoute = ({ element }) => {
  console.log("elelemt" , element)
  return isAuthenticated ? element : <Navigate to="/login" />
}
  return (
    // Suspense visualizza il Loader finché i componenti lazy non vengono caricati
    <Suspense fallback={<Loader />}>
      
      {/* Router per gestire la navigazione */}
      <Router>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        {/* Contenitore delle notifiche di sistema */}
        <ToastContainer
          position="top-right" // Posiziona le notifiche in alto a destra
          autoClose={1000} // Chiudi automaticamente dopo 1 secondo
          hideProgressBar={false} // Mostra la barra di progresso
          newestOnTop={false} // Non mostrare le notifiche più recenti in cima
          closeOnClick // Chiudi al click
          pauseOnFocusLoss // Pausa quando la finestra perde il focus
          draggable // Notifiche trascinabili
          pauseOnHover // Pausa al passaggio del mouse
          theme="light" // Tema chiaro
        />
        {/* Barra di navigazione comune a tutte le pagine */}
        <NavBar />
        {/* Definizione delle rotte dell'applicazione */}
        <Routes>
        <Route path="/login" element={<GoogleWrapper />} />
        <Route path="/signup" element={<Signup />} />

          {/* Rotta per la homepage */}
          <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
          {/* Rotta per la pagina del negozio */}
          <Route path="/shop" element={<Shop />} />
          {/* Rotta per il dettaglio del prodotto */}
          <Route path="/shop/:id" element={<Product />} />
          {/* Rotta per la pagina del carrello */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPage />} />
          {/* <Route path="/order" element={<OrderPage />} /> */}


          
        </Routes>
        {/* Footer visualizzato su tutte le pagine */}
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
