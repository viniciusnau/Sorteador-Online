import axios from "axios";
import { PATH } from "../PATH";
import {FilterEmployee, FilterHistory, FilterUserProfile} from "../Types/Types";

const buildQueryParams = (filter: FilterEmployee, page: number) => {
  const queryParams = new URLSearchParams();

  if (filter.name) queryParams.append('name', filter.name);
  if (filter.city) queryParams.append('city', filter.city);
  if (filter.team) queryParams.append('team', filter.team);
  if (filter.is_active) queryParams.append('is_active', filter.is_active);
  if (filter.role) queryParams.append('role', filter.role);
  if (filter.return_date) queryParams.append('return_date', filter.return_date);
  if (filter.email) queryParams.append('email', filter.email);
  if (filter.start_date) queryParams.append('start_date', filter.start_date);
  if (filter.end_date) queryParams.append('end_date', filter.end_date);
  if (filter.is_outsourced) queryParams.append('is_outsourced', filter.is_outsourced);
  if (page) queryParams.append('page', page.toString());

  return queryParams.toString();
};

const buildQueryParamsEmployeePDF = (filter: FilterEmployee) => {
  const queryParams = new URLSearchParams();

  if (filter.name) queryParams.append('name', filter.name);
  if (filter.city) queryParams.append('city', filter.city);
  if (filter.team) queryParams.append('team', filter.team);
  if (filter.is_active) queryParams.append('is_active', filter.is_active);
  if (filter.role) queryParams.append('role', filter.role);
  if (filter.return_date) queryParams.append('return_date', filter.return_date);
  if (filter.email) queryParams.append('email', filter.email);
  if (filter.start_date) queryParams.append('start_date', filter.start_date);
  if (filter.end_date) queryParams.append('end_date', filter.end_date);
  if (filter.is_outsourced) queryParams.append('is_outsourced', filter.is_outsourced);

  return queryParams.toString();
};

const buildUserProfileQueryParams = (filter: FilterUserProfile) => {
  const queryParams = new URLSearchParams();

  if (filter.start_date) queryParams.append('start_date', filter.start_date);
  if (filter.end_date) queryParams.append('end_date', filter.end_date);
  if (filter.email) queryParams.append('email', filter.email);

  return queryParams.toString();
};

const services = {
  getEmployee: async (filter: FilterEmployee, page:number) => {
    const queryString = buildQueryParams(filter, page);
    const url = `${PATH.base}/employees/?${queryString}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getHistory: async (filter: FilterHistory, page:number) => {
    const queryString = buildQueryParams(filter, page);
    const url = `${PATH.base}/logs/?${queryString}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getEmployeePDF: async (filter: FilterEmployee) => {
    const queryString = buildQueryParamsEmployeePDF(filter);
    const url = `${PATH.base}/pdf-employees/?${queryString}`;
  
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  createEmployee: async (body: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.post(`${PATH.base}/employees/`, body, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateEmployee: async (id: string, body: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.patch(`${PATH.base}/employees/${id}/`, body, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  uploadImage: async (id: string, imageFile: File) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const formData = new FormData();
    formData.append('image', imageFile);

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.patch(`${PATH.base}/employees/${id}/`, formData, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteEmployee: async (id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.delete(`${PATH.base}/employees/${id}/`, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getTeams: async (is_outsourced: boolean) => {
    if (!is_outsourced) {
      try {
        const response = await axios.get(`${PATH.base}/list-teams/`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    else {
      try {
        const response = await axios.get(`${PATH.base}/list-teams/?is_outsourced=true`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },

  getCities: async (is_outsourced: boolean) => {
    if (!is_outsourced) {
      try {
        const response = await axios.get(`${PATH.base}/list-cities/`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    else {
      try {
        const response = await axios.get(`${PATH.base}/list-cities/?is_outsourced=true`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },

  getRoles: async (is_outsourced: boolean) => {
    if (!is_outsourced) {
      try {
        const response = await axios.get(`${PATH.base}/list-roles/`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    else {
      try {
        const response = await axios.get(`${PATH.base}/list-roles/?is_outsourced=true`);
        return response.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },

  createSupervisor: async (body: { employee: string; team: string }) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.post(`${PATH.base}/supervisor/`, body, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteSupervisor: async (employee: string, team: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const url = new URL(`${PATH.base}/supervisor/`);
      url.searchParams.append('employee', employee);
      url.searchParams.append('team', team);

      const response = await axios.delete(url.toString(), header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getEmployees: async () => {
    try {
        const response = await axios.get(`${PATH.base}/list-employees/`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
},

  getEmployeesByTeam: async (filter: any, page:number) => {
    const queryString = buildQueryParams(filter, page);
    const url = `${PATH.base}/employees-by-team/?${queryString}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  createUser: async (body: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.post(`${PATH.base}/create-user/`, body, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  uploadImageUser: async (id: string, imageFile: FormData) => { 
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
        headers: {
            Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
            'Content-Type': 'multipart/form-data', 
        },
    };

    try {
        const response = await axios.patch(`${PATH.base}/update-user/${id}/`, imageFile, header);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
},

  getUserProfiles: async (filter: FilterUserProfile) => {
    const queryString = buildUserProfileQueryParams(filter);
    const url = `${PATH.base}/users/?${queryString}`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getUsersPDF: async (filter: FilterUserProfile) => {
    const queryString = buildUserProfileQueryParams(filter);
    const url = `${PATH.base}/pdf-users/?${queryString}`;

    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };

    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  
  deleteUser: async (userId: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
  
    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${apiToken || sessionStorage.getItem("credentials")}`,
      },
    };
  
    try {
      const response = await axios.delete(`${PATH.base}/delete-user/${userId}/`, header);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getLogin: async (credentials: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization: "Basic " + btoa(`${credentials.username}:${credentials.password}`),
      },
    };

    try {
      const response = await axios.get(PATH.base + "/employees/", headers);
      return response;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  },

  resetPassword: async (body: any) => {
    return axios
      .post(`${PATH.base}/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;