import {BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ResetCred from "./components/ResetCred";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import Reports from "./components/Reports";
import ListExpenses from "./components/expenses/ListExpenses";
import Income from "./components/income/Income";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />

                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<HomePage />} />
                {/*<Route path="/profile" element={<Profile />} />*/}
                {/*<Route path="/change_password" element={<ResetCred />} />*/}
                {/*<Route path="/reports" element={<Reports />} />*/}
                {/*<Route path="/dashboard" element={<DashboardOverview />} />*/}
                {/*<Route path="/expense" element={<ListExpenses />} />*/}
                {/*<Route path="/income" element={<Income />} />*/}

                <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
                <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
                <Route path="/change_password" element={<ProtectedRoute element={ResetCred} />} />
                <Route path="/reports" element={<ProtectedRoute element={Reports} />} />
                <Route path="/dashboard" element={<ProtectedRoute element={DashboardOverview} />} />
                <Route path="/expense" element={<ProtectedRoute element={ListExpenses} />} />
                <Route path="/income" element={<ProtectedRoute element={Income} />} />

            </Routes>
        </BrowserRouter>
    );
}
export default App;