import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";



export const MenuForm = ({
  formState,
  selectedMenu,
  error,
  isLoading,
  parentSelectionData,
  onInputChange,
  onParentChange,
  onSubmit,
  treeData,
}) => {
 
  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-100 p-4 pt-0 rounded-md w-full"
    >
      <div className="mb-4 max-w-80">
        <Input
          label="MenuID"
          disabled={true}
          className="w-full bg-[#F9FAFB] text-[#667085]"
          value={!selectedMenu?.isEdit ? "" : formState?.id}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Depth"
          name="depth"
          type="number"
          disabled={true}
          error={error?.depth}
          handleChange={onInputChange}
          className="bg-[#EAECF0] text-[#475467] rounded-md"
          value={!treeData?.length ? 0 : selectedMenu.depth}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#475467]">
          Parent
        </label>
        <select
          disabled={!parentSelectionData?.length || !selectedMenu.isEdit}
          className="w-64 disabled:cursor-not-allowed border rounded-md p-2 bg-[#f4f7fa] font-medium text-[#101828] outline-none border-none"
          value={formState?.parent}
          onChange={(e) => onParentChange(e.target.value)}
        >
          {selectedMenu.isEdit ? (
            parentSelectionData.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))
          ) : (
            <option value={selectedMenu.id}>{selectedMenu?.parentName}</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <Input
          label="Name"
          name="name"
          error={error?.name}
          handleChange={onInputChange}
          className="bg-[#f4f7fa] text-[#101828] rounded-md"
          value={formState.name}
        />
      </div>
      <Button
        title={
          !treeData?.length
            ? false
            : selectedMenu.id === ""
            ? "Click a menu on the left to edit, or hover and click '+' to add a new menu"
            : ""
        }
        type="submit"
        loading={isLoading}
        disabled={!treeData?.length ? false : selectedMenu.id === ""}
      >
        {selectedMenu.isEdit ? "Save" : "Add"}
      </Button>
    </form>
  );
};
