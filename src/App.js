import './App.css';
import ContactApp from './ContactApp';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
    <ContactApp />
    </>
    
  );
}

export default App;
