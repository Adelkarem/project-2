import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/Ui/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMassage from "./components/ErrorMassage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/Ui/Select";
import { ProductNameTypes } from "./types";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [products, setproducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] =useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] =useState<number>(0);
  const [product, setproduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  

  /* state*/
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);

  /* handler*/
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };
  const openEditModal = () => {
    setIsOpenEditModal(true);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setproduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  console.log("product to edit", productToEdit);
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({ title, description, price, imageURL });

    console.log(errors);
    const hasErrorMsg =
      Object.values(errors).some(value => value === "") &&
      Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setproducts(prev => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setproduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };

  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  /*submit edit handler*/ 
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
       title, 
       description,
        price,
         imageURL
         });

  
  const hasErrorMsg =
      Object.values(errors).some(value => value === "") &&
      Object.values(errors).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setproducts(prev => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    const updatedProducts =[...products]
    updatedProducts[productToEditIdx]={...productToEdit, colors:tempColors.concat(productToEdit.colors)}
    setproducts(updatedProducts)
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
  };




  const onCancel = () => {
    setproduct(defaultProductObj);
    closeModal();
  };
  /* render*/
  const renderProductList = products.map((product, idx) => (
  
      <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
   
  
  ));

  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[px] text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map(color => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors(prev => prev.filter(item => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors(prev => prev.filter(item => item !== color));
          return;
        }
        setTempColors(prev => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg =(id:string,label:string,name:ProductNameTypes)=>{
    return(
      <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-[px] text-sm font-medium text-gray-700">
    {label}
      </label>
      <Input
        type="text"
        id={id}
        name={name}
        value={productToEdit[name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMassage msg={errors[name]} />
    </div> 
    )

  }





  return (
    <main className="container">
      <Button className="bg-red-700 hover:bg-indigo-800" onClick={openModal}>
        ADD
      </Button>

      <div className="border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  p-2 m-3 gap-2 md:gap-4 rounded-lg">
        {renderProductList}
      </div>
      {/*add product model */}
      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <div className="space-y-2">
          {renderFormInputList}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex items-center my-2 space-x-1 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center my-2 space-x-1 flex-wrap">
            {tempColors.map(color => (
              <span
                key={color}
                className="p-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}>
                {color}
              </span>
            ))}
          </div>

          <form
            className="flex items-center space-x-3 "
            onSubmit={submitHandler}>
            <Button className="bg-red-700 hover:bg-indigo-800">SNBMIT</Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}>
              Cancel
            </Button>
          </form>
        </div>
      </Model>

      {/*Edit product model */}

      <Model
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT">
        <div className="space-y-2">
   
        {renderProductEditWithErrorMsg('title','product Title','title')}
        {renderProductEditWithErrorMsg('description','product description','description')}
        {renderProductEditWithErrorMsg('imageURL','product imageURL','imageURL')}
        {renderProductEditWithErrorMsg('price','product price','price')}
          <Select selected={productToEdit.category} setSelected={(value)=>setProductToEdit({...productToEdit,category:value})} />

          <div className="flex items-center my-2 space-x-1 flex-wrap">
          {renderProductColors}
          </div>
          <div className="flex items-center my-2 space-x-1 flex-wrap">
  {tempColors.concat(productToEdit.colors).map(color => (
    <span key={color} className="p-1 mb-1 text-sm rounded-md text-white"
    style={{ backgroundColor: color }}>{color}</span>
  ))}
</div>

          <form
            className="flex items-center space-x-3 "
            onSubmit={submitEditHandler}>

            <Button className="bg-red-700 hover:bg-indigo-800">SNBMIT</Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}>
              Cancel
            </Button>
          </form>
        </div>
      </Model>
            {/* DELETE PRODUCT CONFIRM MODAL */}
      <Model
  isOpen={isOpenConfirmModal}
  closeModal={closeConfirmModal}
  title="Are you sure you want to remove this Product from your Store?"
  description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
>
  <div className="flex items-center space-x-3">
    <Button className="bg-[#c2344d] hover:bg-red-800">Yes, remove</Button>
    <Button className="bg-[#f5f5fa] hover:bg-gray-300 text-black" onClick={closeConfirmModal}>
      Cancel
    </Button>
  </div>
</Model>

    </main>
  );
};

export default App;
