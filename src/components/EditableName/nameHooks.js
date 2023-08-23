const useNameFn = () => {
  const setName = (names, nameID, nameValue, setCB) => {
    names.forEach((item) => {
      if (item.id === nameID) {
        item.data.name = nameValue;
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
