/*
 * @Author: ymz
 * @Date: 2022/08/25
 * @Description: axios 取消重复请求工具函数
 */

export default class abortController {
  // 声明一个 Map 用于存储每个请求的标识 和 取消函数
  static pedding = new Map()
  // 白名单，写接口名字
  static whiteRequest = []

  /**
   * @description: 得到该格式的url
   * @param {AxiosRequestConfig} config
   * @return {*}
   */  
  static getUrl(config) {
    return [config.method, config.url].join('&');
  }

  /**
   * 添加请求
   * @param {AxiosRequestConfig} config
   */
  static addPending(config) {
    const url = this.getUrl(config)
    // 每个请求时都新生成一个AbortController实例
    const controller = new AbortController()
    // 设置请求的signal字段为new AbortController()的signal
    config.signal = controller.signal
    if(!this.pedding.has(url)){
      this.pedding.set(url, controller)
    }
  }
  
  /**
   * @description: 移除请求
   * @param {AxiosRequestConfig} config
   * @return {*}
  */  
  static removePending(config) {
    const url = this.getUrl(config)
    const method = url.split('&')[1]
    if(this.pedding.has(url) && !this.whiteRequest.includes(method)){
      const controller = this.pedding.has(url)
      controller.abort()
      this.pedding.delete(url)
    }
  }
  
  /**
   * @description: 清楚pendding中的请求，在路由跳转中使用
   * @return {*}
   */  
  static clearPending() {
    for(const [url, controller] of this.pedding) {
      controller.abort()
    }
    this.pedding.clear()
  } 
  


}
