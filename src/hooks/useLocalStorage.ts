function useLocalStorage() {
  const result:any = localStorage.getItem("authInfo");
 if (result) {
    const data = JSON.parse(result);
    return {
      data: data,
      roles: data.roles,
      user: data.user,
      company: data.company,
    };
  }
  return {
    data: [],
    roles: [],
    user: null,
    company: null,
  };
}
export default useLocalStorage;
