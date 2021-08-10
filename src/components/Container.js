import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checklist from './Checklist';
import ChecklistOriginal from './Checklist-original';
import { useState } from 'react';
import uuid from 'react-uuid'

export default function SimpleContainer(props) {

  const [ids, setIds] = useState([uuid(), uuid(), uuid()])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#3163c7', height: '180vh' }} >
            
            <ChecklistOriginal name="Coles" id="1" email={props.email} />
            <br/>
            <ChecklistOriginal name="Indian Store " id="2" email={props.email}/>
            <br/>
            <ChecklistOriginal name="Big Daddy's" id="3" email={props.email}/>
            </Typography>
      </Container>
    </React.Fragment>
  );
}
