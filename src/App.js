import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Listings from "./Components/Listings";
// import Index from "./Components/Motorcycles";
// import MotorcycleDetails from "./Components/MotorcycleDetails";
import ListingForm from "./Components/ListingForm";
import DetailsPage from "./Components/DetailsPage";
// import NavBar2 from "./Components/NavBar2";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motorcycles" element={<Listings />} />
            <Route path="/motorcycles/:id" element={<DetailsPage />} />
            <Route path="/motorcycles/:id/edit" element={<ListingForm />} />
            <Route path="/motorcycles/new" element={<ListingForm />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
