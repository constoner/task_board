const useNameFn = () => {
  const setName = (names, nameID, nameValue, doneState, setCB) => {
    names.forEach((item) => {
      if (item.id === nameID) {
        item.data.name = nameValue;
        item.data.done = doneState;
      }
    });
    setCB([...names]);
  }

  return { setName };
}

const useNameState = () => {
  const nameState = useNameFn();

  return { ...nameState };
}

export default useNameState;
