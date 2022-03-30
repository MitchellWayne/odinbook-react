export const getUserInfo = async () => {
  let userID = '';
  const cookies = document.cookie.split('; ');

  if (cookies.some((item) => item.includes('loggedIn=true'))){
    cookies.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      if (key === "user") {
        userID = value;
      }
    })
  }

  if (userID !== '') {
    try {
      let response = await fetch(`/users/${userID}`, {
        method: "GET",
        credentials: "include",
      });
      const user = await response.json();

      if(response.status === 200) {
        return user;
      } else {
        console.log("Error on GET by user id")
      }
    } catch {
      console.log("Error on GET by user id block")
    }
  } else {
    return null;
  }
};