import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
      <div className="rounded-2xl border border-border/80 bg-slate-950/80 p-8 text-center shadow-2xl backdrop-blur-xl">
        <h1 className="mb-3 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-5 text-lg text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/80 font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
