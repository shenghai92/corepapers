import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Analytics from "./components/Analytics";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Polish = lazy(() => import("./pages/Polish"));
const Phrases = lazy(() => import("./pages/Phrases"));
const PhraseSection = lazy(() => import("./pages/PhraseSection"));
const ResearchPaperSections = lazy(
  () => import("./pages/ResearchPaperSections")
);
const AcademicEnglishHub = lazy(() => import("./pages/AcademicEnglishHub"));
const AcademicWritingResource = lazy(
  () => import("./pages/AcademicWritingResource")
);
const SectionWritingPractice = lazy(
  () => import("./pages/SectionWritingPractice")
);
const LiteratureReviewSynthesis = lazy(
  () => import("./pages/LiteratureReviewSynthesis")
);
const ResearchFoundations = lazy(() => import("./pages/ResearchFoundations"));
const AbstractWritingGuide = lazy(() => import("./pages/AbstractWritingGuide"));
const Citations = lazy(() => import("./pages/Citations"));
const Pricing = lazy(() => import("./pages/Pricing"));
const SeoLandingApa = lazy(() => import("./pages/SeoLandingApa"));
const SeoLandingEssayPolish = lazy(
  () => import("./pages/SeoLandingEssayPolish")
);
const SeoLandingParaphrase = lazy(() => import("./pages/SeoLandingParaphrase"));
const SeoLandingGrammarlyAlternative = lazy(
  () => import("./pages/SeoLandingGrammarlyAlternative")
);
const SeoLandingQuillbotAlternative = lazy(
  () => import("./pages/SeoLandingQuillbotAlternative")
);
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"));
const HowContentIsCreated = lazy(() => import("./pages/HowContentIsCreated"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
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
        <Route
          path="/"
          component={() => (
            <PublicLayout>
              <Home />
            </PublicLayout>
          )}
        />
        <Route
          path="/polish"
          component={() => (
            <PublicLayout>
              <Polish />
            </PublicLayout>
          )}
        />
        <Route
          path="/phrases/introduction"
          component={() => (
            <PublicLayout>
              <PhraseSection />
            </PublicLayout>
          )}
        />
        <Route
          path="/phrases/discussion"
          component={() => (
            <PublicLayout>
              <PhraseSection />
            </PublicLayout>
          )}
        />
        <Route
          path="/phrases/methods"
          component={() => (
            <PublicLayout>
              <PhraseSection />
            </PublicLayout>
          )}
        />
        <Route
          path="/phrases/results"
          component={() => (
            <PublicLayout>
              <PhraseSection />
            </PublicLayout>
          )}
        />
        <Route
          path="/phrases"
          component={() => (
            <PublicLayout>
              <Phrases />
            </PublicLayout>
          )}
        />
        <Route
          path="/research-paper-sections"
          component={() => (
            <PublicLayout>
              <ResearchPaperSections />
            </PublicLayout>
          )}
        />
        <Route
          path="/academic-english-for-esl-students"
          component={() => (
            <PublicLayout>
              <AcademicEnglishHub />
            </PublicLayout>
          )}
        />
        <Route
          path="/academic-integrity-and-source-use"
          component={() => (
            <PublicLayout>
              <AcademicWritingResource kind="integrity" />
            </PublicLayout>
          )}
        />
        <Route
          path="/academic-writing-examples"
          component={() => (
            <PublicLayout>
              <AcademicWritingResource kind="examples" />
            </PublicLayout>
          )}
        />
        <Route
          path="/research-paper-templates"
          component={() => (
            <PublicLayout>
              <AcademicWritingResource kind="templates" />
            </PublicLayout>
          )}
        />
        <Route
          path="/citation-examples"
          component={() => (
            <PublicLayout>
              <AcademicWritingResource kind="citation-examples" />
            </PublicLayout>
          )}
        />
        <Route
          path="/evaluate-academic-sources"
          component={() => (
            <PublicLayout>
              <ResearchFoundations kind="sources" />
            </PublicLayout>
          )}
        />
        <Route
          path="/research-question-examples"
          component={() => (
            <PublicLayout>
              <ResearchFoundations kind="questions" />
            </PublicLayout>
          )}
        />
        <Route path="/thesis-statement-examples" component={() => <PublicLayout><ResearchFoundations kind="thesis" /></PublicLayout>} />
        <Route path="/academic-paragraph-structure" component={() => <PublicLayout><ResearchFoundations kind="paragraphs" /></PublicLayout>} />
        <Route
          path="/academic-argument-evidence"
          component={() => (
            <PublicLayout>
              <ResearchFoundations kind="evidence" />
            </PublicLayout>
          )}
        />
        <Route
          path="/literature-review-synthesis-matrix"
          component={() => (
            <PublicLayout>
              <LiteratureReviewSynthesis />
            </PublicLayout>
          )}
        />
        <Route
          path="/how-to-write-an-abstract-research-paper"
          component={() => (
            <PublicLayout>
              <AbstractWritingGuide />
            </PublicLayout>
          )}
        />
        <Route
          path="/introduction-section-example-research-paper"
          component={() => (
            <PublicLayout>
              <SectionWritingPractice kind="introduction" />
            </PublicLayout>
          )}
        />
        <Route
          path="/conclusion-section-example-research-paper"
          component={() => (
            <PublicLayout>
              <SectionWritingPractice kind="conclusion" />
            </PublicLayout>
          )}
        />
        <Route
          path="/discussion-section-example-research-paper"
          component={() => (
            <PublicLayout>
              <SectionWritingPractice kind="discussion" />
            </PublicLayout>
          )}
        />
        <Route
          path="/results-section-example-research-paper"
          component={() => (
            <PublicLayout>
              <SectionWritingPractice kind="results" />
            </PublicLayout>
          )}
        />
        <Route
          path="/methodology-section-example-research-paper"
          component={() => (
            <PublicLayout>
              <SectionWritingPractice kind="methodology" />
            </PublicLayout>
          )}
        />
        <Route
          path="/citations"
          component={() => (
            <PublicLayout>
              <Citations />
            </PublicLayout>
          )}
        />
        <Route
          path="/pricing"
          component={() => (
            <PublicLayout>
              <Pricing />
            </PublicLayout>
          )}
        />
        <Route
          path="/apa-citation-generator-for-international-students"
          component={() => (
            <PublicLayout>
              <SeoLandingApa />
            </PublicLayout>
          )}
        />
        <Route
          path="/ai-essay-polisher-for-non-native-english-writers"
          component={() => (
            <PublicLayout>
              <SeoLandingEssayPolish />
            </PublicLayout>
          )}
        />
        <Route
          path="/academic-paraphrasing-tool-for-esl-students"
          component={() => (
            <PublicLayout>
              <SeoLandingParaphrase />
            </PublicLayout>
          )}
        />
        <Route
          path="/academic-writing-alternative-for-international-students"
          component={() => (
            <PublicLayout>
              <SeoLandingGrammarlyAlternative />
            </PublicLayout>
          )}
        />
        <Route
          path="/paraphrasing-alternative-for-academic-writing"
          component={() => (
            <PublicLayout>
              <SeoLandingQuillbotAlternative />
            </PublicLayout>
          )}
        />
        <Route
          path="/about"
          component={() => (
            <PublicLayout>
              <About />
            </PublicLayout>
          )}
        />
        <Route
          path="/contact"
          component={() => (
            <PublicLayout>
              <Contact />
            </PublicLayout>
          )}
        />
        <Route
          path="/editorial-policy"
          component={() => (
            <PublicLayout>
              <EditorialPolicy />
            </PublicLayout>
          )}
        />
        <Route
          path="/how-corepapers-content-is-created"
          component={() => (
            <PublicLayout>
              <HowContentIsCreated />
            </PublicLayout>
          )}
        />
        <Route
          path="/privacy"
          component={() => (
            <PublicLayout>
              <Privacy />
            </PublicLayout>
          )}
        />
        <Route
          path="/terms"
          component={() => (
            <PublicLayout>
              <Terms />
            </PublicLayout>
          )}
        />
        <Route
          path="/blog/:slug"
          component={() => (
            <PublicLayout>
              <BlogPost />
            </PublicLayout>
          )}
        />
        <Route
          path="/blog"
          component={() => (
            <PublicLayout>
              <Blog />
            </PublicLayout>
          )}
        />
        <Route path="/login" component={() => <Login />} />
        <Route
          path="/dashboard"
          component={() => (
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          )}
        />
        <Route
          path="/dashboard/:section"
          component={() => (
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          )}
        />
        <Route
          path="/404"
          component={() => (
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          )}
        />
        <Route
          component={() => (
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Analytics />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
