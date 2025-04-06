import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  MessageSquare,
  User,
  LogIn,
  Bell,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface NavbarProps {
  isAuthenticated?: boolean;
  userAvatar?: string;
  userName?: string;
  unreadMessages?: number;
  onOpenAuthModal?: () => void;
  isGuest?: boolean;
  onSearch?: (query: string) => void;
}

const Navbar = ({
  isAuthenticated = false,
  userAvatar = "",
  userName = "User",
  unreadMessages = 0,
  onOpenAuthModal = () => {},
  isGuest = false,
  onSearch = () => {},
}: NavbarProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "Textbooks",
    "Electronics",
    "Furniture",
    "Clothing",
    "Housing",
    "Services",
    "Other",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="hidden text-xl font-bold text-primary sm:inline-block">
              UW Marketplace
            </span>
          </Link>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-md"
          >
            <Input
              type="search"
              placeholder="Search for items..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((category) => (
                <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search - Mobile */}
        <div className="flex md:hidden">
          {isSearchExpanded ? (
            <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-background px-4">
              <form onSubmit={handleSearchSubmit} className="w-full flex">
                <Input
                  type="search"
                  placeholder="Search for items..."
                  className="w-full"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setIsSearchExpanded(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>
                        {isGuest ? "G" : userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isGuest && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-listings">My Listings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/saved-items">Saved Items</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  {isGuest ? (
                    <DropdownMenuItem onClick={onOpenAuthModal}>
                      Sign In
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to="/logout">Logout</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {!isGuest && (
                <Link to="/create-listing">
                  <Button>Create Listing</Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onOpenAuthModal}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button onClick={onOpenAuthModal}>Register</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col gap-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">
                  UW Marketplace
                </span>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-4 pb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">
                      @uwaterloo.ca
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      onOpenAuthModal();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      onOpenAuthModal();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <p className="px-4 text-sm font-medium text-muted-foreground">
                  Navigation
                </p>
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/categories"
                    className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    Categories
                  </Link>
                </SheetClose>
                {isAuthenticated && (
                  <>
                    {!isGuest && (
                      <>
                        <SheetClose asChild>
                          <Link
                            to="/my-listings"
                            className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                          >
                            My Listings
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            to="/messages"
                            className="flex items-center justify-between px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                          >
                            Messages
                            {unreadMessages > 0 && (
                              <Badge className="ml-auto">
                                {unreadMessages}
                              </Badge>
                            )}
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            to="/saved-items"
                            className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                          >
                            Saved Items
                          </Link>
                        </SheetClose>
                      </>
                    )}
                    <SheetClose asChild>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        Settings
                      </Link>
                    </SheetClose>
                    {!isGuest && (
                      <SheetClose asChild>
                        <Link
                          to="/create-listing"
                          className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Create Listing
                        </Link>
                      </SheetClose>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-4 text-sm font-medium text-muted-foreground">
                  Categories
                </p>
                {categories.slice(1).map((category) => (
                  <SheetClose key={category} asChild>
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      {category}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {isAuthenticated && (
                <SheetClose asChild>
                  <Link
                    to="/logout"
                    className="mt-auto flex items-center px-4 py-2 text-destructive hover:bg-destructive/10"
                  >
                    Logout
                  </Link>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
