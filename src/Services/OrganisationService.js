import axios from "axios";

const ORG_API_BASE_URL = "http://localhost:9191/api/v1/organisations";

class OrganisationService {
  getAllOrganisations() {
    return axios.get(ORG_API_BASE_URL);
  }
}

const organisationServiceInstance = new OrganisationService();

export default organisationServiceInstance;
