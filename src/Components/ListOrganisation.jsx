import OrganisationService from '../Services/OrganisationService';
import { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

export const ListOrganisation = () => {
    const navigate = useNavigate();
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    OrganisationService.getAllOrganisations().then((res) => {
      setOrganisations(res.data);
    });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  const handleUpdate = (id) => {
    navigate('/createorganisation/'+id)
  };

  const handleDelete = (id) => {
    // Action for Delete button
    const shouldDelete = window.confirm('Are you sure you want to delete this organisation?');

    if (shouldDelete) {
      // Add your logic or function call for deletion
      OrganisationService.deleteOrganisationById(id).then((res)=>{
        if (Object.keys(res.data).length > 0) 
        window.location.reload();

      })
      .catch((error) => {
        console.error('Delete Failed:', error.message);
        // Handle errors or display a user-friendly message
      });
    //   if (Object.keys(response.data).length > 0) 
    }
  };

  return (
    <div>
      <h2 className='text-center'>Organisation List</h2>
      <div style={{ margin: '15px' }}>
        <Link to={`/createorganisation`} className='btn btn-primary'>
          Add Organisation
        </Link>
      </div>
      <div className='row'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Name of the Organisation</th>
              <th>Address of the Organisation</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {organisations.map((org) => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.address}</td>
                <td>
                  <button className='btn btn-warning' onClick={()=>handleUpdate(org.id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(org.id)}>
                    Delete
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
