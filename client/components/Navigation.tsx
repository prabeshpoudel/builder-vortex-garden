import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  Home,
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  Newspaper,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { isAdmin, setIsAdmin } = useAdmin();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    ...(isAuthenticated
      ? [
          { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
          { href: "/predictions", label: "Predictions", icon: Target },
          { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
          { href: "/analytics", label: "Analytics", icon: TrendingUp },
        ]
      : []),
    { href: "/news", label: "News", icon: Newspaper },
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin Panel", icon: Settings }]
      : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-scoreguff-gradient">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent">
              ScoreGuff
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link to={item.href}>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                          isActive(item.href) &&
                            "bg-scoreguff-blue/10 text-scoreguff-blue border border-scoreguff-blue/20",
                        )}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Menu & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              /* User Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar || "/placeholder.svg"}
                        alt="User"
                      />
                      <AvatarFallback className="bg-scoreguff-gradient text-white">
                        {user?.name?.charAt(0).toUpperCase() || "SG"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || "ScoreGuff User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "user@scoreguff.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {!isAdmin && (
                    <DropdownMenuItem onClick={() => setIsAdmin(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Enable Admin Mode</span>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => setIsAdmin(false)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Disable Admin Mode</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Signup Buttons */
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-scoreguff-blue hover:bg-scoreguff-blue/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-scoreguff-blue hover:bg-scoreguff-blue/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-scoreguff-gradient">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-scoreguff-gradient bg-clip-text text-transparent">
                        ScoreGuff
                      </span>
                    </SheetTitle>
                    <SheetDescription>
                      Navigate through your sports prediction platform
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive(item.href) &&
                            "bg-scoreguff-blue/10 text-scoreguff-blue",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    {!isAuthenticated && (
                      <div className="pt-4 border-t space-y-2">
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <User className="h-5 w-5" />
                          <span>Sign In</span>
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-scoreguff-blue text-white hover:bg-scoreguff-blue/90"
                        >
                          <User className="h-5 w-5" />
                          <span>Sign Up</span>
                        </Link>
                      </div>
                    )}

                    {isAuthenticated && (
                      <div className="pt-4 border-t">
                        <button
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full text-left"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Log out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
