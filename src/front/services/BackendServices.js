export const login = async (user, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data)
    throw data
  }
  localStorage.setItem("token", data.token);
  navigate("/profile");
  console.log(data);
};

export const checkPrivate = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return false;
  }
  return data;
};

export const register = async (newUser, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  navigate("/");
};

