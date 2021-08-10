import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import SimpleContainer from './components/Container';
import { signInWithGoogle } from './firebase/firebase.utils';
import { auth } from './firebase/firebase.utils';
import Signin from './components/Signin';

/*
function App() {
  return (
    <div className="App">
      <Nav/>
      <SimpleContainer/>
    </div>
  );
}
*/



class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        {

          this.state.currentUser ?

            (<div>

              <Nav photoURL={this.state.currentUser.photoURL}
                displayName={this.state.currentUser.displayName}
                email={this.state.currentUser.email}
                logout={() => auth.signOut()} />
              <SimpleContainer email={this.state.currentUser.email}/>
            </div>

            ) :
              <Signin login={signInWithGoogle}/>
            

        }
      </div >
    );
  }
}


export default App;
//<button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
