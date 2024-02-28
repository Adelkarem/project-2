import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string; // The color prop specifies the background color of the circle
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={"block w-5 h-5 rounded-full cursor-pointer"}
      style={{ backgroundColor: color }} // Set the background color using the style attribute
      {...rest} // Pass any additional props to the span element
    />
  );
};

export default CircleColor;

  