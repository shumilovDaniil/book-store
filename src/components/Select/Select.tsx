import * as React from "react";
import { FC } from "react";

export interface ISelectProps {
  selectType: {
    type: string;
    id: number;
  }[];
}

const Select: FC<ISelectProps> = ({ selectType }) => {
  return (
    <select>
      {selectType.map((type) => {
        return <option key={type.id}>{type.type}</option>;
      })}
    </select>
  );
};

export default Select;
