import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Checklist-original.module.css';

const getFormattedPrice = (price) => `$${price}`;

export default (props) => {
    const [toppings, setToppings] = useState(
        []
    );

    useEffect(() => {
        let mounted = true;
        getData()
            .then(items => {

                console.log("response received", JSON.stringify(items));

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
            if(e.target.name == 'price'){
                newToppings.splice(index, 1, {
                    "price": e.target.value,
                    "name": toppings[index].name,
                    "isChecked": false
                })
            }
            if(e.target.name == 'name'){
                newToppings.splice(index, 1, {
                    name: e.target.value,
                    "price": toppings[index].price,
                    "isChecked": false
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
            "isChecked": false
        });
        // const updatedCheckedState = Object.create(checkedState);
        // updatedCheckedState.push(false);
        // console.log('value' + updatedCheckedState);
        // setCheckedState(updatedCheckedState);
        console.log('updated value' + updatedToppings);
        setToppings(updatedToppings);
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
                result[key] = flatten(result[key]);
            }
            else {
                result[key] = result[key];
            }
        }
        return result;
    }

    const isnull = (data)=>{
        if((typeof(data) == 'undefined') && (data == null)){
           return true;
        }
        if((typeof(data.name) == 'undefined') || (data.name == null) || (data.name == "")){
            return true;
        }

    }

    const save = () => {
        const updatedToppings = Object.assign(toppings);
        const totalPrice = calculateTotal(updatedToppings);

        setTotal(totalPrice);
        console.log('updated value' +  JSON.stringify(updatedToppings));
        var flattenedPayload = flatten(updatedToppings);
        console.log('posting request', JSON.stringify(flattenedPayload));
        var arr = makeArray(flattenedPayload);
        if(arr.some(isnull) && arr.length > 0){
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
           setToppings( array );
        }
        const totalPrice = calculateTotal(array);
        setTotal(totalPrice);

    }

    const calculateTotal = (array)=>{
        return array.reduce(
            (sum, item, index) => {
                    console.log("sum ", sum);
                    if(isNaN(parseFloat(item.price))){
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
            <br/>
            <h3>{props.name}</h3>
            <br/>
            <ul className={styles.toppingsList}>

                {
                    toppings.map(({ name, price, isChecked }, index) => {
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
                                            <input type="text" name="name"  value={name} onChange={(e) => handleOnChangeToppingsListItem(e, index)} />
                                           </label>    
                                          
                                           
                                    </div>
                                    
                                    <div className={styles.spacer}/>
                                    <button type="button" className={styles.smallbutton} onClick={() => deleteRow(index)}>Delete</button>
                                    <div className={styles.spacer}/>
                                    <div className={styles.rightsection}>    
                                        <input type="text" className={styles.textamt} name="price" value={price} onChange={(e) => handleOnChangeToppingsListItem(e, index)} />
                                    </div>
                                  
                                    
                                </div>
                            </li>
                        );
                    })}
                <li>
                    <div className={styles.toppingsListItem}>
                        <div className="left-section">Total:</div>
                         { total!= undefined && !isNaN(total)?
                            <div className="right-section">{(getFormattedPrice(total)===undefined ||getFormattedPrice(total)===NaN) ? '':getFormattedPrice(total)}</div>
                            :"$0"
                        }
                        
                    </div>
                </li>
            </ul>
            <button type="button" className={styles.Button} onClick={addItem}>Add Item</button>
            &nbsp;&nbsp;&nbsp;
            <button type="button" className={styles.Button} onClick={save}>Save</button>
        </div>
    );

}
