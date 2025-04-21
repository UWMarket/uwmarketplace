import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MessageButton from "./MessageButton";

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  isFree?: boolean;
  image: string;
  category: string;
  condition: string;
  seller: {
    name: string;
    id: string;
  };
  createdAt: string;
  onSave?: (id: string) => void;
  onMessage?: (sellerId: string) => void;
  onCardClick?: (id: string) => void;
  isSaved?: boolean;
}

const ItemCard = ({
  id,
  title,
  price,
  isFree = false,
  image,
  category,
  condition,
  seller,
  createdAt,
  onSave = () => {},
  onMessage = () => {},
  onCardClick = () => {},
  isSaved = false,
}: ItemCardProps) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(id);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (seller && seller.id) {
      onMessage(seller.id);
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <Card
      className="w-full max-w-[320px] overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer bg-white"
      onClick={() => onCardClick(id)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80"
          }
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="font-medium text-black bg-white/90"
          >
            {category}
          </Badge>
        </div>
        {condition && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-xs text-black bg-white/90">
              {condition}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="flex-1 mr-2 text-lg font-medium line-clamp-2 dark:text-black">
            {title}
          </h3>
          <div className="text-lg font-bold dark:text-black">
            {isFree ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>
                ${typeof price === "number" ? price.toFixed(2) : "0.00"}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Posted {formattedDate}
            {seller && seller.name ? ` by ${seller.name}` : ""}
          </div>

          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={handleSaveClick}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isSaved ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaved ? "Remove from saved" : "Save item"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <MessageButton
              sellerId={seller?.id || ""}
              onMessage={handleMessageClick}
              className="w-8 h-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
