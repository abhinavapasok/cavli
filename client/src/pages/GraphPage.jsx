import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Chart1 from '../componets/Chart1'


function GraphPage() {
    const location = useLocation()
    const filekey = location.state.filekey


    console.log(location)
  return (
    <div>
        <Chart1 filekey = {filekey}/>
    </div>
  )
}

export default GraphPage