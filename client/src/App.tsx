import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Polish from "./pages/Polish";
import Phrases from "./pages/Phrases";
import Citations from "./pages/Citations";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";

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
    <Switch>
      <Route path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
      <Route path="/polish" component={() => <PublicLayout><Polish /></PublicLayout>} />
      <Route path="/phrases" component={() => <PublicLayout><Phrases /></PublicLayout>} />
      <Route path="/citations" component={() => <PublicLayout><Citations /></PublicLayout>} />
      <Route path="/pricing" component={() => <PublicLayout><Pricing /></PublicLayout>} />
      <Route path="/blog" component={() => <PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" component={() => <PublicLayout><BlogPost /></PublicLayout>} />
      <Route path="/dashboard" component={() => <PublicLayout><Dashboard /></PublicLayout>} />
      <Route path="/dashboard/:section" component={() => <PublicLayout><Dashboard /></PublicLayout>} />
      <Route path="/404" component={() => <PublicLayout><NotFound /></PublicLayout>} />
      <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
    </Switch>
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
