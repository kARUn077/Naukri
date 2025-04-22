import mongoose from "mongoose";

const link ='';

const connectDB = async () => {
    try {
        await mongoose.connect(link);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;