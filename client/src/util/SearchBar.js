import React, { useState } from 'react';
import Select from 'react-select';

const SearchBar = ({ data,searchKey, secondSearchKey, thirdSearchKey }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = data.map((name) => ({
    label: `${name[searchKey]}(${name[thirdSearchKey]}) - ${name[secondSearchKey]}`,
    value: name._id, // 또는 다른 고유한 값
  }));

  return (
    <Select
      value={selectedOption}
      onChange={(selected) => setSelectedOption(selected)}
      options={options}
      isSearchable={true}
      isClearable={true}
      maxMenuHeight={200} // 보여질 최대 항목 수
      styles={{
        menu: (provided) => ({
          ...provided,
          maxHeight: 200, // 최대 높이 설정
        }),
      }}
    />
  );
};

export default SearchBar;
