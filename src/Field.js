import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const Field = (props) => {
  return (
    <FieldContainer
      onClick={() => props.setSelectedField(props)}>
      <span>{props.name}</span>
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
	background: transparent;
	flex: 1;
	border: 1px solid black;
	&:hover {
		cursor: pointer;
		background: rebeccapurple;
		color: #FFF;
	}
`

Field.propTypes = {
  name: string.isRequired,
  setSelectedField: func.isRequired
}

export default Field
