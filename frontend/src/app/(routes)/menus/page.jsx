"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 
import toast from "react-hot-toast";
import {
  fetchMenus,
  fetchAllMenuOptions,
  fetchParentMenus,
  deleteMenu,
  updateMenu,
  createMenu,
  setSelectedMenu,
  setCurrentParentMenuId,
  setFormState,
  setError,
  resetState,
} from "@/store/menuSlice";
import DeleteModal from "@/components/ui/DeleteModel";
import { MenuForm } from "@/components/Menus/MenuForm";
import { TreeView } from "@/components/Menus/TreeView";
import { MenuSelector } from "@/components/Menus/MenuSelector";
import { MenuHeader } from "@/components/Menus/MenuHeader";

export default function MenusClient() {
  const dispatch = useDispatch();
  const {
    treeData,
    expandIt,
    error,
    selectedMenu,
    formState,
    parentSelectionData,
    isLoading,
    isDeleteLoading,
    isMutateLoading,
    allMenus,
    currentParentMenuId,
  } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchAllMenuOptions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMenu.id && selectedMenu.isEdit) {
      dispatch(fetchParentMenus(selectedMenu.id));
    }
  }, [selectedMenu, dispatch]);

  const handleMenuSelection = (menu, action) => {
    dispatch(
      setSelectedMenu({
        ...menu,
        parentName: menu?.name,
        isEdit: action === "edit",
        isDelete: action === "delete",
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormState({ ...formState, [name]: value }));
  };

  const isAllValid = () => {
    let newError = { name: "" };
    let isValid = true;

    if (!formState.name.trim()) {
      newError.name = "Please Enter Name";
      isValid = false;
    } else if (formState.name.trim().length < 4) {
      newError.name = "Name must be at least 4 characters long.";
      isValid = false;
    }

    dispatch(setError(newError));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAllValid()) return;

    try {
      if (selectedMenu.isEdit) {
        await dispatch(
          updateMenu({
            id: formState.id,
            title: formState.name,
            parent_id: +formState.parent || null,
          })
        ).unwrap();
        toast.success("Menu Updated Successfully");
      } else {
        await dispatch(
          createMenu({
            title: formState.name,
            parent_id: +selectedMenu.id || null,
          })
        ).unwrap();
        toast.success("Menu Added Successfully");
      }

      dispatch(fetchMenus(currentParentMenuId));
      dispatch(resetState());
    } catch (error) {
      toast.error(
        selectedMenu.isEdit ? "Failed to update menu" : "Failed to add menu"
      );
    }
  };

  const handleDeleteMenu = async () => {
    try {
      await dispatch(deleteMenu(selectedMenu.id)).unwrap();
      dispatch(fetchMenus(currentParentMenuId));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete menu");
    }
  };

  return (
    <div className="flex-1 bg-white p-4 md:pt-6">
      <MenuHeader />
      <MenuSelector
        allMenus={allMenus}
        currentParentMenuId={currentParentMenuId}
        onMenuSelect={(value) => {
          dispatch(setCurrentParentMenuId(value));
          dispatch(fetchMenus(value));
        }}
      />
      <div className="flex w-full justify-between flex-col md:flex-row gap-8 md:gap-1">
        <TreeView
          treeData={treeData}
          isLoading={isLoading}
          expandIt={expandIt}
          selectedMenu={selectedMenu}
          onMenuSelection={handleMenuSelection}
        />
        <MenuForm
          formState={formState}
          selectedMenu={selectedMenu}
          error={error}
          isLoading={isMutateLoading}
          parentSelectionData={parentSelectionData}
          onInputChange={handleInputChange}
          onParentChange={(value) =>
            dispatch(setFormState({ ...formState, parent: value }))
          }
          onSubmit={handleSubmit}
          treeData={treeData}
        />
      </div>
      {selectedMenu.isDelete && (
        <DeleteModal
          deleteCallback={handleDeleteMenu}
          loading={isDeleteLoading}
          message={
            <>
              Are you sure you want to delete this Menu{" "}
              <b>&apos;{selectedMenu.name}&apos;</b>?
            </>
          }
          closeModal={() => dispatch(resetState())}
        />
      )}
    </div>
  );
}
