import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import './style.css'

export default function CompanySymbol() {
    const [allSymbols, setAllSymbols] = useState();
    const [inputValue, setInputValue] = useState();
    const [count, setCount] = useState(0);
    const [inputFormValues, setInputFormValues] = useState([{ Symbol: "MSFT" }]);

    useEffect(() => {
        API.getSymbols()
            .then(res => {
                console.log(res.data);
                setAllSymbols(res.data);
            });
    }, [])

    function onChangeFilter(e) {
        console.log(e.target.value.replace(/\s/g, ''))
        setInputValue(e.target.value)
        console.log(allSymbols);
        // console.log(allSymbols[0]["Company Name"])
        console.log(allSymbols.filter(company => company["Company Name"].toLowerCase().includes(e.target.value.trim().toLowerCase())))
        let selectedArr = allSymbols.filter(company => company["Company Name"].toLowerCase().includes(e.target.value.trim().toLowerCase()))
        
        let finalArr = [];

        if (selectedArr.length > 10) {
            for (let i = 0; i < 10; i++) {
                finalArr.push(selectedArr[i])
            }
        } else {
            for (let i = 0; i < selectedArr.length; i++) {
                finalArr.push(selectedArr[i])
            }
        }

        setInputFormValues(finalArr);

    }
    return (
        <>
            <div>
                <h1>Company Symbol</h1>
                <input className="" onChange={onChangeFilter}></input>
                <ul id="myUL">
                    {
                        (inputFormValues.length ? (
                            inputFormValues.map(company => {
                            return(
                                <li><a href="#">{company.Symbol} {company["Company Name"]}</a></li>
                            )
                        })) : (<div></div>))
                    }
                </ul>
            </div>
        </>
    )
}
