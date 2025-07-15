import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Target } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-scoreguff-gradient flex items-center justify-center">
              <Target className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like this prediction missed the mark. The page you're looking
            for doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              size="lg"
              className="bg-scoreguff-blue hover:bg-scoreguff-blue/90 px-8 py-6 text-lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="border-scoreguff-blue text-scoreguff-blue hover:bg-scoreguff-blue hover:text-white px-8 py-6 text-lg"
            >
              <Target className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
