import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './Signin.module.css';
import ChecklistOriginal from './Checklist-original';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import bgImage from './../images/checklist.jpg'
import {GoogleLogin} from 'react-google-login';

export default (props)=>{


    const customStyles = {
        content: {
          top: '45%',
          left: '44.6%',
          right: 'auto',
          bottom: 'auto',
          width: '54%',
          marginRight: '-50%',
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
            contentLabel="Login Modal"
            style={customStyles}>   
             <div className={styles.insidemodal}> 
            <h3>Please log in!</h3>
            
           
                {//<button className={styles.Button} type="button" onClick={props.login}> Log in with Google</button>
                }
                <div className={styles.Button}>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={props.onSuccess}
                    onFailure={props.onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    plugin_name= "chat"
                />
                </div>
            </div>  
          </Modal>   
          <img className={styles.checklist} src={bgImage}></img>  
              </Typography>
        </Container>
      </React.Fragment>

   );

}

//<button className={styles.Button} type="button" onClick={props.login}> Log in with Google</button>