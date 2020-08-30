import React from "react";
import Navigation from './navigation/Navigation'  
import Store from './store/configureStore'  


export default function App() {
    return (
      <Store>
        <Navigation/>
      </Store>
    )
}
