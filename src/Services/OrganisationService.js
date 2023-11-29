import axios from "axios";

const ORG_API_BASE_URL = "http://localhost:9191/api/v1/organisations";
const ORG_BY_ID_API_BASE_URL = "http://localhost:9191/api/v1/organisation";

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
}

const organisationServiceInstance = new OrganisationService();

export default organisationServiceInstance;
