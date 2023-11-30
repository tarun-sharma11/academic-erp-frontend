import OrganisationService from '../Services/OrganisationService';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOrganisationHr = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [organizationHr, setOrganizationHr] = useState({
    id: params.hrid,
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    organisation: {
        id:'',
        name:'',
        address:''
    }
  });
  const [errors, setErrors] = useState({
    email: '',
    contact_number: '',
  });
  const fetchOrganizationData = async () => {
    try {
      const response = await OrganisationService.getOrganisationById(params.id);
      // Destructure the response data
      const { id,name,address } = response.data;
        const initializeOrg = {  // Access the nested 'organisation' field directly
          
              id,
              name,
              address
            }
          
      // Update the state
      setOrganizationHr({
        organisation: initializeOrg
      });
    } catch (error) {
      console.error('Error fetching organizationHr data:', error.message);
    }
  };

  const fetchOrganizationHrData = async () => {
    try {
      const response = await OrganisationService.getOrganisationHRById(params.hrid);
  
      // Destructure the response data
      const { id, first_name, last_name, email, contact_number, organisation } = response.data;
  
      // Update the state
      setOrganizationHr({
        id,
        first_name,
        last_name,
        email,
        contact_number,
        organisation: {  // Access the nested 'organisation' field directly
          ...organisation,
        },
      });
    } catch (error) {
      console.error('Error fetching organizationHr data:', error.message);
    }
  };
  

  useEffect(() => {
    if (params.hrid === '-1') {
      fetchOrganizationData();
    } else {
      // Fetch existing organizationHr data for update
      fetchOrganizationHrData();
    }
  }, [params.hrid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate email format
    if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? '' : 'Enter a valid email address',
        }));
      }
  
      // Validate contact number format (assuming a 10-digit number)
      if (name === 'contact_number') {
        const contactNumberRegex = /^\d{10}$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact_number: contactNumberRegex.test(value) ? '' : 'Enter a 10-digit contact number',
        }));
      }
    // Check if the input field is part of the nested 'organisation' object
    if (name === 'name' || name === 'address') {
      // Update the nested field within 'organisation'
      setOrganizationHr((prevOrg) => ({
        ...prevOrg,
        organisation: {
          ...prevOrg.organisation,
          [name]: value,
        },
      }));
    } else {
      // Update the direct field of 'organizationHr'
      setOrganizationHr((prevOrg) => ({
        ...prevOrg,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Check for validation errors before submitting
     if (errors.email || errors.contact_number) {
        console.log('Form has errors. Please fix them before submitting.');
        return;
      }

    try {
      // Make a POST request using Axios
      let response;
      if (params.hrid === '-1') {
        console.log(organizationHr)
        response = await OrganisationService.createOrganisationHr(organizationHr);
      } else {
        response = await OrganisationService.updateOrganisationHr(params.hrid, organizationHr);
      }
      if (Object.keys(response.data).length > 0) navigate('/organisation/'+params.id+"/hr");
      // Handle the response as needed
      console.log('Server Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">HR Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={organizationHr.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={organizationHr.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={organizationHr.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="contact_number" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className={`form-control ${errors.contact_number ? 'is-invalid' : ''}`}
            id="contact_number"
            name="contact_number"
            value={organizationHr.contact_number}
            onChange={handleChange}
            required
          />
          {errors.contact_number && <div className="invalid-feedback">{errors.contact_number}</div>}
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateOrganisationHr;
