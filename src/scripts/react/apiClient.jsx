import axios from 'axios'
import { GetListUrl } from '../../asset/acGuideParams.jsx'

export default {
	// set api method
	GetList: (args) => {
		const url = GetListUrl
		return axios.get(url, { params: args })
	}
}