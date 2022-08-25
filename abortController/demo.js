/*
 * @Author: ymz
 * @Date: 2022/08/25
 * @Description: 
 */
import abortController from '../utils/abortController.js'

const serve = axios.create();

serve.interceptors.request.use(config => {
  if(!abortController.whiteRequest.includes(`${config.url}`)){
    abortController.removePending(config)
    abortController.addPending(config)
  }
  return config
})

serve.interceptors.response.use(response => {
  abortController.removePending(response.config);
})

export default serve