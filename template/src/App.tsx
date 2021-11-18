import { Button, dialog, NavigationView, RootLayout, TitleBarOverlay } from "../../atron-ui-native-switch/Plugin";
import './App.css'

function App() {
  return (
    <div>
		<RootLayout>
			<NavigationView routes={[
				{
					path: "/",
					element: <p>Hello</p>
				},
				{
					path: "/test",
					element: <p>Test</p>
				}
			]} title="My App">

			</NavigationView>
		</RootLayout>
		<TitleBarOverlay />
    </div>
  )
}

export default App
