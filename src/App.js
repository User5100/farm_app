import React, { Component } from 'react'
import styled from 'styled-components'

import { FARM_URL, CROPS_URL } from './config'
import { getDataFromUrl, parseDataFromAPI,
				calculateYield, sumYields } from './helpers'

import Fields from './Fields'
import Crops from './Crops'
import Visualisation from './Visualisation'

class App extends Component {
  constructor () {
    super()
    this.state = {
      fields: [],
      crops: [],
      selectedField: {},
      totalFarmYield: 0
    }

    this.getAppData = this.getAppData.bind(this)
    this.setSelectedField = this.setSelectedField.bind(this)
    this.addCropToField = this.addCropToField.bind(this)
    this.removeCropFromField = this.removeCropFromField.bind(this)
  }

  getAppData () {
    var farmDataPromise
    var cropsDataPromise
    farmDataPromise = getDataFromUrl(FARM_URL)
    cropsDataPromise = getDataFromUrl(CROPS_URL)

    return Promise
			.all([farmDataPromise, cropsDataPromise])
			.then(parseDataFromAPI)
			.catch(err => console.log('Error retrieving data from APIary endpoint: ', err))
  }

  setSelectedField (selectedField) {
    this.setState({ selectedField })
  }

  addCropToField (crop) {
    var { fields, selectedField } = this.state
    var yieldValue = calculateYield(selectedField, crop)
    var totalFarmYield

		// Add calculated yield value and crop to field
    selectedField = Object.assign(
			{},
			selectedField,
			{ crop: { name: crop.name, yieldValue } })

		// Update fields to include field with additional yield value and crop
    fields = [...fields.filter(field => field.name !== selectedField.name),
      selectedField]

    totalFarmYield = sumYields(fields)

		// Update fields state
    this.setState({ fields, totalFarmYield, selectedField })
  }

  removeCropFromField () {
    var { fields, selectedField } = this.state
    var totalFarmYield
		// Add calculated yield value and crop to field
    selectedField = Object.assign(
			{},
			selectedField,
			{ crop: { name: null, yieldValue: 0 } })

		// Update fields to include field with additional yield value and crop
    fields = [...fields.filter(field => field.name !== selectedField.name),
      selectedField]

    totalFarmYield = sumYields(fields)

		// Update fields state
    this.setState({ fields, totalFarmYield, selectedField })
  }

  componentDidMount () {
    this.getAppData()
			.then(value => {
  this.setState(value, () => {
					// Set initial field
    this.setState({ selectedField: this.state.fields[0] })
  })
})
  }
  render () {
    let { fields, crops, selectedField, totalFarmYield } = this.state

    return (
      <AppContainer>
        <Visualisation
          totalFarmYield={totalFarmYield}
          selectedField={selectedField}
          removeCropFromField={this.removeCropFromField} />
        <Fields
          fields={fields}
          setSelectedField={this.setSelectedField} />
        <Crops
          addCropToField={this.addCropToField}
          crops={crops} />
      </AppContainer>
    )
  }
}

const AppContainer = styled.div`
	height: 100vh;
	display: grid;
	grid-template: 
		[visual-top] "visual visual" 3fr [visual-bottom]
		[main-top] "fields crops" 4fr [main-bottom]
								/4fr 4fr;
	grid-gap: 8px;
`

export default App
