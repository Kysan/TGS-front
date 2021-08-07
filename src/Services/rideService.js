const { default: axios } = require("axios")
const { toast } = require("react-toastify")
const { default: API } = require("../API")




const searchRide = async (startLatitude,
    startLongitude,
    endLatitude,
    endLongitude) => {
    try {
        const { data: offers } = await API.post("/rides", {
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude
        })
        return offers
    } catch (error) {
        if (error.response.data.message)
            toast.error(error.response.data.message)
        else
            toast.error(error.toString())
        return null
    }
}



module.exports = { searchRide }