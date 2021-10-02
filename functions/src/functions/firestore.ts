import * as admin from "firebase-admin";
import {Response, Request} from "express";


const COLLECTION_NAME: string = "fbt.users";

interface User {
    firstName: string,
    lastName: string
}

interface FirebaseResponse {
    status: string,
    message: string,
    data: any
}

// Create a new User document
export const createUser = async (request: Request, response: Response) => {

    const firebaseResponse: FirebaseResponse = {status: "", message: "", data: {}};
    
    try {
        const user: User = request.body;
        const result = await admin.firestore().collection(COLLECTION_NAME).add(user);
        firebaseResponse.status = "success"; 
        firebaseResponse.message = `User with id ${result.id} addedd successfully.`;
        firebaseResponse.data = { id: result.id };
        response.status(200).json(firebaseResponse);
    }
    catch(error) {
        console.log(error);
        firebaseResponse.status = "failed"; 
        firebaseResponse.message = `Internal error: could not add User.`;
        response.status(500).json(firebaseResponse);
    }
};


export const getUsers = async (request: Request, response: Response) => {

    const firebaseResponse: FirebaseResponse = {status: "", message: "", data: {}};
    
    try {
        const snapshot = await admin.firestore().collection(COLLECTION_NAME).get();
        let users: User[] = [];
        snapshot.forEach( document => {
            users.push(document.data() as User);
        });
        
        firebaseResponse.status = 'success';
        firebaseResponse.message = 'Retrieved all Users';
        firebaseResponse.data = users

        response.status(200).json(firebaseResponse);
    }
    catch(error) {
        response.status(500).json(error);
    }

};


// Get a User by a document ID
export const getUser = async (request: Request, response: Response) => {
    
    const id: string = request.params.id;
    let status: number = 0;

    const firebaseResponse: FirebaseResponse = {status: "", message: "", data: {}};
    
    try {
        const snapshot = await admin.firestore().collection(COLLECTION_NAME).doc(id).get();
        if (snapshot.exists) {
            firebaseResponse.status = 'success',
            firebaseResponse.message = `User with id ${id} found!`
            firebaseResponse.data = snapshot.data();
            status = 200;
        } else {
            firebaseResponse.status = 'failed',
            firebaseResponse.message = `No user with id ${id} found!`
            status = 404;
        }
        response.status(status).json(firebaseResponse);
    } catch (error) {
        console.log('Error getting User Information:', error);
        response.status(500).json(error.message);
    }

};
