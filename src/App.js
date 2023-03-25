import React, { useState } from 'react';
import './App.css';

function App() {
  const [pincode, setPincode] = useState('');
  const [filteredPostOffices, setFilteredPostOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePincodeChange = event => {
    setPincode(event.target.value.trim());
    setFilteredPostOffices([]);
    setError('');
  };

  const handleFilterChange = event => {
    const filter = event.target.value.trim().toLowerCase();
    setFilteredPostOffices(postOffices => {
      if (filter === '') {
        return [];
      } else {
        return postOffices.filter(postOffice => postOffice.Name.toLowerCase().includes(filter));
      }
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    
    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit Indian Postal Code.');
      return;
    }

    
    setIsLoading(true);

    
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
        setIsLoading(false);

        
        if (data[0].Status !== 'Success') {
          throw new Error(data[0].Message);
        }

        
        setFilteredPostOffices(data[0].PostOffice);

        
        setError('');
      })
      .catch(error => {
        
        setIsLoading(false);

        
        setError(error.message);
      });
    };

  return (
    <div>
      <h1 id="heading">Enter Pincode</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="pincode" placeholder='Pincode'></label>
        <input type="text" id="pincode" name="pincode"  placeholder='Pincode' maxLength="6" required value={pincode} onChange={handlePincodeChange} />
        <button id="button" type="submit" link to="/LandingPage">Lookup</button>
       
      </form>
     
      <hr />
      <div>
        
        
      </div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <table id="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch Type</th>
              <th>Delivery Status</th>
              <th>District</th>
              <th>Division</th>
            </tr>
          </thead>
          <tbody>
            {filteredPostOffices.length === 0 ? (
              <tr>
                <td>{error || "Couldn't find the postal data you're looking for..."}</td>
              </tr>
            ) : (
              filteredPostOffices.map(postOffice => (
                <tr key={postOffice.Name}>
                  <td>{postOffice.Name}</td>
                  <td>{postOffice.BranchType}</td>
                  <td>{postOffice.DeliveryStatus}</td>
                  <td>{postOffice.District}</td>
                  <td>{postOffice.Division}</td>
                </tr>
               
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  ) 
              }
              
      
              export default App;
