import React from 'react'

interface ItemInfoProps {
  item: {
    id: number;
    name: string;
    price: number | string;
    imageUrl?: string;
    category: string;
    condition: string;
    description?: string;
    seller: {
      id: number;
      name: string;
    };
    createdAt: string;
  };
}

const ItemInfo = ({ item }: ItemInfoProps) => { 
    return ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-lg font-medium">${Number(item.price).toFixed(2)}</p>
                {item.description && <p className="mt-2">{item.description}</p>}
                <div className="mt-4">
                    <p>Category: {item.category}</p>
                    <p>Condition: {item.condition}</p>
                    <p>Seller: {item.seller.name}</p>
                </div>
            </div>
        </div>
    ); 
}; 

export default ItemInfo; 