import { useLoaderData } from 'react-router-dom';
import UsersList from '../components/Home Page/UsersList';
export default function Home() {
  const data = useLoaderData();

  return (
    <>
    <UsersList />
    </>
  );
}

