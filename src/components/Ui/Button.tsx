import { ButtonHTMLAttributes, ReactNode } from "react";
interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, width='w-full', className, ...rest }: Iprops) => {
  return (
    <button className={`${className} ${width} h-8 rounded-md text-white px-3 py-3 duration-200 font-medium`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
