import axios from 'axios'

export default {
    // get ac-guide sheet data
    GetList: (args) => {
        const url = 'https://script.google.com/macros/s/AKfycbz59fQboc4DbvelUIua8H8ANCvqRTqjG042hhdHdzHyzwY8kqo/exec'
        return axios.post(url, args)
        //return axios.get(url, { params: args })
    }
}