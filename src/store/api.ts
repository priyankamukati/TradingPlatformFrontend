const axios = require('axios')

const api = axios.create({})

api.interceptors.request.use(
    async (config: any) => {
        try {
            
            // auth token stuff

        } catch (err) {

        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default api