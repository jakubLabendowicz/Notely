import {NotelyRestClient} from './RestClient';
const client = new NotelyRestClient();

//auth
export const authenticate = async (data) => {
    return new Promise((resolve, reject) => {
        client.post('/auth/authenticate', data)
        .then(response => {
            localStorage.setItem("token", response.data); 
            window.location = "/";
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const introspect = async (data) => {
    return new Promise((resolve, reject) => {
        client.post('/auth/introspect', data)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const revoke = async () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem("token")
            window.location.reload()
            window.location.replace("/")
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}



//users
export const createOneUser = async (data) => {
    return new Promise((resolve, reject) => {
        client.post('/users', data)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const selectOneUser = async (userId) => {
    return new Promise((resolve, reject) => {
        client.get('/users/' + userId)
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const selectManyUsers = async () => {
    return new Promise((resolve, reject) => {
        client.get('/users')
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const updateOneUser = async (userId, data) => {
    return new Promise((resolve, reject) => {
        client.put('/users/' + userId, data)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const deleteOneUser = async (userId) => {
    return new Promise((resolve, reject) => {
        client.delete('/users/' + userId)
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}



//user notes
export const selectManyUserNotes = async (userId) => {
    return new Promise((resolve, reject) => {
        client.get('/users/' + userId + '/notes')
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}



//notes
export const createOneNote = async (data) => {
    return new Promise((resolve, reject) => {
        client.post('/notes', data)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const selectOneNote = async (noteId) => {
    return new Promise((resolve, reject) => {
        client.get('/notes/' + noteId)
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const selectManyNotes = async (filters='') => {
    return new Promise((resolve, reject) => {
        client.get('/notes'+filters)
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const updateOneNote = async (noteId, data) => {
    return new Promise((resolve, reject) => {
        client.put('/notes/' + noteId, data)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const deleteOneNote = async (noteId) => {
    return new Promise((resolve, reject) => {
        client.delete('/notes/' + noteId)
        .then((response) => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const archiveOneNote = async (noteId) => {
    return new Promise((resolve, reject) => {
        client.post('/notes/' + noteId + '/archive', undefined)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const unarchiveOneNote = async (noteId) => {
    return new Promise((resolve, reject) => {
        client.post('/notes/' + noteId + '/unarchive', undefined)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const summarizeOneNote = async (noteId) => {
    return new Promise((resolve, reject) => {
        client.get('/notes/' + noteId + '/summarize')
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export const askOneNote = async (noteId, question) => {
    return new Promise((resolve, reject) => {
        client.get('/notes/' + noteId + '/ask?question=' + question)
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
}