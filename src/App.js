
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect,useLayoutEffect,useState } from 'react';
import NewsCards from './Components/NewsCards';
import { createTheme, ThemeProvider } from "@mui/material/styles";



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


  useLayoutEffect(()=>{

    
    function updateScreen(time) {
    alanBtn({
      key:alanKey,
      onCommand:({command,articles})=>{
        if(command === 'newsHeadlines'){
          console.log(articles)
         setNewsArticles(articles);
        }
      }
    });
  }
  requestAnimationFrame(updateScreen);
  },[]);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
     
     <NewsCards articles={newsArticles}/>
    </div>
    </ThemeProvider>
  );
}

export default App;
