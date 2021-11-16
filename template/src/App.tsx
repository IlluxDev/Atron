import { Button, NavigationView, RootLayout, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<NavigationView title="My App">
				<h1>Hello Atron</h1>
			</NavigationView>
		</RootLayout>
		<TitleBarOverlay />
    </div>
  )
}

export default App
