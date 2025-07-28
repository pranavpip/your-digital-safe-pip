import { useState } from "react";
import { Auth } from "./Auth";
import { Dashboard } from "./Dashboard";

const Index = () => {
  // TODO: Replace with actual authentication state from Supabase
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <Dashboard />;
};

export default Index;
