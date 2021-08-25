import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './Signin.module.css';
import ChecklistOriginal from './Checklist-original';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import bgImage from './../images/checklist.jpg'

export default (props)=>{


    const customStyles = {
        content: {
          top: '45%',
          left: '47%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          width: '30%',
          transform: 'translate(-40%, -10%)',
          backgroundColor: '#3163c7'
        },
      };

    return(
   
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Typography component="div" style={{ backgroundColor: '#3f24b6', height: '180vh' }} >
          <h3>&nbsp;</h3>
          <h3>&nbsp;</h3>
          <h3>&nbsp;</h3>
          
          
          <Modal
            isOpen={true}
            contentLabel="Example Modal"
            style={customStyles}>   
             <div className={styles.insidemodal}> 
            <h3>Please log in to use this application</h3>
            <h3>&nbsp;</h3>
           
                <button className={styles.Button} type="button" onClick={props.login}> Log in with Google</button>
            </div>  
          </Modal>   
          <img className={styles.checklist} src={bgImage}></img>  
              </Typography>
        </Container>
      </React.Fragment>

   );

}

//<button className={styles.Button} type="button" onClick={props.login}> Log in with Google</button>