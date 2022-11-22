import folderOneIcon from '../assets/folder-1.svg';
import folderTwoIcon from '../assets/folder-2.svg';
import fileIcon from '../assets/file.svg';
import trashIcon from '../assets/trash.svg';

export const folderTypes = ['folder1', 'folder2', 'file', 'trash'];

export const parentFolderTypes = ['null', 'folder1', 'folder2', 'file'];

const icons: { [key: string]: string } = {
  folder1: folderOneIcon,
  folder2: folderTwoIcon,
  file: fileIcon,
  trash: trashIcon,
};

function getIconByKey(key: string) {
  return icons[key];
}

export default getIconByKey;
