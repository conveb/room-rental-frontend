

export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const value = email.trim().toLowerCase();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (value.length > 320) return "Email is too long.";
  if (!emailRegex.test(value)) return "Enter a valid email address.";
  return null;
};

export const validateFullName = (name) => {
  const value = name.trim();
  if (value.length < 2) return "Name must be at least 2 characters.";
  if (!/^[A-Za-z ]+$/.test(value)) return "Name can only contain letters and spaces.";
  return null;
};

export const validatePhone = (phone) => {
  const value = phone.trim();
  if (!/^\d{10,13}$/.test(value)) return "Phone must be 10-13 digits.";
  return null;
};

export const validatePassword = (password, confirmPassword) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
};

export const validateLoginPassword = (password) => {
  if (!password) return "Password is required.";
  return null;
};

export const validateRole = (role) => {
  const value = role.trim().toUpperCase();
  const validRoles = ["STUDENT", "LAND_OWNER"];
  if (!validRoles.includes(value)) {
    return "Role must be either 'Student' or 'Land owner'.";
  }
  return null;
};


export const validatePrivacyPolicy = (accepted) => {
  if (accepted !== true) return "Privacy policy must be accepted.";
  return null;
};