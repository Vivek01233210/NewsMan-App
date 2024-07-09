import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import NewsArea from "./components/NewsArea.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {

  const page_size = 15;
  const Country = "in";

  const [Progress, setProgress] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <LoadingBar
          color='#f11946'
          progress={Progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<NewsArea setProgress={setProgress} key="home" pageSize={page_size} country={Country} category="general" />} />
          <Route exact path="/business" element={<NewsArea setProgress={setProgress} key="business" pageSize={page_size} country={Country} category="business" />} />
          <Route exact path="/entertainment" element={<NewsArea setProgress={setProgress} key="entertainment" pageSize={page_size} country={Country} category="entertainment" />} />
          <Route exact path="/health" element={<NewsArea setProgress={setProgress} key="health" pageSize={page_size} country={Country} category="health" />} />
          <Route exact path="/science" element={<NewsArea setProgress={setProgress} key="science" pageSize={page_size} country={Country} category="science" />} />
          <Route exact path="/sports" element={<NewsArea setProgress={setProgress} key="sports" pageSize={page_size} country={Country} category="sports" />} />
          <Route exact path="/technology" element={<NewsArea setProgress={setProgress} key="technology" pageSize={page_size} country={Country} category="technology" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}