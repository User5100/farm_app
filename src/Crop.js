import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const Crop = (props) => {
  return (
    <CropContainer
      onClick={() => props.addCropToField(props)}>
      <span>{props.name}</span>
    </CropContainer>
  )
}

const CropContainer = styled.div`
	background: transparent;
	flex: 1;
	border: 1px solid black;
	&:hover {
		cursor: pointer;
		background: peru;
	}
`

Crop.propTypes = {
  name: string.isRequired,
  addCropToField: func.isRequired
}

export default Crop
