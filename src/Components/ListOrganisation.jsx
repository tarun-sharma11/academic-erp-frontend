import OrganisationService from '../Services/OrganisationService';
import { useState, useEffect } from 'react';

export const ListOrganisation = () => {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    OrganisationService.getAllOrganisations().then((res) => {
      setOrganisations(res.data);
    });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <h2 className='text-center'>Organisation List</h2>
      <div className='row'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Name of the Organisation</th>
              <th>Address of the Organisation</th>
            </tr>
          </thead>
          <tbody>
            {organisations.map((org) => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
