

export const MenuSelector = ({
  allMenus,

  onMenuSelect,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-[#475467]">Menu</label>
      <select
        onChange={(e) => {
          const value = e.target.value === "-1" ? null : e.target.value;
          onMenuSelect(value);
        }}
        className="w-64 border rounded-md p-2 bg-[#f9fafb] font-medium text-[#1d2939] outline-none border-none"
      >
        {allMenus.map(({ value, label }, i) => (
          <option className=" bg-[#f9fafb]" key={i + label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
