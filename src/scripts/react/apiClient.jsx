import axios from 'axios'
import ApiConfig from '../../asset/acGuideApi.jsx'

export default {
	// set api method
	GetList: (args) => {
		const url = ApiConfig['GetList']
		return axios.get(url, { params: args })
	}
}