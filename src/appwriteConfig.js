import { Client,Databases,Account} from 'appwrite';
const client = new Client();

//Login to appwrite create new project,new database
//create new collection in collection create 3 attribute username,use_id,body(required)

export const PROJECT_ID="64a83e8ee6e793f4cf04"
export const DATABASE_ID="64a83fc72cb09a2c6126"
export const COLLECTION_ID_MESSAGES="64a83fd0cf69ed1ce222"

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64a83e8ee6e793f4cf04');


 export const databases = new Databases(client);
 export const account = new Account(client)

    export default client;