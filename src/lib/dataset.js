export default function dataset(query,data) {      
    if(data) {
        const arr = data.sources.map(source=>{return source[query]});
        // https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c Samantha Ming
        return [...new Set(arr)];
    }
    return [];
}