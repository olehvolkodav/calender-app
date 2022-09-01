export const splitArrayChunk = (ranges: number[]) => {
  const rows: number[][] = [];
  let cells: number[] = [];

  ranges.forEach((year, i) => {
    cells.push(year);
    if ((i + 1) % 4 === 0) {
      rows.push(cells);
      cells = [];
    }
  });

  //in the case that the length of ranges is less than 4
  if (ranges.length && !rows.length) rows.push(cells);
  return rows;
};
