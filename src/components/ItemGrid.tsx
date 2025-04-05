import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ItemCard from "./ItemCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface Item {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  condition: string;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface ItemGridProps {
  items?: Item[];
  isLoading?: boolean;
}

const ItemGrid = ({ items = mockItems, isLoading = false }: ItemGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "Electronics",
    "Textbooks",
    "Furniture",
    "Clothing",
    "Kitchen",
    "Other",
  ];
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedConditions([]);
  };

  const filteredItems = items.filter((item) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Price range filter
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    // Condition filter
    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(item.condition);

    return matchesSearch && matchesPrice && matchesCategory && matchesCondition;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-background">
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 ||
            selectedConditions.length > 0 ||
            priceRange[0] > 0 ||
            priceRange[1] < 500) && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length +
                selectedConditions.length +
                (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active filters */}
      {(selectedCategories.length > 0 ||
        selectedConditions.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 500) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="flex items-center gap-1"
            >
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {selectedConditions.map((condition) => (
            <Badge
              key={condition}
              variant="outline"
              className="flex items-center gap-1"
            >
              {condition}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleCondition(condition)}
              />
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <Badge variant="outline" className="flex items-center gap-1">
              ${priceRange[0]} - ${priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setPriceRange([0, 500])}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar - only shown when filters are toggled */}
        {showFilters && (
          <Card className="p-4 h-fit sticky top-20 w-full md:w-64 shrink-0">
            <h3 className="font-medium mb-4">Filters</h3>

            <div className="space-y-6">
              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="mb-6">
                  <Slider
                    defaultValue={priceRange}
                    max={500}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">$</span>
                    <Input
                      type="number"
                      className="h-8 w-20"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">to</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">$</span>
                    <Input
                      type="number"
                      className="h-8 w-20"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value) || 500,
                        ])
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Categories Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Condition Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Condition</h4>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`condition-${condition}`}
                        checked={selectedConditions.includes(condition)}
                        onCheckedChange={() => toggleCondition(condition)}
                      />
                      <Label htmlFor={`condition-${condition}`}>
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Items Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-muted animate-pulse rounded-lg"
                  ></div>
                ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                  condition={item.condition}
                  seller={item.seller}
                  createdAt={item.createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={resetFilters}>Reset all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockItems: Item[] = [
  {
    id: "1",
    title: "MacBook Pro 2021",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    category: "Electronics",
    condition: "Like New",
    description: "M1 Pro chip, 16GB RAM, 512GB SSD, Space Gray",
    seller: {
      id: "user1",
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    createdAt: "2023-09-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Calculus Textbook",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    category: "Textbooks",
    condition: "Good",
    description:
      "Calculus: Early Transcendentals, 8th Edition. Some highlighting inside.",
    seller: {
      id: "user2",
      name: "Jamie Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    },
    createdAt: "2023-09-10T09:15:00Z",
  },
  {
    id: "3",
    title: "Desk Lamp",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1534381734677-83b9652bd06d?w=500&q=80",
    category: "Furniture",
    condition: "New",
    description:
      "LED desk lamp with adjustable brightness and color temperature.",
    seller: {
      id: "user3",
      name: "Taylor Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    },
    createdAt: "2023-09-18T16:45:00Z",
  },
  {
    id: "4",
    title: "Winter Jacket",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
    category: "Clothing",
    condition: "Like New",
    description: "North Face winter jacket, size M, worn only a few times.",
    seller: {
      id: "user4",
      name: "Jordan Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    createdAt: "2023-09-05T11:20:00Z",
  },
  {
    id: "5",
    title: "Coffee Maker",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&q=80",
    category: "Kitchen",
    condition: "Good",
    description: "Keurig K-Mini coffee maker, works perfectly.",
    seller: {
      id: "user5",
      name: "Casey Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    },
    createdAt: "2023-09-12T13:10:00Z",
  },
  {
    id: "6",
    title: "Wireless Earbuds",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    category: "Electronics",
    condition: "New",
    description: "Brand new wireless earbuds with noise cancellation.",
    seller: {
      id: "user1",
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    createdAt: "2023-09-17T10:30:00Z",
  },
  {
    id: "7",
    title: "Desk Chair",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
    category: "Furniture",
    condition: "Fair",
    description:
      "Ergonomic desk chair, adjustable height, some wear on the armrests.",
    seller: {
      id: "user3",
      name: "Taylor Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    },
    createdAt: "2023-09-08T15:25:00Z",
  },
  {
    id: "8",
    title: "Data Structures Textbook",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
    category: "Textbooks",
    condition: "Good",
    description:
      "Data Structures and Algorithms in Python, minimal highlighting.",
    seller: {
      id: "user2",
      name: "Jamie Wong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    },
    createdAt: "2023-09-14T08:50:00Z",
  },
];

export default ItemGrid;
