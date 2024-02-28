import { IProduct } from "../interfaces";
import { numberWithCommas, textSlicer } from "../utils/function";



import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./Ui/Button";

interface Iprops {
  product: IProduct;
  setProductToEdit:(product:IProduct)=>void;
  openEditModal:()=>void;
  idx:number;
  setProductToEditIdx:(value:number)=>void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: Iprops) => {
  const { title, imageURL, description, price,category,colors } = product;
    /* render*/
  const renderProductColors = colors.map(color => (
    <CircleColor
      key={color}
      color={color}/>
  ));
      /* Handler*/
const onEdit=()=>{
  setProductToEdit(product)
  openEditModal()
  setProductToEditIdx(idx)
}

const onRemove = () => {
  openConfirmModal();
};
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
     
        <Image
          imageUrl={imageURL}
          alt={category.name}
          className="rounded-md h-52 w-full lg:object-cover"        />
        <h2 className="text-pink-700 font-medium">{title}</h2>
        <p>{textSlicer(description)} </p>


        <div className="flex items-center flex-wrap space-x-1">
        {!colors.length ? <p className="min-h-[20px]">Not available colors!</p> : renderProductColors}
      </div>
       
        <div className="flex justify-between items-center m-2">
         <span className="text-lg text-indigo-600 font-semibold">${numberWithCommas(price)}</span>
 
        <div className="flex justify-between items-center space-x-2">
        <span className="text-xs font-semibold">{category.name}</span>
          <Image imageUrl={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
        </div>
        
        </div>
      

      <div className="space-x-2 mt-2 flex justify-between it">
        <Button className="bg-purple-600 hover:bg-indigo-800 " onClick={onEdit}>Edit❤️</Button>
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
