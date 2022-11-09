export const initialState = {
  tableRow: []
};
export const gettableRowTotal = (tableRow) =>
  tableRow?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_TABLEROW":
      return {
        ...state,
        tableRow: [...state.tableRow, action.item]
      };

    default:
      return state;
    case "REMOVE_FROM_TABLEROW":
      const index = state.tableRow.findIndex(
        (tableRowItem) => tableRowItem.id === action.id
      );
      let newtableRow = [...state.tableRow];

      if (index >= 0) {
        newtableRow.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in tableRow!`
        );
      }
      return {
        ...state,
        tableRow: newtableRow
      };
  }
};

export default reducer;
