

export const loginGuards = () => {
    if(localStorage.getItem('token')){
        return true;
    }else{
        window.alert('No tienes permiso para acceder a este ruta');


        return false;
    }

}