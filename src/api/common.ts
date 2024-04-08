import { UserAuthModel } from '@/types/models/user'
import { apiResource } from '@/utils/api'

const endpoint = 'data.json'

export const { index } = apiResource<UserAuthModel>(endpoint)
