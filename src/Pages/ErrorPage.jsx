import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <main className="grid min-h-screen place-content-center space-y-5 text-center">
        <h1 className="text-3xl font-semibold">There was a problem</h1>
        <section className="grid gap-3">
          <span>{error?.message}</span>
          <button className="font-semibold">
            <Link to="/">Go back home</Link>
          </button>
        </section>
      </main>
    </div>
  );
}
