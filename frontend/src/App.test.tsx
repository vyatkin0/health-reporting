import { render, screen } from '@testing-library/react';
import { RouterContext, RouteContext } from 'react-router-slim';

import App from './App';
import Patient from './pages/Patient';
import Reports from './pages/Reports';
import { UserType } from './components/UsersTable';
import Users from './pages/Users';

function setPathName(pathname: string) {
    Object.defineProperty(window, 'location',
        {
            value: {
                ancestorOrigins: {
                    length: 0,
                    contains: () => false,
                    item: () => null,
                    [Symbol.iterator]: function* () { },
                },
                hash: '',
                host: '',
                port: '',
                protocol: '',
                hostname: '',
                href: '',
                origin: '',
                pathname: pathname || '/',
                search: '',
                assign: () => { },
                reload: () => { },
                replace: () => { },
            },
            writable: true,
        }
    );
}

const router = {
    match: (path: string, url: string) => ({ match: null, params: {} }),
    navigate: (path: string, data?: any, replace?: boolean) => setPathName(path),
}

const route = {
    path: '/',
    params: { id: '1', userId: '2' },
    matches: [{ match: null, params: {} }],
    error: new Error('Test error'),
}

describe('App tests', () => {
    it('app main page', () => {
        render(<App />);
        const patientLinkElement = screen.getByText('Patient page');
        expect(patientLinkElement).toBeInTheDocument();
        const doctorLinkElement = screen.getByText('Doctor page');
        expect(doctorLinkElement).toBeInTheDocument();
        const adminLinkElement = screen.getByText('Admin page');
        expect(adminLinkElement).toBeInTheDocument();
    });

    it('admin page', () => {
        setPathName('/admin');
        render(<App />);
        const usersTitleElement = screen.getByText('Users');
        expect(usersTitleElement).toBeInTheDocument();
        const addUserElement = screen.getByText('Add user');
        expect(addUserElement).toBeInTheDocument();
    });

    it('doctor page', () => {
        setPathName('/doctor');
        render(<App />);
        const patientsTitleElement = screen.getByText('Patients');
        expect(patientsTitleElement).toBeInTheDocument();
        const addPatientElement = screen.getByText('Add patient');
        expect(addPatientElement).toBeInTheDocument();
    });

    it('patient page', () => {
        setPathName('/patient');
        render(<App />);
        const patientTitleElement = screen.getByText('Patient');
        expect(patientTitleElement).toBeInTheDocument();
        const submitElement = screen.getByText('Submit');
        expect(submitElement).toBeInTheDocument();
    });
});

test('renders reports page', () => {
    window.history.pushState({ id: '1', userId: '2' }, '');
    render(
        <RouterContext.Provider value={router}>
            <RouteContext.Provider value={route}>
                <Reports />
            </RouteContext.Provider>
        </RouterContext.Provider>
    );
    const titleElement = screen.getByText('Reports');
    expect(titleElement).toBeInTheDocument();
});

test('renders patient page', () => {
    window.history.pushState({ id: '1' }, '');
    render(
        <RouterContext.Provider value={router}>
            <RouteContext.Provider value={route}>
                <Patient />
            </RouteContext.Provider>
        </RouterContext.Provider>
    );
    const titleElement = screen.getByText('Patient');
    expect(titleElement).toBeInTheDocument();
});

test('renders doctor page', () => {
    window.history.pushState({ id: '1' }, '');
    render(
        <RouterContext.Provider value={router}>
            <RouteContext.Provider value={route}>
                <Users pageType={UserType.Doctor} />
            </RouteContext.Provider>
        </RouterContext.Provider>

    );
    const titleElement = screen.getByText('Patients');
    expect(titleElement).toBeInTheDocument();
});

test('renders admin page', () => {
    window.history.pushState({ id: '1' }, '');
    render(
        <RouterContext.Provider value={router}>
            <RouteContext.Provider value={route}>
                <Users pageType={UserType.Admin} />
            </RouteContext.Provider>
        </RouterContext.Provider>

    );
    const titleElement = screen.getByText('Users');
    expect(titleElement).toBeInTheDocument();
});