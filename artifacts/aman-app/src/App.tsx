// src/App.jsx
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";

import Home from "@/pages/home";
import Resources from "@/pages/resources";
import Workshops from "@/pages/workshops";
import Community from "@/pages/community";
import Depression from "@/pages/depression";
import Chat from "@/pages/chat";
import Stats from "@/pages/stats";
import Video from "@/pages/video";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// مكون داخلي يقرأ حالة المصادقة ويغلف بـ ChatProvider
function AppWithAuth() {
  const { user } = useAuth();
  const currentUserId = user?.id;

  return (
    <ChatProvider currentUserId={currentUserId}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </ChatProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resources" component={Resources} />
      <Route path="/workshops" component={Workshops} />
      <Route path="/community" component={Community} />
      <Route path="/depression" component={Depression} />
      <Route path="/chat" component={Chat} />
      <Route path="/stats" component={Stats} />
      <Route path="/video" component={Video} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AppWithAuth />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}