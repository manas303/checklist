import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import SimpleContainer from './components/Container';
//import { signInWithGoogle } from './firebase/firebase.utils.js_bak';
//import { auth } from './firebase/firebase.utils.js_bak';
import Signin from './components/Signin';
import AWS from 'aws-sdk';
import { gapi } from 'gapi-script';
import {GoogleLogin,GoogleLogout} from 'react-google-login';




class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null,
      tokenObj: null,
      s3: null
    };
  }

   start() {
    console.log("initializing gapi client" + process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID);
    gapi.auth2.init({
      clientId: process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID
    });
  }

  unsubscribeFromAuth = null;


   onSignoutSuccess = ()=>{
    console.log("logging out");
    this.setState({
      currentUser:null
    });
   } 

   onLoginSuccess = (res) => {
    console.log('Login Success:', res);
    

    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: process.env.REACT_APP_S3_ROLE_ARN,
      WebIdentityToken: res.tokenObj.id_token // Access token from identity provider
    });

    var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'ap-southeast-2'});
    console.log("s3 -> " + JSON.stringify(s3));
    //setAwsToken(AWS.config.credentials);
    this.setState({
      currentUser:res.profileObj,
      tokenObj: res.tokenObj,
      s3: s3
    });
  };

  componentDidMount() {
    gapi.load('client:auth2', this.start);
  }

  render() {
    return (
      <div className='App'>
        {

          this.state.currentUser ?

            (<div>

              <Nav photoURL={this.state.currentUser.imageUrl}
                displayName={this.state.currentUser.name}
                email={this.state.currentUser.email}
                //logout={() => auth.signOut()} 
                onSignoutSuccess={this.onSignoutSuccess}
                />

              <SimpleContainer key={this.state.currentUser.email} email={this.state.currentUser.email} s3={this.state.s3} tokenObj={this.state.tokenObj}/>
            </div>

            ) :
            <Signin onSuccess={this.onLoginSuccess} onFailure={this.onLoginFailure}/>
  }
  {/*
            <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={this.onLoginSuccess}
                    onFailure={this.onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    plugin_name= "chat"
                />
                */
                }
      </div >
    );
  }
}


export default App;
//<button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
