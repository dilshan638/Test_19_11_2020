const KEYS ={
    billingAddress:'billingAddress',
    billingAddressId:'billingAddressId'
}



export function insertBillingAddress(data){
    let billingAddress=getAllBillingAddress();
    data['id']= generateBillingAddressId()
    billingAddress.push(data)
    localStorage.setItem(KEYS.billingAddress,JSON.stringify(billingAddress))
}

export function updateBillingAddress(data){
    let billingAddress=getAllBillingAddress();
   let recordIndex =billingAddress.findIndex(x=>x.id==data.id);
   billingAddress[recordIndex]={...data}
    localStorage.setItem(KEYS.billingAddress,JSON.stringify(billingAddress))
}

export function deleteBillingAddress(id){
    let billingAddress=getAllBillingAddress();
    billingAddress =billingAddress.filter(x=>x.id != id)
    localStorage.setItem(KEYS.billingAddress,JSON.stringify(billingAddress));
}


export function generateBillingAddressId(data){
    if(localStorage.getItem(KEYS.billingAddressId)==null)
    localStorage.setItem(KEYS.billingAddressId,'0')
    var id= parseInt(localStorage.getItem(KEYS.billingAddressId))
    localStorage.setItem(KEYS.billingAddressId,(++id).toString())
    return id;
}


export function getAllBillingAddress(){
    if(localStorage.getItem(KEYS.billingAddress)==null)
     localStorage.setItem(KEYS.billingAddress,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.billingAddress));
 
}
