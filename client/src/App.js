import './App.css';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContributorForm from './forms/ContributorForm';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <Footer></Footer>

      {/* <ContributorForm></ContributorForm> */}
    </div>
  );
}

export default App;
