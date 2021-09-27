import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './Container.module.css';
import ChecklistOriginal from './Checklist-original';
import { useState, useEffect } from 'react';


export default function SimpleContainer(props) {

  const [ids, setIds] = useState([{"id": 1,"name": "Coles","changing":false},
  {"id": 2,"name": "Indian Store","changing":false},{"id": 3,"name": "Big Daddy's","changing":false}]);

  const[addingChecklist, setAddingChecklist] = useState({"adding":false,"checklistName":""});

  useEffect(()=>{
      console.log("id has changed", JSON.stringify(ids));
  },[ids]);

  useEffect(()=>{
    console.log("id has changed", JSON.stringify(ids));
    fetchChecklists().then((data)=>{
      console.log("useEffect container fetch ", JSON.stringify(data));
      if(!data.error){
        setIds(data);
      }
          
    });
  },[]);

  const changeName = (id, e) => {
    setIds(ids=>{
      return ids.map(obj => {
        if(obj.id === id){
          obj.name = e.target.value;
        }
        return obj;
      })
    });

  };

  const markDeleted = (id, e) => {
    var markedIds = [...ids];
    
    markedIds.map(obj => {
        if(obj.id === id){
          console.log("updating deleted as true");
          obj.deleted = true;
        }
        return obj;
      })
    
    console.log("markedIds", JSON.stringify(markedIds));
    saveUpdatedChecklists(markedIds);

  };

  const changeNameIndicator = (id, changing) => {
    setIds(ids=>{
      return ids.map(obj => {
        if(obj.id === id){
          obj.changing = changing;
        }
        return obj;
      })
    });
    if(changing === false){
      console.log("making api call to save ids");
      saveChecklists(id);
    }else{
      console.log(changing);     
    }
  };


  const saveChecklists = (id)=>{
    const saveIds = ids.map(obj => {
      if(obj.id === id){
        obj.changing = false;
      }
      return obj;
    });
    var request = {
      ids: saveIds,
      method: "saveChecklists",
      email:props.email
    }
    console.log('posting request', JSON.stringify(request));
    const response = fetch(process.env.REACT_APP_API_URL,
      {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
      }
   ).then(data => { console.log("response" + JSON.stringify(data.json())) });   
  }

  const saveUpdatedChecklists = (updatedIds)=>{
    
    var request = {
      ids: updatedIds,
      method: "saveChecklists",
      email:props.email
    }
    console.log('saveUpdatedChecklists posting request', JSON.stringify(request));
    const response = fetch(process.env.REACT_APP_API_URL,
      {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
      }
   ).then(data => { console.log("response saveUpdatedChecklists" + JSON.stringify(data.json()))
   setIds(updatedIds); });   
  }

  const  fetchChecklists =  ()=>{
    var request = {
      "method": "fetchChecklists",
      "email" : props.email
    }
    console.log('posting request', JSON.stringify(request));
    const response = fetch(process.env.REACT_APP_API_URL,
      {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
      }
   ).then(data => { 
     var json = data.json();
      console.log("fetching for the first time" + JSON.stringify(json)); 
      return json;
    }).catch(e=>{
      console.log("exception occurred", e);
      return null;
    });
    console.log("returning from fetchChecklists", JSON.stringify(response));
    return response;
  }

  const addNewChecklist = ()=>{
      var updatedIds = [...ids, {id : ids.length  + 1, name : addingChecklist.checklistName, changing : false}];
      setAddingChecklist({adding:false, checklistName:""});
      saveUpdatedChecklists(updatedIds);

  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#3163c7', height: `${ids.length * 100}vh` }} >

        {ids != null && ids.map(({ id, name, changing, deleted}, index) => { 
          return deleted==null || deleted === false? (
          <div key={id}>
          <ChecklistOriginal key={id} name={name} id={id} changing={changing} email={props.email} changeName={changeName} changeNameIndicator={changeNameIndicator} markDeleted={markDeleted}/>
          <br/>
          </div>
        ):
         null;
        })}
        <p></p>
        {!addingChecklist.adding?<h3>Add New Checklist &nbsp;
        <i className="fa fa-pencil" aria-hidden="true" onClick={(e)=> setAddingChecklist({adding:true, checklistName:""})}> </i>
         </h3>:
         <div><input type="text" value={addingChecklist.checklistName} name="addChecklisttext" onChange={(e)=>setAddingChecklist({adding:true, checklistName:e.target.value})}
              ></input>
         &nbsp;&nbsp;&nbsp;
         <i className="fa fa-check-square-o" onClick={() => addNewChecklist()}></i>
   </div> }
                
            </Typography>
      </Container>
    </React.Fragment>
  );
}
