import { render, screen } from '@testing-library/react';
import { RouterContext, RouteContext } from 'react-router-slim';

import App from './App';
import Patient from './pages/Patient';
import Reports from './pages/Reports';
import { UserType } from './components/UsersTable';
import Users from './pages/Users';

const router: RouterContext = {
    match: (path: string, url: string) => ({ match: null, params: {} }),
    navigate: (path: string, data?: any, replace?: boolean) => window.history.pushState(data, '', path),
}

const route: RouteContext = {
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
        router.navigate?.('/admin', { id: '1', userId: '2' });
        render(<App />);
        const usersTitleElement = screen.getByText('Users');
        expect(usersTitleElement).toBeInTheDocument();
        const addUserElement = screen.getByText('Add user');
        expect(addUserElement).toBeInTheDocument();
    });

    it('doctor page', () => {
        router.navigate?.('/doctor', { id: '1', userId: '2' });
        render(<App />);
        const patientsTitleElement = screen.getByText('Patients');
        expect(patientsTitleElement).toBeInTheDocument();
        const addPatientElement = screen.getByText('Add patient');
        expect(addPatientElement).toBeInTheDocument();
    });

    it('patient page', () => {
        router.navigate?.('/patient', { id: '1', userId: '2' });
        render(<App />);
        const patientTitleElement = screen.getByText('Patient');
        expect(patientTitleElement).toBeInTheDocument();
        const submitElement = screen.getByText('Submit');
        expect(submitElement).toBeInTheDocument();
    });
});

test('renders reports page', () => {
    router.navigate?.('', { id: '1', userId: '2' });
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
    router.navigate?.('', { id: '1' });
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
    router.navigate?.('', { id: '1' });
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
    router.navigate?.('', { id: '1' });
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