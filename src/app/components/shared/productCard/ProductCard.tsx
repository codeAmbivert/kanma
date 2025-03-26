"use client";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Button } from "../buttons/Button";
import { useRouter } from "next/navigation";

interface ProductData {
  _id: string;
  productName: string;
  price: number;
  stockQty: number;
  images: string[];
  seller: string;
}

interface ProductCardProps {
  data: ProductData;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, onClick }) => {
  // const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="p-3 rounded-xl max-w-sm sm:max-w-[16rem] w-full h-full">
      <div className=" relative">
        <div className="auto h-56 w-60 rounded-xl overflow-hidden relative">
          <img className="h-full w-72" src={data?.images[0]} />
          {data?.stockQty < 1 && (
            <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-center">
              Out of stock
            </div>
          )}
        </div>
        <div className="p-2 rounded-full bg-white absolute bottom-0 right-3 translate-y-1/2">
          <IoMdHeartEmpty size={20} className="-mb-1" />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-md font-medium w-[9rem] text-[#222222] whitespace-nowrap  overflow-hidden text-ellipsis">
            {data?.productName}
          </p>
          <p className="font-medium text-black whitespace-nowrap">
            £ {Number(data?.price).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3 items-center mt-2 justify-between mb-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="text-[#222222]">
                <FaStar size={12} />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium">5.0</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={() => router.push(`/products/${data?._id}`)}
          >
            View
          </Button>
          <Button className="w-full" onClick={onClick}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
