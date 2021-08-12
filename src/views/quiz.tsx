import React from 'react';
import BlobLT from 'assets/images/blob-lt-quiz.svg';
import BlobRB from 'assets/images/blob-rb-quiz.svg';
import BlobLinesLb from 'assets/images/blob-line-lb-quiz.svg';
import BlobLinesRT from 'assets/images/blob-line-r-quiz.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useGetQuestionsQuery, RootState, addAnswer } from '../services/store';

const QuizPage: React.FC = () => {
 
  const Settings = useSelector((state: RootState) => state.settings)
  const {data, isLoading } = useGetQuestionsQuery({difficulty: Settings.difficulty, amount: Settings.amount});
  const Answers = useSelector((state: RootState) => state.answers);
  const dispatch = useDispatch()
  const withAnswer = Answers.length + 1;

  const HandleAddAnswer = (answer: string) => {
        const isCorrect = (answer === data.results[withAnswer-1].correct_answer) ? true : false;      
        dispatch(addAnswer({questionNumber: withAnswer, isCorrect: isCorrect, question: data.results[withAnswer-1].question}));
        if(withAnswer === data.results.length) {
          window.location.pathname = "/answers";
        }
    }

    const progressBarWidth = (withAnswer / (data ? data.results.length : 0) )* 100
  
  return (
    <div className="container container--secoundary">
        <img id="BlobLT1" src={BlobLT} alt="decoration1"/>
        <img id="BlobRB1" src={BlobRB} alt="decoration2"/>
        <img id="BlobLinesLB1" src={BlobLinesLb} alt="decoration3"/>
        <img id="BlobLinesRT1" src={BlobLinesRT} alt="decoration4"/>
       {!isLoading ? (
         <div className="wrapper--Quiz" >
          <div className="flex--center--column">
            <h1 className="text--Category">{data.results[withAnswer-1].category}</h1>
            <p className="text--Level">level {withAnswer}</p>
           </div> 
           <div className="wrapper--Progress--Bar">
              <p style={{margin: 0}}><span style={{color: "#FF7878", fontSize: "28px", margin: 0}}>{('0' + String(withAnswer)).slice(-2)}</span>/{('0' + String(data.results.length)).slice(-2)}</p>
              <div className="progress-bar">
                <div className="progress-bar-value" style={{width: `${progressBarWidth}%`}}></div>
              </div>
           </div>
            <div className="text--Question" dangerouslySetInnerHTML={{ __html: `${data.results[withAnswer-1].question}`}}/>
            <div className="flex--center--column" style={{height: "auto"}}>
              <button className="button button--secondary" onClick={() => HandleAddAnswer("True")}>TRUE</button>
              <button className="button button--outline" onClick={() => HandleAddAnswer("False")}>FALSE</button>
            </div>
    </div>)
         : <span style={{color: "#4953be", fontSize: "5rem", overflowWrap: "break-word", width: "100%", textAlign: "center", margin: 0}}>Loading...</span>}
    </div>
  );
};

export default QuizPage;

