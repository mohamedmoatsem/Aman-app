import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Home from "@/pages/home";
import Resources from "@/pages/resources";
import Workshops from "@/pages/workshops";
import Community from "@/pages/community";
import Depression from "@/pages/depression";
import Stats from "@/pages/stats";
import Video from "@/pages/video";
import NotFound from "@/pages/not-found";
import Assistant from "@/assistant/index";
import Messages from "@/pages/messages/index";
import Professionals from "@/pages/messages/professionals/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

function Navigation() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resources" component={Resources} />
      <Route path="/workshops" component={Workshops} />
      <Route path="/community" component={Community} />
      <Route path="/depression" component={Depression} />
      <Route path="/chat" component={Assistant} />
      <Route path="/assistant" component={Assistant} />
      <Route path="/stats" component={Stats} />
      <Route path="/video" component={Video} />
      <Route path="/messages" component={Messages} />
      <Route path="/messages/professionals" component={Professionals} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WouterRouter base={BASE}>
          <TooltipProvider>
            <Navigation />
            <Toaster />
          </TooltipProvider>
        </WouterRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
