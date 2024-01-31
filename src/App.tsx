import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/Ui/Model";
import { formInputsList, productList } from "./data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";

const App = () => {

  /* state*/ 
 const [isOpen, setIsOpen] = useState(false)
  /* handler*/ 
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const renderProductList = productList.map(product => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList=formInputsList.map(input=> 
  <div className="flex flex-col">
     <label htmlFor={input.id} className="mb-[px] text-sm font-medium text-gray-700">{input.label}</label >
 <Input type="text" id={input.id} name={input.name}/>
  </div>
 )
  return (
    <main className="container">
      <Button className="bg-red-700 hover:bg-indigo-800" onClick={openModal}>ADD</Button>

      <div className="border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  p-2 m-3 gap-2 md:gap-4 rounded-lg">
        {renderProductList}
      </div>

      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT" >
   
        <div className="space-y-2">
        {renderFormInputList}

        <div className="flex items-center space-x-3  ">
<Button className="bg-red-700 hover:bg-indigo-800">SNBMIT</Button>
      <Button className="bg-gray-400 hover:bg-gray-500">Cancle</Button>
</div>
        </div>

        </Model> 
    
      
    </main>
  );
};

export default App;
