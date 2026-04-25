import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Matches from "@/pages/Matches";
import MatchDetails from "@/pages/MatchDetails";
import Predictions from "@/pages/Predictions";
import News from "@/pages/News";
import NewsDetails from "@/pages/NewsDetails";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { MatchProvider } from "@/context/MatchContext";
import { PredictionProvider } from "@/context/PredictionContext";
import { NewsProvider } from "@/context/NewsContext";
import { RequireAdmin, RequireAuth } from "@/components/common/RouteGuards";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminMatchManagement from "@/pages/admin/AdminMatchManagement";
import AdminPredictionManagement from "@/pages/admin/AdminPredictionManagement";
import AdminUserPredictionAnalytics from "@/pages/admin/AdminUserPredictionAnalytics";
import AdminNewsManagement from "@/pages/admin/AdminNewsManagement";
import AdminSettings from "@/pages/admin/AdminSettings";

function App() {
  return (
    <AuthProvider>
      <MatchProvider>
        <PredictionProvider>
          <NewsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/matches/:id" element={<MatchDetails />} />
                <Route path="/predictions" element={<RequireAuth><Predictions /></RequireAuth>} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetails />} />

                <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
                <Route path="/admin/matches" element={<RequireAdmin><AdminMatchManagement /></RequireAdmin>} />
                <Route path="/admin/predictions" element={<RequireAdmin><AdminPredictionManagement /></RequireAdmin>} />
                <Route path="/admin/user-predictions" element={<RequireAdmin><AdminUserPredictionAnalytics /></RequireAdmin>} />
                <Route path="/admin/news" element={<RequireAdmin><AdminNewsManagement /></RequireAdmin>} />
                <Route path="/admin/settings" element={<RequireAdmin><AdminSettings /></RequireAdmin>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NewsProvider>
        </PredictionProvider>
      </MatchProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
