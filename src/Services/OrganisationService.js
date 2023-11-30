import axios from "axios";

const ORG_API_BASE_URL = "http://localhost:9191/api/v1/organisations";
const ORG_BY_ID_API_BASE_URL = "http://localhost:9191/api/v1/organisation";
const ORG_HR_BY_ID_API_BASE_URL = "http://localhost:9191/api/v1/organisation/hr";
const LOGIN_API_BASE_URL = "http://localhost:9191/api/v1/employee/login";
class OrganisationService {
  getAllOrganisations() {
    return axios.get(ORG_API_BASE_URL);
  }
  getOrganisationById(id){
    return axios.get(ORG_BY_ID_API_BASE_URL+"/"+id);
  }
  createOrganisation(organisation){
    return axios.post(ORG_API_BASE_URL,organisation);
  }
  updateOrganisation(id,organisation){
    return axios.put(ORG_BY_ID_API_BASE_URL+"/"+id,organisation);
  }
  deleteOrganisationById(id){
    return axios.delete(ORG_BY_ID_API_BASE_URL+"/"+id);
  }
  // HR services
  deleteOrganisationHRById(id){
    return axios.delete(ORG_HR_BY_ID_API_BASE_URL+"/"+id);
  }
  getOrganisationHRById(id){
    return axios.get(ORG_HR_BY_ID_API_BASE_URL+"/"+id);
  }
  createOrganisationHr(organisationHr){
    return axios.post(ORG_HR_BY_ID_API_BASE_URL+"s",organisationHr);
  }
  updateOrganisationHr(id,organisationHr){
    return axios.put(ORG_HR_BY_ID_API_BASE_URL+"/"+id,organisationHr);
  }
  // Login service
  loginEmployee(login){
    return axios.post(LOGIN_API_BASE_URL,login);
  }
}

const organisationServiceInstance = new OrganisationService();

export default organisationServiceInstance;
