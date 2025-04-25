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
import ItemInfo from "./ItemInfo"
import { Search, SlidersHorizontal, X } from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
  condition: string;
  description?: string;
  seller: {
    id: number;
    name: string;
  },
  createdAt: string,
  onSave?: () => void;
  // onMessage?: () => void;
  onCardClick: () => void;
  isSaved?: boolean;
}

interface ItemGridProps {
  items: Item[];
  isLoading?: boolean;
}


const ItemGrid = ({ items, isLoading = false }: ItemGridProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
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

  const onCardClick = (item: Item) => { 
    setSelectedItem(item)
  };
  
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
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(item.condition);

    return matchesSearch && matchesPrice && matchesCategory && matchesCondition;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="h-64 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }
  
  return (
    <div className="w-full px-4 py-6 mx-auto max-w-7xl bg-background">
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
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
                className="w-3 h-3 cursor-pointer"
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
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleCondition(condition)}
              />
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <Badge variant="outline" className="flex items-center gap-1">
              ${priceRange[0]} - ${priceRange[1]}
              <X
                className="w-3 h-3 cursor-pointer"
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

      <div className="flex flex-col gap-6 md:flex-row">
        {showFilters && (
          <Card className="sticky w-full p-4 h-fit top-20 md:w-64 shrink-0">
            <h3 className="mb-4 font-medium">Filters</h3>

            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-medium">Price Range</h4>
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
                      className="w-20 h-8"
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
                      className="w-20 h-8"
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

              <div>
                <h4 className="mb-2 text-sm font-medium">Categories</h4>
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

              <div>
                <h4 className="mb-2 text-sm font-medium">Condition</h4>
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

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id.toString()}
                title={item.name}
                price={Number(item.price)}
                image={item.imageUrl || ""}
                category={item.category}
                condition={item.condition}
                seller={{
                  id: item.seller.id.toString(),
                  name: item.seller.name,
                }}
                createdAt={item.createdAt}
                onCardClick={() => onCardClick(item)}
                onSave={() => {}}
              />
            ))}
          </div>
          
          {selectedItem && (
            <div className="relative">
              <ItemInfo item={selectedItem} />
              {/* <button 
                className="absolute p-1 top-2 right-2" 
                onClick={() => setSelectedItem(null)}
              >
                X
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ItemGrid;
