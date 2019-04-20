import React, * as react from 'react'
import TaskCard from './TaskCard'

export class MapTasks extends react.Component {
  render () {
    return (
      this.props.tasks.map(task => {
        return <TaskCard data={task} />
      })
    )
  }
}

export default MapTasks
