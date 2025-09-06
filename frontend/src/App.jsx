import { Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/form" element={<Form />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/signin" element={<Login />} />
		</Routes>
	);
};

export default App;
