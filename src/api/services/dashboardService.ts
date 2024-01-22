import axios from "../config/axiosInstance"

const hrDashboard = async (
  unitId: string,
  empCategory: string,
  dated: string
) => {
  try {
    const response = await axios.get(
      `/dashboard/hrDashboard/${unitId}/${empCategory}/${dated}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const hrDashboardDetail = async (
  heading:string,
  tag:string,
  unitId: string,
  empCategory: string,
  dated: string
) => {
  try {
    const response = await axios.get(
      `/dashboard/hrDashboard/hrDashboardDetail/${heading}/${tag}/${unitId}/${empCategory}/${dated}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const productionDashboard = async (
  unitId: string,
  orderCategory: string,
 ) => {
  try {
    const response = await axios.get(
      `/dashboard/productionDashboard/${unitId}/${orderCategory}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const productionDashboardDetail = async (
  heading:string,
  tag:string,
  unitId: string,
  orderCategory: string,
  
) => {
  try {
    const response = await axios.get(
      `/dashboard/productionDashboard/productionDashboardDetail/${heading}/${tag}/${unitId}/${orderCategory}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


const stockDashboard = async (
  store: string,
  fromDate: string,
  toDate:string
 ) => {
  try {
    const response = await axios.get(
      `/dashboard/stockDashboard/${store}/${fromDate}/${toDate}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const stockDashboardDetail = async (
  heading:string,
  tag:string,
  store: string,
  fromDate: string,
  toDate:string
 ) => {
  try {
    const response = await axios.get(
      `/dashboard/stockDashboard/stockDashboardDetail/${heading}/${tag}/${store}/${fromDate}/${toDate}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const stockReceivingMonthWise = async (
  heading:string,
  tag:string,
  store: string,
  fromDate: string,
  toDate:string
 ) => {
  try {
    const response = await axios.get(
      `/dashboard/stockDashboard/stockDashboardDetail/monthWiseReceiving/${heading}/${tag}/${store}/${fromDate}/${toDate}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const accountDashboard = async (
  dated: string,
  ) => {
  try {
    const response = await axios.get(
      `/dashboard/accountDashboard/${dated}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const accountDashboardDetail = async (
  heading:string,
  tag:string,
  dated: string,
  ) => {
  try {
    const response = await axios.get(
      `/dashboard/accountDashboard/accountDashboardDetail/${heading}/${tag}/${dated}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const exportDashboard = async (
  unitId: string,
  ) => {
  try {
    const response = await axios.get(
      `/dashboard/exportDashboard/${unitId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const exportDashboardDetail = async (
  heading:string,
  tag:string,
  unitId: string,
  ) => {
  try {
    const response = await axios.get(
      `/dashboard/exportDashboard/exportDashboardDetail/${heading}/${tag}/${unitId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


export { 
  hrDashboard,
  hrDashboardDetail,
  productionDashboard,
  productionDashboardDetail,
  stockDashboard,
  stockDashboardDetail,
  stockReceivingMonthWise,
  accountDashboard,
  accountDashboardDetail,
  exportDashboard,
  exportDashboardDetail
 };