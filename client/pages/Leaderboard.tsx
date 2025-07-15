import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-scoreguff-gradient bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how you rank among the top sports prediction experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-scoreguff-gold/50 bg-gradient-to-br from-background to-scoreguff-gold/5">
            <CardHeader className="text-center">
              <Trophy className="h-16 w-16 text-scoreguff-gold mx-auto mb-4" />
              <CardTitle className="text-2xl">Top Predictors</CardTitle>
              <CardDescription>
                The highest accuracy scorers this month
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge className="bg-scoreguff-gold text-white">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-scoreguff-blue/50">
            <CardHeader className="text-center">
              <Medal className="h-16 w-16 text-scoreguff-blue mx-auto mb-4" />
              <CardTitle className="text-2xl">Most Profitable</CardTitle>
              <CardDescription>Users with the highest returns</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge className="bg-scoreguff-blue">Coming Soon</Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-scoreguff-green/50">
            <CardHeader className="text-center">
              <Award className="h-16 w-16 text-scoreguff-green mx-auto mb-4" />
              <CardTitle className="text-2xl">Consistency Awards</CardTitle>
              <CardDescription>Most consistent performers</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge className="bg-scoreguff-green">Coming Soon</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
