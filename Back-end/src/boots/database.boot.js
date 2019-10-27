import mongoose from 'mongoose';

import {
    MONITORING_PROJECTS_DATABASE_URL
} from '../config/database.config';

export async function MongoDBConnect() {
    let link = MONITORING_PROJECTS_DATABASE_URL;
    if (process.env.NODE_ENV === 'production' && process.env.MONITORING_PROJECTS_DATABASE_URL) {
        link = process.env.MONITORING_PROJECTS_DATABASE_URL;
    }
    await mongoose.connect(
        link, {
            useMongoClient: true
        },
    );
    console.log('Connect to MongoDB success');
}
