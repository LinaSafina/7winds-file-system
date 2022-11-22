import {
  FolderType,
  ParentIdType,
  RowTypeWithChild,
  RowTypeWithExtra,
} from '../../context/rows.types';
import { folderTypes } from '../../utils/getIconsByKey';

let height = 0;
let parentId: number | null = null;

export const flattenRowsList = function (
  arr: RowTypeWithChild[],
  count: number,
  parentId: ParentIdType = null
) {
  return arr.reduce<RowTypeWithExtra[]>(function (acc, value) {
    acc.push({
      parentId: parentId,
      ...value,
      folderType: folderTypes[count] as FolderType,
    });
    height++;

    if (value.child) {
      acc = acc.concat(flattenRowsList(value.child, count + 1, value.id));
    }

    return acc;
  }, []);
};

export function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number {
  let length = array.length;
  while (length--) {
    if (predicate(array[length], length, array)) return length;
  }
  return -1;
}
