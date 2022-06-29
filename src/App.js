import "./App.css";

import {
  Home,
  Item,
  Create,
  AvailableAddonsPages,
  DistributorMyAddons,
  AddonDetails,
  NotAvailable
} from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addon/:id" element={<AddonDetails />} />
        <Route path="/link/:id" element={<Item />} />
        <Route path="/create" element={<Create />} />
        <Route path="distributor/addons" element={<AvailableAddonsPages />} />
        <Route path="distributor/links" element={<DistributorMyAddons />} />
        <Route path="link/yet-to-bind" element={<NotAvailable />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
