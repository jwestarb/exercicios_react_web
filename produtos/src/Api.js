import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const apis = {
  loadCategorias: () => api.get('categorias'),
  readCategoria: (id) => api.get(`categorias/${id}`),
  createCategoria: (categoria) => api.post('categorias', categoria),
  editCategoria: (categoria) => api.put('categorias/' + categoria.id, categoria),
  deleteCategoria: (id) => api.delete(`categorias/${id}`),

  loadProdutos: (categoria) => api.get(`produtos?categoria=${categoria}`),
  readProduto: (id) => api.get(`produtos/${id}`),
  createProduto: (produto) => api.post('produtos', produto),
  editProduto: (produto) => api.put('produtos/' + produto.id, produto),
  deleteProduto: (id) => api.delete(`produtos/${id}`)
}

export default apis
