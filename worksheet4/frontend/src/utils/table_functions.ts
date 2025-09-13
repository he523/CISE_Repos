/**
 * 根据排序键（sortKey）和是否反向排序，对数据进行排序的函数。
 * 
 * @param tableData 待排序的数据（对象数组）
 * @param sortKey 排序依据的字段名
 * @param reverse 是否反向排序（false为升序，true为降序）
 * @returns 排序后的数组
 */
export function sortData<T>(
  tableData: T[],
  sortKey: keyof T,
  reverse: boolean
): T[] {
  // 对数据进行排序（默认升序）
  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  // 若需要反向排序，则反转数组
  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}