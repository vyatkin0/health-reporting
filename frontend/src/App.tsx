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

const WithId = ({children}: React.PropsWithChildren) => {
    const route = React.useContext<RouteContext>(RouteContext);
    const id = route.params?.id;
    const userId = route.params?.userId;
    if (!id && !userId) {
        return null;
    }
    window.history.replaceState({ id, userId }, '', './');
    return children as JSX.Element
};

export default function App() {
    const base = process.env.PUBLIC_URL;

    function navigate(path: string, data?: unknown) {
        window.history.pushState(data, '', base + path);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Router navigate={navigate}>
                <Route path={base + '/'}>
                    <Link to='/patient/00000000-0000-0000-0000-000000000004'>Patient page</Link>
                    <br />
                    <Link to='/doctor/00000000-0000-0000-0000-000000000002'>Doctor page</Link>
                    <br />
                    <Link to='/admin/00000000-0000-0000-0000-000000000001'>Admin page</Link>
                </Route>
                <Route path={base + '/admin'}><Users pageType={UserType.Admin} /></Route>
                <Route path={base + '/admin/:id'}><WithId><Users pageType={UserType.Admin} /></WithId></Route>
                <Route path={base + '/doctor'}><Users pageType={UserType.Doctor} /></Route>
                <Route path={base + '/doctor/:id'}><WithId><Users pageType={UserType.Doctor} /></WithId></Route>
                <Route path={base + '/patient'}><Patient /></Route>
                <Route path={base + '/patient/:id'} ><WithId><Patient /></WithId></Route>
                <Route path={base + '/report'} ><Reports /></Route>
                <Route path={base + '/report/:id'}><WithId><Reports /></WithId></Route>
                <Route path={base + '/report/:id/:userId'}><WithId><Reports /></WithId></Route>
            </Router>
        </ThemeProvider>
    );
}
