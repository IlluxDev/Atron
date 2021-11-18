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
			]} title="My App" links={[
				{
					label: "Home"
				},
				{
					label: "Tests",
					tree: [
						{
							label: "Button"
						},
						{
							label: "TextBox"
						}
					]
				}
			]}>

			</NavigationView>
		</RootLayout>
		<TitleBarOverlay />
    </div>
  )
}

export default App
