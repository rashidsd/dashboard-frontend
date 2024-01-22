import axios from '../config/axiosInstance'

const getCompanyUnits = async()=> {
    try {
        const response =  await axios.get('utility/companyUnits')
        return response.data
    } catch (error) {
        return error
    }
}

const getCompanyUnitsWithAll = async()=> {
    try {
        const response =  await axios.get('utility/companyUnitsWithAll')
        return response.data
    } catch (error) {
        return error
    }
}

const getStoresWithAll = async()=> {
    try {
        const response =  await axios.get('utility/storesWithAll')
        return response.data
    } catch (error) {
        return error
    }
}

export  {
getCompanyUnits,
getCompanyUnitsWithAll,
getStoresWithAll
}