import React from 'react';
import {
    Router,
    Route,
    RouterContext,
    RouteContext,
} from 'react-router-slim';

import Patient from './pages/Patient';
import Reports from './pages/Reports';
import { ThemeProvider } from '@mui/material';
import { UserType } from './components/UsersTable';
import Users from './pages/Users';
import { createTheme } from '@mui/material/styles';
import Link from './components/Link'

const green = '#4197A0';
const darkGreen = '#057080';

const theme = createTheme({
    typography: {
        fontFamily: '"Montserrat","Helvetica","Arial",sans-serif',
        h2: {
            fontSize: 24,
            marginBottom: 20,
            color: green,
        },
        h3: {
            fontSize: 20,
            marginBottom: 30,
            color: green,
        },
    },
    palette: {
        common: {
            grey: '#BDBDBD',
            darkGrey: '#8E8E8E',
            green,
        },
        background: {
            gradient: `linear-gradient(0.5turn, ${green} 0%, ${darkGreen} 100%)`,
            disabled: '#EFF0F0',
            tableHead: '#E5F5F5',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // No more ripple, on the whole application
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: green,
                },
            },
        },
    },
});

const NavigateToId = ({ to }: { to: string }) => {
    const router = React.useContext<RouterContext>(RouterContext);
    const route = React.useContext<RouteContext>(RouteContext);
    const id = route.params?.id;
    const userId = route.params?.userId;
    setTimeout(() => router.navigate?.(to, { id, userId }, true), 0);
    return null;
};

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Route path='/'>
                    <Link to='/patient/00000000-0000-0000-0000-000000000004'>Patient page</Link>
                    <br />
                    <Link to='/doctor/00000000-0000-0000-0000-000000000002'>Doctor page</Link>
                    <br />
                    <Link to='/admin/00000000-0000-0000-0000-000000000001'>Admin page</Link>
                </Route>
                <Route path='/admin'><Users pageType={UserType.Admin} /></Route>
                <Route path='/admin/:id'><NavigateToId to='/admin' /></Route>
                <Route path='/doctor'><Users pageType={UserType.Doctor} /></Route>
                <Route path='/doctor/:id'><NavigateToId to='/doctor' /></Route>
                <Route path='/patient'><Patient /></Route>
                <Route path='/patient/:id' ><NavigateToId to='/patient' /></Route>
                <Route path='/report' ><Reports /></Route>
                <Route path='/report/:id'><NavigateToId to='/report' /></Route>
                <Route path='/report/:id/:userId'><NavigateToId to='/report' /></Route>
            </Router>
        </ThemeProvider>
    );
}
