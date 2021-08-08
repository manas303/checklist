import React from 'react';
import { useState } from 'react';
import styles from './Checklist-original.module.css';

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default (props) => {
    const [toppings, setToppings] = useState(
        []
    );
    const [total, setTotal] = useState(0);
    //const [checkedState, setCheckedState] = useState(
    //    new Array(toppings.length).fill(false)
    //);

    
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
                if (item.isChecked === true) {
                    return sum + item.price;
                }
                return sum;
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
                newToppings.splice(index, 1, {
                    name : e.target.value,
                    "price": 0,
                    "isChecked": false
                })
            console.log("newToppings - > ", newToppings);
            return newToppings;
        });
        console.log("toppings -> ", toppings)

    };

    const addItem = () => {
        const updatedToppings = Object.create(toppings);
        updatedToppings.push( {
            name: "",
            price: 0,
            isChecked: false
          });
       // const updatedCheckedState = Object.create(checkedState);
       // updatedCheckedState.push(false);
       // console.log('value' + updatedCheckedState);
       // setCheckedState(updatedCheckedState);
        console.log('updated value' + updatedToppings);
        setToppings(updatedToppings);
    }

    




    return (
        <div className={styles.App}>
            <h3>{props.name}</h3>
            <p>checklist ID : {props.id}</p>
            <ul className={styles.toppingsList}>
                {toppings.map(({ name, price, isChecked }, index) => {
                    return (
                        <li key={index}>
                            <div className={styles.toppingsListItem}>
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        checked={isChecked}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>
                                    <input type="text" name="name" value={name} onChange={(e) => handleOnChangeToppingsListItem(e, index)}/></label>
                                </div>
                                <div className="right-section">{getFormattedPrice(price)}</div>
                            </div>
                        </li>
                    );
                })}
                <li>
                    <div className={styles.toppingsListItem}>
                        <div className="left-section">Total:</div>
                        <div className="right-section">{getFormattedPrice(total)}</div>
                    </div>
                </li>
            </ul>
            <button type="button" className={styles.Button} onClick={addItem}>Add Item</button>
                &nbsp;&nbsp;&nbsp;
            <button type="button" className={styles.Button} onClick={addItem}>Save</button>
        </div>
    );

}
