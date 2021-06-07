import React, { useImperativeHandle, useState } from 'react'
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
  
const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = () => {
    setVisibility(!visibility)
   }
  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })
  return (
    <div>
      <Accordion expanded={visibility} onChange={toggleVisibility}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Typography variant='h5' gutterBottom>{props.buttonLabel} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {props.children}
        </div>
      </AccordionDetails>
      </Accordion>
    </div>
  )
})
Togglable.displayName='Togglable'

export default Togglable
