import {
    BrowserRouter,
    Link,
    Navigate,
    Route,
    Routes,
    useParams,
} from 'react-router-dom';

import Patient from './pages/Patient';
import Reports from './pages/Reports';
import { ThemeProvider } from '@mui/material';
import { UserType } from './components/UsersTable';
import Users from './pages/Users';
import { createTheme } from '@mui/material/styles';

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
    const { id, userId } = useParams<{ id: string; userId: string }>();
    return <Navigate replace to={to} state={{ id, userId }} />;
};

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                <Link to='/patient/00000000-0000-0000-0000-000000000004'>Patient page</Link>
                                <br />
                                <Link to='/doctor/00000000-0000-0000-0000-000000000002'>Doctor page</Link>
                                <br />
                                <Link to='/admin/00000000-0000-0000-0000-000000000001'>Admin page</Link>
                            </>
                        }
                    />
                    <Route path='/admin' element={<Users pageType={UserType.Admin} />}/>
                    <Route path='/admin/:id' element={<NavigateToId to='/admin' />}/>
                    <Route path='/doctor' element={<Users pageType={UserType.Doctor} />}/>
                    <Route path='/doctor/:id' element={<NavigateToId to='/doctor' />}/>
                    <Route path='/patient' element={<Patient />} />
                    <Route path='/patient/:id' element={<NavigateToId to='/patient' />}/>
                    <Route path='/report' element={<Reports/>}/>
                    <Route path='/report/:id' element={<NavigateToId to='/report' />}/>
                    <Route path='/report/:id/:userId' element={<NavigateToId to='/report' />}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
