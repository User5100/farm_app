import React, { Component } from 'react'
import styled from 'styled-components'
import { func, array } from 'prop-types'

import Field from './Field'

class Fields extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <FieldsContainer>
        <h4>Select a Field (and view summary info above)</h4>
        {this.props.fields.map(field => (
          <Field
            setSelectedField={this.props.setSelectedField}
            key={field.name}
            {...field} />
				))}
      </FieldsContainer>
    )
  }
}

const FieldsContainer = styled.div`
	background: lightgreen;
	grid-area: fields;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
`

Fields.propTypes = {
  fields: array.isRequired,
  setSelectedField: func.isRequired
}

export default Fields
