import "./App.scss";
import ApolloProvider from "./ApolloClient";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { MessageProvider } from "./contexts/message";
import DynamicRoute from "./utilities/DynamicRoute";

function App() {
	return (
		<div className="App">
			<ApolloProvider>
				<AuthProvider>
					<MessageProvider>
						<BrowserRouter>
							<Container className="pt-5">
								<Switch>
									<DynamicRoute
										exact
										path="/"
										component={Home}
										authenticated
									></DynamicRoute>
									<DynamicRoute
										path="/register"
										component={Register}
										guest
									></DynamicRoute>
									<DynamicRoute
										path="/login"
										component={Login}
										guest
									></DynamicRoute>
								</Switch>
							</Container>
						</BrowserRouter>
					</MessageProvider>
				</AuthProvider>
			</ApolloProvider>
		</div>
	);
}

export default App;
