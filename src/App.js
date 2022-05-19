
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect,useState } from 'react';
import NewsCards from './Components/Newscards';



const alanKey='35a28769d641e07e4ce81aa6fa7467f42e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {

  const [articles,setArticles] =useState([]);


  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles})=>{
        if(command === 'newsHeadlines'){
         setArticles(articles);
        }
      }
    })
  },[])
  return (
    <div className="App">
     <NewsCards articles={articles}/>
    </div>
  );
}

export default App;
