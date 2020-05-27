export const cloneObject = (object?: Object) => {
    if(!object) {
        return
    }
    return JSON.parse(JSON.stringify(object));
}