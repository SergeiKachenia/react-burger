export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Error status - ${res.status}`);
  }
}

export const baseUrl = 'https://norma.nomoreparties.space/api'