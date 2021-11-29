import { userDetailInfo } from "../Store/types";

export const getMembersFromlocalStorage = (communityName: string) => {
  const membersDetailsInLocal = getItemFromStorage("membersDetails_" + communityName);
  const empty: userDetailInfo[] = [];
  const membersDetails =
    membersDetailsInLocal !==""? (membersDetailsInLocal as userDetailInfo[]) : empty;
  return membersDetails;
};

export const putItemToLocalStorage = (keyName: string, item: any) => {
  putItemToStorage(keyName, item);
};
export const pushItemToLocalStorage = (keyName: string, item: any) => {
  const local = getItemFromStorage(keyName);
  const dataInStorage = local == "" ? [] : (local as any[]);
  dataInStorage.push(item);
  putItemToStorage(keyName, dataInStorage);
};
export const getItemFromlocalStorage = (keyName: string) => getItemFromStorage(keyName);

export const clearLocalSorage = () => {
  localStorage.clear();
};

///change below methods to switch to another kind of storage

const putItemToStorage = (keyName: string, data: any) => {
  localStorage.setItem(keyName, JSON.stringify(data));
};
const getItemFromStorage = (keyName: string) => {
  const ret = localStorage.getItem(keyName);

  return ret !== null ? JSON.parse(ret) : "";
};
