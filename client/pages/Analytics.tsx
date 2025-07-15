import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, PieChart, LineChart } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep insights into your betting performance and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-scoreguff-blue/50 transition-all">
            <CardHeader className="text-center">
              <BarChart3 className="h-16 w-16 text-scoreguff-blue mx-auto mb-4" />
              <CardTitle className="text-2xl">Performance Metrics</CardTitle>
              <CardDescription>
                Detailed analysis of your prediction accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-scoreguff-blue mb-2">
                Coming Soon
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-scoreguff-green/50 transition-all">
            <CardHeader className="text-center">
              <PieChart className="h-16 w-16 text-scoreguff-green mx-auto mb-4" />
              <CardTitle className="text-2xl">Profit Distribution</CardTitle>
              <CardDescription>
                Breakdown of winnings by sport and market
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-scoreguff-green mb-2">
                Coming Soon
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-scoreguff-gold/50 transition-all">
            <CardHeader className="text-center">
              <LineChart className="h-16 w-16 text-scoreguff-gold mx-auto mb-4" />
              <CardTitle className="text-2xl">Trend Analysis</CardTitle>
              <CardDescription>
                Market movements and prediction trends
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-scoreguff-gold mb-2">
                Coming Soon
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
