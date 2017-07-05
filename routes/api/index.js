const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
    console.log('路由测试');
})
module.exports = router;