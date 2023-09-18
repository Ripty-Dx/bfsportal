export const usePagination = (
  totalEntries,
  pageSize,
  currentPage,
  data,
) => {
  console.log(totalEntries);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const dataForDisplay = data?.slice(firstIndex, lastIndex);
  const noOfButtons = Math.ceil(totalEntries / pageSize);
  const buttonArray=[];
  for (let index = 0; index < noOfButtons; index++) {
    buttonArray.push(index+1);
    
  }
  return { data: dataForDisplay, buttonArray: buttonArray };
};
