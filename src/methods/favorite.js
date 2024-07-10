// favoritesService.js
export default {
  loadFavorites () {
    try {
      const storedFavorites = localStorage.getItem('favorites')
      return storedFavorites ? JSON.parse(storedFavorites) : []
    } catch (error) {
      console.error('Failed to load favorites:', error)
      return []
    }
  },

  saveFavorites (favorites) {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  },

  toggleFavorite (favorites, itemId) {
    const index = favorites.indexOf(itemId)
    if (index === -1) {
      favorites.push(itemId)
    } else {
      favorites.splice(index, 1)
    }
    this.saveFavorites(favorites)
    return favorites
  }
}
