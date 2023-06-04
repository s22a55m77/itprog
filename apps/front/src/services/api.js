const URL = 'https://itprog-back.azurewebsites.net/';


export const getCategory = async () => {
  return await fetch(URL + 'category')
}

export const getDish = async (id) => {
  return await fetch(URL + 'dish/' + id)
}
