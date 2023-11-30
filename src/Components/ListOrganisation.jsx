import OrganisationService from '../Services/OrganisationService';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const ListOrganisation = () => {
  const navigate = useNavigate();
  const [organisations, setOrganisations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    OrganisationService.getAllOrganisations().then((res) => {
      setOrganisations(res.data);
    });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  const handleUpdate = (id) => {
    navigate('/createorganisation/' + id);
  };

  const handleHr = (id) => {
    navigate('/organisation/' + id +'/hr');
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this organisation?');

    if (shouldDelete) {
      OrganisationService.deleteOrganisationById(id)
        .then((res) => {
          if (Object.keys(res.data).length > 0) window.location.reload();
        })
        .catch((error) => {
          console.error('Delete Failed:', error.message);
          // Handle errors or display a user-friendly message
        });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganisations = organisations.filter((org) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return org.name.toLowerCase().includes(lowerCaseTerm) || org.address.toLowerCase().includes(lowerCaseTerm);
  });

  return (
    <div>
      <h2 className='text-center'>Organisation List</h2>
      <div style={{ margin: '15px' }}>
        <Link to={`/createorganisation/-1`} className='btn btn-primary'>
          Add Organisation
        </Link>
      </div>
      <div className='row'>
        <div className='mb-3'>
          <label htmlFor='search' className='form-label'>
            Search:
          </label>
          <input
            type='text'
            className='form-control'
            id='search'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Name of the Organisation</th>
              <th>Address of the Organisation</th>
              <th>Action</th>
              <th>Action</th>
              <th>Go to Hr</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganisations.map((org) => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.address}</td>
                <td>
                  <button className='btn btn-warning' onClick={() => handleUpdate(org.id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(org.id)}>
                    Delete
                  </button>
                </td>
                <td>
                    <button className='btn btn-success' onClick={() => handleHr(org.id)}>
                        Show HR Details
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
