import './App.css';
import CreateOrganisation from './Components/CreateOrganisation';
import  HeaderComponent from './Components/HeaderComponent'; // Make sure the path is correct
import { ListOrganisation } from './Components/ListOrganisation';
// import  FooterComponent  from './Components/FooterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <HeaderComponent/>
      <Router>
        <Routes>
          {/* <Route path="/login" element={} /> */}
          {/* <Route path="/organisation/:id" element={<Details data={data} reviews={reviews} onDelete={deleteReview} onAdd={addReview} onBuy={addProduct}/>}></Route> */}
          <Route path="/organisation" element={
            <div className="container">
              <ListOrganisation/>
            </div>
             
          } />
          <Route path="/createorganisation/:id" element={
            <div className="container">
              <CreateOrganisation/>
            </div>
             
          } />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
