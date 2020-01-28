import Ajax from './Ajax';
import Store from './Store';


export default async function request(url, timeout=15) {
    const data = Store.getData(url);
    if (data) {
        return JSON.parse(data);
    }
    const request = new Ajax();

    console.log(request)
    request.url = url;
    request.method = "GET";
    request.send();
    return await request.result.then(info => {
        Store.setData(url,info, timeout);
        return JSON.parse(info);
    });

}