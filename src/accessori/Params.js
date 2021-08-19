export  const Register = (userId, userPass, nome, cognome) => {
    return {
        action :'register',
        userID : userId,
        userPass : userPass,
        nome : nome,
        cognome: cognome
    }
};
export const Enter = (userId,userPass ) => {
    return {
        action :'login',
        userID : userId,
        userPass : userPass,
    }
}
export const GlobalTipologiche = () => {
    return {
        action :'tipologica',
        global:'g',
    }
}
export const ListTipo = () => {
    return {
        action :'tipo',
        global:'g',
    }
}

export const TableTipologica = (val) => {
    return {
        action : 'list_tipologica',
        val : val
    }
}
export const DeleteTipologica = (val) => {
    return {
        action : 'delete_tipologica',
        val : val
    }
}

export const AggiornaTipologica = (id, desc, params, tipo,order) => {
    return {
        "action":"update_tipologica",
        "val":id,
        "desc":desc,
        "params":params,
        "tipo":tipo,
        "order":order
       
    }
}

export const InsTipologica = (id, desc, params, order) => {
    return {
        "action":"ins_tipologica",
        "val":id,
        "desc":desc,
        "params":params,
        "order": order
       
    }
}
export const insOre =(id,progetto,tipo_ore,data,nrore,user  ) => {
    return {
        action :'ins_ore',
        id: id,
        progetto:progetto,
        tipo_ore:tipo_ore,
        data:data,
        nrore: nrore,
        user:user
    }
}

export const ListIns = () => {
    return {
        action :'list_ins',
        global :'l'
    }
}