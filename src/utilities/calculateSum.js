const calculateSum = (items) => {
  let sum = 0;
  items.forEach(currentItem => sum += currentItem.item.price * currentItem.qty);
  return sum;
}

export default calculateSum;