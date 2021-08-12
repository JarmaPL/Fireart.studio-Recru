import React from 'react';
import BlobLT from 'assets/images/blob-lt.svg';
import BlobRB from 'assets/images/blob-rb.svg';
import BlobLinesLb from 'assets/images/blob-lines-lb.svg';
import Face from 'assets/images/face.svg';
import Correct from 'assets/images/correct.svg';
import Wrong from 'assets/images/wrong.svg';
import ScoreStar from 'assets/images/scoreStar.svg';
import ScoreStarCorrect from 'assets/images/starCorrect.svg';
import ExitIcon from 'assets/images/x.svg';
import BlobLinesRT from 'assets/images/blob-lines-rt.svg';
import { removeAnswers, RootState } from 'services/store';
import { useDispatch, useSelector } from 'react-redux';

const ResultPage: React.FC = () => {
   
  const Answers = useSelector((state: RootState) => state.answers);
  const dispatch = useDispatch();


    const HandleRemoveAnswers = () => {
        dispatch(removeAnswers());
        window.location.pathname = "/";
    }

  return (
    <div className="container">
        <img id="BlobLT1"  src={BlobLT} alt="Blob1"/>
        <img id="BlobRB1" src={BlobRB} alt="Blob2" />
        <img id="BlobLinesLB1" src={BlobLinesLb} alt="decoration1"/>
        <img id="BlobLinesRT1" src={BlobLinesRT} alt="decoration2"/>
        <div className="flex--center--column wrapper--Results" style={{zIndex: 1}}>
            <div className="flex--center--column" style={{height: "20%", marginBottom: "30px"}} >
                <div className="flex--center--row" style={{marginBottom: "25px"}}>
                    <img src={Face} alt="player" id="faceIcon" />
                    <span style={{ fontSize: "22px", marginRight: "5px", fontWeight: "normal" }}>You scored </span>
                    <p style={{margin: 0, fontWeight: "bold"}}> <span style={{color: "#FF7878", fontSize: "28px", margin: 0}}>{('0' + String(Answers.filter(item => item.isCorrect === true).length)).slice(-2)}</span>/{('0' + String(Answers.length)).slice(-2)}</p>       
                </div>
                <div className="flex--center--row content--wrap">
                    {Answers.filter(item => item.isCorrect === true).map((item) => <img src={ScoreStarCorrect} className="star star--correct" alt="star" key={item.questionNumber}/>)}
                    {Answers.filter(item => item.isCorrect === false).map((item) => <img src={ScoreStar} className="star" alt="star" key={item.questionNumber}/>)}
                </div>
            </div>
            <div className="flex--center-list">
                {Answers.map(item => item.isCorrect === true ? (
                    <div className="answerCard" key={item.questionNumber}>
                        <div style={{ fontSize: "16px", overflowWrap: "break-word", color: "#464FAC", paddingRight: "4rem" }} dangerouslySetInnerHTML={{ __html: `${item.question}`}}/> 
                        <img src={Correct} alt="sign"/>
                    </div> 
                ) : (
                    <div className="answerCard answerWrong" key={item.questionNumber}>
                        <div style={{ fontSize: "16px", overflowWrap: "break-word", color: "#464FAC", paddingRight: "4rem" }} dangerouslySetInnerHTML={{ __html: `${item.question}`}}/>
                        <img src={Wrong} alt="sign"/>
                    </div>
                ))}
            </div>
            <div className="flex--center--column">
                <button onClick={() => HandleRemoveAnswers()} className="button button--primary mobile-button" style={{width: "50%", marginTop: "3rem"}}>Play again</button>
            </div>
        </div>
        <button onClick={() => HandleRemoveAnswers()} className="button--exit"><img src={ExitIcon} alt="exit"/></button>
    </div>
  );
};

export default ResultPage;