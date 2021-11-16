import { Button, NavigationView, RootLayout, TitleBar, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<NavigationView>
				<h1>Hello Atron</h1>
			</NavigationView>
			<TitleBarOverlay />
		</RootLayout>
    </div>
  )
}

export default App
