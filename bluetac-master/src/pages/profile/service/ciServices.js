const KEYS ={
    information:'information',
    informationId:'informationId'
}




export function insertInformation(data){
    let information=getAllInformation();
    data['id']= generateInformationId()
    information.push(data)
    localStorage.setItem(KEYS.information,JSON.stringify(information))
}


export function updateInformation(data){
    let information=getAllInformation();
   let recordIndex =information.findIndex(x=>x.id==data.id);
   information[recordIndex]={...data}
    localStorage.setItem(KEYS.information,JSON.stringify(information))
}

export function deleteInformation(id){
    let information=getAllInformation();
    information =information.filter(x=>x.id != id)
    localStorage.setItem(KEYS.information,JSON.stringify(information));
}


export function generateInformationId(data){
    if(localStorage.getItem(KEYS.informationId)==null)
    localStorage.setItem(KEYS.informationId,'0')
    var id= parseInt(localStorage.getItem(KEYS.informationId))
    localStorage.setItem(KEYS.informationId,(++id).toString())
    return id;
}


export function getAllInformation(){
    if(localStorage.getItem(KEYS.information)==null)
     localStorage.setItem(KEYS.information,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.information));
 
}



