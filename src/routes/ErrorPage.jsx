import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error('Route error:', error);

    return (
        <div>
            <h1>Oops! Something went wrong.</h1>
            <pre>{error.statusText || error.message}</pre>
        </div>
    );
}