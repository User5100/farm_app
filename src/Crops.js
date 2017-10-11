import React, { Component } from 'react'
import styled from 'styled-components'
import { func, array } from 'prop-types'

import Crop from './Crop'

class Crops extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <CropsContainer>
        <h4>Crops (add or update crop for the selected field)</h4>
        {this.props.crops.map(crop => (
          <Crop
            addCropToField={this.props.addCropToField}
            key={crop.name}
            {...crop} />
				))}
      </CropsContainer>
    )
  }
}

const CropsContainer = styled.div`
	background: yellow;
	grid-area: crops;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
`

Crops.propTypes = {
  crops: array.isRequired,
  addCropToField: func.isRequired
}

export default Crops
