import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./Ui/Button";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { title, imageURL, description, price,category } = product;
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
     
        <Image
          imageUrl={imageURL}
          alt={category.name}
          className="rounded-md h-52 w-full lg:object-cover"        />
        <h2 className="text-pink-700 font-medium">{title}</h2>
        <p>{textSlicer(description)} </p>

        <div className="flex items-center my-2 space-x-2">
          <span className="w-5 h-5 rounded-full bg-rose-800" />
          <span className="w-5 h-5 rounded-full bg-yellow-500" />
          <span className="w-5 h-5 rounded-full bg-blue-600" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-rose-700 font-bold">${price}</span>

          <Image
            imageUrl={category.imageURL}
            alt={category.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      

      <div className="space-x-2 mt-2 flex justify-between it">
        <Button className="bg-purple-600 hover:bg-indigo-800 ">Edit❤️</Button>
        <Button className="bg-red-700 hover:bg-indigo-800">Destroy</Button>
      </div>
    </div>
  );
};

export default ProductCard;
