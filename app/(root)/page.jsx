import { clothingItems } from "@/public/data";
import { Button, Card } from "antd";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clothingItems.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="rounded-lg shadow-md"
            cover={
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-t-lg"
                  priority
                />
              </div>
            }
          >
            <div className="text-center">
              <h2 className="text-md font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-500 mb-2">Ksh {item.price}</p>
              <Link href={`/item/${item.id}`} passHref>
                <Button type="primary" className="bg-blue-500">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
