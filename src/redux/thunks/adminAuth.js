
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// import { server } from '../../constants/Config'
import { validate } from '../../../../server/lib/validators';


const adminLogin = createAsyncThunk(
  "admin/Login",
  async (secretKey) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(`http://localhost:4000/api/v1/admin/varify`, { secretKey }, config);
      return data.message;
    } catch (error) {
      throw error.response.data.message;
    }

  }
);

const getAdmin = createAsyncThunk(
  "admin/getAdmin",
  async (secretKey) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/admin/`, { withCredentials: true });
      return data.admin;
    } catch (error) {
      throw error.response.data.message;
    }

  }
);

const adminLogout = createAsyncThunk(
  "admin/logout",
  async (secretKey) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/admin/logout`, { withCredentials: true });
      return data.message;
    } catch (error) {
      throw error.response.data.message;
    }

  }
);


export { adminLogin, getAdmin, adminLogout }