import React, { useState } from "react";

import { useBoolean } from "./state";

/**
 * This hook creates the state and callbacks required to
 * save a HTMLElement anchor for a menu.
 * @param openCallback Callback to be called when the open menu function is executed.
 * @param closeCallback Callback to be called when the close menu function is executed.
 * @returns `[menuAnchor, openMenu, closeMenu]`
 */
export const useMenuAnchor: (
  openCallback?: (event: React.MouseEvent<HTMLElement>) => void,
  closeCallback?: () => void
) => [
  HTMLElement | null,
  (event: React.MouseEvent<HTMLElement>) => void,
  () => void
] = (openCallback = () => {}, closeCallback = () => {}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    openCallback(event);
    setMenuAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    closeCallback();
    setMenuAnchor(null);
  };
  return [menuAnchor, openMenu, closeMenu];
};

/**
 * This hook creates the state and callbacks required to
 * save a HTMLElement anchor for a menu along with some data.
 * @param openCallback Callback to be called when the open menu function is executed.
 * @param closeCallback Callback to be called when the close menu function is executed.
 * @returns `[menuAnchor, data, openMenuWithData, closeMenu]`
 */
export const useMenuWithData: <T>(
  defaultData: T,
  openCallback?: (event: React.MouseEvent<HTMLElement>, data: T) => void,
  closeCallback?: () => void
) => [
  HTMLElement | null,
  T,
  (event: React.MouseEvent<HTMLElement>, data: T) => void,
  () => void
] = <T>(
  defaultData: T,
  openCallback: (
    event: React.MouseEvent<HTMLElement>,
    data: T
  ) => void = () => {},
  closeCallback: () => void = () => {}
) => {
  const [menuAnchor, openMenu, closeMenu] = useMenuAnchor(
    undefined,
    closeCallback
  );
  const [data, setData] = useState<T>(defaultData);

  const openMenuWithData = (event: React.MouseEvent<HTMLElement>, data: T) => {
    openMenu(event);
    openCallback(event, data);
    setData(data);
  };

  return [menuAnchor, data, openMenuWithData, closeMenu];
};

/**
 * This hook creates the state and callbacks required to
 * open and close a dialog along with some data.
 * @param openCallback Callback to be called when the open dialog function is executed.
 * @param closeCallback Callback to be called when the close dialog function is executed.
 * @returns `[open, data, openDialogWithData, closeDialog]`
 */
export const useDialogWithData: <T>(
  defaultData: T,
  openCallback?: (data: T) => void,
  closeCallback?: () => void
) => [boolean, T, (data: T) => void, () => void] = <T>(
  defaultData: T,
  openCallback: (data: T) => void = () => {},
  closeCallback: () => void = () => {}
) => {
  const [open, openDialogHandler, closeDialogHandler] = useBoolean(false);
  const [data, setData] = useState<T>(defaultData);

  const openDialogWithData = (data: T) => {
    openDialogHandler();
    openCallback(data);
    setData(data);
  };

  const closeDialog = () => {
    closeDialogHandler();
    closeCallback();
  };

  return [open, data, openDialogWithData, closeDialog];
};
