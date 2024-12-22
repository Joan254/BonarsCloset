"use client";
import { clothingItems } from "@/public/data";
import { Button } from "antd";
import Image from "next/image";

export default function ItemDetails({ params }) {
  const { id } = params;

  const item = clothingItems.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 h-96">
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            priority
          />
        </div>
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
          <p className="text-gray-700 mb-4">{item.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            Ksh {item.price}
          </p>
          <Button type="primary" onClick={() => alert("Added to cart!")}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
