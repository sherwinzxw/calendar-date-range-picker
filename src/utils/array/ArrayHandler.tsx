export const groupObjectsBy = (arrayToGroup: any, groupByFieldsArray: any) => {
  let groups: any = {};

  arrayToGroup.forEach((object: any) => {
    let group: string = JSON.stringify(groupByFieldsArray(object));
    groups[group] = groups[group] || [];
    groups[group].push(object);
  });
  return Object.keys(groups).map((group) => {
    return groups[group];
  });
};

export const groupAndKeyObjectsBy = (
  arrayToGroup: any,
  groupByFieldsArray: any,
  keyFieldName?: string
) => {
  let groups: any = {};

  arrayToGroup.forEach((object: any) => {
    let group: string = JSON.stringify(groupByFieldsArray(object));
    groups[group] = groups[group] || [];
    groups[group].push(object);
  });
  return Object.keys(groups).map((group) => {
    var firstChild = groups[group][0];
    const keyValue = firstChild[keyFieldName as keyof typeof firstChild] as any;

    let result = {
      key: keyValue,
      objects: groups[group],
    };
    return result;
  });
};

export const groupObjectsBySingleKey = (
  arrayToGroup: any,
  groupByFieldsArray: any
) => {
  let groups: any = {};
  if (arrayToGroup) {
    arrayToGroup.forEach((object: any) => {
      let group: string = groupByFieldsArray(object)[0];
      groups[group] = groups[group] || [];
      groups[group].push(object);
    });

    return groups;
  } else {
    return null;
  }
};

export const filterObjectsByMaxFieldValue = (
  arrayToFilter: any,
  fieldNameToSort: string
) => {
  const result = arrayToFilter.reduce((prev: any, current: any) => {
    return prev[fieldNameToSort] > current[fieldNameToSort] ? prev : current;
  });
  return result;
};

export const mergeJsonObjects = (data: any) => {
  const result = data.reduce(
    (objectAccumulatorArray: any, currentObject: any) => {
      return (
        Object.keys(currentObject).forEach((object) => {
          let currentObjectValue;
          if (typeof currentObject[object] === "string") {
            // replace all the double blank like characters with single space
            currentObjectValue = currentObject[object].replaceAll(
              /\s\s+/g,
              " "
            );
            if (!objectAccumulatorArray[object]) {
              objectAccumulatorArray[object] = [].concat(currentObjectValue);
            } else if (
              objectAccumulatorArray[object].includes(currentObjectValue)
            ) {
            } else if (currentObjectValue === "-") {
            } else {
              objectAccumulatorArray[object] =
                objectAccumulatorArray[object].concat(currentObjectValue);
            }
          }
        }),
        objectAccumulatorArray
      );
    },
    {}
  );
  return result;
};

// special use case for the trader details
export const mergeArrayValuesWithPrefix = (
  data: any,
  prefix: string,
  fieldName: string
) => {
  let mapping: any = [];
  const result = data.reduce(
    (objectAccumulatorArray: any, currentObject: any) => {
      return (
        Object.keys(currentObject).forEach((object) => {
          let currentObjectValue;

          if (typeof currentObject[object] === "string") {
            // replace all the double blank like characters with single space

            currentObjectValue = currentObject[object]
              .replaceAll(/\s\s+/g, " ")
              .replace(prefix, "");

            if (currentObject[object].includes(prefix)) {
              mapping.push({
                mappingValue: currentObjectValue,
                originalValue: currentObject[object],
              });
            }

            if (!objectAccumulatorArray[object]) {
              objectAccumulatorArray[object] = [].concat(currentObjectValue);
            } else if (
              objectAccumulatorArray[object].includes(currentObjectValue)
            ) {
            } else if (currentObjectValue === "-") {
            } else {
              objectAccumulatorArray[object] =
                objectAccumulatorArray[object].concat(currentObjectValue);
            }
          }
        }),
        objectAccumulatorArray
      );
    },
    {}
  );

  if (mapping.length > 0) {
    const mapArray = mapping.map((i: any) => {
      return i.mappingValue;
    });
    const resultFinal = result[fieldName as keyof typeof result].map(
      (item: string) => {
        if (mapArray.length > 0 && mapArray.includes(item)) {
          return `!!!${item}`;
        } else {
          return item;
        }
      }
    );

    result[fieldName as keyof typeof result] = resultFinal.sort();

    return result;
  } else {
    return result;
  }
};

export const concatenateObjectArrays = (array1: any, array2: any) => {
  const result = array1.concat(array2);
  if (result.length > 0) {
    return result;
  } else {
    return null;
  }
};

export function flattenJSON(object: any = {}, result: any = {}, extraKey = "") {
  for (let key in object) {
    if (typeof object[key] !== "object") {
      result[extraKey + key] = object[key];
    } else {
      flattenJSON(object[key], result, `${extraKey}${key}.`);
    }
  }
  return result;
}

export function sumArrays(...arrays: any) {
  const n = arrays.reduce(
    (max: any, xs: any) => Math.max(max, xs.length),
    0
  );
  const result = Array.from({ length: n });
  return result.map((_, i) =>
    arrays
      .map((xs: any) => xs[i] || 0)
      .reduce((sum: number, x: any) => sum + x, 0)
  );
}


export function onlyUnique(value: any, index: number, self: any) {
  if(value!="-") {
    return self.indexOf(value) === index;
  }
}