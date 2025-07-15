import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Calendar } from "lucide-react";

const Predictions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
              Predictions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered sports predictions with detailed analysis and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-scoreguff-blue/50 transition-all">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-scoreguff-blue mx-auto mb-4" />
              <CardTitle>Active Predictions</CardTitle>
              <CardDescription>
                View and manage your current predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-scoreguff-green/50 transition-all">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-scoreguff-green mx-auto mb-4" />
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Advanced machine learning predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-scoreguff-green hover:bg-scoreguff-green/90">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-scoreguff-gold/50 transition-all">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-scoreguff-gold mx-auto mb-4" />
              <CardTitle>Scheduled Picks</CardTitle>
              <CardDescription>
                Upcoming matches and predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-scoreguff-gold hover:bg-scoreguff-gold/90 text-white">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
