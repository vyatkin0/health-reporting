import { render, screen } from '@testing-library/react';

import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Patient from './pages/Patient';
import Reports from './pages/Reports';
import { UserType } from './components/UsersTable';
import Users from './pages/Users';

test('app page', () => {
    render(<App />);
    const patientLinkElement = screen.getByText('Patient page');
    expect(patientLinkElement).toBeInTheDocument();
    const doctorLinkElement = screen.getByText('Doctor page');
    expect(doctorLinkElement).toBeInTheDocument();
    const adminLinkElement = screen.getByText('Admin page');
    expect(adminLinkElement).toBeInTheDocument();
});

test('renders reports page', () => {
    const route = '/report';
    render(
        <MemoryRouter initialEntries={[route]}>
            <Reports />
        </MemoryRouter>
    );
    const titleElement = screen.getByText('Reports');
    expect(titleElement).toBeInTheDocument();
});

test('renders patient page', () => {
    const route = '/patient';
    render(
        <MemoryRouter initialEntries={[route]}>
            <Patient />
        </MemoryRouter>
    );
    const titleElement = screen.getByText('Patient');
    expect(titleElement).toBeInTheDocument();
});

test('renders doctor page', () => {
  const route = '/patient';
  render(
      <MemoryRouter initialEntries={[route]}>
          <Users pageType={UserType.Doctor}/>
      </MemoryRouter>
  );
  const titleElement = screen.getByText('Patients');
  expect(titleElement).toBeInTheDocument();
});

test('renders admin page', () => {
  const route = '/admin';
  render(
      <MemoryRouter initialEntries={[route]}>
          <Users pageType={UserType.Admin}/>
      </MemoryRouter>
  );
  const titleElement = screen.getByText('Users');
  expect(titleElement).toBeInTheDocument();
});