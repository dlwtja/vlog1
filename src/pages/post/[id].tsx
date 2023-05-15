import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import { NotionRenderer } from "react-notion-x";
import React, { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const NOTION_PAGE_ID = "79671df5-d4d4-417e-b782-e19d24a6c7d0";
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setResponse(resJson);
      });
  }, []);

  return (
    <div className="App">
      {response && <NotionRenderer recordMap={response} fullPage={true} />}
    </div>
  );
}

export default App;
