import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import ItemGrid from "./ItemGrid";
import AuthModal from "./AuthModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { api } from "../lib/api";

const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "textbooks", name: "Textbooks" },
  { id: "furniture", name: "Furniture" },
  { id: "clothing", name: "Clothing" },
  { id: "kitchen", name: "Kitchen" },
  { id: "sports", name: "Sports & Outdoors" },
  { id: "services", name: "Services" },
  { id: "other", name: "Other" },
];

const conditions = [
  { id: "new", name: "New" },
  { id: "like-new", name: "Like New" },
  { id: "good", name: "Good" },
  { id: "fair", name: "Fair" },
  { id: "poor", name: "Poor" },
];

interface HomeProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Home = ({ isAuthenticated, onLogout }: HomeProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [browsingAsGuest, setBrowsingAsGuest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    fetchListings();
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, [searchQuery, priceRange, selectedCategories, selectedConditions]);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const filters = {
        search: searchQuery || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category:
          selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        condition:
          selectedConditions.length > 0 ? selectedConditions[0] : undefined,
      };
      const data = await api.listings.getAll(filters);
      setListings(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch listings");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    onLogout();
  };

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId)
        ? prev.filter((id) => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedConditions([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isAuthenticated={isAuthenticated || browsingAsGuest}
        onLogin={() => openAuthModal("signin")}
        onRegister={() => openAuthModal("signup")}
        onLogout={handleLogout}
        onSearch={setSearchQuery}
        isGuest={browsingAsGuest}
      />

      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated && !browsingAsGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-muted rounded-xl text-center"
          >
            <h2 className="text-2xl font-bold mb-2">
              Welcome to UW Marketplace
            </h2>
            <p className="text-muted-foreground mb-4">
              Buy, sell, and exchange items exclusively with other Waterloo
              students. Sign in with your @uwaterloo.ca email to get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => openAuthModal("signin")}>Sign In</Button>
              <Button variant="outline" onClick={() => openAuthModal("signup")}>
                Register
              </Button>
              <Button variant="ghost" onClick={() => setBrowsingAsGuest(true)}>
                Browse Without Account
              </Button>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <Card className="md:w-64 h-fit sticky top-20 bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`}>
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Condition */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Condition</h4>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`condition-${condition.id}`}
                          checked={selectedConditions.includes(condition.id)}
                          onCheckedChange={() => toggleCondition(condition.id)}
                        />
                        <Label htmlFor={`condition-${condition.id}`}>
                          {condition.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Free Items Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="free-only" />
                  <Label htmlFor="free-only">Free Items Only</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for items..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    <Badge className="ml-1">
                      {selectedCategories.length + selectedConditions.length}
                    </Badge>
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Sort By
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="recent">Recently Added</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="free">Free Items</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <ItemGrid items={listings} isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => setShowAuthModal(open)}
      />
    </div>
  );
};

export default Home;
