import { Button, dialog, NavigationView, RootLayout, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<NavigationView title="My App">
				<h1>Hello App</h1>
				<Button style={{
					margin: "20px"
				}} onClick={() => dialog.show("No WiFi connection", "A WiFi connection isA WiFi connection is required to use this app required to use this app")}>Show Dialog</Button>
			</NavigationView>
		</RootLayout>
		<TitleBarOverlay />
    </div>
  )
}

export default App
