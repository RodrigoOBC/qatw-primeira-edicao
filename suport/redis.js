import { Queue } from "bullmq";


const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

const queueName = "twoFactorQueue";

const queue = new Queue(queueName, { connection });

export const getJob = async () => {
    const jobs = await queue.getJobs()
    return jobs[0].data
};

export const cleanJobs = async () => {
    await queue.obliterate()
}