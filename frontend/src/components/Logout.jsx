const Logout = () => {
  console.log("inside the logout");
  localStorage.removeItem("token");
};

export default Logout;
