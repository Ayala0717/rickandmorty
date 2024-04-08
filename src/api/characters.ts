import { CharactersModel } from '@/types/models/characters'
import { apiResource } from '@/utils/api'

const endpoint = 'character'

export const { index } = apiResource<CharactersModel>(endpoint)
