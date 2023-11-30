import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import OrganisationService from '../Services/OrganisationService';

export const ListOrganisationHr = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [organisationHr, setOrganisationHr] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const organisationId = params.id;

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    OrganisationService.getOrganisationById(organisationId).then((res) => {
      setOrganisationHr(res.data.organisationHr);
    });
  }, [organisationId]);

  const handleUpdate = (id) => {
    navigate(`/createorganisation/${organisationId}/hr/${id}`);
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this organisation?');

    if (shouldDelete) {
      OrganisationService.deleteOrganisationHRById(id)
        .then((res) => {
          if (Object.keys(res.data).length > 0) window.location.reload();
        })
        .catch((error) => {
          console.error('Delete Failed:', error.message);
          // Handle errors or display a user-friendly message
        });
    }
  };

  // Filter the displayed data based on the search term
  const filteredOrganisationHr = organisationHr.filter((org) => {
    const fullName = `${org.first_name} ${org.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || org.email.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2 className="text-center">Organisation's Hr List</h2>
      <div style={{ margin: '15px' }}>
        <Link to={`/createorganisation/${organisationId}/hr/-1`} className="btn btn-primary">
          Add HR
        </Link>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mt-2"
        />
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganisationHr.map((org) => (
              <tr key={org.id}>
                <td>{org.first_name}</td>
                <td>{org.last_name}</td>
                <td>{org.email}</td>
                <td>{org.contact_number}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleUpdate(org.id)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(org.id)}>
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
