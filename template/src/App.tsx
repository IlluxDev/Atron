import { Button, dialog, NavigationView, RootLayout, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<NavigationView title="My App">
				<h1>Hello App</h1>
				<button onClick={() => dialog.show("Text", "Body text")}>Show Dialog</button>
			</NavigationView>
		</RootLayout>
		<TitleBarOverlay />
    </div>
  )
}

export default App
