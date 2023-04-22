import {get, post} from '~/utils/http'

let userApi = {
    login: (telphone: string, password: string) => post('/user/login', {
        telphone: telphone,
        password: password
    })
}
export default userApi