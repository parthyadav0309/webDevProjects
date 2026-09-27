import cron from 'node-cron';
import redis from 'redis';


export const deleteOtps = cron.schedule('*/1 * * * *', () => {
    redis.keys('*').then(keys => {
        let pipeline = redis.pipeline();
        keys.forEach(key => {
            const expirationTime = key.split(':')[1]
            if (expirationTime < Date.now())
                pipeline.del(key);
        });
        return pipeline.exec();
    });
}, {
    scheduled: false
})