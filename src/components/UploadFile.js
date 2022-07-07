import { getThemeProps } from '@material-ui/styles';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './UploadFile.module.css'

const changeHandler = (close, e, handleOnChangeToppingsListItem, i)=>{
    console.log('change handler');
    console.log('closing modal' + e.target.value);
    handleOnChangeToppingsListItem(e, i);
    close();

}

const handleSubmission = ()=>{
    console.log('handle submission')
}



export default (props) => { 
  var photoURL;
  if (props.photo instanceof Blob || props.photo instanceof File){
      photoURL = URL.createObjectURL(props.photo);
  }else {
    var binaryData = [];
    binaryData.push(props.photo);
    photoURL = window.URL.createObjectURL(new Blob(binaryData, {type: "image/png"}))
  }
  return (
  <Popup trigger={ props.photo == undefined?<i className="fa fa-upload" aria-hidden="true"></i> :<div><img src={photoURL} width={"17px"}/></div>   } modal nested>
    {close => (
      <div className={styles.modal}>
        <button className={[styles.close]} onClick={close}>
          &times;
        </button>
        
        <div className={styles.header}> Upload picture! </div>
        <div>
          <br/>
      {props.photo == undefined ? null : <div><img src={photoURL} width={"100%"}/></div>}
      <div><input type="file" name="photo" onChange = {(e)=>changeHandler(close, e, props.handleOnChangeToppingsListItem, props.i)} />
      </div>
			<br/><br/>
		</div>
    {/*
        <div className={styles.actions}>
          <Popup
            trigger={<button className={styles.button}> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
         
        </div>
    */}
      </div>
    )}
  </Popup>
  
  )
  };