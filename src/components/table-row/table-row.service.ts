export const getRowCellClasses = (folderType: string) => {
  switch (folderType) {
    case 'folder1':
      return 'folder-1';
    case 'folder2':
      return 'folder-2';
    case 'file':
      return 'file';
    case 'trash':
      return 'trash';
  }
};
