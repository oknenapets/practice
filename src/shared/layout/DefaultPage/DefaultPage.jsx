import { Outlet } from 'react-router-dom';
import { Header } from 'shared/components';

const DefaultPage = () => (
  <>
    <Header />
    <main className="page">
      <Outlet />
    </main>
  </>
);

export default DefaultPage;
