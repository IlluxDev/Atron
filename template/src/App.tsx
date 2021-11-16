import { Button, RootLayout, TitleBar, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<TitleBar />
			<TitleBarOverlay />
		</RootLayout>
    </div>
  )
}

export default App
