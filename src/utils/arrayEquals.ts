const arrayEquals = (array1: any[], array2: any[]) => {
    if (!array1)
        return false;
  
    if (array2.length !== array1.length)
        return false;
  
    for (let i = 0, l = array2.length; i < l; i++) {
        if (array2[i] instanceof Array && array1[i] instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            if (!arrayEquals(array2[i], array1[i]))
                return false;       
        }           
        else if (array2[i] !== array1[i]) { 
            return false;   
        }           
    }       
    return true;
};

export default arrayEquals;
