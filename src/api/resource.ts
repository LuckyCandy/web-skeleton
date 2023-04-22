import {post} from '~/utils/http'

let resourceApi = {
    upload: (file: any) => post('/file/upload', {
        file: file
    })
}
export default resourceApi