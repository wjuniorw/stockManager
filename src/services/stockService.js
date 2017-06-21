import _ from 'lodash'

const STOCK_ENDPOINT = 'http://localhost:4000'

class StockAppService {
  async getProducts() {
    const url = `${STOCK_ENDPOINT}/api/products`
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    if (!resp.ok) {
      throw new Error(`Falha na requisição ${resp.status}`)
    }
    const data = await resp.json()
    return data
  }
}

export default new StockAppService()
