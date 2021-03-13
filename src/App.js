import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Spinner from "react-spinkit";

// components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt="slack logo"
          />
          <Spinner 
          name="ball-spin-fade-loader" color="purple" fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  {/* Chat */}
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  height: 100vh;
  display: flex;
`;

const AppLoading = styled.div`
display: grid;
place-items:center;
height: 100vh;
width: 100%;

`;

const AppLoadingContents = styled.div`

text-align:center;
padding-bottom: 100px;
display: flex;
flex-direction:column;
justify-content:center;
align-items:center;

> img{
  height: 100px;
  padding: 20px;
  margin: 40px;
}
`;
