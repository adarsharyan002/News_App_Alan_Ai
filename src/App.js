
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useLayoutEffect,useState } from 'react';
import NewsCards from './Components/NewsCards';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import wordsToNumbers from 'words-to-numbers';



const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFFF00",
    },
  },
});

function App() {

  
  const alanKey='35a28769d641e07e4ce81aa6fa7467f42e956eca572e1d8b807a3e2338fdd0dc/stage'

  const [newsArticles,setNewsArticles] =useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);


  useLayoutEffect(()=>{

    
    function updateScreen(time) {
    alanBtn({
      key:alanKey,
      onCommand:({command,articles,number})=>{
        if(command === 'newsHeadlines'){
          console.log(articles)
         setNewsArticles(articles);
        }else if(command==='highlight'){
              setActiveArticle((preActiveArticle)=>preActiveArticle+1);
          
        }else if(command==='open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
     
          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }

        }
      }
    });
  }
  requestAnimationFrame(updateScreen);
  },[]);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <div style={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center'}} className="title">
      <h1 style={{color:'blue'}}>News App</h1>
      <p>Click on the mic button to begin</p>
      </div>
     
     
     <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
    </ThemeProvider>
  );
}

export default App;
