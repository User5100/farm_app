import React, { Component } from 'react'
import styled from 'styled-components'
import { object, number, func } from 'prop-types'

class Visualisation extends Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }

    this.draw = this.draw.bind(this)
  }

  draw(coordinates) {
		// TODO
		// Find the max and min latitude and longitude values
		// Then scale to the height and width values of the canvas
		// Then draw
    if (this.canvas.getContext) {
      var ctx = this.canvas.getContext('2d')

      ctx.beginPath()

      coordinates[0]
				.map(position => {
  let x, y
  let [lat, lon] = position

  x = this.canvas.clientWidth / 360 * (180 + lon)
  y = this.canvas.clientHeight / 180 * (90 - lat)

  ctx.lineTo(x, y)
})

      ctx.closePath()
      ctx.stroke()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.selectedField !== this.props.selectedField) {
      var { boundary: { coordinates } } = this.props.selectedField

      this.draw(coordinates)
    }
  }

  render () {
    let { name } = this.props.selectedField
    let cropInfo
    let crop = this.props.selectedField.crop

    if (crop && crop.name) {
      cropInfo = (
        <p>{`The crop ${crop.name} has been added to field: ${name} and is expected to produce a yield of ${crop.yieldValue}`}</p>
			)
    } else {
      cropInfo = (
        <p>{`No crop has been added to field: ${name}. Please add a crop.`}</p>
			)
    }

    return (
      <VisualisationContainer>
        <h4>Field Selected: {name}</h4>
        {cropInfo}
        <h5>Total Farm Yield: {this.props.totalFarmYield}</h5>
        <canvas
          ref={canvas => this.canvas = canvas} />
        <button
          onClick={this.props.removeCropFromField}>Remove crop from selected field</button>
      </VisualisationContainer>
    )
  }
}

const VisualisationContainer = styled.div`
	grid-area: visual;
	border: 1px solid black;
`

Visualisation.propTypes = {
  selectedField: object.isRequired,
  totalFarmYield: number.isRequired,
  removeCropFromField: func.isRequired
}

export default Visualisation
