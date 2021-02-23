import React, {useEffect, useState} from 'react';


function App() {
  const [state, setState] = useState({
    username: null
  });
  useEffect(() => {
    fetch('http://localhost:3002/api')
    .then(res=>res.json())
    .then(data=>setState({username:data.username}));
  });
  const _username = state.username;
  return (
    <div className="App">
      <header className="App-header">
        {_username ? `Hello ${_username}`:'Hello world'}
      </header>
    </div>
  );
}

export default App;
