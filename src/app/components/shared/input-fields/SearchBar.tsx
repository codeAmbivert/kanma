import { FC } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<Props> = ({ name, value, onChange }: Props) => {
  return (
    <main className="w-full border border-nafcGrayText rounded-md flex items-center overflow-hidden">
      <div className="p-4 h-full bg-nafcLightGreyBg text-nafcGrayText">
        <FiSearch size={20} />
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="p-2 w-full text-lg focus:outline-none"
      />
    </main>
  );
};

export default SearchBar;
