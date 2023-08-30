import { groupObjectsBySingleKey } from "utils/array/ArrayHandler";

export const doAccordionTitleItemCounts = (itemData: any) => {
  let AccordionItemTitle: string = "";

  let itemArrayByGoups = [];

  if (itemData.contentTableData.length > 1) {
    itemArrayByGoups = groupObjectsBySingleKey(
      itemData.contentTableData,
      function (dataRows: any) {
        return [dataRows.complaint_type];
      }
    );
  } else {
    itemArrayByGoups.push(itemData.contentTableData[0].complaint_type);
  }

  if (itemArrayByGoups.length > 1) {
    itemArrayByGoups.map((item: object) => {
      Object.entries(item).map(([key, value]) => {
        const groupName = key;
        const count = value.length;
      });
    });
  }
};
