import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Polish = lazy(() => import("./pages/Polish"));
const Phrases = lazy(() => import("./pages/Phrases"));
const Citations = lazy(() => import("./pages/Citations"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
        <Route path="/polish" component={() => <PublicLayout><Polish /></PublicLayout>} />
        <Route path="/phrases" component={() => <PublicLayout><Phrases /></PublicLayout>} />
        <Route path="/citations" component={() => <PublicLayout><Citations /></PublicLayout>} />
        <Route path="/pricing" component={() => <PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/blog" component={() => <PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" component={() => <PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/login" component={() => <Login />} />
        <Route path="/dashboard" component={() => <PublicLayout><Dashboard /></PublicLayout>} />
        <Route path="/dashboard/:section" component={() => <PublicLayout><Dashboard /></PublicLayout>} />
        <Route path="/404" component={() => <PublicLayout><NotFound /></PublicLayout>} />
        <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
