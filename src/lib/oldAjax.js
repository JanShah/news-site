export default function ajax(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send();
    xhr.timeout = 10000;
    //using promise instead of callback to avoid potential callback issues. 
    //This is also a more modern technique.
    return new Promise((resolve,reject)=>{
        xhr.onreadystatechange = function() {
            if(xhr.readyState===4&&xhr.status===200) {
                callback(xhr.response);
            }
        }
    });
}