import React from "react";
import Navigation from './navigation/Navigation'
import Store from './store/configureStore'
import { RecoilRoot } from "recoil"

export default function App() {
  return (
    <Store>
      <RecoilRoot>
        <Navigation />
      </RecoilRoot>
    </Store>
  )
}
