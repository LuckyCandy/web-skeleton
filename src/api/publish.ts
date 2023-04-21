import {get, post} from '~/utils/http'

let contentApi = {
    create: (title: string, file: string) => post('/content/create', {
        title: title,
        file_key: file
    }),
    pulish: (accountId: number, contentId: number) => post('/content/publish', {
        plat_account_id: accountId,
        content_id: contentId
    })
}
export default contentApi