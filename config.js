// at production you need to set env variables on the instance
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}