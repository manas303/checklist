import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Checklist-original.module.css';
import UploadFile from './UploadFile.js'

const getFormattedPrice = (price) => `$${price}`;

export default (props) => {
    const [toppings, setToppings] = useState(
        []
    );

    const dataURLToBlob = async (res)=>{
        console.log("blob before blobbing" + res);
        return await fetch(res).then(res=>res.blob());
    }

    const blobToFile =  async(blob) => {
        return new File([blob], "File name",{ type: "image/png" });
    }

    useEffect(() => {
        let mounted = true;
        getData()
            .then(async(items) =>{
              for(var i = 0; i <  items.toppings.length; i++){
                    if(items.toppings[i].photo != null){
                        console.log(" the item is" + items.toppings[i].name + 
                        " and photo url is  " +  items.toppings[i].photo);
                      items.toppings[i].photo =  await dataURLToBlob(items.toppings[i].photo).then(blob=>blobToFile(blob));
                     // items.toppings[i].photo =  await blobToFile(items.toppings[i].photo);
                      console.log('photo changed to ' + items.toppings[i].photo);
                    }
              }  
              return items;
            })
            .then(items => {

                console.log("useEffect response received", JSON.stringify(items));

                setToppings((toppingsOld) => {
                    return (items.toppings != null && items.toppings.length > 0) ? items.toppings : toppingsOld
                });
                setTotal(items.total);
            }
            )
        //return false;
    }, []);

    const getData = () => {

        var payload = {
            "id": props.id,
            "method": "get",
            "email": props.email
        };
        console.log('posting request', JSON.stringify(payload));
        const response = fetch(process.env.REACT_APP_API_URL,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(data => {
            var json = data.json()
            console.log("response" + JSON.stringify(json))
            return json
        });
        return response;

    }


    const [total, setTotal] = useState(0);
    const handleOnChange = (position) => {
        // const updatedCheckedState = checkedState.map((item, index) =>
        //     index === position ? !item : item
        // );

        //setCheckedState(updatedCheckedState);
        const updatedToppings = Object.create(toppings);
        var item = updatedToppings[position];
        item.isChecked = !item.isChecked
        setToppings(updatedToppings);
        /*
        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + toppings[index].price;
                }
                return sum;
            },
            0
        );
        */
        const totalPrice = updatedToppings.reduce(
            (sum, item, index) => {
                return parseFloat(sum) + parseFloat(item.price);
            },
            0
        );

        setTotal(totalPrice);
    };


    const handleOnChangeToppingsListItem = (e, index) => {
        setToppings(toppings => {
            const newToppings = [...toppings];
            console.log(index);

            console.log("splicing ");
            if (e.target.name == 'price') {
                newToppings.splice(index, 1, {
                    "price": e.target.value,
                    "name": toppings[index].name,
                    "isChecked": toppings[index].isChecked,
                    "photo": toppings[index].photo
                })
            }
            if (e.target.name == 'name') {
                newToppings.splice(index, 1, {
                    name: e.target.value,
                    "price": toppings[index].price,
                    "isChecked": toppings[index].isChecked,
                    "photo": toppings[index].photo
                })
            }
            if (e.target.name == 'photo') {
                newToppings.splice(index, 1, {
                    name: toppings[index].name,
                    "price": toppings[index].price,
                    "isChecked": toppings[index].isChecked,
                    "photo": e.target.files[0]
                })
            }
            const totalPrice = calculateTotal(newToppings);

            setTotal(totalPrice);

            console.log("newToppings - > ", newToppings);
            return newToppings;
        });
        console.log("toppings -> ", toppings)
        //const newToppings = [...toppings];


    };

    const addItem = () => {
        const updatedToppings = Object.create(toppings);
        updatedToppings.push({
            "name": "",
            "price": 0,
            "isChecked": false,
            "photo" : null
        });
        // const updatedCheckedState = Object.create(checkedState);
        // updatedCheckedState.push(false);
        // console.log('value' + updatedCheckedState);
        // setCheckedState(updatedCheckedState);
        console.log('updated value' + updatedToppings);
        setToppings(updatedToppings);
    }

     const convertBase64 = (file) => {

        var ready = false;
        var result = '';

        var check = function() {
            if (ready === true) {
                // do what you want with the result variable
                console.log("returning result" + result);
                return result;
            }
            console.log("waiting" + result);
            setTimeout(check, 1000);
        }
        check();
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            // file is loaded
            result = evt.target.result;         
            ready = true;
        };
        reader.readAsDataURL(file);
      }

    var flatten = function (obj) {
        if (obj === null) {
            return null;
        }

        if (Array.isArray(obj)) {
            var newObj = [];
            for (var i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object') {
                    newObj.push(flatten(obj[i]));
                }
                else {
                    newObj.push(obj[i]);
                }
            }
            return newObj;
        }

        var result = Object.create(obj);
        for (var key in result) {
            if (typeof result[key] === 'object') {
                if(!result[key] instanceof File && !result[key] instanceof Blob){
                    result[key] = flatten(result[key]);
                }else{
                    console.log(key + " value is instance of file" )
                    result[key] = convertBase64(result[key]);
                    console.log('key[value] is ' + result[key] );
                }
                
            }
            else {
                result[key] = result[key];
            }
        }
        return result;
    }

    const isnull = (data) => {
        if ((typeof (data) == 'undefined') && (data == null)) {
            return true;
        }
        if ((typeof (data.name) == 'undefined') || (data.name == null) || (data.name == "")) {
            return true;
        }

    }

    const convertToBase64AndFlatten = async (obj) => {
        if (obj === null) {
            return null;
        }

        if (Array.isArray(obj)) {
            var newObj = [];
            for (var i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object') {
                    newObj.push(await convertToBase64AndFlatten(obj[i]));
                }
                else {
                    newObj.push(obj[i]);
                }
            }
            return newObj;
        }

        var result = Object.create(obj);
        for (var key in result) {
            if (typeof result[key] === 'object') {
                if(!result[key] instanceof File && !result[key] instanceof Blob){
                    result[key] = await convertToBase64AndFlatten(result[key], result);
                }else{
                    console.log(key + " value is instance of file" )
                    result[key] = await encodeImageFileAsURL(result[key]);
                    console.log('key[value] is ' + result[key] );
                }
                
            }
            else {
                result[key] = result[key];
            }
        }
        return result;
    }

    async function encodeImageFileAsURL(element, obj) {
        return new Promise((resolve, reject) => {
        var file = element;
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('RESULT', reader.result)
          element =  reader.result;
          resolve(element);
          //convertToBase64AndFlatten(obj);
        }
        reader.readAsDataURL(file);
        });
        
      }

    
    const flattenAndSave = async () => {
        const updatedToppings = Object.assign(toppings);
        var flattenedPayload = await convertToBase64AndFlatten(updatedToppings)
        //.then(result => {
        //    console.log("calling save");
        //    saveFlattenedPayload(result);
        //}
        //)
        saveFlattenedPayload(flattenedPayload);
    }

    const saveFlattenedPayload = (result) => {
        const updatedToppings = Object.assign(toppings);
        const totalPrice = calculateTotal(updatedToppings);

        setTotal(totalPrice);
        console.log('updated value' + JSON.stringify(updatedToppings));
        //var flattenedPayload = flatten(updatedToppings);
        var flattenedPayload = result;
        console.log('posting flattened request', JSON.stringify(flattenedPayload));
        var arr = makeArray(flattenedPayload);
        if (arr.some(isnull) && arr.length > 0) {
            alert("Please fix empty fields");
            return;
        }


        var request = {
            "id": props.id,
            "toppings": arr,
            "email": props.email,
            "total": totalPrice
        }
        console.log('posting request flattened request again logging', JSON.stringify({
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        const response = fetch(process.env.REACT_APP_API_URL,
            {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(data => { console.log("response" + JSON.stringify(data.json())) }).catch(err=> console.log(err));
        alert("Saved!")
    }

    const save = () => {
        const updatedToppings = Object.assign(toppings);
        const totalPrice = calculateTotal(updatedToppings);

        setTotal(totalPrice);
        console.log('updated value' + JSON.stringify(updatedToppings));
        var flattenedPayload = flatten(updatedToppings);
        console.log('posting request', JSON.stringify(flattenedPayload));
        var arr = makeArray(flattenedPayload);
        if (arr.some(isnull) && arr.length > 0) {
            alert("Please fix empty fields");
            return;
        }


        var request = {
            "id": props.id,
            "toppings": arr,
            "email": props.email,
            "total": totalPrice
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
        alert("Saved!")

    }

    const makeArray = (item) => {
        var arr;
        if (Array.isArray(item) == false) {
            arr = Object.values(item);
            // arr.splice(-1);
        } else {
            return item;
        }

        console.log('After making array' + JSON.stringify(arr));
        return arr;
    }

    const deleteRow = (index) => {
        var array = [...toppings]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setToppings(array);
        }
        const totalPrice = calculateTotal(array);
        setTotal(totalPrice);

    }

    const calculateTotal = (array) => {
        return array.reduce(
            (sum, item, index) => {
                console.log("sum ", sum);
                if (isNaN(parseFloat(item.price))) {
                    console.log("returning sum ", parseFloat(sum));
                    return parseFloat(sum);
                }
                console.log("returning sum ", parseFloat(sum) + parseFloat(item.price));
                return parseFloat(sum) + parseFloat(item.price);
            },
            0
        );
    }


    return (
        <div className={styles.App}>
            <br />
            {props.changing ?
                <div><input type="text" className={styles.inputtext} name={`${props.name} + changing`}
                    value={props.name} onChange={(e) => props.changeName(props.id, e)}></input>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-check-square-o" onClick={() => props.changeNameIndicator(props.id, !props.changing)}></i>

                </div>
                :
                <h3>{props.name} &nbsp;
                    <i className="fa fa-pencil" aria-hidden="true" onClick={() => props.changeNameIndicator(props.id, !props.changing)}></i>
                    &nbsp;&nbsp;
                    <i className="fa fa-times" onClick={(e) => { if (window.confirm('Are you sure to delete this checklist?')) { props.markDeleted(props.id, e) } }} aria-hidden="true"></i></h3>}

            <br />
            <ul className={styles.toppingsList}>

                {
                    toppings.map(({ name, price, isChecked, photo }, index) => {
                        console.log('photo is ' + photo);
                        return (
                            <li key={index}>
                                <div className={styles.toppingsListItem}>
                                    <div className="leftsection">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={isChecked}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`}>
                                            <input type="text" name="name" value={name} onChange={(e) => handleOnChangeToppingsListItem(e, index)} />
                                        </label>


                                    </div>

                                    <div className={styles.spacer} />
                                    <button type="button" className={styles.smallbutton} onClick={() => deleteRow(index)}>Delete</button>
                                    <div className={styles.spacer} />
                                    <div className={styles.rightsection}>
                                        <input type="text" className={styles.textamt} name="price" value={price} onChange={(e) => handleOnChangeToppingsListItem(e, index)} />
                                    </div>
                                    <div className={styles.spacer} />
                                    <div className={styles.rightsection}>
                                       
                                        <UploadFile i={index} name="photo" photo={photo} handleOnChangeToppingsListItem={handleOnChangeToppingsListItem} />
                                       
                                    </div>



                                </div>
                            </li>
                        );
                    })}
                <li>
                    <div className={styles.toppingsListItem}>
                        <div className="left-section">Total : &nbsp;</div>
                        {total != undefined && !isNaN(total) ?
                            <div className="right-section">{(getFormattedPrice(total) === undefined || getFormattedPrice(total) === NaN) ? '' : getFormattedPrice(total)}</div>
                            : " $0"
                        }

                    </div>
                </li>
            </ul>
            <button type="button" className={styles.Button} onClick={addItem}>Add Item</button>
            &nbsp;&nbsp;&nbsp;
            <button type="button" className={styles.Button} onClick={flattenAndSave}>Save</button>
        </div>
    );

}
