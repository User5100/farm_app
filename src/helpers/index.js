import * as axios from 'axios'

export function getDataFromUrl (url) {
  return axios.get(url)
}

export function parseDataFromAPI (data) {
  var [farmData, cropData] = data
  var { data } = farmData
  var { fields } = data
  var { data: crops } = cropData

  return { fields, crops }
}

export function calculateYield (field, crop) {
  let yieldValue
  let { hectares, disease_susceptibility: fieldRisk } = field
  let { disease_risk_factor: cropRisk, price_per_tonne: price, expected_yield: aveYield } = crop

  yieldValue = (aveYield * hectares) / (cropRisk * fieldRisk) * price
  return yieldValue
}

export function sumYields (fields) {
  let sumYieldValues

  sumYieldValues = fields
			.map(field => {
				// Check if field has been assigned a crop
				// if not, there is no yield so return 0
  if (field.crop) {
    return field.crop.yieldValue
  } else return 0
})
			.reduce((sum, value) => sum + value, 0)

  return sumYieldValues
}
