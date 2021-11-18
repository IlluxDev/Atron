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
					label: "Home",
					icon: "ic:sharp-add-circle-outline",
					location: "/"
				},
				{
					label: "Tests",
					icon: "simple-icons:speedtest",
					location: "/tests",
					tree: [
						{
							label: "Button",
							icon: "akar-icons:cursor",
							location: "/tests/button"
						},
						{
							label: "TextBox",
							location: "/tests/text-box"
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
