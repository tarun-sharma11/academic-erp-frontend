import OrganisationService from '../Services/OrganisationService';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOrganisation = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [organization, setOrganization] = useState({
    id: params.id,
    name: '',
    address: '',
  });

  const fetchOrganizationData = async () => {
    try {
      const response = await OrganisationService.getOrganisationById(params.id);
      setOrganization(response.data);
    } catch (error) {
      console.error('Error fetching organization data:', error.message);
    }
  };

  useEffect(() => {
    if (params.id === '-1') {
      return;
    } else {
      // Fetch existing organization data for update
      fetchOrganizationData();
    }
  }, [params.id]); // Include fetchOrganizationData in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request using Axios
      let response;
      if (params.id === '-1') {
        response = await OrganisationService.createOrganisation(organization);
      } else {
        response = await OrganisationService.updateOrganisation(params.id, organization);
      }
      if (Object.keys(response.data).length > 0) navigate('/organisation');
      // Handle the response as needed
      console.log('Server Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Organization Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Organization Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={organization.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Organization Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={organization.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateOrganisation;
