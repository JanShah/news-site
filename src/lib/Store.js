export default class Store {
    /**
     * Add data to the store
     * @param {String} key the key for the data store
     * @param {String} data the data to store
     * @param {Integer} timeout in minutes
     */
    static setData(key = "", data = "", timeout = 120) {
        const date = Math.floor(Date.now() / 1000); //seconds since Epoch
        const value = data;
        localStorage.setItem(key, value);
        localStorage.setItem('time_' + key, date);
        localStorage.setItem('timeout_' + key, timeout);
    }

    /**
     * Get the values for a specific key.  If the timeout value is exceeded, 
     * the data is removed and false is returned
     * @param {String} key the key to the data store 
     */
    static getData(key) {
        const timeout = localStorage.getItem('timeout_' + key) | 120;
        //timeout expressed as epoch value, in minutes
        const date = Math.floor(Date.now() / 1000) - (60 * timeout)
        if (localStorage.getItem(key)) {
            //if the cached data is not older than the timeout
            if (localStorage.getItem('time_' + key) > date) {
                return localStorage.getItem(key);
            } else {
                //clear the cache
                localStorage.removeItem('timeout_' + key);
                localStorage.removeItem('time_' + key);
                localStorage.removeItem(key);
            }
        }
        return false;
    }
}


