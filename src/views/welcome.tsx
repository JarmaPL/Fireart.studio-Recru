import React, { useState } from 'react';
import BlobLT from 'assets/images/blob-lt.svg';
import BlobRB from 'assets/images/blob-rb.svg';
import BlobLinesLb from 'assets/images/blob-lines-lb.svg';
import BlobLinesRT from 'assets/images/blob-lines-rt.svg';
import Logo from 'assets/images/TriviaLogo.svg';
import Goblet from 'assets/images/goblet.svg';
import Star from 'assets/images/star.svg'
import { addSetting, removeAnswers } from '../services/store';
import { useDispatch } from 'react-redux';


const WelcomePage = () => {
    
    const [Difficulty, setDifficulty] = useState("hard");
    const [Amount, setAmount] = useState("");
    const dispatch = useDispatch();

    const HandleSubmit = (e:any) => {
        e.preventDefault();
        dispatch(removeAnswers())
        dispatch(addSetting({difficulty: Difficulty, amount: Number(Amount.replace(/\D/g, ''))}));
        window.location.pathname = "/quiz"
    }

    const HandleChange = (value: any, name: string) => {
        switch(name){
            case "difficulty": setDifficulty(value); break
            case "amount": {
                const toNumber = Number(value.replace(/\D/g, ''));
                const toLocale = toNumber.toLocaleString("pl-PL");
                if(toNumber === 0 ) setAmount("1");
                else setAmount(toLocale)
                

            } break
        }
    }

  return (
    <div className="container">
        <img id="BlobLT1"  src={BlobLT} alt="Blob1"/>
        <img id="BlobRB1" src={BlobRB} alt="Blob2" />
        <img id="BlobLinesLB1" src={BlobLinesLb} alt="decoration1"/>
        <img id="BlobLinesRT1" src={BlobLinesRT} alt="decoration2"/>
        <div className="flex--center--column wrapper--Items">
            <div className="flex--center--column">
                <h1 className="text--Title">Welcome to the</h1>
                <div style={{ width: "100%", height: "15rem"}}>
                    <img alt="Logo" src={Logo} id="Logo" />
                </div>
            </div>
            <form onSubmit={(e) => HandleSubmit(e)} className="flex--center--column wrapper--Form">
                <div className="flex--center--column">
                    <div className="wrapper--Inputs flex--center--column">
                        <label className="text--InputLabel">
                            <img src={Goblet} style={{width: "1.5rem", marginRight: "0.5rem"}} alt="goblet"/>
                            <span>Difficulty</span>
                        </label>
                        <div className="wrapper--Select">
                            <select className="input--Select" name="difficulty" onChange={(e) => HandleChange(e.target.value, "difficulty")}>
                                <option value="hard">Hard</option>
                                <option value="medium">Medium</option>
                            </select>
                        </div>
                    </div>
                    <div className="wrapper--Inputs flex--center--column">
                        <label className="text--InputLabel">
                            <img src={Star} style={{width: "1.5rem", marginRight: "0.5rem"}} alt="star"/>
                            <span>Amount</span>
                        </label>
                        <input type="text" value={Amount} className="outline" name="amount"  onChange={(e) =>  HandleChange(e.target.value, "amount")} required/>
                    </div>
                </div>
                <button type="submit" className=" button button--primary">true</button>
            </form>
        </div>
    </div>
  );
};

export default WelcomePage;

