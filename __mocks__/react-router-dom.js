export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ element }) => element;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
export const useNavigate = () => jest.fn();
export const MemoryRouter = ({ children }) => <div>{children}</div>;

// Add any other react-router-dom components you use
export default {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  MemoryRouter
};